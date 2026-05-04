import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('nextToken')?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ['/login', '/register'];

  // ✅ Cho phép /login, /register truy cập mà không bị redirect vòng lặp
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ Nếu có token rồi mà vẫn vào /login hoặc /register => đưa sang /dashboard
  if (token && (publicPaths.includes(pathname) || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ Cho phép hiển thị bình thường
  return NextResponse.next();
}

// Áp dụng proxy cho tất cả path trừ static
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|images).*)'],
};
