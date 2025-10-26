import { comparePassword, generateToken, getContentType, isValidEmail } from "@/lib/auth";
import db from "@/lib/db";
import { SignInRequest, SignInResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<SignInResponse>> {
  try {
    if(!getContentType(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must be application/json",
        },
        { status: 400 }
      );
    }
    const body: SignInRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    const user = db
      .prepare("SELECT id, email, password, name FROM users WHERE email = ?")
      .get(email) as
      | {
          id: number;
          email: string;
          password: string;
          name?: string;
        }
      | undefined;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sign in successful",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.name || undefined,
        },
        token: token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sign in error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
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
