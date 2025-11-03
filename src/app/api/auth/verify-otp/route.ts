// app/api/auth/verify-otp/route.ts
import {
  getContentType,
  isOTPExpired,
  isOTPVerificationTimeExpired,
} from "@/lib/auth";
import db from "@/lib/db";
import { OTPState, VerifyOTPRequest, VerifyOTPResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

// Ensure SQLite works in Node runtime (NOT Edge)
export const runtime = "nodejs";

export async function POST(
  request: NextRequest
): Promise<NextResponse<VerifyOTPResponse>> {
  try {
    // ✅ Check if Content-Type is JSON
    const contentType = getContentType(request);
    if (contentType !== "application/json") {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must be application/json",
          valid: false,
        },
        { status: 400 }
      );
    }

    let body: VerifyOTPRequest;
    try {
      const rawBody = await request.json();
      body = rawBody as VerifyOTPRequest;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON format in request body",
        },
        { status: 400 }
      );
    }

    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required.",
          valid: false,
        },
        { status: 400 }
      );
    }

    // ✅ Fetch latest OTP record for the email
    const otpRecord = (await db
      .prepare(
        `SELECT id, otp, expires_at, used, state, created_at, verified_at
         FROM password_reset_otps
         WHERE email = ?
         ORDER BY created_at DESC
         LIMIT 1`
      )
      .get(email)) as
      | {
          id: number;
          otp: string;
          expires_at: string;
          used: number;
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
          valid: false,
        },
        { status: 404 }
      );
    }

    // ✅ Check state
    if (otpRecord.state !== OTPState.EMAIL_SENT) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This OTP has already been verified or is invalid. Please request a new one.",
          valid: false,
        },
        { status: 400 }
      );
    }

    // ✅ Check if OTP expired
    if (isOTPExpired(otpRecord.expires_at)) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new one.",
          valid: false,
        },
        { status: 400 }
      );
    }

    // ✅ Check verification time
    if (
      isOTPVerificationTimeExpired(otpRecord.created_at, otpRecord.verified_at)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "OTP verification time has expired. Please request a new one.",
          valid: false,
        },
        { status: 400 }
      );
    }

    // ✅ Match OTP
    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP. Please check and try again.",
          valid: false,
        },
        { status: 400 }
      );
    }

    // ✅ Mark OTP as verified
    const verifiedAt = new Date().toISOString();
    await db
      .prepare(
        `UPDATE password_reset_otps
       SET state = ?, verified_at = ?
       WHERE id = ?`
      )
      .run(OTPState.SENT_AND_USED, verifiedAt, otpRecord.id);

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully.",
        valid: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
        valid: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    {
      status: 405,
      headers: { Allow: "POST" },
    }
  );
}
