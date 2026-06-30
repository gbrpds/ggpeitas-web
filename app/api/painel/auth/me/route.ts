import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminSession';

export async function GET() {
  const session = await getAdminSession();

  if (!session.loggedIn) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  await session.save();

  return NextResponse.json({ loggedIn: true, nome: session.nome });
}
