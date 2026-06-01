'use client';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { products } from '@/lib/products';
import { useOfferTimer } from '@/lib/useOfferTimer';
import { Flame } from 'lucide-react';

export function HeroSection() {
  const { openModal } = useStore();
  const timer = useOfferTimer();

  return (
    <section id="home" className="h-[88vh] relative flex items-start pt-[68px] overflow-hidden">
      {/* BG layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-radial-[ellipse_at_30%_50%] from-[rgba(0,50,20,0.6)] to-[#050505]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,196,0,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(245,196,0,.5) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 50% 50%,black 30%,transparent 80%)',
          }}
        />
        <div className="absolute w-[700px] h-[700px] rounded-full -top-40 -left-24 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle,rgba(0,140,58,.22) 0%,transparent 65%)' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-[5%] animate-pulse-glow"
          style={{ background: 'radial-gradient(circle,rgba(245,196,0,.1) 0%,transparent 65%)', animationDelay: '1s' }} />
      </div>

      {/* Layout grid */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* ── ESQUERDA: slogan + botões ── */}
        <div className="flex flex-col justify-center px-[5%] pl-[5%] lg:pl-[8%] xl:pl-[10%] animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-[rgba(245,196,0,0.08)] border border-[rgba(245,196,0,0.25)] px-4 py-1.5 rounded-sm mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#F5C400]">
              Nova Coleção · Brasil 2026
            </span>
          </div>

          {/* Title */}
          <div className="font-display leading-[0.88] tracking-[2px] mb-4" style={{ fontSize: 'clamp(56px,7.5vw,120px)' }}>
            <div className="text-white">FUTEBOL</div>
            <div className="text-[#F5C400]" style={{ textShadow: '0 0 60px rgba(245,196,0,0.3)' }}>ESTILO</div>
            <div className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}>PRESENÇA</div>
          </div>

          {/* Slogan */}
          <div className="flex items-center gap-3 text-[12px] tracking-[4px] uppercase text-white/40 mb-6">
            <span className="w-8 h-px bg-[#008C3A]" />
            Futebol, estilo e presença.
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-6 max-w-[460px]">
            <a href="#loja" className="flex-1 text-center bg-[#F5C400] text-black py-3.5 font-display text-[17px] tracking-[2px] rounded-sm hover:bg-[#D9A300] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(245,196,0,0.25)] transition-all">
              COMPRAR AGORA
            </a>
            <button
              onClick={() => openModal(products[0])}
              className="flex-1 bg-transparent text-white py-3.5 font-display text-[17px] tracking-[2px] border border-white/20 rounded-sm hover:border-white hover:bg-white/[0.04] transition-all"
            >
              VER BRASIL 2026
            </button>
          </div>

          {/* Stats */}
          <div className="hidden md:flex gap-8">
            {[['Qualidade', 'Premium'], ['10+', 'Seleções'], ['Frete', 'Grátis']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-[22px] text-[#F5C400] leading-none">{n}</div>
                <div className="text-[10px] tracking-[2px] uppercase text-white/40 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIREITA: timer + cards ── */}
        <div className="hidden lg:flex flex-col justify-center px-4 pr-[4%] gap-4 h-full py-8">

          {/* Banner oferta — sempre visível */}
          <div className={`flex items-center justify-between backdrop-blur-sm border rounded-xl px-4 py-2.5 flex-shrink-0 ${
            timer.expired
              ? 'bg-white/[0.03] border-white/10'
              : 'bg-[rgba(0,0,0,0.7)] border-[rgba(245,196,0,0.25)]'
          }`}>
            <div className="flex items-center gap-2">
              <Flame size={14} className={`flex-shrink-0 ${timer.expired ? 'text-white/20' : 'text-[#F5C400] animate-pulse'}`} />
              <div>
                <p className={`text-[9px] font-bold tracking-[2px] uppercase ${timer.expired ? 'text-white/30' : 'text-[#F5C400]'}`}>
                  {timer.expired ? 'Oferta encerrada' : 'Oferta por tempo limitado'}
                </p>
                <p className="text-[10px] text-white/40">
                  DE <span className="line-through text-white/30">R$ 229,90</span>
                  <span className="text-white/40 mx-1">→</span>
                  POR <span className={`font-bold ${timer.expired ? 'text-white/40' : 'text-[#F5C400]'}`}>R$ 189,90</span>
                </p>
              </div>
            </div>
            {!timer.expired && (
              <div className="flex items-center gap-1 font-mono font-bold flex-shrink-0">
                {[timer.h, timer.m, timer.s].map((val, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="bg-[#F5C400] text-black px-2 py-0.5 rounded-sm min-w-[30px] text-center text-[13px]">{val}</span>
                    {i < 2 && <span className="text-[#F5C400] text-[12px]">:</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cards */}
          <div className="flex gap-3">
            {[
              { p: products[0], color: 'linear-gradient(170deg,#00b050 0%,#008C3A 45%,#004d20 100%)', badge: 'HOME', badgeColor: 'bg-[#1a3a8f] text-white' },
              { p: products[1], color: 'linear-gradient(170deg,#0a0f2e 0%,#001a5e 50%,#000d3a 100%)', badge: 'AWAY', badgeColor: 'bg-[#008C3A] text-white' },
            ].map(({ p, color, badge, badgeColor }) => (
              <div key={p.id} onClick={() => openModal(p)} className="flex-1 cursor-pointer group rounded-xl overflow-hidden border border-white/[0.08] hover:border-[rgba(245,196,0,0.3)] transition-all hover:-translate-y-1">
                {/* Imagem com altura máxima */}
                <div className="relative overflow-hidden" style={{ background: color, height: 'min(55vh, 420px)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
                  {p.images && p.images[0] ? (
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="320px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[80px]">{p.icon}</span>
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 ${badgeColor} text-[11px] font-extrabold tracking-[2px] uppercase px-3 py-1.5 rounded-sm`}>
                    {badge}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">-17%</div>
                </div>
                {/* Info */}
                <div className="bg-[#0f0f0f] px-4 py-3 border-t-2 border-[#F5C400] flex-shrink-0">
                  <div className="text-[9px] tracking-[2px] uppercase text-[#F5C400] font-bold mb-0.5">Modelo Jogador</div>
                  <div className="font-display text-[16px] tracking-[1px] leading-tight text-white">{p.name} <span className="text-white/40 text-[13px]">{p.label}</span></div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="text-[9px] text-white/30 line-through">R$ 229,90</div>
                      <div className="text-[16px] font-bold text-[#F5C400]">{p.price}</div>
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
