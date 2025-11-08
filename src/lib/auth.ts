import { passwordRegex } from "@/schema/regex/regex";
import { JWTPayload } from "@/types/auth";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.SECRET_KEY || "golbargegolamgoletoyebaghche";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(
  payload: JWTPayload["data"],
  expiresIn: string = "7d"
): string {
  return jwt.sign({ expiresIn, data: payload }, JWT_SECRET);
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET as Secret) as JWTPayload;
}

export function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!email || email.length > 254) {
    return false;
  }

  if (email.includes("..")) {
    return false;
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domainPart] = parts;

  if (localPart.length === 0 || localPart.length > 64) {
    return false;
  }

  if (domainPart.length === 0 || domainPart.length > 253) {
    return false;
  }

  return emailRegex.test(email);
}

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

export function extractTokenFromHeader(
  authHeader: string | null
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

export function getContentType(request: NextRequest): string | undefined {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return undefined;
  }
  return contentType;
}

export function generateOTP(length: number = 4): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export function isOTPExpired(expiresAt: string): boolean {
  return new Date() > new Date(expiresAt);
}

export function generateOTPExpiration(minutes: number = 5): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return String(now.getTime());
}

export function isOTPVerificationTimeExpired(
  createdAt: string,
  verifiedAt: string | null,
  maxMinutes: number = 10
): boolean {
  if (!verifiedAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);
    return diffMinutes > maxMinutes;
  }

  const created = new Date(createdAt);
  const verified = new Date(verifiedAt);
  const diffMinutes = (verified.getTime() - created.getTime()) / (1000 * 60);
  return diffMinutes > maxMinutes;
}
