import { generateToken, getContentType, isValidEmail } from "@/lib/auth";
import db from "@/lib/db";
import {
  GoogleOAuthRequest,
  GoogleOAuthResponse,
  GoogleUserInfo,
} from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

async function getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  if (!accessToken || accessToken.trim().length === 0) {
    throw new Error("Access token is empty or invalid");
  }

  let response: Response;
  let lastError: Error | null = null;

  try {
    response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      try {
        response = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
        );
      } catch (queryError) {
        lastError =
          queryError instanceof Error
            ? queryError
            : new Error(String(queryError));
        throw lastError;
      }
    }
  } catch (fetchError) {
    lastError =
      fetchError instanceof Error ? fetchError : new Error(String(fetchError));

    console.error("Google API fetch error:", {
      message: lastError.message,
      name: lastError.name,
      stack: lastError.stack,
      accessTokenLength: accessToken?.length,
      accessTokenPrefix: accessToken?.substring(0, 10),
    });
    throw new Error(
      `Failed to connect to Google API: ${
        lastError?.message || "Unknown error"
      }. Please check your network connection and try again.`
    );
  }

  if (!response.ok) {
    let errorData: Record<string, unknown> = {};
    try {
      const text = await response.text();
      errorData = text ? JSON.parse(text) : {};
    } catch {}

    console.error("Google API error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    });

    if (response.status === 401) {
      throw new Error("Invalid or expired access token");
    } else if (response.status === 403) {
      throw new Error("Access denied. Token may not have required scopes");
    } else {
      throw new Error(
        `Failed to fetch user info: ${response.status} ${response.statusText}`
      );
    }
  }

  let data: {
    email?: string;
    name?: string;
    given_name?: string;
    picture?: string;
    id?: string;
    sub?: string;
  };
  try {
    data = await response.json();
  } catch (parseError) {
    console.error("Failed to parse Google API response:", parseError);
    throw new Error("Invalid response format from Google API");
  }

  if (!data.email) {
    console.error("Google API response missing email:", data);
    throw new Error("Email not found in Google user info");
  }

  const userId = data.sub || data.id;
  if (!userId) {
    console.error(
      "Google API response missing user ID. Available fields:",
      Object.keys(data)
    );
    throw new Error("User ID not found in Google user info");
  }

  return {
    email: data.email,
    name: data.name || data.given_name || "User",
    picture: data.picture,
    id: userId,
  };
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<GoogleOAuthResponse>> {
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

    const body: GoogleOAuthRequest = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Access token is required",
        },
        { status: 400 }
      );
    }

    let googleUser: GoogleUserInfo;
    try {
      googleUser = await getGoogleUserInfo(accessToken);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Invalid or expired access token";

      console.error("Google user info fetch error:", errorMessage);

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: 401 }
      );
    }

    if (!isValidEmail(googleUser.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address from Google",
        },
        { status: 400 }
      );
    }

    const existingUser = (await db
      .prepare(
        "SELECT id, email, name, password, oauth_provider FROM users WHERE email = ?"
      )
      .get(googleUser.email)) as
      | {
          id: number;
          email: string;
          name?: string;
          password: string | null;
          oauth_provider: string | null;
        }
      | undefined;

    let userId: number;
    let isNewUser = false;

    if (existingUser) {
      userId = existingUser.id;

      if (existingUser.oauth_provider !== "google") {
        const updateOAuth = db.prepare(
          "UPDATE users SET oauth_provider = ?, oauth_id = ?, name = COALESCE(name, ?) WHERE id = ?"
        );
        await updateOAuth.run(
          "google",
          googleUser.id,
          googleUser.name || existingUser.name,
          userId
        );
      } else {
        await db
          .prepare(
            "UPDATE users SET oauth_id = ? WHERE id = ? AND (oauth_id IS NULL OR oauth_id = '')"
          )
          .run(googleUser.id, userId);
      }

      if (googleUser.name && googleUser.name !== existingUser.name) {
        await db
          .prepare("UPDATE users SET name = ? WHERE id = ?")
          .run(googleUser.name, userId);
      }
    } else {
      isNewUser = true;
      const insertUser = db.prepare(`
        INSERT INTO users (email, name, password, oauth_provider, oauth_id, currency, theme, language, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `);

      const result = await insertUser.run(
        googleUser.email,
        googleUser.name,
        null,
        "google",
        googleUser.id,
        "USD",
        "dark",
        "en"
      );
      userId = result.lastInsertRowid as number;

      const insertWallet = db.prepare(`
        INSERT INTO wallets (user_id, balance, currency, created_at, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
      await insertWallet.run(userId, 1000.0, "USD");
    }

    const token = generateToken({
      userId: userId,
      email: googleUser.email,
    });

    const userAgent = request.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    try {
      await db
        .prepare(
          `INSERT INTO login_sessions (user_email, device_name, os, browser, ip) VALUES (?, ?, ?, ?, ?)`
        )
        .run(
          googleUser.email,
          result.device.model || result.device.type || "Unknown Device",
          result.os.name || "Unknown OS",
          result.browser.name || "Unknown Browser",
          ip
        );
    } catch (sessionError) {
      console.error("Error storing login session:", sessionError);
    }

    const user = (await db
      .prepare("SELECT id, email, name FROM users WHERE id = ?")
      .get(userId)) as {
      id: number;
      email: string;
      name?: string;
    };

    return NextResponse.json(
      {
        success: true,
        message: isNewUser
          ? "Account created successfully with Google"
          : "Signed in successfully with Google",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.name || undefined,
        },
        token: token,
        isNewUser: isNewUser,
      },
      { status: isNewUser ? 201 : 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    console.error("Google OAuth error:", {
      message: errorMessage,
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
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
