'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';

const SIZES = ['P', 'M', 'G', 'GG', 'XGG'];

export function ProductModal() {
  const { modalProduct, closeModal, selectedSize, setSelectedSize, addToCart } = useStore();
  const { show } = useToast();
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [modalProduct?.id]);

  if (!modalProduct) return null;

  const images = modalProduct.images ?? [];
  const hasImages = images.length > 0;

  const pixPrice = ((modalProduct.priceNum * 0.9) / 100).toFixed(2).replace('.', ',');

  const handleAdd = () => {
    if (!selectedSize) { show('⚠️ Selecione um tamanho!'); return; }
    addToCart(modalProduct, selectedSize);
    closeModal();
    show(`✅ ${modalProduct.name} (${selectedSize}) adicionado!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { show('⚠️ Selecione um tamanho!'); return; }
    addToCart(modalProduct, selectedSize);
    closeModal();
    router.push('/checkout');
  };

  const prev = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg((i) => (i + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/88 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="bg-[#181818] border border-[rgba(245,196,0,0.2)] rounded-lg w-full max-w-[960px] max-h-[92vh] overflow-hidden relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[92vh]">
          {/* Gallery */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/[0.07] md:overflow-y-auto">
            {/* Main image — proporção 3:4 */}
            <div
              className="relative aspect-[3/4] w-full flex items-center justify-center overflow-hidden"
              style={hasImages ? {} : { background: modalProduct.bg }}
            >
              {hasImages ? (
                <>
                  <Image
                    src={images[activeImg]}
                    alt={`${modalProduct.name} - foto ${activeImg + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all z-10"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-[#F5C400] hover:text-black transition-all z-10"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <span className="relative z-10 text-[120px]">{modalProduct.icon}</span>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 p-3 border-t border-white/[0.07] overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                      i === activeImg ? 'border-[#F5C400]' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Image src={src} alt={`Miniatura ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 md:overflow-y-auto">
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
                onClick={handleBuyNow}
                className="w-full bg-[#008C3A] text-white py-4 font-display text-[22px] tracking-[2px] rounded-sm hover:bg-[#006B2D] transition-colors"
              >
                COMPRAR AGORA
              </button>
            </div>

            <div className="bg-[rgba(0,140,58,0.08)] border border-[rgba(0,140,58,0.2)] rounded-sm p-3 text-[11px] text-white/60 mb-5">
              📦 Frete Grátis · Envio Rápido · Rastreamento Incluso
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
