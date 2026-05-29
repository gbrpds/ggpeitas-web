'use client';
import { X, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';

export function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal, cartCount } = useStore();
  const subtotal = cartTotal();
  const frete = subtotal >= 50000 ? 0 : 2990;
  const total = subtotal + frete;
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
          <h3 className="font-display text-[28px] tracking-[2px]">SACOLA</h3>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-white/40 py-20">
              <ShoppingBag size={52} strokeWidth={1} />
              <div className="text-center">
                <p className="font-semibold text-[15px] text-white/60 mb-1">Sacola vazia</p>
                <p className="text-[13px]">Adicione produtos para continuar</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4">
                  <div
                    className="w-[68px] h-[68px] rounded flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-condensed text-[18px] font-bold tracking-wide">{item.name}</p>
                    <p className="text-[11px] text-white/40 mt-1">Tam {item.size} · Qtd {item.qty}</p>
                    <p className="text-[15px] font-bold text-[#F5C400] mt-1">{item.price}</p>
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
            <div className="flex justify-between text-[13px] text-white/60 mb-2">
              <span>Frete</span>
              <span className={frete === 0 ? 'text-[#008C3A] font-semibold' : ''}>
                {frete === 0 ? 'GRÁTIS' : fmt(frete)}
              </span>
            </div>
            {frete > 0 && (
              <p className="text-[11px] text-[#008C3A] mb-3">
                🎁 Falta {fmt(50000 - subtotal)} para frete grátis
              </p>
            )}
            {frete === 0 && (
              <p className="text-[11px] text-[#008C3A] mb-3">✓ Você ganhou frete grátis!</p>
            )}
            <div className="flex justify-between font-display text-[24px] text-[#F5C400] border-t border-[rgba(245,196,0,0.2)] pt-3 mb-4">
              <span>TOTAL</span><span>{fmt(total)}</span>
            </div>
            <button className="w-full bg-[#F5C400] text-black py-4 font-display text-[22px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors">
              FINALIZAR COMPRA
            </button>
            <p className="text-center text-[10px] text-white/25 mt-3 tracking-wider uppercase">
              🔒 Pix · Cartão · Parcelamento
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
