function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function ContactSection() {
  return (
    <section id="contato" className="bg-[#111] py-24 px-[5%]">
      <div className="max-w-[600px] mx-auto text-center">
        <p className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
          <span className="w-5 h-px bg-[#008C3A]" /> Fale Conosco
        </p>
        <h2 className="font-display leading-none tracking-[2px] mb-4" style={{ fontSize: 'clamp(40px,5.5vw,72px)' }}>
          ENTRE EM<br /><span className="text-[#F5C400]">CONTATO</span>
        </h2>
        <p className="text-white/40 text-[14px] leading-relaxed font-light mb-10">
          Dúvidas sobre produtos, tamanhos, envio ou qualquer outra coisa?<br />Nosso time está pronto para ajudar.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://www.instagram.com/ggpeitas/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#F5C400] text-black px-10 py-4 font-display text-[20px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors">
            <InstagramIcon size={18} /> Instagram
          </a>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer"
            className="bg-transparent text-white px-10 py-4 font-display text-[20px] tracking-[2px] border border-white/20 rounded-sm hover:border-white hover:bg-white/[0.04] transition-all">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
