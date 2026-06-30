'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { AccountMenu } from './AccountMenu';

const categories = [
  { href: '/catalogo?cat=selecoes', label: 'Seleções', sub: 'Brasil, Argentina, França...' },
  { href: '/catalogo?cat=times-br', label: 'Times Brasileiros', sub: 'Grêmio, Inter e mais' },
  { href: '/catalogo?cat=retro', label: 'Retrôs', sub: '1970, 1994, 2002...' },
];

const topLinks = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/#contato', label: 'Contato' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { cartCount, setCartOpen } = useStore();
  const count = cartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-black/95 border-[rgba(245,196,0,0.12)]'
            : 'bg-black/80 border-[rgba(245,196,0,0.2)] backdrop-blur-xl'
        }`}
      >
        {/* Barra principal */}
        <div className="flex items-center justify-between px-[5%] h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image src="/logo.png" alt="GG Peitas" width={40} height={40} className="object-contain drop-shadow-[0_0_8px_rgba(0,140,58,0.5)]" />
            <div className="leading-none">
              <div className="font-display text-[20px] tracking-[3px] text-white">
                GG <span className="text-[#F5C400]">Peitas</span>
              </div>
              <div className="text-[7px] tracking-[3px] uppercase text-white/40 font-body font-medium">
                Camisas Premium
              </div>
            </div>
          </Link>

          {/* Categorias desktop — centro */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Catálogo dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="flex items-center gap-1.5 text-white/70 text-[11px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors px-4 py-2">
                Catálogo <ChevronDown size={12} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 w-[260px] bg-[#0f0f0f] border border-[rgba(245,196,0,0.15)] rounded-lg overflow-hidden shadow-2xl">
                  {categories.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setCatOpen(false)}
                      className="flex flex-col px-5 py-3.5 hover:bg-[rgba(245,196,0,0.06)] border-b border-white/[0.05] last:border-0 transition-colors group"
                    >
                      <span className="text-[12px] font-bold tracking-[1.5px] text-white group-hover:text-[#F5C400] transition-colors">{c.label}</span>
                      <span className="text-[10px] text-white/35 mt-0.5">{c.sub}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Links rápidos de categoria */}
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-white/50 text-[11px] font-semibold tracking-[1.5px] uppercase hover:text-white transition-colors px-3 py-2 relative group"
              >
                {c.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-[#F5C400] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}

            <span className="w-px h-4 bg-white/10 mx-2" />

            {topLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/35 text-[11px] font-medium tracking-[1.5px] uppercase hover:text-white/70 transition-colors px-3 py-2"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <AccountMenu />

            <button
              onClick={() => setCartOpen(true)}
              className="hidden md:flex items-center gap-2 border border-[rgba(245,196,0,0.3)] text-white px-4 py-2 text-[11px] font-semibold tracking-[1.5px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black hover:border-[#F5C400] transition-all"
            >
              <ShoppingCart size={13} />
              Carrinho
              {count > 0 && (
                <span className="bg-[#F5C400] text-black rounded-full w-[18px] h-[18px] text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button onClick={() => setCartOpen(true)} className="md:hidden relative p-2">
              <ShoppingCart size={20} className="text-white" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F5C400] text-black rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
              {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Barra de categorias secundária — desktop pequeno */}
        <div className="hidden md:flex lg:hidden items-center gap-6 px-[5%] h-[36px] border-t border-white/[0.05]">
          {categories.map((c) => (
            <Link key={c.href} href={c.href}
              className="text-white/50 text-[10px] font-semibold tracking-[2px] uppercase hover:text-[#F5C400] transition-colors">
              {c.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-[#060606]/98 backdrop-blur-xl flex flex-col pt-8 px-[7%] gap-1 overflow-y-auto">
          <p className="text-[9px] tracking-[4px] uppercase text-white/30 font-semibold mb-3">Catálogo</p>
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              onClick={() => setMenuOpen(false)}
              className="flex flex-col py-4 border-b border-white/[0.06] group"
            >
              <span className="font-display text-[28px] tracking-[2px] text-white group-hover:text-[#F5C400] transition-colors">{c.label.toUpperCase()}</span>
              <span className="text-[11px] text-white/30 mt-0.5">{c.sub}</span>
            </Link>
          ))}

          <div className="mt-6 flex flex-col gap-4">
            {topLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-white/40 text-[14px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMenuOpen(false)}
              className="text-white/40 text-[14px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors">
              Minha Conta
            </Link>
          </div>

          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="mt-8 bg-[#F5C400] text-black px-10 py-4 font-display text-[22px] tracking-[2px] rounded-sm w-full"
          >
            CARRINHO {count > 0 && `(${count})`}
          </button>
        </div>
      )}
    </>
  );
}
