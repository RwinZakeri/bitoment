import { JWTPayload } from "@/types/auth";
import { NextRequest } from "next/server";
import { extractTokenFromHeader, verifyToken } from "./auth";

/**
 * Middleware to verify JWT token from Authorization header
 * @param request - Next.js request object
 * @returns JWTPayload | null - Decoded token payload or null if invalid
 */
export function verifyAuthToken(request: NextRequest): JWTPayload | null {
  try {
    const authHeader = request.headers.get("authorization");
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

/**
 * Check if the current user is authenticated
 * @param request - Next.js request object
 * @returns boolean - True if user is authenticated
 */
export function isAuthenticated(request: NextRequest): boolean {
  return verifyAuthToken(request) !== null;
}

/**
 * Get current user ID from token
 * @param request - Next.js request object
 * @returns number | null - User ID or null if not authenticated
 */
export function getCurrentUserId(request: NextRequest): number | null {
  const payload = verifyAuthToken(request);
  return payload?.userId || null;
}
