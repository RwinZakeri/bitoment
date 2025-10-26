import {
  generateToken,
  getContentType,
  hashPassword,
  isValidEmail,
  validatePassword,
} from "@/lib/auth";
import db from "@/lib/db";
import { customErrorMessages } from "@/schema/auth/authSchema";
import { SignUpRequest, SignUpResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<SignUpResponse>> {
  try {
    // check content type
    if (!getContentType(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must be application/json",
        },
        {
          status: 400,
        }
      );
    }

    // get body and type
    let body: SignUpRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    const { email, password, fullName } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password and full name are required",
        },
        { status: 400 }
      );
    }

    if (fullName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: customErrorMessages.nameTooShort,
          code: "NAME_TOO_SHORT",
          field: "fullName",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: customErrorMessages.invalidEmail,
          code: "INVALID_EMAIL",
          field: "email",
        },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: customErrorMessages.weakPassword,
          code: "WEAK_PASSWORD",
          field: "password",
        },
        { status: 400 }
      );
    }

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: customErrorMessages.emailAlreadyExists,
          code: "EMAIL_EXISTS",
          field: "email",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const insertUser = db.prepare(`
      INSERT INTO users (email, password, name, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `);

    const result = insertUser.run(email, hashedPassword, fullName);
    const userId = result.lastInsertRowid as number;

    const token = generateToken({
      userId: userId,
      email: email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          id: userId,
          email: email,
          fullName: fullName,
        },
        token: token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign up error:", error);

    return NextResponse.json(
      {
        success: false,
        message: customErrorMessages.serverError,
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
