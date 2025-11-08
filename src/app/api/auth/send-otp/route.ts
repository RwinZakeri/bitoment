import {
  generateOTP,
  generateOTPExpiration,
  getContentType,
  isValidEmail,
} from "@/lib/auth";
import db from "@/lib/db";
import { OTPState, SendOTPRequest, SendOTPResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

    let body: SendOTPRequest;
    try {
      const rawBody = await request.json();
      body = rawBody as SendOTPRequest;
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

    const email = body.email;

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

    
    const user = (await db
      .prepare("SELECT id, email FROM users WHERE email = ?")
      .get(email)) as { id: number; email: string } | undefined;

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
    const expiresAt = generateOTPExpiration(1);
    const createdAt = new Date().toISOString();

    
    await db.transactionAsync(async (txDb) => {
      
      await txDb
        .prepare("DELETE FROM password_reset_otps WHERE email = ?")
        .run(email);

      
      await txDb
        .prepare(
          "INSERT INTO password_reset_otps (email, otp, expires_at, state, created_at) VALUES (?, ?, ?, ?, ?)"
        )
        .run(email, otp, expiresAt, OTPState.EMAIL_SENT, createdAt);
    });

    const resend = new Resend("re_d6MrqPK8_8McYpLp1rxoLf7D3FhkoJKAz");

    try {
      const emailResult = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: `OTP code : ${otp}`,
        html: "<p>back to website please</p>",
      });

      
      if (!emailResult || emailResult.error) {
        
        await db
          .prepare(
            "DELETE FROM password_reset_otps WHERE email = ? AND created_at = ?"
          )
          .run(email, createdAt);

        return NextResponse.json(
          {
            success: false,
            message:
              emailResult?.error?.message ||
              "Failed to send OTP email. Please try again.",
          },
          { status: 500 }
        );
      }
    } catch (emailError: unknown) {
      
      db.prepare(
        "DELETE FROM password_reset_otps WHERE email = ? AND created_at = ?"
      ).run(email, createdAt);

      console.error("Email send error:", emailError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send OTP email. Please try again.",
        },
        { status: 500 }
      );
    }

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
