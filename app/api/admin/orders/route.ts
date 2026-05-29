import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') return null;
  return session;
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });

  const orders = await db.order.findMany({
    include: { items: true, address: true, user: { select: { id: true, name: true, email: true, phone: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });

  const { id, status, trackingCode } = await req.json();
  const order = await db.order.update({
    where: { id },
    data: { status, ...(trackingCode !== undefined && { trackingCode }) },
  });
  return NextResponse.json(order);
}
