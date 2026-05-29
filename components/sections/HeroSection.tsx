'use client';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { products } from '@/lib/products';

export function HeroSection() {
  const { openModal } = useStore();

  return (
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden pt-[68px]">
      {/* BG layers */}
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

      {/* Content */}
      <div className="relative z-10 px-[5%] py-20 max-w-[680px] animate-fade-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-[rgba(245,196,0,0.08)] border border-[rgba(245,196,0,0.25)] px-4 py-2 rounded-sm mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#F5C400]">
            Nova Coleção · Brasil 2026
          </span>
        </div>

        {/* Title */}
        <div className="font-display leading-[0.88] tracking-[2px] mb-2" style={{ fontSize: 'clamp(72px,11vw,130px)' }}>
          <div className="text-white">FUTEBOL</div>
          <div className="text-[#F5C400]" style={{ textShadow: '0 0 60px rgba(245,196,0,0.3)' }}>ESTILO</div>
          <div className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}>PRESENÇA</div>
        </div>

        {/* Slogan */}
        <div className="flex items-center gap-3 text-[13px] tracking-[4px] uppercase text-white/40 my-6">
          <span className="w-8 h-px bg-[#008C3A]" />
          Futebol, estilo e presença.
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          <a href="#loja" className="bg-[#F5C400] text-black px-10 py-4 font-display text-[20px] tracking-[2px] rounded-sm hover:bg-[#D9A300] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(245,196,0,0.25)] transition-all">
            COMPRAR AGORA
          </a>
          <button
            onClick={() => openModal(products[0])}
            className="bg-transparent text-white px-10 py-4 font-display text-[20px] tracking-[2px] border border-white/20 rounded-sm hover:border-white hover:bg-white/[0.04] transition-all"
          >
            VER BRASIL 2026
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-10 left-[5%] z-10 flex gap-10 animate-fade-up hidden md:flex" style={{ animationDelay: '0.2s' }}>
        {[['100%', 'Original'], ['7+', 'Seleções'], ['48h', 'Envio']].map(([n, l]) => (
          <div key={l}>
            <div className="font-display text-[36px] text-[#F5C400] leading-none">{n}</div>
            <div className="text-[10px] tracking-[2px] uppercase text-white/40 mt-1">{l}</div>
          </div>
        ))}
      </div>

      {/* Kit cards */}
      <div className="absolute right-0 bottom-0 top-[68px] w-[50%] hidden lg:flex items-end justify-center z-[1]" style={{ animationDelay: '0.15s' }}>
        {[
          { p: products[0], mt: 0, color: 'linear-gradient(170deg,#00b050 0%,#008C3A 45%,#004d20 100%)', badge: 'HOME', badgeColor: 'bg-[#F5C400] text-black' },
          { p: products[1], mt: 48, color: 'linear-gradient(170deg,#252525 0%,#141414 50%,#1a1a1a 100%)', badge: 'AWAY', badgeColor: 'bg-[#008C3A] text-white' },
        ].map(({ p, mt, color, badge, badgeColor }) => (
          <div
            key={p.id}
            onClick={() => openModal(p)}
            className="flex-1 max-w-[280px] cursor-pointer group"
            style={{ marginTop: mt }}
          >
            <div className="aspect-[3/4] rounded-t-md overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-6"
              style={{ background: color }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
              <div className="absolute font-display text-[120px] text-white/[0.04] bottom-[-10px] right-[-10px] leading-none select-none">10</div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-[64px]">{p.icon}</span>
                <span className="font-display text-[22px] tracking-[4px] text-white/60">2026</span>
              </div>
              <span className={`absolute top-3 left-3 ${badgeColor} text-[8px] font-extrabold tracking-[2px] uppercase px-2.5 py-1 rounded-sm`}>
                {badge}
              </span>
            </div>
            <div className="bg-black/[0.98] p-3.5 border-t-2 border-[#F5C400]">
              <div className="text-[9px] tracking-[2.5px] uppercase text-[#F5C400] font-bold">Modelo Jogador</div>
              <div className="font-display text-[22px] tracking-[1px] my-0.5">{p.name} {p.label}</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[9px] text-white/40">a partir de</div>
                  <div className="text-[16px] font-bold">{p.price}</div>
                </div>
                <button className="bg-[#008C3A] text-white text-[9px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-sm hover:bg-[#006B2D] transition-colors">
                  VER
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
