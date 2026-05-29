import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // /admin — apenas ADMIN
  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
    if (token.role !== 'ADMIN') return NextResponse.redirect(new URL('/', req.url));
  }

  // /conta e /checkout — precisa estar logado
  if (pathname.startsWith('/conta') || pathname.startsWith('/checkout')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/conta/:path*', '/checkout/:path*'],
};
