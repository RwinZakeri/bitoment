import { NextResponse } from "next/server";

/**
 * Test endpoint to demonstrate API usage
 * This endpoint shows how to test the authentication APIs
 */
export async function GET() {
  const testExamples = {
    signup: {
      url: "/api/auth/signup",
      method: "POST",
      body: {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      },
      expectedResponse: {
        success: true,
        message: "User created successfully",
        user: {
          id: 1,
          email: "test@example.com",
          name: "Test User",
        },
        token: "jwt_token_here",
      },
    },
    signin: {
      url: "/api/auth/signin",
      method: "POST",
      body: {
        email: "test@example.com",
        password: "password123",
      },
      expectedResponse: {
        success: true,
        message: "Sign in successful",
        user: {
          id: 1,
          email: "test@example.com",
          name: "Test User",
        },
        token: "jwt_token_here",
      },
    },
    profile: {
      url: "/api/user/profile",
      method: "GET",
      headers: {
        Authorization: "Bearer jwt_token_here",
      },
      expectedResponse: {
        success: true,
        user: {
          id: 1,
          email: "test@example.com",
          name: "Test User",
          created_at: "2024-01-01 00:00:00",
        },
      },
    },
  };

  return NextResponse.json({
    message: "Authentication API Test Examples",
    endpoints: testExamples,
    instructions: {
      step1: "Start your Next.js development server: npm run dev",
      step2: "Use a tool like Postman, curl, or fetch to test the endpoints",
      step3: "First, create a user with POST /api/auth/signup",
      step4: "Then sign in with POST /api/auth/signin to get a token",
      step5:
        "Use the token in Authorization header for protected routes like GET /api/user/profile",
    },
  });
}
