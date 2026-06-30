'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { products } from '@/lib/products';
import { useOfferTimer } from '@/lib/useOfferTimer';
import { Flame, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

// Camisas em destaque no carrossel
const featured = [products[0], products[1], products[4]]; // Brasil Home, Away, Argentina

export function HeroSection() {
  const { openModal } = useStore();
  const timer = useOfferTimer();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-avança a cada 4s
  useEffect(() => {
    const id = setInterval(() => goTo((c) => (c + 1) % featured.length), 4000);
    return () => clearInterval(id);
  }, []);

  function goTo(next: number | ((c: number) => number)) {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(typeof next === 'function' ? next(current) : next);
      setAnimating(false);
    }, 200);
  }

  const p = featured[current];

  return (
    <section id="home" className="relative overflow-hidden" style={{ minHeight: '78vh', paddingTop: '64px' }}>

      {/* ── BG: gradiente + foto de jogadores com opacidade baixa ── */}
      <div className="absolute inset-0">
        {/* Foto de fundo — coloque /public/hero-bg.jpg (foto de jogadores) */}
        <div className="absolute inset-0 bg-[#050505]" />
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.07] mix-blend-luminosity"
          priority
          sizes="100vw"
        />
        {/* Gradiente verde sobre a foto */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_15%_60%] from-[rgba(0,60,25,0.75)] via-[rgba(0,30,12,0.5)] to-transparent" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_85%_20%] from-[rgba(245,196,0,0.05)] to-transparent" />
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,196,0,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(245,196,0,.8) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        {/* Fade nas bordas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* ── Conteúdo ── */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-[5%] flex items-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-20 py-14 lg:py-20 w-full items-center pl-0 lg:pl-[4%] xl:pl-[6%]">

          {/* ── ESQUERDA: slogan ── */}
          <div className="flex flex-col animate-fade-up">
            {/* Oferta */}
            {!timer.expired && (
              <div className="inline-flex items-center gap-2.5 bg-[rgba(245,196,0,0.1)] border border-[rgba(245,196,0,0.3)] px-4 py-2 rounded-sm mb-6 w-fit">
                <Flame size={13} className="text-[#F5C400] animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#F5C400]">
                  Oferta especial · <span className="font-mono">{timer.h}:{timer.m}:{timer.s}</span>
                </span>
              </div>
            )}

            <div className="font-display leading-[0.88] tracking-[1px] mb-5" style={{ fontSize: 'clamp(52px,7.5vw,108px)' }}>
              <div className="text-white">FUTEBOL</div>
              <div className="text-[#F5C400]" style={{ textShadow: '0 0 60px rgba(245,196,0,0.3)' }}>ESTILO</div>
              <div className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.14)' }}>PRESENÇA</div>
            </div>

            <div className="flex items-center gap-3 text-[11px] tracking-[4px] uppercase text-white/35 mb-6">
              <span className="w-8 h-px bg-[#008C3A]" />
              Futebol, estilo e presença.
            </div>

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
              <a
                href="#selecoes"
                className="flex items-center gap-2 bg-transparent text-white py-3.5 px-7 font-display text-[16px] tracking-[2px] border border-white/20 rounded-sm hover:border-white hover:bg-white/[0.04] transition-all"
              >
                SELEÇÕES
              </a>
            </div>

          </div>

          {/* ── DIREITA: carrossel stories ── */}
          <div className="hidden lg:flex flex-col gap-3">
            {/* Label + setas */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/35 flex items-center gap-2">
                <span className="w-4 h-px bg-[#F5C400]" /> Destaques
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => goTo((c) => (c - 1 + featured.length) % featured.length)}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:border-[#F5C400] hover:text-[#F5C400] transition-all">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => goTo((c) => (c + 1) % featured.length)}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:border-[#F5C400] hover:text-[#F5C400] transition-all">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Stories: card principal tall + thumbs lado a lado */}
            <div className="flex gap-3 h-[52vh] max-h-[460px]">
              {/* Card principal */}
              <div
                onClick={() => p.active !== false && openModal(p)}
                className={`flex-[2] cursor-pointer group rounded-xl overflow-hidden border border-white/[0.08] hover:border-[rgba(245,196,0,0.3)] transition-all duration-200 flex flex-col ${
                  animating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                }`}
                style={{ background: p.bg }}
              >
                <div className="flex-1 relative overflow-hidden min-h-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent z-10" />
                  {p.images?.[0] ? (
                    <Image key={p.id} src={p.images[0]} alt={p.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="320px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[100px]">{p.icon}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    {p.originalPrice && <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">-17% OFF</span>}
                  </div>
                  <div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#F5C400] text-black text-[9px] font-extrabold tracking-[2px] uppercase px-5 py-2 rounded-sm">VER PRODUTO</span>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] px-3.5 py-3 border-t-2 border-[#F5C400] flex-shrink-0">
                  <p className="text-[8px] tracking-[2px] uppercase text-[#F5C400] font-bold mb-0.5">Modelo Jogador</p>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-[15px] tracking-wide text-white">{p.name} <span className="text-white/35 text-[11px]">{p.label}</span></p>
                    <p className="text-[16px] font-bold text-[#F5C400]">{p.price}</p>
                  </div>
                </div>
              </div>

              {/* Thumbs verticais */}
              <div className="flex flex-col gap-2 flex-1">
                {featured.map((fp, i) => (
                  <button key={fp.id} onClick={() => goTo(i)}
                    className={`flex-1 relative rounded-xl overflow-hidden border transition-all duration-300 ${
                      i === current
                        ? 'border-[#F5C400] ring-1 ring-[rgba(245,196,0,0.25)]'
                        : 'border-white/[0.07] opacity-50 hover:opacity-80 hover:border-white/20'
                    }`}
                    style={{ background: fp.bg }}
                  >
                    {fp.images?.[0] && (
                      <Image src={fp.images[0]} alt={fp.name} fill className="object-cover" sizes="140px" />
                    )}
                    {!fp.images?.[0] && (
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">{fp.icon}</div>
                    )}
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[8px] text-white/80 font-bold tracking-[1px] uppercase">{fp.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
