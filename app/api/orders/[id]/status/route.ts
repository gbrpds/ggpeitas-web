import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }
  const { id } = await params;
  const order = await db.order.findUnique({
    where: { id, userId: session.user.id },
    select: { status: true },
  });
  if (!order) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
  return NextResponse.json({ status: order.status });
}
