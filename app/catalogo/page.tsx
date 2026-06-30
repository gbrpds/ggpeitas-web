import { Suspense } from 'react';
import { ProductsSection } from '@/components/sections/ProductsSection';

export const metadata = {
  title: 'Catálogo | GG Peitas',
  description: 'Camisas de futebol premium importadas. Seleções, Times Brasileiros e Retrôs.',
};

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-[64px]">
      {/* Banner topo */}
      <div className="bg-[#0d0d0d] border-b border-white/[0.06] px-[5%] py-8">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-2 flex items-center gap-2">
            <span className="w-4 h-px bg-[#008C3A]" /> GG Peitas
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,56px)] tracking-[2px] leading-none">
            CATÁLOGO <span className="text-[#F5C400]">COMPLETO</span>
          </h1>
          <p className="text-white/40 text-[13px] mt-2">
            Camisas modelo jogador importadas · Frete grátis · Até 12x
          </p>
        </div>
      </div>

      <Suspense>
        <ProductsSection />
      </Suspense>
    </div>
  );
}
