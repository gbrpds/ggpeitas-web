'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { AccountMenu } from './AccountMenu';

const navLinks = [
  { href: '/catalogo', label: 'Catálogo', highlight: true },
  { href: '/catalogo?cat=selecoes', label: 'Seleções', highlight: false },
  { href: '/catalogo?cat=times-br', label: 'Times', highlight: false },
  { href: '/catalogo?cat=retro', label: 'Retrôs', highlight: false },
  { href: '/sobre', label: 'Sobre', highlight: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useStore();
  const count = cartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[64px] transition-all duration-300 border-b ${
        scrolled ? 'bg-black/95 border-[rgba(245,196,0,0.1)]' : 'bg-black/80 border-[rgba(245,196,0,0.18)] backdrop-blur-xl'
      }`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/logo.png" alt="GG Peitas" width={38} height={38} className="object-contain drop-shadow-[0_0_8px_rgba(0,140,58,0.5)]" />
          <div className="leading-none">
            <div className="font-display text-[20px] tracking-[3px] text-white">GG <span className="text-[#F5C400]">Peitas</span></div>
            <div className="text-[7px] tracking-[3px] uppercase text-white/35 font-medium">Camisas Premium</div>
          </div>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative px-4 py-2 text-[11px] font-bold tracking-[2px] uppercase transition-colors group rounded-sm ${
                  l.highlight
                    ? 'text-[#F5C400] hover:text-black hover:bg-[#F5C400]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {l.label}
                {!l.highlight && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#F5C400] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block"><AccountMenu /></div>

          <button
            onClick={() => setCartOpen(true)}
            className="hidden md:flex items-center gap-2 border border-[rgba(245,196,0,0.3)] text-white px-4 py-2 text-[11px] font-bold tracking-[1.5px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black hover:border-[#F5C400] transition-all"
          >
            <ShoppingCart size={13} />
            Carrinho
            {count > 0 && (
              <span className="bg-[#F5C400] text-black rounded-full w-[18px] h-[18px] text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Mobile */}
          <button onClick={() => setCartOpen(true)} className="md:hidden relative p-2">
            <ShoppingCart size={20} className="text-white" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F5C400] text-black rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center">{count}</span>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-[#060606]/98 backdrop-blur-xl flex flex-col pt-8 px-[7%] gap-1 overflow-y-auto">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className={`py-4 border-b border-white/[0.06] font-display text-[32px] tracking-[2px] transition-colors ${
                l.highlight ? 'text-[#F5C400]' : 'text-white hover:text-[#F5C400]'
              }`}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)}
            className="py-4 border-b border-white/[0.06] font-display text-[32px] tracking-[2px] text-white/40 hover:text-white transition-colors">
            CONTA
          </Link>
          <button onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="mt-8 bg-[#F5C400] text-black px-10 py-4 font-display text-[22px] tracking-[2px] rounded-sm w-full">
            CARRINHO {count > 0 && `(${count})`}
          </button>
        </div>
      )}
    </>
  );
}
