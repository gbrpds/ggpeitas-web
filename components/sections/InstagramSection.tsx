function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

const cells = [
  { emoji: '🇧🇷', bg: 'linear-gradient(135deg,#1a2a0a,#0d1a05)', span: '' },
  { emoji: '🇧🇷', bg: 'linear-gradient(135deg,#001a08,#003015)', span: 'col-span-2 row-span-2', label: 'BRASIL 2026', sub: 'HOME' },
  { emoji: '⚫', bg: 'linear-gradient(135deg,#0d0d0d,#1a1a1a)', span: '' },
  { emoji: '🔴', bg: 'linear-gradient(135deg,#150008,#0a0015)', span: '' },
  { emoji: '⚽', bg: 'linear-gradient(135deg,#0a1520,#050d18)', span: '' },
  { emoji: '🇵🇹', bg: 'linear-gradient(135deg,#001015,#00080d)', span: '' },
];

export function InstagramSection() {
  return (
    <section className="bg-[#111] pt-10 pb-24 px-[5%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-9">
        <div>
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
            <span className="w-5 h-px bg-[#008C3A]" /> Redes Sociais <span className="text-white/30 normal-case tracking-normal font-normal">(feedbacks)</span>
          </p>
          <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(40px,5.5vw,72px)' }}>
            @GGPEITAS
          </h2>
        </div>
        <a href="https://www.instagram.com/ggpeitas/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/40 text-[13px] hover:text-white transition-colors">
          <InstagramIcon size={16} /> Ver no Instagram →
        </a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5 rounded overflow-hidden">
        {cells.map((cell, i) => (
          <a key={i} href="https://www.instagram.com/ggpeitas/" target="_blank" rel="noopener noreferrer"
            className={`aspect-square overflow-hidden relative group ${cell.span}`}
            style={{ background: cell.bg }}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 transition-transform duration-500 group-hover:scale-110">
              <span className={cell.span ? 'text-[72px]' : 'text-[40px]'}>{cell.emoji}</span>
              {cell.label && (<><span className="font-display text-[20px] tracking-[3px] text-white/80">{cell.label}</span><span className="text-[11px] tracking-[2px] font-bold text-[#F5C400]">{cell.sub}</span></>)}
            </div>
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <InstagramIcon size={cell.span ? 32 : 22} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
