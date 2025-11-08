import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
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
      SELECT currency, theme, language 
      FROM users 
      WHERE id = ?
    `
      )
      .get(tokenPayload.data.userId)) as
      | {
          currency: string | null;
          theme: string | null;
          language: string | null;
        }
      | undefined;

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
      settings: {
        currency: user.currency || "USD",
        theme: user.theme || "light",
        language: user.language || "en",
      },
    });
  } catch (error) {
    console.error("Get settings error:", error);

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
    const { currency, theme, language } = body;

    
    if (!currency && !theme && !language) {
      return NextResponse.json(
        {
          success: false,
          message:
            "At least one setting (currency, theme, or language) must be provided",
        },
        { status: 400 }
      );
    }

    
    const currentUser = (await db
      .prepare(
        `SELECT currency, theme, language 
         FROM users 
         WHERE id = ?`
      )
      .get(tokenPayload.data.userId)) as
      | {
          currency: string | null;
          theme: string | null;
          language: string | null;
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

    
    const updatedCurrency =
      currency !== undefined ? currency : currentUser.currency || "USD";
    const updatedTheme =
      theme !== undefined ? theme : currentUser.theme || "light";
    const updatedLanguage =
      language !== undefined ? language : currentUser.language || "en";

    
    const updateSettings = db.prepare(`
      UPDATE users 
      SET currency = ?, 
          theme = ?, 
          language = ?
      WHERE id = ?
    `);

    const result = await updateSettings.run(
      updatedCurrency,
      updatedTheme,
      updatedLanguage,
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

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings: {
        currency: updatedCurrency,
        theme: updatedTheme,
        language: updatedLanguage,
      },
    });
  } catch (error) {
    console.error("Update settings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
