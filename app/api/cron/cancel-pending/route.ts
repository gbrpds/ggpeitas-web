import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  // Proteção: só Vercel Cron ou chamada com o secret correto
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const cutoffPix = new Date(Date.now() - 35 * 60 * 1000);      // 35min para PIX
  const cutoffCard = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h para cartão

  const pixResult = await db.order.updateMany({
    where: { status: 'PENDING', paymentMethod: 'PIX', createdAt: { lt: cutoffPix } },
    data: { status: 'CANCELLED' },
  });

  const cardResult = await db.order.updateMany({
    where: { status: 'PENDING', paymentMethod: 'CREDIT_CARD', createdAt: { lt: cutoffCard } },
    data: { status: 'CANCELLED' },
  });

  console.log(`[CRON] PIX cancelados: ${pixResult.count} | Cartão cancelados: ${cardResult.count}`);
  return NextResponse.json({ pixCancelled: pixResult.count, cardCancelled: cardResult.count });
}
