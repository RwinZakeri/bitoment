import db from "@/lib/db";
import { verifyAuthToken } from "@/lib/middleware";
import { DeviceInfo, GetDevicesResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";


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

    const desktopDevices = (await db
      .prepare(
        `
        SELECT id, user_id, device_id, device_name, device_type, 
               operating_system, browser, browser_version, user_agent,
               ip_address, location, is_active, last_seen, created_at
        FROM user_devices 
        WHERE user_id = ? 
        AND device_type = 'Desktop'
        ORDER BY last_seen DESC
        `
      )
      .all(tokenPayload.data.userId)) as DeviceInfo[];

    return NextResponse.json({
      success: true,
      message: "Desktop devices retrieved successfully",
      devices: desktopDevices,
    });
  } catch (error) {
    console.error("Get desktop devices error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
