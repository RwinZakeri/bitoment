import { passwordRegex } from "@/schema/regex/regex";
import { JWTPayload } from "@/types/auth";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { NextRequest } from "next/server";

// Load environment variables
dotenv.config();

// JWT secret - in production, use environment variable
const JWT_SECRET = process.env.SECRET_KEY || "golbargegolamgoletoyebaghche";

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare a password with its hash
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns Promise<boolean> - True if passwords match
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a JWT token
 * @param payload - Token payload
 * @param expiresIn - Token expiration time (default: 7d)
 * @returns string - JWT token
 */
export function generateToken(
  payload: JWTPayload["data"],
  expiresIn: string = "7d"
): string {
  return jwt.sign({ expiresIn, data: payload }, JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token
 * @returns JWTPayload - Decoded token payload
 */
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET as Secret) as JWTPayload;
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns boolean - True if email is valid
 */
export function isValidEmail(email: string): boolean {
  // More comprehensive email regex that follows RFC 5322 standards
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Additional checks
  if (!email || email.length > 254) {
    return false;
  }

  // Check for consecutive dots
  if (email.includes("..")) {
    return false;
  }

  // Check for valid local and domain parts
  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domainPart] = parts;

  // Local part validation
  if (localPart.length === 0 || localPart.length > 64) {
    return false;
  }

  // Domain part validation
  if (domainPart.length === 0 || domainPart.length > 253) {
    return false;
  }

  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns object - Validation result with isValid and message
 */
export function validatePassword(password: string): {
  isValid: boolean;
  message?: string;
} {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: "Password must be less than 128 characters",
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    };
  }

  return { isValid: true, message: "Password is valid" };
}

/**
 * Extract token from Authorization header
 * @param authHeader - Authorization header value
 * @returns string | null - Extracted token or null
 */
export function extractTokenFromHeader(
  authHeader: string | null
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Get content type from request headers
 * @param request - Next.js request object
 * @returns string | undefined - Content type or undefined if not found
 */
export function getContentType(request: NextRequest): string | undefined {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return undefined;
  }
  return contentType;
}

/**
 * Generate a random OTP
 * @param length - Length of OTP (default: 4)
 * @returns string - Generated OTP
 */
export function generateOTP(length: number = 4): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

/**
 * Check if OTP is expired
 * @param expiresAt - Expiration timestamp
 * @returns boolean - True if expired
 */
export function isOTPExpired(expiresAt: string): boolean {
  return new Date() > new Date(expiresAt);
}

/**
 * Generate expiration time for OTP (default: 5 minutes)
 * @param minutes - Minutes until expiration (default: 5)
 * @returns string - ISO timestamp
 */
export function generateOTPExpiration(minutes: number = 5): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return String(now.getTime());
}

/**
 * Check if OTP verification time has expired (time between state 0 to 1)
 * @param createdAt - When OTP was created (state 0)
 * @param verifiedAt - When OTP was verified (state 1), null if not verified yet
 * @param maxMinutes - Maximum minutes allowed for verification (default: 10)
 * @returns boolean - True if verification time has expired
 */
export function isOTPVerificationTimeExpired(
  createdAt: string,
  verifiedAt: string | null,
  maxMinutes: number = 10
): boolean {
  if (!verifiedAt) {
    // If not verified yet, check if too much time has passed since creation
    const created = new Date(createdAt);
    const now = new Date();
    const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);
    return diffMinutes > maxMinutes;
  }

  // If verified, check if verification happened within the allowed time
  const created = new Date(createdAt);
  const verified = new Date(verifiedAt);
  const diffMinutes = (verified.getTime() - created.getTime()) / (1000 * 60);
  return diffMinutes > maxMinutes;
}
