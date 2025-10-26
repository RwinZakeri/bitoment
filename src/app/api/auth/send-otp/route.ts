import {
  generateOTP,
  generateOTPExpiration,
  getContentType,
  isValidEmail,
} from "@/lib/auth";
import db from "@/lib/db";
import { OTPState, SendOTPRequest, SendOTPResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<SendOTPResponse>> {
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

    const body: SendOTPRequest = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
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
      .prepare("SELECT id, email FROM users WHERE email = ?")
      .get(email) as { id: number; email: string } | undefined;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email address",
        },
        { status: 404 }
      );
    }

    const otp = generateOTP(4);
    const expiresAt = generateOTPExpiration(10);
    db.prepare("DELETE FROM password_reset_otps WHERE email = ?").run(email);

    db.prepare(
      "INSERT INTO password_reset_otps (email, otp, expires_at, state) VALUES (?, ?, ?, ?)"
    ).run(email, otp, expiresAt, OTPState.EMAIL_SENT);

    // const emailSent = await sendOTPEmail(email, otp);

    // const resend = new Resend("re_d6MrqPK8_8McYpLp1rxoLf7D3FhkoJKAz");

    // await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: [email],
    //   subject: `OTP code : ${otp}`,
    //   html: "<p>back to website please</p>",
    // });

    // if (!resend) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Failed to send OTP email. Please try again.",
    //     },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully to your email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP error:", error);

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
