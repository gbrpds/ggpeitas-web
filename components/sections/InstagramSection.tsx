'use client';
import Image from 'next/image';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

function ReelBadge() {
  return (
    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
      <PlayIcon />
      <span className="text-[9px] font-bold tracking-[1px] uppercase">Reels</span>
    </div>
  );
}

function Overlay({ size = 28 }: { size?: number }) {
  return (
    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <InstagramIcon size={size} />
    </div>
  );
}

const profileUrl = 'https://www.instagram.com/ggpeitas/';
const highlightUrl = 'https://www.instagram.com/stories/highlights/17892553650524254/';

export function InstagramSection() {
  return (
    <section className="bg-[#0a0a0a] py-20 px-[5%]">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
              <span className="w-5 h-px bg-[#008C3A]" /> Siga a gente
            </p>
            <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              @GG<span className="text-[#F5C400]">PEITAS</span>
            </h2>
          </div>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all text-[12px] font-semibold px-4 py-2 rounded-lg flex-shrink-0">
            <InstagramIcon size={14} /> Seguir no Instagram
          </a>
        </div>

        {/* Grid mosaico — desktop 3 cols / mobile 2 cols */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">

          {/* video1 — full width mobile / 2×2 desktop */}
          <a href={profileUrl} target="_blank" rel="noopener noreferrer"
            className="col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl group block aspect-square bg-[#111]">
            <video src="/instagram/video1.mp4" autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover" />
            <Overlay size={36} />
          </a>

          {/* reel1 — 1×1 */}
          <a href="https://www.instagram.com/p/DZdXAlShB9r/" target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden rounded-2xl group block aspect-square">
            <video src="/instagram/reel.mp4" autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover" />
            <Overlay size={28} />
            <ReelBadge />
          </a>

          {/* feedback1 — 1×1 */}
          <a href={highlightUrl} target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden rounded-2xl group block bg-[#111] aspect-square">
            <Image src="/instagram/feedback1.png" alt="Feedback @lucas_severx" fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="33vw" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-100 group-hover:opacity-0 transition-opacity">
              <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#4ade80]">Feedback</span>
            </div>
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <InstagramIcon size={28} />
            </div>
          </a>

          {/* reel2 — 1×1 */}
          <a href="https://www.instagram.com/p/DZnn0nWxo1-/" target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden rounded-2xl group block aspect-square">
            <video src="/instagram/reel2.mp4" autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover" />
            <Overlay size={28} />
            <ReelBadge />
          </a>

          {/* post2 — 1×1 */}
          <a href="https://www.instagram.com/p/DYTh2GtNrRf/" target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden rounded-2xl group block bg-[#111] aspect-square">
            <Image src="/instagram/post2.png" alt="Modelo Jogador Brasil Away" fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="33vw" />
            <Overlay size={28} />
          </a>

          {/* feedback2 — 1×1 */}
          <a href={highlightUrl} target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden rounded-2xl group block bg-[#111] aspect-square">
            <Image src="/instagram/feedback2.png" alt="Feedback @dra.juliarfonseca" fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="33vw" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-100 group-hover:opacity-0 transition-opacity">
              <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#4ade80]">Feedback</span>
            </div>
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <InstagramIcon size={28} />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
