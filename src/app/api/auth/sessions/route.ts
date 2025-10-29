import { isValidEmail } from "@/lib/auth";
import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { LoginSessionResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<LoginSessionResponse>> {
  try {
    const tokenPayload = verifyAuthToken(request);
    
    console.log(tokenPayload)
    
    if (!tokenPayload) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const { email } = tokenPayload.data;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email parameter is required",
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

    // Check if user exists
    const user = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email)

      console.log(user , email)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Fetch all login sessions for the user, sorted by most recent first
    const sessions = db
      .prepare(
        `SELECT id, user_email, device_name, os, browser, ip, created_at 
         FROM login_sessions 
         WHERE user_email = ? 
         ORDER BY created_at DESC`
      )
      .all(email) as Array<{
      id: number;
      user_email: string;
      device_name?: string;
      os?: string;
      browser?: string;
      ip?: string;
      created_at: string;
    }>;

    return NextResponse.json(
      {
        success: true,
        message: "Login sessions retrieved successfully",
        sessions: sessions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get sessions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
