'use client';
import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useStore } from '@/lib/store';
import { Product } from '@/types';
import { Bell, ShoppingBag, Clock } from 'lucide-react';

type Tab = 'todos' | 'selecoes' | 'times-br' | 'retro';

const tabs: { key: Tab; label: string; emoji: string }[] = [
  { key: 'todos', label: 'Todos', emoji: '🏆' },
  { key: 'selecoes', label: 'Seleções', emoji: '🌍' },
  { key: 'times-br', label: 'Times & Clubes', emoji: '⚽' },
  { key: 'retro', label: 'Retrôs', emoji: '⭐' },
];

const whatsappBase = 'https://wa.me/5551991870608';

function ComingSoonCard({ p }: { p: Product }) {
  const msg = encodeURIComponent(`Olá! Tenho interesse na camisa *${p.name} ${p.label}* e gostaria de ser avisado quando chegar em estoque.`);
  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden flex flex-col relative">
      <div className="absolute top-3 left-3 z-10 bg-[#1a1a1a] border border-white/15 text-white/50 text-[9px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-sm flex items-center gap-1.5">
        <Clock size={9} /> Em Breve
      </div>

      <div className="aspect-[4/5] relative overflow-hidden" style={{ background: p.bg }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[72px] opacity-20">{p.icon}</span>
        </div>
        {p.images?.[0] && (
          <Image src={p.images[0]} alt={p.name} fill className="object-cover opacity-30 grayscale" sizes="(max-width: 640px) 100vw, 33vw" />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[9px] tracking-[2px] uppercase text-white/20 font-semibold">{p.cat}</p>
        <p className="font-display text-[20px] tracking-wide mt-1 text-white/40">
          {p.name} <span className="text-white/20 text-[14px]">{p.label}</span>
        </p>
        <div className="mt-auto pt-3">
          <p className="text-[10px] text-white/25 mb-2.5">Previsão: a partir de <span className="text-white/40 font-semibold">{p.price}</span></p>
          <a
            href={`${whatsappBase}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-transparent border border-white/10 text-white/40 px-4 py-2.5 text-[10px] font-bold tracking-[2px] uppercase rounded-sm hover:bg-[rgba(245,196,0,0.07)] hover:border-[rgba(245,196,0,0.2)] hover:text-[#F5C400] transition-all"
          >
            <Bell size={11} /> Avisar-me
          </a>
        </div>
      </div>
    </div>
  );
}

function ActiveCard({ p }: { p: Product }) {
  const { openModal } = useStore();
  const totalStock = p.stock ? Object.values(p.stock).reduce((a, b) => a + b, 0) : null;

  return (
    <div
      onClick={() => openModal(p)}
      className="bg-[#111] border border-white/[0.07] rounded-xl cursor-pointer group hover:-translate-y-2 hover:border-[rgba(245,196,0,0.3)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="aspect-[4/5] relative overflow-hidden" style={{ background: p.bg }}>
        {p.images?.[0] ? (
          <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[80px] group-hover:scale-105 transition-transform duration-500">{p.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.originalPrice && (
            <span className="bg-red-500 text-white text-[9px] font-bold tracking-[1.5px] px-2.5 py-1 rounded-sm uppercase">
              -{Math.round(((22990 - p.priceNum) / 22990) * 100)}% OFF
            </span>
          )}
          {totalStock !== null && totalStock <= 4 && (
            <span className="bg-[#F5C400] text-black text-[8px] font-extrabold tracking-[2px] px-2.5 py-1 rounded-sm uppercase">
              Últimas unidades
            </span>
          )}
        </div>

        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all bg-[rgba(245,196,0,0.95)] text-black text-[9px] font-extrabold tracking-[2px] uppercase px-5 py-2 rounded-sm whitespace-nowrap">
          VER PRODUTO
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[9px] tracking-[2px] uppercase text-white/35 font-semibold">{p.cat}</p>
        <p className="font-display text-[20px] tracking-wide mt-1">
          {p.name} <span className="text-white/35 text-[14px]">{p.label}</span>
        </p>
        <div className="flex items-end justify-between mt-auto pt-3">
          <div>
            {p.originalPrice && (
              <p className="text-[10px] text-white/25 line-through mb-0.5">{p.originalPrice}</p>
            )}
            <p className="text-[9px] text-white/35 uppercase tracking-[1px]">a partir de</p>
            <p className="text-[22px] font-bold text-[#F5C400]">{p.price}</p>
            <p className="text-[10px] text-[#008C3A]">R$ {((p.priceNum * 0.9) / 100).toFixed(2).replace('.', ',')} no PIX</p>
          </div>
          <button className="bg-[rgba(245,196,0,0.08)] border border-[rgba(245,196,0,0.2)] text-[#F5C400] px-4 py-2 text-[10px] font-bold tracking-[2px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black transition-all flex items-center gap-1.5">
            <ShoppingBag size={12} /> Ver
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('todos');

  const filtered = activeTab === 'todos'
    ? products
    : products.filter((p) => p.category === activeTab);

  const activeProducts = filtered.filter((p) => p.active !== false);
  const comingProducts = filtered.filter((p) => p.active === false);

  return (
    <section id="loja" className="bg-[#0a0a0a] pt-16 pb-20 px-[5%]">
      <div className="max-w-[1300px] mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
            <span className="w-5 h-px bg-[#008C3A]" /> Catálogo
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              NOSSAS <span className="text-[#F5C400]">CAMISAS</span>
            </h2>
            <p className="text-white/35 text-[13px]">
              {activeProducts.length} disponíve{activeProducts.length === 1 ? 'l' : 'is'} · {comingProducts.length} em breve
            </p>
          </div>
        </div>

        {/* Abas de categoria */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const count = t.key === 'todos'
              ? products.length
              : products.filter(p => p.category === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-bold tracking-[1.5px] uppercase whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === t.key
                    ? 'bg-[#F5C400] text-black'
                    : 'bg-[#161616] border border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{t.emoji}</span>
                {t.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === t.key ? 'bg-black/20 text-black' : 'bg-white/10 text-white/40'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Produtos disponíveis */}
        {activeProducts.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {activeProducts.map((p) => <ActiveCard key={p.id} p={p} />)}
            </div>
          </div>
        )}

        {/* Em Breve */}
        {comingProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Clock size={13} className="text-white/25" />
                <span className="text-[10px] font-bold tracking-[4px] uppercase text-white/25">Em Breve</span>
              </div>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {comingProducts.map((p) => <ComingSoonCard key={p.id} p={p} />)}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
