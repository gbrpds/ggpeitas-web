import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });
  }
  const { id } = await params;
  const { name, email, phone } = await req.json();

  // Verifica se novo email já existe em outro usuário
  if (email) {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'Este e-mail já está em uso por outro cliente.' }, { status: 409 });
    }
  }

  const updated = await db.user.update({
    where: { id },
    data: { name, email, phone },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  return NextResponse.json(updated);
}
