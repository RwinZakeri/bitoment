import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { DeviceInfo, GetDevicesResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/profile/devices/active
 * Get only active devices (currently logged in) for the authenticated user
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<GetDevicesResponse>> {
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

    const activeDevices = db
      .prepare(
        `
        SELECT id, user_id, device_id, device_name, device_type, 
               operating_system, browser, browser_version, user_agent,
               ip_address, location, is_active, last_seen, created_at
        FROM user_devices 
        WHERE user_id = ? 
        AND is_active = TRUE
        ORDER BY last_seen DESC
        `
      )
      .all(tokenPayload.data.userId) as DeviceInfo[];

    return NextResponse.json({
      success: true,
      message: "Active devices retrieved successfully",
      devices: activeDevices,
    });
  } catch (error) {
    console.error("Get active devices error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
