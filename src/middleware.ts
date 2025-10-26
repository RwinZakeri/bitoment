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

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
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
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)",
  ],
};
