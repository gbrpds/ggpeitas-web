import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: { signIn: '/login' },
  trustHost: true,
  session: { strategy: 'jwt' },
  callbacks: {
    // Mapeia role do JWT token para session.user
    async session({ session, token }) {
      if (token?.role) (session.user as { role?: string }).role = token.role as string;
      if (token?.id) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
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
