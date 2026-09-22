import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "ar"];
const DEFAULT_LOCALE = "en";

// Paths that should not be prefixed with a locale
const NO_LOCALE_PATHS = ["/login", "/signup", "/professionals"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes
  if (pathname.startsWith("/api/")) return NextResponse.next();
  // Skip static files
  if (pathname.startsWith("/_next/")) return NextResponse.next();
  // Skip auth + professionals routes
  if (NO_LOCALE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Already has a locale
  const pathnameHasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Add default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};