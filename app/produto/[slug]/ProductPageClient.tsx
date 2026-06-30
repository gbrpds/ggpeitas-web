'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Product } from '@/types';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Truck, Shield, Zap, ChevronDown, ChevronUp, Clock } from 'lucide-react';

const ALL_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

// Tabela de medidas padrão de camisas de futebol
const sizeChart = [
  { size: 'PP', busto: '88–92', ombro: '42', comprimento: '68' },
  { size: 'P',  busto: '92–96', ombro: '44', comprimento: '70' },
  { size: 'M',  busto: '96–100', ombro: '46', comprimento: '72' },
  { size: 'G',  busto: '100–104', ombro: '48', comprimento: '74' },
  { size: 'GG', busto: '104–110', ombro: '50', comprimento: '76' },
  { size: 'XGG', busto: '110–118', ombro: '52', comprimento: '78' },
];

function getSuggestedSize(height: number, weight: number): string {
  const bmi = weight / ((height / 100) ** 2);
  if (height < 163) return bmi > 26 ? 'M' : 'P';
  if (height < 170) return bmi > 27 ? 'G' : bmi > 24 ? 'M' : 'P';
  if (height < 177) return bmi > 28 ? 'GG' : bmi > 24 ? 'G' : 'M';
  if (height < 183) return bmi > 28 ? 'XGG' : bmi > 25 ? 'GG' : 'G';
  return bmi > 28 ? 'XGG' : 'GG';
}

