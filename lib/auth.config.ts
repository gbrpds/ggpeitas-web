import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: { signIn: '/login' },
  trustHost: true,
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string })?.role;
      const path = nextUrl.pathname;

      if (path.startsWith('/admin')) {
        if (!isLoggedIn) return Response.redirect(new URL('/login', nextUrl));
        if (role !== 'ADMIN') return Response.redirect(new URL('/', nextUrl));
        return true;
      }
      if (path.startsWith('/conta') || path.startsWith('/checkout')) {
        if (!isLoggedIn) return Response.redirect(new URL('/login', nextUrl));
        return true;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
