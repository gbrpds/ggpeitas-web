'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { AccountMenu } from './AccountMenu';
import { products } from '@/lib/products';

const catalogGroups = [
  {
    key: 'selecoes',
    label: 'Seleções',
    accent: '#008C3A',
    items: products.filter((p) => p.category === 'selecoes'),
  },
  {
    key: 'times-br',
    label: 'Times & Clubes',
    accent: '#F5C400',
    items: products.filter((p) => p.category === 'times-br'),
  },
  {
    key: 'retro',
    label: 'Retrôs',
    accent: '#c084fc',
    items: products.filter((p) => p.category === 'retro'),
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { cartCount, setCartOpen } = useStore();
  const count = cartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fechar menu mobile ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-black/95 border-[rgba(245,196,0,0.1)]' : 'bg-black/85 border-[rgba(245,196,0,0.18)] backdrop-blur-xl'
      }`}>
        <div className="flex items-center justify-between px-[5%] h-[64px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.png" alt="GG Peitas" width={38} height={38} className="object-contain drop-shadow-[0_0_8px_rgba(0,140,58,0.5)]" />
            <div className="leading-none">
              <div className="font-display text-[20px] tracking-[3px] text-white">GG <span className="text-[#F5C400]">Peitas</span></div>
              <div className="text-[7px] tracking-[3px] uppercase text-white/35 font-medium">Camisas Premium</div>
            </div>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-1">

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

              {/* Ponte invisível */}
              {megaOpen && <div className="absolute top-full left-0 right-0 h-2" />}

              {/* Mega menu */}
              {megaOpen && (
                <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[820px] bg-[#0d0d0d] border border-white/[0.1] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.95)] overflow-hidden">

                  {/* Header */}
                  <div className="px-7 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/25">Catálogo completo</p>
                    <Link href="/catalogo" onClick={() => setMegaOpen(false)} className="flex items-center gap-1 text-[11px] text-[#F5C400] hover:underline font-semibold">
                      Ver tudo <ChevronRight size={12} />
                    </Link>
                  </div>

                  {/* Grupos */}
                  <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
                    {catalogGroups.map((g) => (
                      <div key={g.key} className="p-6 flex flex-col gap-4">
                        {/* Título da categoria */}
                        <Link
                          href={`/catalogo?cat=${g.key}`}
                          onClick={() => setMegaOpen(false)}
                          className="flex items-center justify-between group/cat"
                          style={{ color: g.accent }}
                        >
                          <span className="text-[11px] font-bold tracking-[3px] uppercase">{g.label}</span>
                          <ChevronRight size={13} className="opacity-50 group-hover/cat:opacity-100 transition-opacity" />
                        </Link>

                        {/* Itens */}
                        <div className="flex flex-col gap-1">
                          {g.items.slice(0, 5).map((p) => (
                            <Link
                              key={p.id}
                              href={`/produto/${p.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-3 py-2 px-2 rounded-lg group hover:bg-white/[0.04] transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/[0.08]" style={{ background: p.bg }}>
                                {p.images?.[0] ? (
                                  <Image src={p.images[0]} alt="" fill className="object-cover" sizes="40px" />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-[14px]">{p.icon}</div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[12px] text-white/60 group-hover:text-white transition-colors truncate leading-tight font-medium">
                                  {p.name} <span className="text-white/35 font-normal">{p.label}</span>
                                </p>
                                {p.active === false && (
                                  <p className="text-[10px] text-white/25 mt-0.5">Em breve</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>

                        {g.items.length > 5 && (
                          <Link
                            href={`/catalogo?cat=${g.key}`}
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[2px] uppercase border-t border-white/[0.06] pt-4 transition-opacity hover:opacity-70"
                            style={{ color: g.accent }}
                          >
                            Ver mais {g.items.length - 5} →
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

      {/* ── Menu Mobile ── */}
      {menuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-[#080808] flex flex-col overflow-y-auto">

          {/* Categorias */}
          <div className="flex-1 px-5 pt-4 pb-6">
            {catalogGroups.map((g) => (
              <div key={g.key} className="border-b border-white/[0.06]">
                {/* Cabeçalho do grupo */}
                <button
                  onClick={() => setOpenGroup(openGroup === g.key ? null : g.key)}
                  className="flex items-center justify-between w-full py-4"
                >
                  <span className="font-display text-[20px] tracking-[2px]" style={{ color: g.accent }}>
                    {g.label.toUpperCase()}
                  </span>
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ color: g.accent, transform: openGroup === g.key ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Itens expandidos */}
                {openGroup === g.key && (
                  <div className="pb-3 flex flex-col gap-1">
                    {g.items.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produto/${p.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/[0.08]" style={{ background: p.bg }}>
                          {p.images?.[0] ? (
                            <Image src={p.images[0]} alt="" fill className="object-cover" sizes="44px" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-[16px]">{p.icon}</div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] text-white/70 truncate font-medium">{p.name} <span className="text-white/35 font-normal">{p.label}</span></p>
                          {p.active === false
                            ? <p className="text-[11px] text-white/25">Em breve</p>
                            : <p className="text-[11px] font-semibold" style={{ color: g.accent }}>{p.price}</p>
                          }
                        </div>
                        <ChevronRight size={14} className="text-white/20 flex-shrink-0" />
                      </Link>
                    ))}
                    <Link
                      href={`/catalogo?cat=${g.key}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-1.5 mt-1 px-2 text-[10px] font-bold tracking-[2px] uppercase opacity-60 hover:opacity-100 transition-opacity"
                      style={{ color: g.accent }}
                    >
                      Ver todos em {g.label} →
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {/* Links extras */}
            <div className="flex flex-col gap-1 pt-5">
              <Link href="/sobre" onClick={() => setMenuOpen(false)}
                className="py-3 text-[13px] font-semibold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">
                Sobre
              </Link>
              <Link href="/#contato" onClick={() => setMenuOpen(false)}
                className="py-3 text-[13px] font-semibold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">
                Contato
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)}
                className="py-3 text-[13px] font-semibold tracking-[2px] uppercase text-white/40 hover:text-white transition-colors">
                Minha Conta
              </Link>
            </div>
          </div>

          {/* Rodapé fixo com botões */}
          <div className="px-5 pb-8 pt-4 border-t border-white/[0.06] flex flex-col gap-3">
            <button
              onClick={() => { setMenuOpen(false); setCartOpen(true); }}
              className="flex items-center justify-center gap-2 bg-[#F5C400] text-black py-4 font-display text-[18px] tracking-[2px] rounded-xl w-full"
            >
              <ShoppingCart size={18} />
              CARRINHO {count > 0 && `(${count})`}
            </button>
            <Link href="/catalogo" onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 border border-white/15 text-white/60 py-3.5 font-display text-[14px] tracking-[2px] rounded-xl w-full hover:border-white/30 hover:text-white transition-all">
              VER CATÁLOGO COMPLETO →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
