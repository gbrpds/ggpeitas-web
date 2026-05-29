import Image from 'next/image';
import Link from 'next/link';

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#030303] pt-16 pb-6 px-[5%] border-t border-[rgba(245,196,0,0.08)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="GG Peitas" width={48} height={48} className="object-contain" />
            <span className="font-display text-[26px] tracking-[3px]">
              GG <span className="text-[#F5C400]">Peitas</span>
            </span>
          </div>
          <p className="text-[11px] tracking-[3px] uppercase text-white/40 mb-6">Futebol, estilo e presença.</p>
          <div className="flex gap-2">
            <a href="https://www.instagram.com/ggpeitas/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-white/40 hover:border-[#F5C400] hover:text-[#F5C400] transition-all">
              <InstagramIcon size={15} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-condensed text-[18px] font-bold tracking-[2px] uppercase text-[#F5C400] mb-5">Loja</h4>
          <ul className="space-y-3">
            {['Todos os produtos', 'Seleções', 'Clubes', 'Brasil 2026'].map((item) => (
              <li key={item}><Link href="#loja" className="text-white/40 text-[13px] hover:text-white transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-condensed text-[18px] font-bold tracking-[2px] uppercase text-[#F5C400] mb-5">Suporte</h4>
          <ul className="space-y-3">
            {['Contato', 'Trocas e Devoluções', 'Guia de Tamanhos', 'Rastrear pedido'].map((item) => (
              <li key={item}><Link href="#contato" className="text-white/40 text-[13px] hover:text-white transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-condensed text-[18px] font-bold tracking-[2px] uppercase text-[#F5C400] mb-5">Pagamentos</h4>
          <ul className="space-y-3">
            {['PIX (10% OFF)', 'Cartão em até 12x (Consultar Taxas)'].map((item) => (
              <li key={item}><span className="text-white/40 text-[13px]">{item}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="text-[11px] tracking-[1px] text-white/20">© 2026 <span className="text-[#008C3A]">GG Peitas</span> — Todos os direitos reservados.</p>
        <div className="flex gap-2">
          {['🔒 SSL', '✓ Premium', '⚡ Envio'].map((b) => (
            <span key={b} className="bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-sm text-[9px] tracking-[1.5px] uppercase text-white/40">{b}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
