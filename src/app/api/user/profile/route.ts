import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { optionalProfileUpdateSchema } from "@/schema/auth/authSchema";
import { User } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const tokenPayload = verifyAuthToken(request);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const user = (await db
      .prepare(
        `
      SELECT id, email, phoneNumber, name, nationalInsuranceNumber, birthDate, created_at 
      FROM users 
      WHERE id = ?
    `
      )
      .get(tokenPayload.data.userId)) as User | undefined;

    console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const tokenPayload = verifyAuthToken(request);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    console.log("Profile update request body:", body);

    // Validate the request body
    const validationResult = optionalProfileUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.issues);
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { fullName, email, phoneNumber, nationalInsuranceNumber, birthDate } =
      validationResult.data;

    // Get current user data to preserve existing values for optional fields
    // Note: phoneNumber is now TEXT in database (may still be INTEGER in some cases during migration)
    const currentUser = (await db
      .prepare(
        `SELECT name, email, phoneNumber, nationalInsuranceNumber, birthDate 
         FROM users 
         WHERE id = ?`
      )
      .get(tokenPayload.data.userId)) as
      | {
          name: string;
          email: string;
          phoneNumber: number | string | null;
          nationalInsuranceNumber: string | null;
          birthDate: string | null;
        }
      | undefined;

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Use provided values or keep existing ones
    const updatedName = fullName !== undefined ? fullName : currentUser.name;
    const updatedEmail = email !== undefined ? email : currentUser.email;

    // Check if email is being changed and if it already exists for another user
    if (email !== undefined && email !== currentUser.email) {
      const existingUser = (await db
        .prepare("SELECT id FROM users WHERE email = ? AND id != ?")
        .get(email, tokenPayload.data.userId)) as { id: number } | undefined;

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: "An account with this email already exists",
          },
          { status: 400 }
        );
      }
    }

    // Handle phoneNumber - now stored as TEXT in database (migrated from INTEGER)
    // Clean and validate the phone number
    let updatedPhoneNumber: string | null = null;
    if (
      phoneNumber !== undefined &&
      phoneNumber !== null &&
      phoneNumber !== ""
    ) {
      // Clean phone number (remove non-digits but keep for validation)
      const cleanedPhone =
        typeof phoneNumber === "string"
          ? phoneNumber.replace(/\D/g, "")
          : String(phoneNumber).replace(/\D/g, "");

      if (cleanedPhone && cleanedPhone.length >= 10) {
        // Store cleaned phone number as text
        updatedPhoneNumber = cleanedPhone;
      } else if (cleanedPhone) {
        return NextResponse.json(
          {
            success: false,
            message: "Phone number must be at least 10 digits",
          },
          { status: 400 }
        );
      } else {
        updatedPhoneNumber = null;
      }
    } else if (phoneNumber === "") {
      // If empty string is explicitly provided, set to null
      updatedPhoneNumber = null;
    } else {
      // Keep existing phone number
      updatedPhoneNumber = currentUser.phoneNumber?.toString() || null;
    }

    // Handle optional fields - convert empty strings to null for database
    const updatedNationalInsuranceNumber =
      nationalInsuranceNumber !== undefined
        ? nationalInsuranceNumber === ""
          ? null
          : nationalInsuranceNumber
        : currentUser.nationalInsuranceNumber;
    const updatedBirthDate =
      birthDate !== undefined
        ? birthDate === ""
          ? null
          : birthDate
        : currentUser.birthDate;

    console.log("Updating profile with:", {
      fullName: updatedName,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
      nationalInsuranceNumber: updatedNationalInsuranceNumber,
      birthDate: updatedBirthDate,
    });

    // Update query - phoneNumber is now TEXT
    const updateUser = db.prepare(`
      UPDATE users 
      SET name = ?, 
          email = ?, 
          phoneNumber = ?, 
          nationalInsuranceNumber = ?, 
          birthDate = ?
      WHERE id = ?
      RETURNING *
    `);

    const result = await updateUser.run(
      updatedName,
      updatedEmail,
      updatedPhoneNumber,
      updatedNationalInsuranceNumber,
      updatedBirthDate,
      tokenPayload.data.userId
    );

    console.log("Profile update result:", result);

    if (result.changes === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or no changes made",
        },
        { status: 404 }
      );
    }

    const user = (await db
      .prepare(
        `SELECT id, email, name, phoneNumber, nationalInsuranceNumber, birthDate, created_at 
         FROM users 
         WHERE id = ?`
      )
      .get(tokenPayload.data.userId)) as User;

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    // Log more detailed error information
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Check for duplicate email error (Postgres unique constraint violation)
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (
      errorMessage.includes("unique") ||
      errorMessage.includes("duplicate") ||
      errorMessage.includes("already exists")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
