import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { products } from '@/lib/products';
import { rateLimit } from '@/lib/rateLimit';

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

  // Rate limit: máx 10 pedidos por hora por usuário
  const rl = rateLimit(`orders:${session.user.id}`, 10, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Muitas tentativas. Tente novamente em ${rl.retryAfter}s.` },
      { status: 429 }
    );
  }

  try {
    const { items, address, paymentMethod } = await req.json();

    // Validação básica
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 });
    }
    if (!address || !paymentMethod) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }
    if (!['PIX', 'CREDIT_CARD'].includes(paymentMethod)) {
      return NextResponse.json({ error: 'Método de pagamento inválido.' }, { status: 400 });
    }

    // ✅ Validação de preços server-side — cliente não dita o preço
    type OrderItem = {
      productId: number;
      name: string;
      size: string;
      qty: number;
      image?: string | null;
    };

    const validatedItems = items.map((item: OrderItem) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Produto inválido: ${item.productId}`);
      }
      if (!item.size || typeof item.qty !== 'number' || item.qty < 1 || item.qty > 5) {
        throw new Error(`Dados inválidos para o produto ${product.name}`);
      }

      // Preço calculado pelo servidor com base no método de pagamento
      const unitPrice = paymentMethod === 'PIX'
        ? Math.round(product.priceNum * 0.9)  // 10% desconto PIX
        : product.priceNum;

      return {
        productId: item.productId,
        name: `${product.name} ${product.label}`.trim(),
        size: item.size,
        price: unitPrice,
        qty: item.qty,
        image: item.image ?? product.images?.[0] ?? null,
      };
    });

    const serverTotal = validatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Validação de endereço (campos obrigatórios)
    const { cep, street, number, district, city, state } = address;
    if (!cep || !street || !number || !district || !city || !state) {
      return NextResponse.json({ error: 'Endereço incompleto.' }, { status: 400 });
    }

    // Salva ou reutiliza endereço
    let addressRecord = await db.address.findFirst({
      where: { userId: session.user.id, isDefault: true },
    });
    if (!addressRecord) {
      addressRecord = await db.address.create({
        data: { ...address, userId: session.user.id, isDefault: true },
      });
    } else {
      // Atualiza endereço se mudou
      addressRecord = await db.address.update({
        where: { id: addressRecord.id },
        data: { ...address },
      });
    }

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        addressId: addressRecord.id,
        paymentMethod,
        total: serverTotal,
        status: 'PENDING',
        items: {
          create: validatedItems,
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro ao criar pedido.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
