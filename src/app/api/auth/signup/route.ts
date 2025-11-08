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

    const existingUser = await db
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

    
    const userId = await db.transactionAsync(async (txDb) => {
      const insertUser = txDb.prepare(`
        INSERT INTO users (email, password, name, currency, theme, language, created_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `);

      const result = await insertUser.run(
        email,
        hashedPassword,
        fullName,
        "USD",
        "light",
        "en"
      );
      const userId = result.lastInsertRowid as number;

      
      const insertWallet = txDb.prepare(`
        INSERT INTO wallets (user_id, balance, currency, created_at, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
      await insertWallet.run(userId, 1000.0, "USD");

      return userId;
    });

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
