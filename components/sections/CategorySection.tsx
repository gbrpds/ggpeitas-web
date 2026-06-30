const categories = [
  {
    href: '#selecoes',
    label: 'Seleções',
    sub: 'Brasil, Argentina, Portugal, Alemanha e mais',
    emoji: '🌍',
    accent: '#008C3A',
    bg: 'linear-gradient(135deg,#001a08 0%,#003015 100%)',
    border: 'rgba(0,140,58,0.25)',
    count: 9,
  },
  {
    href: '#times-br',
    label: 'Times & Clubes',
    sub: 'Grêmio, Internacional, Real Madrid, Man. City',
    emoji: '⚽',
    accent: '#F5C400',
    bg: 'linear-gradient(135deg,#0f0c00 0%,#201800 100%)',
    border: 'rgba(245,196,0,0.2)',
    count: 4,
  },
  {
    href: '#retro',
    label: 'Retrôs',
    sub: 'Brasil 1970, 1994, 2002 e outras lendas',
    emoji: '⭐',
    accent: '#c084fc',
    bg: 'linear-gradient(135deg,#0a0015 0%,#150025 100%)',
    border: 'rgba(192,132,252,0.2)',
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
              className="group relative rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 flex flex-col gap-3 cursor-pointer"
              style={{ background: c.bg, borderColor: c.border }}
            >
              {/* Glow ao hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at 50% 100%,${c.accent}15 0%,transparent 70%)` }} />

              <div className="flex items-center justify-between">
                <span className="text-[40px]">{c.emoji}</span>
                <span className="text-[10px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: c.accent, borderColor: `${c.accent}40`, background: `${c.accent}10` }}>
                  {c.count} itens
                </span>
              </div>

              <div>
                <p className="font-display text-[24px] tracking-[1px] text-white mb-1">{c.label}</p>
                <p className="text-[12px] text-white/35 leading-relaxed">{c.sub}</p>
              </div>

              <div className="flex items-center gap-2 mt-1" style={{ color: c.accent }}>
                <span className="text-[11px] font-bold tracking-[2px] uppercase">Ver tudo</span>
                <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
