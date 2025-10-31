import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nextToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Nếu chưa có token => redirect đến /login
  if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Nếu có token => cho vào app
  return NextResponse.next();
}

// Áp dụng cho những path cần bảo vệ
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
