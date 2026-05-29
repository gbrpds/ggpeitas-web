import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import MercadoPagoConfig, { Payment } from 'mercadopago';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // MP envia type: "payment" para pagamentos aprovados
    if (body.type !== 'payment' || !body.data?.id) {
      return NextResponse.json({ ok: true });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });

    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: body.data.id });

    const mpPaymentId = String(payment.id);
    const externalRef = payment.external_reference; // usado pelo Checkout Pro (cartão)
    const status = payment.status;

    // Tenta achar pelo mpPaymentId (PIX) ou external_reference (cartão/Checkout Pro)
    let order = await db.order.findFirst({ where: { mpPaymentId } });
    if (!order && externalRef) {
      order = await db.order.findFirst({ where: { id: externalRef } });
    }
    if (!order) return NextResponse.json({ ok: true });

    if (status === 'approved') {
      await db.order.update({ where: { id: order.id }, data: { status: 'CONFIRMED' } });
    } else if (status === 'rejected') {
      await db.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } });
    }
    // pending / in_process: mantém PENDING

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook MP erro:', err);
    return NextResponse.json({ ok: true }); // sempre 200 para o MP não retentar em loop
  }
}
