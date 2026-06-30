'use client';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { products } from '@/lib/products';
import { useOfferTimer } from '@/lib/useOfferTimer';
import { Flame, ShoppingBag, Star } from 'lucide-react';

export function HeroSection() {
  const { openModal } = useStore();
  const timer = useOfferTimer();

  return (
    <section id="home" className="relative overflow-hidden" style={{ minHeight: '72vh', paddingTop: '64px' }}>
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_20%_60%] from-[rgba(0,50,20,0.5)] to-transparent" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_80%_30%] from-[rgba(245,196,0,0.06)] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,196,0,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(245,196,0,.6) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-[5%] h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-12 lg:py-16 w-full items-center">

          {/* ── ESQUERDA ── */}
          <div className="flex flex-col animate-fade-up">
            {/* Badge oferta */}
            {!timer.expired && (
              <div className="inline-flex items-center gap-2.5 bg-[rgba(245,196,0,0.1)] border border-[rgba(245,196,0,0.3)] px-4 py-2 rounded-sm mb-5 w-fit">
                <Flame size={13} className="text-[#F5C400] animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#F5C400]">
                  Oferta termina em: <span className="font-mono">{timer.h}:{timer.m}:{timer.s}</span>
                </span>
              </div>
            )}

            <h1 className="font-display leading-[0.9] tracking-[2px] mb-4" style={{ fontSize: 'clamp(48px,7vw,100px)' }}>
              <span className="text-white">CAMISAS</span><br />
              <span className="text-[#F5C400]" style={{ textShadow: '0 0 40px rgba(245,196,0,0.25)' }}>PREMIUM</span><br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>IMPORTADAS</span>
            </h1>

            <p className="text-white/50 text-[14px] leading-relaxed mb-6 max-w-[420px]">
              Modelo jogador original, embalagem premium e frete grátis para todo o Brasil.
              A camisa que você quer, do jeito que merece.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center gap-5 mb-7 flex-wrap">
              {[['⭐', '100% Original'], ['📦', 'Frete Grátis'], ['💳', 'Até 12x']].map(([icon, txt]) => (
                <div key={txt} className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium">
                  <span>{icon}</span> {txt}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#loja"
                className="flex items-center gap-2 bg-[#F5C400] text-black py-3.5 px-7 font-display text-[16px] tracking-[2px] rounded-sm hover:bg-[#D9A300] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(245,196,0,0.25)] transition-all"
              >
                <ShoppingBag size={16} /> VER CATÁLOGO
              </a>
              <button
                onClick={() => openModal(products[0])}
                className="flex items-center gap-2 bg-transparent text-white py-3.5 px-7 font-display text-[16px] tracking-[2px] border border-white/20 rounded-sm hover:border-white hover:bg-white/[0.04] transition-all"
              >
                BRASIL 2026
              </button>
            </div>

            {/* Promo strip */}
            <div className="mt-7 flex items-center gap-3 text-[13px] flex-wrap">
              <span className="text-white/25 line-through">R$ 229,90</span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">-17% OFF</span>
              <span className="text-[#F5C400] font-bold">R$ 189,90</span>
              <span className="text-[#008C3A] text-[11px]">· R$ 170,91 no PIX</span>
            </div>
          </div>

          {/* ── DIREITA: cards das 2 camisas ── */}
          <div className="hidden lg:flex gap-4 h-[52vh] max-h-[480px]">
            {[
              { p: products[0], bg: 'linear-gradient(160deg,#005020 0%,#002810 100%)', badge: 'HOME', badgeClass: 'bg-[#1a3a8f] text-white' },
              { p: products[1], bg: 'linear-gradient(160deg,#001040 0%,#000820 100%)', badge: 'AWAY', badgeClass: 'bg-[#008C3A] text-white' },
            ].map(({ p, bg, badge, badgeClass }) => (
              <div
                key={p.id}
                onClick={() => openModal(p)}
                className="flex-1 cursor-pointer group rounded-xl overflow-hidden border border-white/[0.08] hover:border-[rgba(245,196,0,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)] flex flex-col"
              >
                <div className="flex-1 relative overflow-hidden" style={{ background: bg }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
                  {p.images?.[0] && (
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="280px" />
                  )}
                  <span className={`absolute top-3 left-3 ${badgeClass} text-[10px] font-extrabold tracking-[2px] uppercase px-2.5 py-1 rounded-sm`}>
                    {badge}
                  </span>
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">
                    -17%
                  </div>
                </div>
                <div className="bg-[#0d0d0d] px-3.5 py-3 border-t-2 border-[#F5C400] flex-shrink-0">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={9} className="fill-[#F5C400] text-[#F5C400]" />)}
                  </div>
                  <div className="font-display text-[14px] tracking-wide text-white leading-tight">{p.name}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div>
                      <div className="text-[9px] text-white/25 line-through">R$ 229,90</div>
                      <div className="text-[15px] font-bold text-[#F5C400]">{p.price}</div>
                    </div>
                    <button className="bg-[#F5C400] text-black text-[9px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-sm hover:bg-[#D9A300] transition-colors">
                      VER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