function SizeAdvisor({ onSelect }: { onSelect: (s: string) => void }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const h = parseInt(height);
    const w = parseInt(weight);
    if (!h || !w || h < 140 || h > 220 || w < 40 || w > 180) return;
    setResult(getSuggestedSize(h, w));
  };

  return (
    <div className="bg-[#111] border border-white/[0.08] rounded-xl p-5">
      <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#F5C400] mb-4 flex items-center gap-2">
        <span>📏</span> Provador Virtual
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[10px] text-white/40 uppercase tracking-[1.5px] mb-1 block">Altura (cm)</label>
          <input
            type="number" value={height} onChange={(e) => setHeight(e.target.value)}
            placeholder="Ex: 175"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/20 focus:border-[#F5C400] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] text-white/40 uppercase tracking-[1.5px] mb-1 block">Peso (kg)</label>
          <input
            type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
            placeholder="Ex: 75"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-2.5 text-[14px] text-white placeholder-white/20 focus:border-[#F5C400] focus:outline-none transition-colors"
          />
        </div>
      </div>
      <button
        onClick={calculate}
        className="w-full bg-[rgba(245,196,0,0.1)] border border-[rgba(245,196,0,0.25)] text-[#F5C400] py-2.5 text-[11px] font-bold tracking-[2px] uppercase rounded-sm hover:bg-[rgba(245,196,0,0.2)] transition-colors"
      >
        Calcular meu tamanho
      </button>
      {result && (
        <div className="mt-4 bg-[rgba(0,140,58,0.08)] border border-[rgba(0,140,58,0.25)] rounded-lg p-4 text-center">
          <p className="text-[11px] text-white/50 mb-1">Tamanho sugerido para você</p>
          <p className="font-display text-[40px] text-[#008C3A] leading-none">{result}</p>
          <button
            onClick={() => onSelect(result)}
            className="mt-3 text-[10px] font-bold tracking-[2px] uppercase text-[#F5C400] hover:underline"
          >
            Selecionar este tamanho →
          </button>
        </div>
      )}
    </div>
  );
}

function RelatedCard({ p }: { p: Product }) {
  return (
    <Link href={`/produto/${p.slug}`}
      className="group bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden hover:border-[rgba(245,196,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="aspect-[4/5] relative overflow-hidden" style={{ background: p.bg }}>
        {p.images?.[0] ? (
          <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[60px] opacity-60">{p.icon}</div>
        )}
        {p.active === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-[#1a1a1a] border border-white/20 text-white/60 text-[9px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-sm flex items-center gap-1.5">
              <Clock size={9} /> Em Breve
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[9px] text-white/35 uppercase tracking-[2px] font-semibold">{p.cat}</p>
        <p className="font-display text-[17px] mt-1">{p.name} <span className="text-white/35 text-[13px]">{p.label}</span></p>
        <p className="text-[#F5C400] font-bold text-[16px] mt-auto pt-2">{p.active !== false ? p.price : 'Em Breve'}</p>
      </div>
    </Link>
  );
}

export function ProductPageClient({ product: p, related }: { product: Product; related: Product[] }) {
  const { addToCart } = useStore();
  const { show } = useToast();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showAdvisor, setShowAdvisor] = useState(false);

  const images = p.images ?? [];
  const stock = p.stock ?? null;
  const hasStock = (s: string) => !stock || (stock[s] !== undefined && stock[s] > 0);
  const stockQty = (s: string) => stock?.[s] ?? null;
  const pixPrice = ((p.priceNum * 0.9) / 100).toFixed(2).replace('.', ',');

  const handleAddToCart = () => {
    if (!selectedSize) { show('Selecione um tamanho'); return; }
    addToCart(p, selectedSize);
    show(`${p.name} ${p.label} (${selectedSize}) adicionado!`);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-[64px]">

      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] px-[5%] py-3">
        <div className="max-w-[1300px] mx-auto flex items-center gap-2 text-[11px] text-white/30">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
          <span>/</span>
          <Link href={`/catalogo?cat=${p.category}`} className="hover:text-white transition-colors capitalize">
            {p.category === 'selecoes' ? 'Seleções' : p.category === 'times-br' ? 'Times' : 'Retrôs'}
          </Link>
          <span>/</span>
          <span className="text-white/60">{p.name} {p.label}</span>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-[5%] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 mb-20">

          {/* ── Galeria de imagens ── */}
          <div className="flex flex-col gap-4">
            {/* Imagem principal */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08]" style={{ background: p.bg }}>
              {images.length > 0 ? (
                <Image key={activeImg} src={images[activeImg]} alt={p.name} fill className="object-cover" sizes="700px" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[120px]">{p.icon}</div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {p.originalPrice && (
                  <span className="bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-sm">-17% OFF</span>
                )}
                {p.active === false && (
                  <span className="bg-[#1a1a1a] border border-white/20 text-white/60 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                    <Clock size={10} /> Em Breve
                  </span>
                )}
              </div>

              {/* Setas de navegação */}
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImg ? 'border-[#F5C400]' : 'border-white/[0.08] opacity-50 hover:opacity-100'
                    }`}
                    style={{ background: p.bg }}>
                    <Image src={img} alt="" fill className="object-cover" sizes="120px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info do produto ── */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#008C3A]">{p.cat}</span>
              </div>
              <h1 className="font-display text-[clamp(28px,4vw,44px)] tracking-[1px] leading-tight mb-1">
                {p.name} <span className="text-white/40 text-[70%]">{p.label}</span>
              </h1>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-[#F5C400] text-[#F5C400]" />)}
                <span className="text-[11px] text-white/35 ml-1">Modelo Jogador · Importado</span>
              </div>
            </div>

            {/* Preço */}
            <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5">
              {p.originalPrice && (
                <p className="text-[12px] text-white/30 line-through mb-0.5">{p.originalPrice}</p>
              )}
              <p className="font-display text-[38px] text-[#F5C400] leading-none">{p.price}</p>
              <p className="text-[#008C3A] text-[13px] mt-1 font-semibold">R$ {pixPrice} no PIX <span className="text-white/30 font-normal">(10% off)</span></p>
              <p className="text-white/30 text-[11px] mt-1">ou em até <span className="text-white/60 font-semibold">12x no cartão</span></p>
            </div>

            {/* Tamanhos */}
            {p.active !== false && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold tracking-[2px] uppercase text-white/60">Tamanho</p>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-[10px] text-[#F5C400] hover:underline flex items-center gap-1"
                  >
                    Guia de tamanhos {showSizeChart ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2 mb-3">
                  {ALL_SIZES.map((s) => {
                    const avail = hasStock(s);
                    const qty = stockQty(s);
                    return (
                      <button
                        key={s}
                        disabled={!avail}
                        onClick={() => setSelectedSize(s)}
                        className={`relative py-3 text-[12px] font-bold tracking-[1px] rounded-lg border transition-all ${
                          selectedSize === s
                            ? 'bg-[#F5C400] text-black border-[#F5C400]'
                            : avail
                            ? 'bg-[#161616] border-white/10 text-white hover:border-[#F5C400] hover:text-[#F5C400]'
                            : 'bg-[#0d0d0d] border-white/[0.05] text-white/20 cursor-not-allowed'
                        }`}
                      >
                        {!avail && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="absolute w-full h-px bg-white/15 rotate-45" />
                          </span>
                        )}
                        {s}
                        {avail && qty !== null && qty <= 2 && (
                          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{qty}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Guia de tamanhos */}
                {showSizeChart && (
                  <div className="mb-4 overflow-x-auto rounded-lg border border-white/[0.08]">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="bg-[#111] border-b border-white/[0.07]">
                          {['Tam', 'Busto (cm)', 'Ombro (cm)', 'Comprimento (cm)'].map((h) => (
                            <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold tracking-[2px] uppercase text-white/40">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChart.map((row, i) => (
                          <tr key={row.size} className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#111]'} ${selectedSize === row.size ? 'ring-1 ring-inset ring-[rgba(245,196,0,0.3)]' : ''}`}>
                            <td className="px-3 py-2.5 font-bold text-[#F5C400]">{row.size}</td>
                            <td className="px-3 py-2.5 text-white/60">{row.busto}</td>
                            <td className="px-3 py-2.5 text-white/60">{row.ombro}</td>
                            <td className="px-3 py-2.5 text-white/60">{row.comprimento}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Provador virtual */}
                <button
                  onClick={() => setShowAdvisor(!showAdvisor)}
                  className="w-full flex items-center justify-between text-[11px] text-white/40 hover:text-white/70 transition-colors py-2 mb-2"
                >
                  <span className="flex items-center gap-2">📏 Não sabe seu tamanho? Use o provador virtual</span>
                  {showAdvisor ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                {showAdvisor && (
                  <SizeAdvisor onSelect={(s) => { setSelectedSize(s); setShowAdvisor(false); }} />
                )}
              </div>
            )}

            {/* CTA ou Avisar */}
            {p.active !== false ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#008C3A] text-white py-4 font-display text-[20px] tracking-[2px] rounded-xl hover:bg-[#006B2D] transition-colors flex items-center justify-center gap-3 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,140,58,0.3)] transition-all"
              >
                <ShoppingBag size={20} /> ADICIONAR AO CARRINHO
              </button>
            ) : (
              <a
                href={`https://wa.me/5551991870608?text=${encodeURIComponent(`Olá! Tenho interesse na camisa *${p.name} ${p.label}* e gostaria de ser avisado quando chegar.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-[#161616] border border-white/10 text-white/50 py-4 font-display text-[18px] tracking-[2px] rounded-xl hover:border-[#F5C400] hover:text-[#F5C400] transition-all flex items-center justify-center gap-3"
              >
                📲 AVISAR-ME QUANDO CHEGAR
              </a>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Frete Grátis', sub: 'Todo o Brasil' },
                { icon: Shield, label: '100% Original', sub: 'Garantido' },
                { icon: Zap, label: 'Envio em 48h', sub: 'Após confirmação' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-[#111] border border-white/[0.06] rounded-lg p-3 text-center">
                  <Icon size={18} className="text-[#F5C400] mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold text-white">{label}</p>
                  <p className="text-[9px] text-white/35">{sub}</p>
                </div>
              ))}
            </div>

            {/* Specs */}
            {p.specs && (
              <div className="border-t border-white/[0.06] pt-5">
                <p className="text-[10px] font-bold tracking-[3px] uppercase text-white/35 mb-3">Detalhes do produto</p>
                <div className="grid grid-cols-2 gap-2">
                  {p.specs.map((s) => (
                    <div key={s.key} className="bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3">
                      <p className="text-[9px] text-white/35 uppercase tracking-[1.5px] mb-0.5">{s.key}</p>
                      <p className="text-[13px] text-white font-semibold">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Produtos Relacionados ── */}
        {related.length > 0 && (
          <div className="border-t border-white/[0.06] pt-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-2">Você também pode gostar</p>
                <h2 className="font-display text-[clamp(24px,3.5vw,40px)] tracking-[1px]">RELACIONADOS</h2>
              </div>
              <Link href={`/catalogo?cat=${p.category}`}
                className="text-[11px] text-[#F5C400] hover:underline font-semibold tracking-[1px]">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => <RelatedCard key={r.id} p={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
