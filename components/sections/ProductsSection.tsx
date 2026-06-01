'use client';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useStore } from '@/lib/store';
import { useOfferTimer } from '@/lib/useOfferTimer';
import { ChevronRight } from 'lucide-react';

const activeProducts = products.filter(p => p.active !== false && (p.id === 0 || p.id === 1));

export function ProductsSection() {
  const { openModal } = useStore();
  const timer = useOfferTimer(); // usado só para mostrar preço riscado

  return (
    <section id="loja" className="bg-[#111] pt-16 pb-12 px-[5%]">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
              <span className="w-5 h-px bg-[#008C3A]" /> Lançamento Exclusivo
            </p>
            <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(40px,5.5vw,72px)' }}>
              BRASIL <span className="text-[#F5C400]">2026/27</span>
            </h2>
            <p className="text-white/40 text-[14px] mt-2">Modelo Jogador · Importado · Estoque Limitado</p>
          </div>
        </div>


        {/* Cards das camisetas do Brasil — grade grande */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {activeProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => openModal(p)}
              className="bg-[#161616] border border-white/[0.07] rounded-xl cursor-pointer group hover:-translate-y-2 hover:border-[rgba(245,196,0,0.3)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center" style={{ background: p.bg }}>
                {p.images && p.images[0] ? (
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 50vw" />
                ) : (
                  <span className="text-[120px] group-hover:scale-105 transition-transform duration-500">{p.icon}</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-red-500 text-white text-[10px] font-bold tracking-[1.5px] px-2.5 py-1 rounded-sm uppercase">
                    -{Math.round(((22990 - p.priceNum) / 22990) * 100)}% OFF
                  </span>
                  <span className="bg-[#F5C400] text-black text-[9px] font-extrabold tracking-[2px] px-2.5 py-1 rounded-sm uppercase">
                    Últimas unidades
                  </span>
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all bg-[rgba(245,196,0,0.95)] text-black text-[10px] font-extrabold tracking-[2px] uppercase px-5 py-2 rounded-sm whitespace-nowrap">
                  VER PRODUTO
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[9px] tracking-[2.5px] uppercase text-white/40 font-semibold">{p.cat}</p>
                <p className="font-display text-[28px] tracking-wide mt-1">
                  {p.name} <span className="text-white/40 text-[18px]">{p.label}</span>
                </p>
                <div className="flex items-end justify-between mt-auto pt-3">
                  <div>
                    {p.originalPrice && (
                      <p className="text-[11px] text-white/30 line-through mb-0.5">{p.originalPrice}</p>
                    )}
                    <p className="text-[9px] text-white/40 uppercase tracking-[1px]">a partir de</p>
                    <p className="text-[24px] font-bold text-[#F5C400]">{p.price}</p>
                    <p className="text-[11px] text-[#008C3A]">R$ {((p.priceNum * 0.9) / 100).toFixed(2).replace('.', ',')} no PIX</p>
                  </div>
                  <button className="bg-[rgba(245,196,0,0.08)] border border-[rgba(245,196,0,0.2)] text-[#F5C400] px-5 py-2.5 text-[11px] font-bold tracking-[2px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black transition-all">
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Em breve */}
        <div className="border-t border-white/[0.06] pt-14">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-white/30 mb-3">
                <span className="w-5 h-px bg-white/20" /> Em breve
              </p>
              <h3 className="font-display text-[32px] tracking-[2px] text-white/40">
                NOVOS MODELOS <span className="text-white/20">A CAMINHO</span>
              </h3>
              <p className="text-white/25 text-[13px] mt-1">Seleções e clubes europeus · Novos modelos chegando em breve</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-white/25 text-[13px]">
            <p className="flex items-center gap-2"><ChevronRight size={13} className="text-white/20" /> Argentina · Portugal · Alemanha · França · Espanha · Bélgica · Inglaterra · Colômbia</p>
            <p className="flex items-center gap-2"><ChevronRight size={13} className="text-white/20" /> Real Madrid · Barcelona · PSG · Manchester City e muito mais</p>
          </div>
          <p className="text-white/20 text-[12px] mt-4 flex items-center gap-1.5">
            <ChevronRight size={12} /> Acompanhe nossas redes sociais para ser o primeiro a saber dos lançamentos
          </p>
        </div>
      </div>
    </section>
  );
}
