import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import MercadoPagoConfig, { Payment } from 'mercadopago';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const { orderId, cpf } = await req.json();
  if (!orderId) {
    return NextResponse.json({ error: 'orderId obrigatório.' }, { status: 400 });
  }

  const order = await db.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { items: true, user: true },
  });

  if (!order) {
    return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 });
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_PIX_TOKEN ?? process.env.MP_ACCESS_TOKEN!,
  });

  try {
    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        transaction_amount: order.total / 100,
        description: order.items.map(i => `${i.name} Tam ${i.size}`).join(', '),
        payment_method_id: 'pix',
        payer: {
          email: order.user.email,
          first_name: order.user.name.split(' ')[0],
          last_name: order.user.name.split(' ').slice(1).join(' ') || order.user.name.split(' ')[0],
          identification: {
            type: 'CPF',
            number: cpf,
          },
        },
        date_of_expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min
      },
    });

    const qrCode = result.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 = result.point_of_interaction?.transaction_data?.qr_code_base64;
    const mpPaymentId = String(result.id);

    // Salva o mpPaymentId no pedido
    await db.order.update({
      where: { id: orderId },
      data: { mpPaymentId },
    });

    return NextResponse.json({ qrCode, qrCodeBase64, mpPaymentId, expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() });
  } catch (err: unknown) {
    console.error('Erro PIX MP:', JSON.stringify(err, null, 2));
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: 'Erro ao gerar PIX.', detail: message }, { status: 500 });
  }
}
