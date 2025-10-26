// Authentication related types

// OTP State enum
export enum OTPState {
  EMAIL_SENT = 0, // Email successfully sent
  SENT_AND_USED = 1, // Sent and used
  PASSWORD_RESET = 2, // Password reset
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    fullName?: string;
  };
  token?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    fullName?: string;
  };
  token?: string;
}

export interface User {
  id: number;
  email: string;
  fullName?: string;
  created_at: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

// OTP related types
export interface SendOTPRequest {
  email: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  valid?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
