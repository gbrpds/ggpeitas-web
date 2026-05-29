'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Suspense } from 'react';

function FalhaContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId') ?? '';

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px] px-[5%]">
      <div className="max-w-[560px] w-full text-center py-16">
        <XCircle size={80} className="text-red-400 mx-auto mb-6" />
        <h1 className="font-display text-[40px] tracking-[2px] mb-3">PAGAMENTO RECUSADO</h1>
        {orderId && (
          <>
            <p className="text-white/50 mb-2 text-[15px]">Pedido:</p>
            <p className="font-mono text-white/40 text-[16px] mb-4">#{orderId.slice(-8).toUpperCase()}</p>
          </>
        )}
        <p className="text-white/40 text-[14px] mb-10 leading-relaxed">
          Não foi possível processar seu pagamento. Verifique os dados do cartão e tente novamente,
          ou escolha outra forma de pagamento.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/checkout"
            className="bg-[#F5C400] text-black px-8 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors">
            TENTAR NOVAMENTE
          </Link>
          <Link href="/"
            className="border border-white/20 text-white px-8 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:border-white transition-colors">
            VOLTAR À LOJA
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FalhaPage() {
  return (
    <Suspense>
      <FalhaContent />
    </Suspense>
  );
}
