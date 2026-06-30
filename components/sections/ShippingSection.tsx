'use client';
import { useState, useRef } from 'react';
import { Play, Pause, Package, Sparkles, Heart, Tag } from 'lucide-react';

const features = [
  {
    icon: Package,
    color: 'text-[#F5C400]',
    bg: 'bg-[rgba(245,196,0,0.08)]',
    border: 'border-[rgba(245,196,0,0.15)]',
    title: 'Embalagem premium',
    desc: 'A camisa é enviada em uma caixa própria, protegida e pronta para presentear.',
  },
  {
    icon: Sparkles,
    color: 'text-[#008C3A]',
    bg: 'bg-[rgba(0,140,58,0.08)]',
    border: 'border-[rgba(0,140,58,0.15)]',
    title: 'Chega com fragrância',
    desc: 'Cada pacote é perfumado para que a experiência comece antes mesmo de abrir.',
  },
  {
    icon: Heart,
    color: 'text-red-400',
    bg: 'bg-[rgba(248,113,113,0.08)]',
    border: 'border-[rgba(248,113,113,0.15)]',
    title: 'Enviado com carinho',
    desc: 'Cuidamos de cada detalhe do envio com o respeito e atenção que você merece.',
  },
  {
    icon: Tag,
    color: 'text-purple-400',
    bg: 'bg-[rgba(192,132,252,0.08)]',
    border: 'border-[rgba(192,132,252,0.15)]',
    title: 'Surpresa na caixa',
    desc: 'Você recebe um cupom de 10% de desconto para a próxima compra e um adesivo exclusivo GG Peitas.',
  },
];

export function ShippingSection() {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  return (
    <section className="relative bg-[#050505] py-24 px-[5%] overflow-hidden">
      <img
        src="/sec2-bg.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.07] mix-blend-luminosity pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#0a0a0a] pointer-events-none" />
      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#F5C400] mb-3">
              <span className="w-5 h-px bg-[#F5C400]" /> Experiência de entrega
            </p>
            <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              DO NOSSO ESTOQUE<br />
              <span className="text-[#F5C400]">ATÉ A SUA PORTA</span>
            </h2>
          </div>
          <p className="text-white/40 text-[14px] max-w-[320px] leading-relaxed">
            Cada pedido é preparado manualmente com atenção a cada detalhe. Sua camisa merece chegar perfeita.
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 items-center">

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`${f.bg} border ${f.border} rounded-xl p-5 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className={`w-10 h-10 rounded-lg ${f.bg} border ${f.border} flex items-center justify-center`}>
                    <Icon size={20} className={f.color} />
                  </div>
                  <div>
                    <p className={`font-display text-[18px] tracking-wide mb-1 ${f.color}`}>{f.title}</p>
                    <p className="text-white/50 text-[13px] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vídeo */}
          <div className="relative group">
            {/* Glow de fundo */}
            <div className="absolute -inset-4 bg-[rgba(245,196,0,0.06)] rounded-3xl blur-2xl pointer-events-none" />

            {/* Container do vídeo */}
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(245,196,0,0.15)] shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
              {/* Barra superior estilo "player" */}
              <div className="bg-[#111] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.07]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-white/20 text-[11px] ml-2 font-mono">gg-peitas-envio.mp4</span>
              </div>

              {/* Vídeo */}
              <div className="relative aspect-[9/16] sm:aspect-video bg-[#0a0a0a]">
                <video
                  ref={videoRef}
                  src="/videos/envio.mp4"
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  onEnded={() => setPlaying(false)}
                />

                {/* Overlay com play */}
                <div
                  onClick={togglePlay}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    playing ? 'bg-transparent opacity-0 hover:opacity-100 hover:bg-black/20' : 'bg-black/50'
                  }`}
                >
                  <button className={`w-16 h-16 rounded-full bg-[#F5C400] text-black flex items-center justify-center shadow-[0_8px_32px_rgba(245,196,0,0.4)] transition-all duration-300 ${playing ? 'scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100' : 'scale-100 hover:scale-110'}`}>
                    {playing ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                  </button>

                  {!started && (
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <p className="text-white/60 text-[12px] tracking-[2px] uppercase font-semibold">
                        Veja como preparamos seu pedido
                      </p>
                    </div>
                  )}
                </div>

                {/* Badge "AO VIVO" estilizado */}
                {playing && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                    <div className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[2px] text-white uppercase">Reproduzindo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Decoração lateral */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-[#F5C400] to-transparent rounded-full opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
