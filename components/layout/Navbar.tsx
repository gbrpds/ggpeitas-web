'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { AccountMenu } from './AccountMenu';

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

  const links = [
    { href: '#loja', label: 'Loja' },
    { href: '#colecao', label: 'Coleção' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[68px] transition-all duration-300 border-b ${
          scrolled
            ? 'bg-black/95 border-[rgba(245,196,0,0.12)]'
            : 'bg-black/75 border-[rgba(245,196,0,0.2)] backdrop-blur-xl'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="GG Peitas" width={44} height={44} className="object-contain drop-shadow-[0_0_8px_rgba(0,140,58,0.5)]" />
          <div className="leading-none">
            <div className="font-display text-[22px] tracking-[3px] text-white">
              GG <span className="text-[#F5C400]">Peitas</span>
            </div>
            <div className="text-[8px] tracking-[3px] uppercase text-white/40 font-body font-medium">
              Camisas Premium
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-white/50 text-[11px] font-semibold tracking-[2px] uppercase hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#F5C400] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Conta (desktop) */}
          <AccountMenu />

          {/* Carrinho (desktop) */}
          <button
            onClick={() => setCartOpen(true)}
            className="hidden md:flex items-center gap-2 border border-[rgba(245,196,0,0.3)] text-white px-4 py-2 text-[11px] font-semibold tracking-[1.5px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black hover:border-[#F5C400] transition-all"
          >
            <ShoppingCart size={14} />
            Carrinho
            {count > 0 && (
              <span className="bg-[#F5C400] text-black rounded-full w-[18px] h-[18px] text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Mobile cart icon */}
          <button onClick={() => setCartOpen(true)} className="md:hidden relative p-2">
            <ShoppingCart size={20} className="text-white" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F5C400] text-black rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[68px] z-40 bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-[44px] tracking-[3px] text-white hover:text-[#F5C400] transition-colors"
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)}
            className="font-display text-[28px] tracking-[3px] text-white/50 hover:text-[#F5C400] transition-colors">
            ENTRAR / CONTA
          </Link>
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="mt-4 bg-[#F5C400] text-black px-10 py-4 font-display text-[22px] tracking-[2px] rounded-sm"
          >
            CARRINHO {count > 0 && `(${count})`}
          </button>
        </div>
      )}
    </>
  );
}
