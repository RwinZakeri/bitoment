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


function generateLinkId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `cpg-${timestamp}-${randomStr}`;
}


function generatePaymentUrl(linkId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/payment/${linkId}`;
}


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
      
      const link = (await db
        .prepare("SELECT * FROM cpg_links WHERE link_id = ? AND user_id = ?")
        .get(linkId, userId)) as CpgLink | undefined;

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

    
    const links = (await db
      .prepare(
        "SELECT * FROM cpg_links WHERE user_id = ? ORDER BY created_at DESC"
      )
      .all(userId)) as CpgLink[];

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

    
    const linkId = generateLinkId();
    const url = generatePaymentUrl(linkId);

    
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    await insertLink.run(
      userId,
      linkId,
      validatedData.order_id || null,
      validatedData.price,
      validatedData.currency,
      url,
      validatedData.status || "active"
    );

    
    const createdLink = (await db
      .prepare("SELECT * FROM cpg_links WHERE link_id = ?")
      .get(linkId)) as CpgLink;

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

    
    const link = (await db
      .prepare("SELECT * FROM cpg_links WHERE link_id = ? AND user_id = ?")
      .get(linkId, userId)) as CpgLink | undefined;

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "CPG link not found",
        },
        { status: 404 }
      );
    }

    
    await db
      .prepare("DELETE FROM cpg_links WHERE link_id = ? AND user_id = ?")
      .run(linkId, userId);

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
