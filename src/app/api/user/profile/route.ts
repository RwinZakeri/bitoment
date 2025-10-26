import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { User } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

    const user = db
      .prepare(
        `
      SELECT id, email, name, created_at 
      FROM users 
      WHERE id = ?
    `
      )
      .get(tokenPayload.userId) as User | undefined;

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
    const { fullName } = body;

    const updateUser = db.prepare(`
      UPDATE users 
      SET name = ? 
      WHERE id = ?
    `);

    const result = updateUser.run(fullName, tokenPayload.userId);

    if (result.changes === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const user = db
      .prepare(
        `
      SELECT id, email, name, created_at 
      FROM users 
      WHERE id = ?
    `
      )
      .get(tokenPayload.userId) as User;

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
