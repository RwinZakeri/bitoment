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

      console.log(user)

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

    // Validate the request body
    const validationResult = optionalProfileUpdateSchema.safeParse(body);
    if (!validationResult.success) {
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
          phoneNumber: number | null;
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
    const updatedPhoneNumber =
      phoneNumber !== undefined ? phoneNumber : currentUser.phoneNumber;
    const updatedNationalInsuranceNumber =
      nationalInsuranceNumber !== undefined
        ? nationalInsuranceNumber
        : currentUser.nationalInsuranceNumber;
    const updatedBirthDate =
      birthDate !== undefined ? birthDate : currentUser.birthDate;

    console.log("Updating profile with:", {
      fullName: updatedName,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
      nationalInsuranceNumber: updatedNationalInsuranceNumber,
      birthDate: updatedBirthDate,
    });

    const updateUser = db.prepare(`
      UPDATE users 
      SET name = ?, 
          email = ?, 
          phoneNumber = ?, 
          nationalInsuranceNumber = ?, 
          birthDate = ?
      WHERE id = ?
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

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
