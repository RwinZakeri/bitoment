// Authentication related types

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
