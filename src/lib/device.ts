import { NextRequest } from "next/server";

/**
 * Extract device information from request headers and user agent
 * @param request - Next.js request object
 * @returns object - Device information
 */
export function extractDeviceInfo(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  // Get IP address (prioritize real IP over forwarded)
  const ipAddress =
    cfConnectingIp || realIp || forwardedFor?.split(",")[0] || "unknown";

  // Parse user agent for device information
  const deviceInfo = parseUserAgent(userAgent);

  // Generate a unique device ID based on user agent and IP
  const deviceId = generateDeviceId(userAgent, ipAddress);

  return {
    device_id: deviceId,
    device_name: deviceInfo.deviceName,
    device_type: deviceInfo.deviceType,
    operating_system: deviceInfo.os,
    browser: deviceInfo.browser,
    browser_version: deviceInfo.browserVersion,
    user_agent: userAgent,
    ip_address: ipAddress,
    location: null, // Could be enhanced with IP geolocation service
  };
}

/**
 * Parse user agent string to extract device information
 * @param userAgent - User agent string
 * @returns object - Parsed device information
 */
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();

  // Detect operating system
  let os = "Unknown";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad"))
    os = "iOS";

  // Detect device type
  let deviceType = "Desktop";
  if (
    ua.includes("mobile") ||
    ua.includes("android") ||
    ua.includes("iphone")
  ) {
    deviceType = "Mobile";
  } else if (ua.includes("tablet") || ua.includes("ipad")) {
    deviceType = "Tablet";
  }

  // Detect browser
  let browser = "Unknown";
  let browserVersion = "Unknown";

  if (ua.includes("chrome") && !ua.includes("edg")) {
    browser = "Chrome";
    const match = ua.match(/chrome\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("firefox")) {
    browser = "Firefox";
    const match = ua.match(/firefox\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("safari") && !ua.includes("chrome")) {
    browser = "Safari";
    const match = ua.match(/version\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("edg")) {
    browser = "Edge";
    const match = ua.match(/edg\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  }

  // Generate device name
  const deviceName = generateDeviceName(os, deviceType, browser);

  return {
    deviceName,
    deviceType,
    os,
    browser,
    browserVersion,
  };
}

/**
 * Generate a device name based on OS, device type, and browser
 * @param os - Operating system
 * @param deviceType - Device type
 * @param browser - Browser name
 * @returns string - Device name
 */
function generateDeviceName(
  os: string,
  deviceType: string,
  browser: string
): string {
  const deviceTypeFormatted =
    deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
  return `${deviceTypeFormatted} (${os} - ${browser})`;
}

/**
 * Generate a unique device ID based on user agent and IP
 * @param userAgent - User agent string
 * @param ipAddress - IP address
 * @returns string - Unique device ID
 */
function generateDeviceId(userAgent: string, ipAddress: string): string {
  // Create a simple hash of user agent and IP for device identification
  const combined = `${userAgent}-${ipAddress}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `device_${Math.abs(hash).toString(36)}`;
}

/**
 * Get client IP address from request
 * @param request - Next.js request object
 * @returns string - Client IP address
 */
export function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return cfConnectingIp || realIp || forwardedFor?.split(",")[0] || "unknown";
}

/**
 * Check if device is mobile based on user agent
 * @param userAgent - User agent string
 * @returns boolean - True if mobile device
 */
export function isMobileDevice(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return (
    ua.includes("mobile") ||
    ua.includes("android") ||
    ua.includes("iphone") ||
    ua.includes("ipod") ||
    ua.includes("blackberry") ||
    ua.includes("windows phone")
  );
}

/**
 * Check if device is tablet based on user agent
 * @param userAgent - User agent string
 * @returns boolean - True if tablet device
 */
export function isTabletDevice(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return (
    ua.includes("tablet") ||
    ua.includes("ipad") ||
    (ua.includes("android") && !ua.includes("mobile"))
  );
}
