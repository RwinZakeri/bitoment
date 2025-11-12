import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_ROUTES = [
  "/welcome",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/check-email",
  "/plans",
  "/payment",
];

const PROTECTED_ROUTES = ["/dashboard", "/wallet", "/profile", "/swap", "/cpg"];

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("token")?.value;
  return !!token;
}

function removeLocale(pathname: string): string {
  const localePattern = /^\/(en|ar)(\/|$)/;
  const match = pathname.match(localePattern);
  if (match) {
    return pathname.replace(`/${match[1]}`, "") || "/";
  }
  return pathname;
}

// Note: isPublicRoute is kept for potential future use but not currently used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPublicRoute(_pathname: string): boolean {
  const pathWithoutLocale = removeLocale(_pathname);
  return PUBLIC_ROUTES.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/")
  );
}

function isProtectedRoute(pathname: string): boolean {
  const pathWithoutLocale = removeLocale(pathname);
  return PROTECTED_ROUTES.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/")
  );
}

function isAuthRoute(pathname: string): boolean {
  const pathWithoutLocale = removeLocale(pathname);
  return pathWithoutLocale.startsWith("/auth/");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle API routes
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

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

    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  // Skip middleware for static files
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

  // First, apply intl middleware to handle locale routing
  const response = intlMiddleware(request);

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  // Get the pathname after locale is applied
  let pathWithoutLocale = pathname;
  if (localeMatch) {
    pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  }

  // Handle authentication and routing logic
  const authenticated = isAuthenticated(request);
  const isProtected = isProtectedRoute(pathname);
  const isAuth = isAuthRoute(pathname);

  // Handle root path redirect
  if (pathWithoutLocale === "/" || pathname === "/") {
    if (authenticated) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      );
    } else {
      return NextResponse.redirect(new URL(`/${locale}/welcome`, request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (authenticated && isAuth) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Redirect authenticated users away from welcome page
  if (authenticated && pathWithoutLocale === "/welcome") {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!authenticated && isProtected) {
    return NextResponse.redirect(new URL(`/${locale}/welcome`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)",
  ],
};
