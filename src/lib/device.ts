import { NextRequest } from "next/server";


export function extractDeviceInfo(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  
  const ipAddress =
    cfConnectingIp || realIp || forwardedFor?.split(",")[0] || "unknown";

  
  const deviceInfo = parseUserAgent(userAgent);

  
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
    location: null, 
  };
}


function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();

  
  let os = "Unknown";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad"))
    os = "iOS";

  
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

  
  const deviceName = generateDeviceName(os, deviceType, browser);

  return {
    deviceName,
    deviceType,
    os,
    browser,
    browserVersion,
  };
}


function generateDeviceName(
  os: string,
  deviceType: string,
  browser: string
): string {
  const deviceTypeFormatted =
    deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
  return `${deviceTypeFormatted} (${os} - ${browser})`;
}


function generateDeviceId(userAgent: string, ipAddress: string): string {
  
  const combined = `${userAgent}-${ipAddress}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; 
  }
  return `device_${Math.abs(hash).toString(36)}`;
}


export function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return cfConnectingIp || realIp || forwardedFor?.split(",")[0] || "unknown";
}


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


export function isTabletDevice(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return (
    ua.includes("tablet") ||
    ua.includes("ipad") ||
    (ua.includes("android") && !ua.includes("mobile"))
  );
}
