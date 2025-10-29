import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { DeviceInfo, GetDevicesResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/profile/devices/mobile
 * Get only mobile devices that are currently active for the authenticated user
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

    const mobileDevices = db
      .prepare(
        `
        SELECT id, user_id, device_id, device_name, device_type, 
               operating_system, browser, browser_version, user_agent,
               ip_address, location, is_active, last_seen, created_at
        FROM user_devices 
        WHERE user_id = ? 
        AND device_type = 'Mobile'
        AND is_active = TRUE
        ORDER BY last_seen DESC
        `
      )
      .all(tokenPayload.data.userId) as DeviceInfo[];

    return NextResponse.json({
      success: true,
      message: "Mobile devices retrieved successfully",
      devices: mobileDevices,
    });
  } catch (error) {
    console.error("Get mobile devices error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
