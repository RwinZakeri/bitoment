import { JWTPayload } from "@/types/auth";
import { NextRequest } from "next/server";
import { extractTokenFromHeader, verifyToken } from "./auth";


export function verifyAuthToken(request: NextRequest): JWTPayload | null {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      return null;
    }

    return verifyToken(token);
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}


export function isAuthenticated(request: NextRequest): boolean {
  return verifyAuthToken(request) !== null;
}


export function getCurrentUserId(request: NextRequest): number | null {
  const payload = verifyAuthToken(request);
  return payload?.data?.userId || null;
}
