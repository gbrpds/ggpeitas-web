import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  // Proteção: só Vercel Cron ou chamada com o secret correto
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h atrás

  const result = await db.order.updateMany({
    where: {
      status: 'PENDING',
      createdAt: { lt: cutoff },
    },
    data: { status: 'CANCELLED' },
  });

  console.log(`[CRON] ${result.count} pedidos pendentes cancelados.`);
  return NextResponse.json({ cancelled: result.count });
}
