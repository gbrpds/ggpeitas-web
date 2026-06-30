import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/adminSession';

export async function POST(req: NextRequest) {
  const { usuario, senha } = await req.json();

  if (!usuario || !senha) {
    return NextResponse.json({ erro: 'Preencha todos os campos.' }, { status: 400 });
  }

  const rows = await sql`SELECT id, nome, senha_hash FROM usuarios WHERE usuario = ${usuario} LIMIT 1`;
  const user = rows[0] as { id: number; nome: string; senha_hash: string } | undefined;

  if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
    return NextResponse.json({ erro: 'Usuário ou senha incorretos.' }, { status: 401 });
  }

  const session = await getAdminSession();
  session.userId = user.id;
  session.nome = user.nome;
  session.loggedIn = true;
  await session.save();

  return NextResponse.json({ nome: user.nome });
}
