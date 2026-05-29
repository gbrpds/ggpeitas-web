'use client';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';

export function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, clearCart, cartTotal, cartCount } = useStore();
  const subtotal = cartTotal();
  const total = subtotal; // frete sempre grátis
  const fmt = (n: number) => `R$ ${(n / 100).toFixed(2).replace('.', ',')}`;


  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[290] bg-black/60 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] z-[300] bg-[#111] border-l border-[rgba(245,196,0,0.15)] flex flex-col transition-transform duration-300 ease-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07] sticky top-0 bg-[#111] z-10">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-[28px] tracking-[2px]">CARRINHO</h3>
            {cart.length > 0 && (
              <span className="bg-[#F5C400] text-black text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                title="Esvaziar carrinho"
                className="flex items-center gap-1.5 text-white/30 hover:text-red-400 transition-colors text-[11px] tracking-wide uppercase mr-2"
              >
                <Trash2 size={14} /> Esvaziar
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-white/40 py-20">
              <ShoppingCart size={52} strokeWidth={1} />
              <div className="text-center">
                <p className="font-semibold text-[15px] text-white/60 mb-1">Carrinho vazio</p>
                <p className="text-[13px]">Adicione produtos para continuar</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4">
                  {/* Imagem do produto */}
                  <div
                    className="w-[72px] h-[72px] rounded overflow-hidden flex-shrink-0 relative"
                    style={{ background: item.bg }}
                  >
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-condensed text-[17px] font-bold tracking-wide leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-white/40 mt-0.5">Tam {item.size}</p>
                    <p className="text-[15px] font-bold text-[#F5C400] mt-1">{item.price}</p>

                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.size, -1)}
                        className="w-7 h-7 rounded border border-white/20 flex items-center justify-center hover:border-[#F5C400] hover:text-[#F5C400] transition-all"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[14px] font-bold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.size, 1)}
                        className="w-7 h-7 rounded border border-white/20 flex items-center justify-center hover:border-[#F5C400] hover:text-[#F5C400] transition-all"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-white/25 hover:text-red-400 transition-colors self-start mt-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-white/[0.07] bg-[#111]">
            <div className="flex justify-between text-[13px] text-white/60 mb-2">
              <span>Subtotal</span><span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[13px] mb-1">
              <span className="text-white/60">Frete</span>
              <span className="text-[#008C3A] font-semibold">GRÁTIS</span>
            </div>
            <p className="text-[11px] text-[#008C3A] mb-3">✓ Você ganhou FRETE GRÁTIS!</p>
            <div className="flex justify-between font-display text-[24px] text-[#F5C400] border-t border-[rgba(245,196,0,0.2)] pt-3 mb-4">
              <span>TOTAL</span><span>{fmt(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full block text-center bg-[#F5C400] text-black py-4 font-display text-[22px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors"
            >
              FINALIZAR COMPRA
            </Link>
            <p className="text-center text-[10px] text-white/25 mt-3 tracking-wider uppercase">
              🔒 Pix · Cartão · Parcelamento
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
