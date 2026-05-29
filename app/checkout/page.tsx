'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CreditCard, QrCode, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

const fmt = (n: number) => `R$ ${(n / 100).toFixed(2).replace('.', ',')}`;

const fmtCpf = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          .replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
          .replace(/(\d{3})(\d{3})/, '$1.$2')
          .replace(/(\d{3})/, '$1');
};

type PayMethod = 'PIX' | 'CREDIT_CARD';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [pay, setPay] = useState<PayMethod>('PIX');
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState({
    cep: '', street: '', number: '', complement: '', district: '', city: '', state: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?redirect=/checkout');
  }, [status, router]);

  const fetchCep = async () => {
    const cep = address.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      setAddress((a) => ({ ...a, street: data.logradouro, district: data.bairro, city: data.localidade, state: data.uf }));
    }
  };

  const placeOrder = async () => {
    if (pay === 'PIX' && cpf.replace(/\D/g, '').length !== 11) {
      alert('Informe um CPF válido para pagamento via PIX.');
      return;
    }
    setLoading(true);

    // 1. Salva o pedido
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map((i) => ({
          productId: i.id,
          name: `${i.name} ${i.label}`,
          size: i.size,
          price: pay === 'PIX' ? Math.round(i.priceNum * 0.9) : i.priceNum,
          qty: i.qty,
          image: i.images?.[0] ?? null,
        })),
        address,
        paymentMethod: pay,
        total: pay === 'PIX' ? Math.round(cartTotal() * 0.9) : cartTotal(),
      }),
    });
    const data = await res.json();
    if (!res.ok) { setLoading(false); return; }

    clearCart();

    // 2. PIX → Payment API → QR Code na página
    if (pay === 'PIX') {
      const pixRes = await fetch('/api/checkout/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.id, cpf: cpf.replace(/\D/g, '') }),
      });
      const pixData = await pixRes.json();
      setLoading(false);
      if (pixRes.ok) {
        router.push(`/checkout/pix?orderId=${data.id}`);
      } else {
        alert('Erro ao gerar PIX: ' + (pixData.detail ?? pixData.error));
      }
      return;
    }

    // 3. Cartão → Checkout Pro do MP
    try {
      const mpRes = await fetch('/api/checkout/mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.id, paymentMethod: pay }),
      });
      const mpData = await mpRes.json();
      setLoading(false);
      if (mpRes.ok && mpData.initPoint) {
        window.location.href = mpData.initPoint;
      } else {
        alert('Erro ao conectar com Mercado Pago. Tente novamente.');
      }
    } catch {
      setLoading(false);
      alert('Erro ao conectar com Mercado Pago. Tente novamente.');
    }
  };

  if (status === 'loading') return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px]">
      <div className="text-white/40">Carregando...</div>
    </div>
  );

  const subtotal = cartTotal();
  const total = pay === 'PIX' ? Math.round(subtotal * 0.9) : subtotal;

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16">
      <div className="max-w-[1100px] mx-auto px-[5%] py-10">
        <div className="mb-8">
          <p className="text-[10px] tracking-[3px] uppercase text-[#008C3A] mb-2 flex items-center gap-2">
            <Lock size={12} /> Compra Segura
          </p>
          <h1 className="font-display text-[40px] tracking-[2px]">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="flex flex-col gap-6">

            {/* ENDEREÇO */}
            <div className={`bg-[#111] border rounded-lg p-6 transition-all ${step === 'address' ? 'border-[rgba(245,196,0,0.3)]' : 'border-white/[0.07]'}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-full bg-[#F5C400] text-black flex items-center justify-center text-[13px] font-bold">1</div>
                <h2 className="font-display text-[22px] tracking-[1px] flex items-center gap-2"><MapPin size={18} /> Endereço de entrega</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-1">
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">CEP *</label>
                  <input value={address.cep} onChange={(e) => setAddress({ ...address, cep: e.target.value })} onBlur={fetchCep}
                    placeholder="00000-000" maxLength={9}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">Rua *</label>
                  <input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="Rua das Flores"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">Número *</label>
                  <input value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} placeholder="123"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">Complemento</label>
                  <input value={address.complement} onChange={(e) => setAddress({ ...address, complement: e.target.value })} placeholder="Apto 12"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">Bairro *</label>
                  <input value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} placeholder="Centro"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">Cidade *</label>
                  <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="São Paulo"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1 block">Estado *</label>
                  <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="SP" maxLength={2}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors uppercase" />
                </div>
              </div>
              <button
                onClick={() => {
                  const { cep, street, number, district, city, state } = address;
                  if (!cep || !street || !number || !district || !city || !state) return;
                  setStep('payment');
                }}
                className="mt-5 flex items-center gap-2 bg-[#F5C400] text-black px-6 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors"
              >
                CONTINUAR <ChevronRight size={18} />
              </button>
            </div>

            {/* PAGAMENTO */}
            {step === 'payment' && (
              <div className="bg-[#111] border border-[rgba(245,196,0,0.3)] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-[#F5C400] text-black flex items-center justify-center text-[13px] font-bold">2</div>
                  <h2 className="font-display text-[22px] tracking-[1px]">Forma de pagamento</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {(['PIX', 'CREDIT_CARD'] as PayMethod[]).map((m) => (
                    <button key={m} onClick={() => setPay(m)}
                      className={`flex flex-col items-center gap-2 p-4 border rounded-lg transition-all ${pay === m ? 'border-[#F5C400] bg-[rgba(245,196,0,0.06)]' : 'border-white/10 hover:border-white/30'}`}>
                      {m === 'PIX' ? <QrCode size={24} className="text-[#008C3A]" /> : <CreditCard size={24} className="text-[#F5C400]" />}
                      <span className="font-bold text-[13px]">{m === 'PIX' ? 'PIX' : 'Cartão de Crédito'}</span>
                      {m === 'PIX' && <span className="text-[11px] text-[#008C3A]">10% de desconto</span>}
                      {m === 'CREDIT_CARD' && <span className="text-[11px] text-white/40">até 12x</span>}
                    </button>
                  ))}
                </div>


                {/* Info cartão */}
                {pay === 'CREDIT_CARD' && (
                  <div className="bg-[rgba(245,196,0,0.06)] border border-[rgba(245,196,0,0.2)] rounded-sm p-4 mb-5 text-[13px] text-white/60">
                    <p className="font-bold text-[#F5C400] mb-1">Pagamento via Mercado Pago</p>
                    <p>Você será redirecionado para o ambiente seguro do Mercado Pago para inserir os dados do cartão e escolher o parcelamento (até 12x).</p>
                  </div>
                )}

                {/* CPF para PIX */}
                {pay === 'PIX' && (
                  <div className="mb-5">
                    <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">CPF do pagador *</label>
                    <input
                      value={cpf}
                      onChange={(e) => setCpf(fmtCpf(e.target.value))}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:border-[#008C3A] focus:outline-none transition-colors font-mono"
                    />
                    <p className="text-[11px] text-white/30 mt-1">Necessário para gerar o QR Code PIX</p>
                  </div>
                )}

                {/* Info PIX */}
                {pay === 'PIX' && (
                  <div className="bg-[rgba(0,140,58,0.08)] border border-[rgba(0,140,58,0.2)] rounded-sm p-4 mb-5 text-[13px] text-white/60">
                    <p className="font-bold text-[#008C3A] mb-1">QR Code gerado na próxima tela</p>
                    <p>Após confirmar, o QR Code PIX aparece direto aqui no site. Pague pelo app do seu banco — o pedido é confirmado automaticamente.</p>
                  </div>
                )}

                <button onClick={placeOrder} disabled={loading}
                  className="w-full bg-[#008C3A] text-white py-4 font-display text-[22px] tracking-[2px] rounded-sm hover:bg-[#006B2D] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  <Lock size={18} />
                  {loading ? 'PROCESSANDO...' : pay === 'PIX'
                    ? `GERAR PIX · ${fmt(total)}`
                    : `PAGAR COM MERCADO PAGO · ${fmt(subtotal)}`}
                </button>
                <p className="text-center text-[10px] text-white/25 mt-3 uppercase tracking-wider">🔒 Pagamento 100% seguro</p>
              </div>
            )}
          </div>

          {/* RESUMO */}
          <div className="lg:sticky lg:top-[88px] h-fit bg-[#111] border border-white/[0.07] rounded-lg p-6">
            <h3 className="font-display text-[20px] tracking-[1px] mb-5 pb-4 border-b border-white/[0.07]">RESUMO DO PEDIDO</h3>
            <div className="flex flex-col gap-4 mb-5">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3">
                  <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0 relative" style={{ background: item.bg }}>
                    {item.images?.[0] ? (
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">{item.icon}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold leading-tight">{item.name} {item.label}</p>
                    <p className="text-[11px] text-white/40">Tam {item.size} · Qtd {item.qty}</p>
                    <p className="text-[13px] text-[#F5C400] font-bold">{fmt(item.priceNum * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.07] pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-[13px] text-white/50">
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/50">Frete</span>
                <span className="text-[#008C3A] font-semibold">GRÁTIS</span>
              </div>
              {pay === 'PIX' && step === 'payment' && (
                <div className="flex justify-between text-[13px] text-[#008C3A]">
                  <span>Desconto PIX (10%)</span>
                  <span>-{fmt(Math.round(subtotal * 0.1))}</span>
                </div>
              )}
              <div className="flex justify-between font-display text-[22px] text-[#F5C400] border-t border-[rgba(245,196,0,0.15)] pt-3 mt-1">
                <span>TOTAL</span>
                <span>{fmt(pay === 'PIX' && step === 'payment' ? total : subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
