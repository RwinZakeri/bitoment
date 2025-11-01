import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/welcome",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/check-email",
  "/plans",
];

const PROTECTED_ROUTES = ["/dashboard", "/wallet", "/profile", "/swap", "/cpg"];

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("token")?.value;
  return !!token;
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith("/auth/");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS for API routes - accept all origins
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    // Get the origin from the request, or use * for all origins
    const origin = request.headers.get("origin") || "*";
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Custom-Header"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js"
  ) {
    return NextResponse.next();
  }

  const authenticated = isAuthenticated(request);
  const isPublic = isPublicRoute(pathname);
  const isProtected = isProtectedRoute(pathname);
  const isAuth = isAuthRoute(pathname);

  if (pathname === "/") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }
  }

  if (authenticated && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (authenticated && pathname === "/welcome") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authenticated && isProtected) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  if (!authenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  if (isPublic || pathname === "/plans") {
    return NextResponse.next();
  }

  if (authenticated) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/welcome", request.url));
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)",
  ],
};
