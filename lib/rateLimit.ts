/**
 * Rate limiter simples em memória.
 * Em Vercel serverless cada instância tem memória própria,
 * mas ainda assim bloqueia rajadas na mesma instância.
 * Para produção de alto tráfego, substituir por Upstash Redis.
 */

const store = new Map<string, { count: number; reset: number }>();

// Limpeza periódica de entradas antigas
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.reset) store.delete(key);
    }
  }, 60_000);
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  entry.count++;
  if (entry.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}
