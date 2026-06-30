'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const featured = [products[0], products[1], products[4]];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const animatingRef = useRef(false);

  function goTo(next: number | ((c: number) => number)) {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (typeof next === 'function' ? next(c) : next));
      setAnimating(false);
      animatingRef.current = false;
    }, 200);
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (!animatingRef.current) {
        animatingRef.current = true;
        setAnimating(true);
        setTimeout(() => {
          setCurrent((c) => (c + 1) % featured.length);
          setAnimating(false);
          animatingRef.current = false;
        }, 200);
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const p = featured[current];

  return (
    <section id="home" className="relative overflow-hidden" style={{ minHeight: '100svh', paddingTop: '64px' }}>

      {/* ── BG global ── */}
      <div className="absolute inset-0 bg-[#050505]" />
      <Image src="/hero-bg.png" alt="" fill priority sizes="100vw"
        className="object-cover object-center opacity-[0.12] mix-blend-luminosity" />
      <div className="absolute inset-0 bg-radial-[ellipse_at_15%_60%] from-[rgba(0,60,25,0.75)] via-[rgba(0,30,12,0.5)] to-transparent" />
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(245,196,0,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(245,196,0,.8) 1px,transparent 1px)',
        backgroundSize: '56px 56px',
      }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* ══════════════════════════════════════════
          MOBILE — imersivo, camisa de fundo full
      ══════════════════════════════════════════ */}
      <div className="lg:hidden relative z-10 flex flex-col" style={{ minHeight: 'calc(100svh - 64px)' }}>

        {/* Camisa de fundo (ocupa tela toda) */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: p.bg }}>
          {p.images?.[0] && (
            <Image key={p.id} src={p.images[0]} alt={p.name} fill
              className="object-cover object-center" sizes="100vw" priority />
          )}
          {/* gradientes para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 to-transparent" />
        </div>

        {/* Conteúdo mobile */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-6" style={{ minHeight: 'calc(100svh - 64px)' }}>

          {/* Slogan */}
          <div className="font-display leading-[0.88] tracking-[1px] mb-4" style={{ fontSize: 'clamp(52px,14vw,80px)' }}>
            <div className="text-white">FUTEBOL</div>
            <div className="text-[#F5C400]" style={{ textShadow: '0 0 40px rgba(245,196,0,0.4)' }}>ESTILO</div>
            <div className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}>PRESENÇA</div>
          </div>

          {/* Produto atual */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] tracking-[3px] uppercase text-[#F5C400] font-bold">Destaque</p>
              <p className="font-display text-[18px] text-white">{p.name} <span className="text-white/40 text-[14px]">{p.label}</span></p>
              <p className="text-[#F5C400] text-[16px] font-bold">{p.price}</p>
            </div>
            {/* Dots navegação */}
            <div className="flex flex-col gap-2">
              {featured.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-1.5 h-6 bg-[#F5C400]' : 'w-1.5 h-1.5 bg-white/25'}`} />
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-4 mb-5 flex-wrap">
            {[['⭐', '100% Original'], ['📦', 'Frete Grátis'], ['💳', 'Até 12x']].map(([icon, txt]) => (
              <div key={txt as string} className="flex items-center gap-1.5 text-[11px] text-white/50">
                <span>{icon}</span> {txt}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Link href={`/produto/${p.slug}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#F5C400] text-black py-4 font-display text-[15px] tracking-[2px] rounded-xl">
              VER PRODUTO
            </Link>
            <a href="/catalogo"
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-5 py-4 font-display text-[15px] tracking-[1px] rounded-xl">
              <ShoppingBag size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — layout original 2 colunas
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex relative z-10 max-w-[1300px] mx-auto px-[5%] items-center h-full">
        <div className="grid grid-cols-[1fr_440px] gap-20 py-20 w-full items-center pl-[4%] xl:pl-[6%]">

          {/* Esquerda */}
          <div className="flex flex-col animate-fade-up">
            <div className="font-display leading-[0.88] tracking-[1px] mb-5" style={{ fontSize: 'clamp(52px,7.5vw,108px)' }}>
              <div className="text-white">FUTEBOL</div>
              <div className="text-[#F5C400]" style={{ textShadow: '0 0 60px rgba(245,196,0,0.3)' }}>ESTILO</div>
              <div className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.14)' }}>PRESENÇA</div>
            </div>
            <div className="flex items-center gap-3 text-[11px] tracking-[4px] uppercase text-white/35 mb-6">
              <span className="w-8 h-px bg-[#008C3A]" /> Futebol, estilo e presença.
            </div>
            <div className="flex items-center gap-5 mb-7 flex-wrap">
              {[['⭐', '100% Original'], ['📦', 'Frete Grátis'], ['💳', 'Até 12x']].map(([icon, txt]) => (
                <div key={txt as string} className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium">
                  <span>{icon}</span> {txt}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/catalogo"
                className="flex items-center gap-2 bg-[#F5C400] text-black py-3.5 px-8 font-display text-[16px] tracking-[2px] rounded-sm hover:bg-[#D9A300] hover:-translate-y-0.5 transition-all">
                <ShoppingBag size={16} /> COMPRAR AGORA
              </a>
            </div>
          </div>

          {/* Direita — stories */}
          <div className="flex flex-col gap-3">
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
            <div className="flex gap-3 h-[52vh] max-h-[460px]">
              <Link href={`/produto/${p.slug}`}
                className={`flex-[2] group rounded-xl overflow-hidden border border-white/[0.08] hover:border-[rgba(245,196,0,0.3)] transition-all duration-200 flex flex-col ${animating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
                style={{ background: p.bg }}>
                <div className="flex-1 relative overflow-hidden min-h-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent z-10" />
                  {p.images?.[0] ? (
                    <Image key={p.id} src={p.images[0]} alt={p.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="320px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-[100px]">{p.icon}</span></div>
                  )}
                  {p.originalPrice && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">-17% OFF</span>
                    </div>
                  )}
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
              </Link>
              <div className="flex flex-col gap-2 flex-1">
                {featured.map((fp, i) => (
                  <button key={fp.id} onClick={() => goTo(i)}
                    className={`flex-1 relative rounded-xl overflow-hidden border transition-all duration-300 ${
                      i === current ? 'border-[#F5C400] ring-1 ring-[rgba(245,196,0,0.25)]' : 'border-white/[0.07] opacity-50 hover:opacity-80 hover:border-white/20'
                    }`} style={{ background: fp.bg }}>
                    {fp.images?.[0] && <Image src={fp.images[0]} alt={fp.name} fill className="object-cover" sizes="140px" />}
                    {!fp.images?.[0] && <div className="absolute inset-0 flex items-center justify-center text-2xl">{fp.icon}</div>}
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
