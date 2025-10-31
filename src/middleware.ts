import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("nextToken")?.value;
  const token = true;
  const pathname = request.nextUrl.pathname;

  // ✅ Cho phép /login truy cập mà không bị redirect vòng lặp
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Nếu có token rồi mà vẫn vào /login => đưa sang /dashboard
  if (token && (pathname === "/login" || pathname === '/')) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Cho phép hiển thị bình thường
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả path trừ static
export const config = {
  matcher:  ['/((?!api|_next/static|favicon.ico|images).*)',],
};
