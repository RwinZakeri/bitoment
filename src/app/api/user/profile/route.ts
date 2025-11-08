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
      SELECT id, email, phoneNumber, name, nationalInsuranceNumber, birthDate, currency, theme, language, created_at 
      FROM users 
      WHERE id = ?
    `
      )
      .get(tokenPayload.data.userId)) as User | undefined;

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
          phoneNumber: string | null;
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

    const updatedName = fullName !== undefined ? fullName : currentUser.name;
    const updatedEmail = email !== undefined ? email : currentUser.email;

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

    let updatedPhoneNumber: string | null = null;
    if (
      phoneNumber !== undefined &&
      phoneNumber !== null &&
      phoneNumber !== ""
    ) {
      const cleanedPhone =
        typeof phoneNumber === "string"
          ? phoneNumber.replace(/\D/g, "")
          : String(phoneNumber).replace(/\D/g, "");

      if (cleanedPhone && cleanedPhone.length >= 10) {
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
      updatedPhoneNumber = null;
    } else {
      updatedPhoneNumber = currentUser.phoneNumber?.toString() || null;
    }

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

    const updateUser = db.prepare(`
      UPDATE users 
      SET name = ?, 
          email = ?, 
          phoneNumber = CAST(? AS TEXT), 
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
        `SELECT id, email, name, phoneNumber, nationalInsuranceNumber, birthDate, currency, theme, language, created_at 
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

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    const errorMessage = error instanceof Error ? error.message : String(error);

    if (
      errorMessage.includes("out of range for type integer") ||
      errorMessage.includes("integer out of range")
    ) {
      console.error(
        "CRITICAL: phoneNumber column is still INTEGER! Migration may have failed."
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number column migration is required. Please restart the server to run the migration, or contact support.",
          error:
            "Database schema migration needed - phoneNumber column must be TEXT",
        },
        { status: 500 }
      );
    }

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
