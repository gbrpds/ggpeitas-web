'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function SucessoContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId') ?? '';

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px] px-[5%]">
      <div className="max-w-[560px] w-full text-center py-16">
        <CheckCircle size={80} className="text-[#008C3A] mx-auto mb-6" />
        <h1 className="font-display text-[40px] tracking-[2px] mb-3">PAGAMENTO APROVADO!</h1>
        <p className="text-white/50 mb-2 text-[15px]">Número do pedido:</p>
        <p className="font-mono text-[#F5C400] text-[20px] mb-4">
          #{orderId.slice(-8).toUpperCase()}
        </p>
        <p className="text-white/40 text-[14px] mb-10 leading-relaxed">
          Seu pedido foi confirmado e já está sendo preparado.
          Você receberá atualizações por e-mail.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/conta/pedidos"
            className="bg-[#F5C400] text-black px-8 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors">
            MEUS PEDIDOS
          </Link>
          <Link href="/"
            className="border border-white/20 text-white px-8 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:border-white transition-colors">
            CONTINUAR COMPRANDO
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense>
      <SucessoContent />
    </Suspense>
  );
}
