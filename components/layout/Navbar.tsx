'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { AccountMenu } from './AccountMenu';
import { products } from '@/lib/products';

const catalogGroups = [
  {
    key: 'selecoes',
    label: 'Seleções',
    emoji: '🌍',
    accent: '#008C3A',
    items: products.filter((p) => p.category === 'selecoes'),
  },
  {
    key: 'times-br',
    label: 'Times & Clubes',
    emoji: '⚽',
    accent: '#F5C400',
    items: products.filter((p) => p.category === 'times-br'),
  },
  {
    key: 'retro',
    label: 'Retrôs',
    emoji: '⭐',
    accent: '#c084fc',
    items: products.filter((p) => p.category === 'retro'),
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const { cartCount, setCartOpen } = useStore();
  const count = cartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-black/95 border-[rgba(245,196,0,0.1)]' : 'bg-black/85 border-[rgba(245,196,0,0.18)] backdrop-blur-xl'
      }`}>
        <div className="flex items-center justify-between px-[5%] h-[64px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image src="/logo.png" alt="GG Peitas" width={38} height={38} className="object-contain drop-shadow-[0_0_8px_rgba(0,140,58,0.5)]" />
            <div className="leading-none">
              <div className="font-display text-[20px] tracking-[3px] text-white">GG <span className="text-[#F5C400]">Peitas</span></div>
              <div className="text-[7px] tracking-[3px] uppercase text-white/35 font-medium">Camisas Premium</div>
            </div>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-1" ref={megaRef}>

            {/* Catálogo com mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold tracking-[2px] uppercase rounded-sm transition-all ${
                megaOpen ? 'text-[#F5C400]' : 'text-white/60 hover:text-white'
              }`}>
                Catálogo <ChevronDown size={11} className={`transition-transform duration-200 ${megaOpen ? 'rotate-180 text-[#F5C400]' : ''}`} />
              </button>

              {/* Ponte invisível para não fechar ao mover o mouse */}
              {megaOpen && <div className="absolute top-full left-0 right-0 h-2" />}

              {/* Mega menu */}
              {megaOpen && (
                <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[640px] bg-[#0f0f0f] border border-white/[0.1] rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
                    <p className="text-[9px] font-bold tracking-[4px] uppercase text-white/25">Catálogo</p>
                    <Link href="/catalogo" onClick={() => setMegaOpen(false)} className="text-[10px] text-[#F5C400] hover:underline font-semibold">
                      Ver tudo →
                    </Link>
                  </div>

                  {/* Grupos */}
                  <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
                    {catalogGroups.map((g) => (
                      <div key={g.key} className="p-4 flex flex-col">
                        <Link
                          href={`/catalogo?cat=${g.key}`}
                          onClick={() => setMegaOpen(false)}
                          className="block text-[10px] font-bold tracking-[2.5px] uppercase mb-3 transition-opacity hover:opacity-70"
                          style={{ color: g.accent }}
                        >
                          {g.label}
                        </Link>
                        <div className="flex flex-col flex-1">
                          {g.items.slice(0, 4).map((p) => (
                            <Link
                              key={p.id}
                              href={`/produto/${p.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-2 py-1.5 group"
                            >
                              <div className="w-7 h-7 rounded overflow-hidden flex-shrink-0 relative border border-white/[0.06]" style={{ background: p.bg }}>
                                {p.images?.[0] ? (
                                  <Image src={p.images[0]} alt="" fill className="object-cover" sizes="28px" />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-[11px]">{p.icon}</div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] text-white/55 group-hover:text-white transition-colors truncate leading-tight">
                                  {p.name} {p.label}
                                </p>
                                {p.active === false && (
                                  <p className="text-[8px] text-white/25">Em Breve</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                        {g.items.length > 4 && (
                          <Link
                            href={`/catalogo?cat=${g.key}`}
                            onClick={() => setMegaOpen(false)}
                            className="mt-3 text-[9px] font-bold tracking-[2px] uppercase border-t border-white/[0.06] pt-3 transition-opacity hover:opacity-70"
                            style={{ color: g.accent }}
                          >
                            Ver mais {g.items.length - 4} →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className="w-px h-4 bg-white/10 mx-1" />

            <Link href="/sobre" className="px-4 py-2 text-[11px] font-bold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="/#contato" className="px-4 py-2 text-[11px] font-bold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">
              Contato
            </Link>
          </div>

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
                <span className="bg-[#F5C400] text-black rounded-full w-[18px] h-[18px] text-[10px] font-bold flex items-center justify-center">{count}</span>
              )}
            </button>

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
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-[#060606]/98 backdrop-blur-xl flex flex-col pt-6 px-[7%] overflow-y-auto">
          {catalogGroups.map((g) => (
            <div key={g.key} className="border-b border-white/[0.06] py-4">
              <Link href={`/catalogo?cat=${g.key}`} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 mb-3">
                <span>{g.emoji}</span>
                <span className="font-display text-[22px] tracking-[2px]" style={{ color: g.accent }}>{g.label.toUpperCase()}</span>
              </Link>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {g.items.map((p) => (
                  <Link key={p.id} href={`/produto/${p.slug}`} onClick={() => setMenuOpen(false)}
                    className="text-[12px] text-white/40 hover:text-white transition-colors py-1 truncate">
                    {p.name} {p.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-3 py-6">
            <Link href="/sobre" onClick={() => setMenuOpen(false)} className="text-[14px] font-semibold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">Sobre</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="text-[14px] font-semibold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">Minha Conta</Link>
          </div>
          <button onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="mb-8 bg-[#F5C400] text-black px-10 py-4 font-display text-[22px] tracking-[2px] rounded-sm w-full">
            CARRINHO {count > 0 && `(${count})`}
          </button>
        </div>
      )}
    </>
  );
}
