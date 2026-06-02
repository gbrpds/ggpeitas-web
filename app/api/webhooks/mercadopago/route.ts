import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { createHmac } from 'crypto';

/**
 * Verifica a assinatura do webhook do Mercado Pago.
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 *
 * O MP envia o header x-signature com formato:
 *   ts=<timestamp>,v1=<hmac_sha256>
 *
 * O conteúdo assinado é: "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
 */
function verifyMPSignature(req: NextRequest, body: { data?: { id?: string } }): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true; // Se não configurado, ignora (desenvolvimento)

  const signature = req.headers.get('x-signature');
  const requestId = req.headers.get('x-request-id') ?? '';

  if (!signature) return false;

  // Extrai ts e v1 do header
  const parts = Object.fromEntries(
    signature.split(',').map((p) => p.split('=') as [string, string])
  );
  const { ts, v1 } = parts;
  if (!ts || !v1) return false;

  const dataId = body?.data?.id ?? '';
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

  const expected = createHmac('sha256', secret).update(manifest).digest('hex');

  // Comparação segura (evita timing attacks)
  if (expected.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Verifica assinatura do webhook
    if (!verifyMPSignature(req, body)) {
      console.warn('Webhook MP: assinatura inválida');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // MP envia type: "payment" para pagamentos
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
    } else if (status === 'rejected' || status === 'cancelled') {
      await db.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } });
    }
    // pending / in_process: mantém PENDING

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook MP erro:', err);
    return NextResponse.json({ ok: true }); // sempre 200 para o MP não retentar em loop
  }
}
