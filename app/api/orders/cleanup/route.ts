import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ ok: false }, { status: 401 });

  const cutoff = new Date(Date.now() - 35 * 60 * 1000); // 35min

  await db.order.updateMany({
    where: {
      userId: session.user.id,
      status: 'PENDING',
      paymentMethod: 'PIX',
      createdAt: { lt: cutoff },
    },
    data: { status: 'CANCELLED' },
  });

  return NextResponse.json({ ok: true });
}
