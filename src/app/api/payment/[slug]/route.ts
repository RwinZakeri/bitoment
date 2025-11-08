import db from "@/lib/db";
import { CpgLink, GetPublicCpgLinkResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/payment/[slug]
 * Get a CPG link by link_id (public endpoint, no authentication required)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<GetPublicCpgLinkResponse>> {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Link ID is required",
        },
        { status: 400 }
      );
    }

    // Get the CPG link by link_id (public access, no user_id check)
    const link = (await db
      .prepare("SELECT * FROM cpg_links WHERE link_id = ?")
      .get(slug)) as CpgLink | undefined;

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "CPG link not found",
        },
        { status: 404 }
      );
    }

    // Check if link is active
    if (link.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "CPG link is not active",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "CPG link retrieved successfully",
      link,
    });
  } catch (error) {
    console.error("Get public CPG link error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
