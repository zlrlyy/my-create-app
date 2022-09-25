import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authRoute, isNoLoginPage } from '@/utils/authRoute';

// Middleware usage see https://nextjs.org/docs/advanced-features/middleware

export function middleware(req: NextRequest) {
  const {
    nextUrl: { pathname },
    cookies,
  } = req;

  const YD_ADVERTISE_PLATFORM_USER_STR =
    cookies.get('YD_ADVERTISE_PLATFORM_USER') ?? ('{}' as any);
  const { role, token } = JSON.parse(YD_ADVERTISE_PLATFORM_USER_STR);

  const isNoLogin = isNoLoginPage(pathname);

  if (isNoLogin) return;

  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 查看默认重定向页面
  if (pathname === '/') {
    // url.pathname = roleDefaultPage[role] ?? '/login';
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 查看是否有权限访问路径
  const { isAuthRoute } = authRoute(role, pathname);

  if (!isAuthRoute) {
    url.pathname = '/403';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/((?!static|api|_next).*)',
};
