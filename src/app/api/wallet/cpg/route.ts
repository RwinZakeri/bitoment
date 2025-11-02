import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { createCpgLinkSchema } from "@/schema/wallet/cpgSchema";
import {
  CpgLink,
  CreateCpgLinkRequest,
  CreateCpgLinkResponse,
  DeleteCpgLinkResponse,
  GetCpgLinksResponse,
} from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Generate a unique link ID
 */
function generateLinkId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `cpg-${timestamp}-${randomStr}`;
}

/**
 * Generate a payment link URL
 */
function generatePaymentUrl(linkId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/payment/${linkId}`;
}

/**
 * GET /api/wallet/cpg
 * Get all CPG links for the authenticated user
 * Query params: link_id (optional) - to get a specific link
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<GetCpgLinksResponse>> {
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

    const userId = tokenPayload.data.userId;
    const { searchParams } = new URL(request.url);
    const linkId = searchParams.get("link_id");

    if (linkId) {
      // Get specific link
      const link = db
        .prepare("SELECT * FROM cpg_links WHERE link_id = ? AND user_id = ?")
        .get(linkId, userId) as CpgLink | undefined;

      if (!link) {
        return NextResponse.json(
          {
            success: false,
            message: "CPG link not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "CPG link retrieved successfully",
        links: [link],
      });
    }

    // Get all links for user
    const links = db
      .prepare(
        "SELECT * FROM cpg_links WHERE user_id = ? ORDER BY created_at DESC"
      )
      .all(userId) as CpgLink[];

    return NextResponse.json({
      success: true,
      message: "CPG links retrieved successfully",
      links,
    });
  } catch (error) {
    console.error("Get CPG links error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wallet/cpg
 * Create a new CPG link
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateCpgLinkResponse>> {
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

    let body: CreateCpgLinkRequest;
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

    // Validate request body
    const validationResult = createCpgLinkSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: validationResult.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    const userId = tokenPayload.data.userId;

    // Generate unique link ID and URL
    const linkId = generateLinkId();
    const url = generatePaymentUrl(linkId);

    // Insert new CPG link
    const insertLink = db.prepare(`
      INSERT INTO cpg_links (
        user_id,
        link_id,
        order_id,
        price,
        currency,
        url,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    insertLink.run(
      userId,
      linkId,
      validatedData.order_id || null,
      validatedData.price,
      validatedData.currency,
      url,
      validatedData.status || "active"
    );

    // Get the created link
    const createdLink = db
      .prepare("SELECT * FROM cpg_links WHERE link_id = ?")
      .get(linkId) as CpgLink;

    return NextResponse.json(
      {
        success: true,
        message: "CPG link created successfully",
        link: createdLink,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create CPG link error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wallet/cpg
 * Delete a CPG link by link_id
 */
export async function DELETE(
  request: NextRequest
): Promise<NextResponse<DeleteCpgLinkResponse>> {
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

    const { searchParams } = new URL(request.url);
    const linkId = searchParams.get("link_id");

    if (!linkId) {
      return NextResponse.json(
        {
          success: false,
          message: "link_id is required",
        },
        { status: 400 }
      );
    }

    const userId = tokenPayload.data.userId;

    // Check if link exists and belongs to user
    const link = db
      .prepare("SELECT * FROM cpg_links WHERE link_id = ? AND user_id = ?")
      .get(linkId, userId) as CpgLink | undefined;

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "CPG link not found",
        },
        { status: 404 }
      );
    }

    // Delete the link
    db.prepare("DELETE FROM cpg_links WHERE link_id = ? AND user_id = ?").run(
      linkId,
      userId
    );

    return NextResponse.json(
      {
        success: true,
        message: "CPG link deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete CPG link error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
