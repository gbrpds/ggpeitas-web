'use client';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, CheckCircle, Clock, Loader2, XCircle } from 'lucide-react';

function PixContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get('orderId') ?? '';

  const [qrCode, setQrCode] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'expired'>('pending');

  // Gera o QR Code
  useEffect(() => {
    if (!orderId) return;
    fetch('/api/checkout/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); setLoading(false); return; }
        setQrCode(data.qrCode);
        setQrCodeBase64(data.qrCodeBase64);
        setExpiresAt(new Date(data.expiresAt));
        setLoading(false);
      })
      .catch(() => { setError('Erro ao gerar QR Code.'); setLoading(false); });
  }, [orderId]);

  // Timer de expiração
  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const diff = expiresAt.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('00:00');
        setPaymentStatus('expired');
        clearInterval(interval);
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  // Polling de status
  const checkStatus = useCallback(async () => {
    if (!orderId || paymentStatus !== 'pending') return;
    const res = await fetch(`/api/orders/${orderId}/status`);
    const data = await res.json();
    if (data.status === 'CONFIRMED') {
      setPaymentStatus('confirmed');
      setTimeout(() => router.push(`/checkout/sucesso?orderId=${orderId}`), 1500);
    }
  }, [orderId, paymentStatus, router]);

  useEffect(() => {
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  const copyCode = () => {
    navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px]">
      <div className="flex flex-col items-center gap-4 text-white/40">
        <Loader2 size={40} className="animate-spin" />
        <p className="text-[14px]">Gerando QR Code PIX...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px] px-[5%]">
      <div className="text-center max-w-[400px]">
        <XCircle size={56} className="text-red-400 mx-auto mb-4" />
        <p className="text-[18px] font-bold mb-2">Erro ao gerar PIX</p>
        <p className="text-white/40 text-[13px] mb-6">{error}</p>
        <Link href="/checkout" className="bg-[#F5C400] text-black px-8 py-3 font-display text-[16px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors">
          VOLTAR AO CHECKOUT
        </Link>
      </div>
    </div>
  );

  if (paymentStatus === 'confirmed') return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px]">
      <div className="text-center">
        <CheckCircle size={80} className="text-[#008C3A] mx-auto mb-4 animate-bounce" />
        <p className="font-display text-[32px] text-[#008C3A]">PAGAMENTO CONFIRMADO!</p>
        <p className="text-white/40 text-[13px] mt-2">Redirecionando...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16 px-[5%]">
      <div className="max-w-[520px] mx-auto py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,140,58,0.1)] border border-[rgba(0,140,58,0.2)] rounded-full px-4 py-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#008C3A] animate-pulse" />
            <span className="text-[#008C3A] text-[11px] font-bold tracking-[2px] uppercase">Aguardando Pagamento</span>
          </div>
          <h1 className="font-display text-[36px] tracking-[2px] mb-1">PAGUE COM PIX</h1>
          <p className="text-white/40 text-[13px]">Pedido #{orderId.slice(-8).toUpperCase()}</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-lg p-8">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock size={16} className={timeLeft < '05:00' ? 'text-red-400' : 'text-[#F5C400]'} />
            <span className={`font-mono text-[20px] font-bold ${timeLeft < '05:00' ? 'text-red-400' : 'text-[#F5C400]'}`}>
              {timeLeft || '30:00'}
            </span>
            <span className="text-white/30 text-[12px]">para expirar</span>
          </div>

          {/* QR Code */}
          {qrCodeBase64 && (
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-lg">
                <Image
                  src={`data:image/png;base64,${qrCodeBase64}`}
                  alt="QR Code PIX"
                  width={200}
                  height={200}
                  className="block"
                />
              </div>
            </div>
          )}

          <p className="text-center text-[12px] text-white/40 mb-5">
            Escaneie o QR Code acima com o app do seu banco<br />ou use o código abaixo
          </p>

          {/* Copia e Cola */}
          {qrCode && (
            <div className="mb-6">
              <label className="text-[10px] tracking-[2px] uppercase text-white/30 mb-2 block">PIX Copia e Cola</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={qrCode}
                  className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[11px] text-white/60 font-mono truncate"
                />
                <button
                  onClick={copyCode}
                  className={`flex items-center gap-1.5 px-4 py-2.5 font-bold text-[12px] rounded-sm transition-all whitespace-nowrap ${
                    copied
                      ? 'bg-[#008C3A] text-white'
                      : 'bg-[#F5C400] text-black hover:bg-[#D9A300]'
                  }`}
                >
                  {copied ? <><CheckCircle size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}
                </button>
              </div>
            </div>
          )}

          {/* Instruções */}
          <div className="bg-[rgba(0,140,58,0.06)] border border-[rgba(0,140,58,0.15)] rounded-sm p-4 text-[12px] text-white/50 leading-relaxed">
            <p className="font-bold text-[#008C3A] mb-2">Como pagar:</p>
            <ol className="list-decimal list-inside flex flex-col gap-1">
              <li>Abra o app do seu banco</li>
              <li>Acesse a área PIX → <strong className="text-white/70">Pagar</strong></li>
              <li>Escaneie o QR Code ou cole o código</li>
              <li>Confirme o pagamento</li>
              <li>Esta página atualiza automaticamente ✓</li>
            </ol>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-4">
          Após o pagamento, aguarde alguns segundos para a confirmação automática.
        </p>
      </div>
    </div>
  );
}

export default function PixPage() {
  return (
    <Suspense>
      <PixContent />
    </Suspense>
  );
}
