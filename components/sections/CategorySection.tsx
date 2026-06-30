const categories = [
  {
    href: '/catalogo?cat=selecoes',
    label: 'Seleções',
    sub: 'Brasil, Argentina, Portugal, Alemanha e mais',
    emoji: '🌍',
    accent: '#008C3A',
    filter: 'rgba(0,60,20,0.72)',
    border: 'rgba(0,140,58,0.35)',
    img: '/selecoes.png',
    count: 9,
  },
  {
    href: '/catalogo?cat=times-br',
    label: 'Times & Clubes',
    sub: 'Grêmio, Internacional, Real Madrid, Man. City',
    emoji: '⚽',
    accent: '#F5C400',
    filter: 'rgba(40,30,0,0.70)',
    border: 'rgba(245,196,0,0.3)',
    img: '/times.png',
    count: 4,
  },
  {
    href: '/catalogo?cat=retro',
    label: 'Retrôs',
    sub: 'Brasil 1970, 1994, 2002 e outras lendas',
    emoji: '⭐',
    accent: '#c084fc',
    filter: 'rgba(20,0,40,0.72)',
    border: 'rgba(192,132,252,0.3)',
    img: '/retro.png',
    count: 3,
  },
];

export function CategorySection() {
  return (
    <section className="bg-[#070707] py-14 px-[5%]">
      <div className="max-w-[1300px] mx-auto">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/25 mb-6 text-center">Navegue por categoria</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group relative rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)] p-6 flex flex-col gap-3 cursor-pointer min-h-[200px]"
              style={{ borderColor: c.border }}
            >
              {/* Foto de fundo */}
              <img
                src={c.img}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Filtro colorido */}
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                style={{ background: c.filter }}
              />

              {/* Brilho no hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 110%, ${c.accent}25 0%, transparent 65%)` }}
              />

              {/* Conteúdo */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[38px] drop-shadow-lg">{c.emoji}</span>
                <span
                  className="text-[10px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm"
                  style={{ color: c.accent, borderColor: `${c.accent}50`, background: `${c.accent}15` }}
                >
                  {c.count} itens
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <p className="font-display text-[26px] tracking-[1px] text-white mb-1 drop-shadow-lg">{c.label}</p>
                <p className="text-[12px] text-white/50 leading-relaxed mb-3">{c.sub}</p>
                <div className="flex items-center gap-2" style={{ color: c.accent }}>
                  <span className="text-[11px] font-bold tracking-[2px] uppercase">Ver tudo</span>
                  <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
