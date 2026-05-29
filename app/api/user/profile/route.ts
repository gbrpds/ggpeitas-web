import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }
  const { name, phone } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: 'O nome não pode ser vazio.' }, { status: 400 });
  }
  const updated = await db.user.update({
    where: { id: session.user.id },
    data: { name: name.trim(), phone: phone ?? null },
    select: { name: true, phone: true },
  });
  return NextResponse.json(updated);
}
