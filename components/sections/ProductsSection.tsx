'use client';
import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useStore } from '@/lib/store';

type Filter = 'all' | 'selecao' | 'clube';

const badgeMap = {
  novo: 'bg-[#008C3A] text-white',
  jogador: 'bg-[#F5C400] text-black',
  esgotado: 'bg-white/10 text-white border border-white/20',
};

const badgeLabel = {
  novo: 'NOVO',
  jogador: 'JOGADOR',
  esgotado: 'ESGOTADO',
};

export function ProductsSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const { openModal } = useStore();

  const filtered = filter === 'all' ? products : products.filter((p) => p.filter === filter);

  return (
    <section id="loja" className="bg-[#111] py-24 px-[5%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14">
        <div>
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
            <span className="w-5 h-px bg-[#008C3A]" /> Catálogo Completo
          </p>
          <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(40px,5.5vw,72px)' }}>
            NOSSA <span className="text-[#F5C400]">COLEÇÃO</span>
          </h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'selecao', 'clube'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-[11px] font-semibold tracking-[1.5px] uppercase border rounded-sm transition-all ${
                filter === f
                  ? 'bg-[#F5C400] text-black border-[#F5C400]'
                  : 'bg-transparent text-white/40 border-white/[0.07] hover:bg-[#F5C400] hover:text-black hover:border-[#F5C400]'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'selecao' ? 'Seleções' : 'Clubes'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => openModal(p)}
            className="bg-[#161616] border border-white/[0.07] rounded cursor-pointer group hover:-translate-y-2 hover:border-[rgba(245,196,0,0.25)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.6)] transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center" style={{ background: p.bg }}>
              {p.images && p.images[0] ? (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <span className="text-[96px] group-hover:scale-105 transition-transform duration-500">{p.icon}</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className={`absolute top-3 left-3 text-[8px] font-extrabold tracking-[2px] uppercase px-2.5 py-1 rounded-sm ${badgeMap[p.badge]}`}>
                {badgeLabel[p.badge]}
              </span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all bg-[rgba(245,196,0,0.95)] text-black text-[10px] font-extrabold tracking-[2px] uppercase px-5 py-2 rounded-sm whitespace-nowrap">
                VER PRODUTO
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-[9px] tracking-[2.5px] uppercase text-white/40 font-semibold">{p.cat}</p>
              <p className="font-display text-[24px] tracking-wide mt-1 mb-3">
                {p.name} <span className="text-white/40 text-[16px]">{p.label}</span>
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-white/40 uppercase tracking-[1px]">a partir de</p>
                  <p className="text-[20px] font-bold text-[#F5C400]">{p.price}</p>
                </div>
                <button className="bg-[rgba(245,196,0,0.08)] border border-[rgba(245,196,0,0.2)] text-[#F5C400] px-4 py-2 text-[10px] font-bold tracking-[2px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black transition-all">
                  Ver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
