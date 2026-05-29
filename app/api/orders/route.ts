import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }
  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: true, address: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }
  try {
    const { items, address, paymentMethod, total } = await req.json();

    // Salva ou reutiliza endereço
    let addressRecord = await db.address.findFirst({
      where: { userId: session.user.id, isDefault: true },
    });
    if (!addressRecord) {
      addressRecord = await db.address.create({
        data: { ...address, userId: session.user.id, isDefault: true },
      });
    }

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        addressId: addressRecord.id,
        paymentMethod,
        total,
        status: 'PENDING',
        items: {
          create: items.map((i: { productId: number; name: string; size: string; price: number; qty: number; image?: string }) => ({
            productId: i.productId,
            name: i.name,
            size: i.size,
            price: i.price,
            qty: i.qty,
            image: i.image,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar pedido.' }, { status: 500 });
  }
}
