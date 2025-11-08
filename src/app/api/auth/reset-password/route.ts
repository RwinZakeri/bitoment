import {
  comparePassword,
  getContentType,
  hashPassword,
  isOTPExpired,
  isOTPVerificationTimeExpired,
} from "@/lib/auth";
import db from "@/lib/db";
import {
  OTPState,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ResetPasswordResponse>> {
  try {
    if (!getContentType(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must be application/json",
        },
        { status: 400 }
      );
    }

    const body: ResetPasswordRequest = await request.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, OTP, or password are required",
        },
        { status: 400 }
      );
    }

    const otpRecord = (await db
      .prepare(
        "SELECT id, otp, expires_at, used, state, created_at, verified_at FROM password_reset_otps WHERE email = ? ORDER BY created_at DESC LIMIT 1"
      )
      .get(email)) as
      | {
          id: number;
          otp: string;
          expires_at: string;
          used: boolean;
          state: number;
          created_at: string;
          verified_at: string | null;
        }
      | undefined;

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "No OTP found for this email. Please request a new one.",
        },
        { status: 404 }
      );
    }

    
    if (otpRecord.state === OTPState.PASSWORD_RESET) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This OTP has already been used for password reset. Please request a new one.",
        },
        { status: 400 }
      );
    }

    
    if (
      otpRecord.state === OTPState.EMAIL_SENT &&
      isOTPExpired(otpRecord.expires_at)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    
    if (
      otpRecord.state === OTPState.EMAIL_SENT &&
      isOTPVerificationTimeExpired(otpRecord.created_at, otpRecord.verified_at)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "OTP verification time has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    
    if (otpRecord.state !== OTPState.SENT_AND_USED) {
      return NextResponse.json(
        {
          success: false,
          message:
            "OTP must be verified first. Please verify your OTP before resetting password.",
        },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP. Please check and try again.",
        },
        { status: 400 }
      );
    }

    const user = (await db
      .prepare("SELECT id, password FROM users WHERE email = ?")
      .get(email)) as { id: number; password: string | null } | undefined;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    
    if (user.password) {
      const isSamePassword = await comparePassword(newPassword, user.password);
      if (isSamePassword) {
        return NextResponse.json(
          {
            success: false,
            message:
              "New password must be different from your current password",
          },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await hashPassword(newPassword);

    await db
      .prepare("UPDATE users SET password = ? WHERE email = ?")
      .run(hashedPassword, email);

    
    await db
      .prepare(
        "UPDATE password_reset_otps SET used = TRUE, state = ? WHERE id = ?"
      )
      .run(OTPState.PASSWORD_RESET, otpRecord.id);

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);

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
