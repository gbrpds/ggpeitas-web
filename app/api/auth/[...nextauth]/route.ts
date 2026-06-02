import { handlers } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';
import { NextRequest } from 'next/server';

const { GET, POST: originalPOST } = handlers;

// Rate limiting no login: 10 tentativas por 15 min por IP
export { GET };

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const url = req.nextUrl.pathname;

  // Aplica limite apenas na rota de sign-in (não em outras rotas NextAuth como sign-out)
  if (url.includes('/callback/credentials')) {
    const rl = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
    if (!rl.ok) {
      return new Response(
        JSON.stringify({ error: 'Muitas tentativas de login. Tente novamente mais tarde.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return originalPOST(req);
}
