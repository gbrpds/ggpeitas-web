'use client';
import { X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';

const SIZES = ['P', 'M', 'G', 'GG', 'XGG'];

export function ProductModal() {
  const { modalProduct, closeModal, selectedSize, setSelectedSize, addToCart } = useStore();
  const { show } = useToast();

  if (!modalProduct) return null;

  const pixPrice = ((modalProduct.priceNum * 0.9) / 100).toFixed(2).replace('.', ',');

  const handleAdd = () => {
    if (!selectedSize) { show('⚠️ Selecione um tamanho!'); return; }
    addToCart(modalProduct, selectedSize);
    closeModal();
    show(`✅ ${modalProduct.name} (${selectedSize}) adicionado!`);
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/88 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="bg-[#181818] border border-[rgba(245,196,0,0.2)] rounded-lg w-full max-w-[920px] max-h-[92vh] overflow-y-auto relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div
            className="min-h-[260px] md:min-h-[420px] flex items-center justify-center text-[120px] border-b md:border-b-0 md:border-r border-white/[0.07] relative overflow-hidden"
            style={{ background: modalProduct.bg }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <span className="relative z-10">{modalProduct.icon}</span>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10">
            <p className="text-[9px] font-bold tracking-[3px] uppercase text-[#F5C400] mb-3">
              Modelo Jogador · Oficial
            </p>
            <h2 className="font-display text-[42px] tracking-[1px] leading-none mb-2">{modalProduct.name}</h2>
            <p className="text-[12px] text-white/40 mb-4">{modalProduct.cat}</p>
            <p className="text-[13px] text-white/60 leading-relaxed mb-6">{modalProduct.desc}</p>

            <div className="mb-6">
              <span className="block text-[11px] text-white/40 mb-1">Modelo Jogador · A partir de</span>
              <span className="font-bold text-[38px] text-[#F5C400] leading-none">{modalProduct.price}</span>
              <p className="text-[12px] text-[#008C3A] mt-1">R$ {pixPrice} no PIX (10% OFF)</p>
            </div>

            <p className="text-[10px] font-bold tracking-[2px] uppercase text-white/40 mb-3">
              Selecione o tamanho
            </p>
            <div className="flex gap-2 flex-wrap mb-6">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-11 h-11 border text-[13px] font-semibold rounded-sm transition-all ${
                    selectedSize === s
                      ? 'border-[#F5C400] bg-[#F5C400] text-black'
                      : 'border-white/20 text-white hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 mb-4">
              <button
                onClick={handleAdd}
                className="w-full bg-[#F5C400] text-black py-4 font-display text-[22px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors"
              >
                ADICIONAR AO CARRINHO
              </button>
              <button
                onClick={handleAdd}
                className="w-full bg-[#008C3A] text-white py-4 font-display text-[22px] tracking-[2px] rounded-sm hover:bg-[#006B2D] transition-colors"
              >
                COMPRAR AGORA
              </button>
            </div>

            <div className="bg-[rgba(0,140,58,0.08)] border border-[rgba(0,140,58,0.2)] rounded-sm p-3 text-[11px] text-white/60 mb-5">
              📦 Frete grátis acima de R$500 · Envio 24–48h · Rastreamento incluso
            </div>

            {modalProduct.specs && (
              <div className="border-t border-white/[0.07] pt-4">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-white/40 mb-3">Especificações</p>
                {modalProduct.specs.map((s) => (
                  <div key={s.key} className="flex justify-between py-2 border-b border-white/[0.05] text-[12px]">
                    <span className="text-white/40">{s.key}</span>
                    <span className="font-medium">{s.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
