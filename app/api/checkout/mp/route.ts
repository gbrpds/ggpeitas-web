import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import MercadoPagoConfig, { Preference } from 'mercadopago';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const { orderId, paymentMethod } = await req.json();
  if (!orderId) {
    return NextResponse.json({ error: 'orderId obrigatório.' }, { status: 400 });
  }

  // Busca o pedido com itens
  const order = await db.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { items: true, user: true },
  });

  if (!order) {
    return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 });
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  });

  const preference = new Preference(client);

  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';

  try {
    console.log('Order items:', JSON.stringify(order.items));
    const result = await preference.create({
      body: {
        external_reference: order.id,
        items: order.items.map((item) => ({
          id: item.id,
          title: `${item.name} - Tam ${item.size}`,
          quantity: Number(item.qty),
          unit_price: parseFloat((item.price / 100).toFixed(2)),
          currency_id: 'BRL',
          category_id: 'fashion',
        })),
        payer: {
          email: order.user.email,
          name: order.user.name,
        },
        payment_methods: {
          installments: 12,
          excluded_payment_types: [{ id: 'ticket' }], // remove boleto, mantém PIX + cartão
        },
        back_urls: {
          success: `${baseUrl}/checkout/sucesso?orderId=${order.id}`,
          failure: `${baseUrl}/checkout/falha?orderId=${order.id}`,
          pending: `${baseUrl}/checkout/pendente?orderId=${order.id}`,
        },
        // auto_return só funciona com domínio real (não localhost)
        ...(baseUrl.startsWith('https') ? { auto_return: 'approved' as const } : {}),
        // webhook só funciona em produção
        ...(baseUrl.startsWith('https') ? { notification_url: `${baseUrl}/api/webhooks/mercadopago` } : {}),
        statement_descriptor: 'GG PEITAS',
      },
    });

    return NextResponse.json({ initPoint: result.init_point, sandboxInitPoint: result.sandbox_init_point });
  } catch (err: unknown) {
    console.error('Erro MP preference completo:', JSON.stringify(err, null, 2));
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: 'Erro ao criar preferência no Mercado Pago.', detail: message }, { status: 500 });
  }
}
