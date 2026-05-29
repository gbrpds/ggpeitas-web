'use client';
import { useStore } from '@/lib/store';
import { products } from '@/lib/products';

const features = [
  { icon: '⚽', title: 'Modelo Jogador Autêntico', desc: 'Mesma versão usada pelos atletas em campo. Qualidade de jogo.' },
  { icon: '🌬️', title: 'Tecnologia Dri-FIT ADV', desc: 'Tecido de alta performance que mantém você seco e confortável.' },
  { icon: '✨', title: 'Acabamento Premium', desc: 'Detalhes bordados, escudo oficial e numeração de alta qualidade.' },
  { icon: '📦', title: 'Envio em até 48h', desc: 'Embalagem especial com nota fiscal e garantia de autenticidade.' },
];

export function DestaqueSection() {
  const { openModal } = useStore();
  const brasil = [products[0], products[1]];

  return (
    <section id="colecao" className="bg-[#050505] py-24 px-[5%] relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 50%,rgba(0,140,58,0.12) 0%,transparent 65%)' }} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Kit cards */}
        <div className="flex gap-4 justify-center order-first md:order-none">
          {brasil.map((p, i) => (
            <div
              key={p.id}
              onClick={() => openModal(p)}
              className="flex-1 max-w-[200px] cursor-pointer group"
              style={{ marginTop: i === 1 ? 40 : 0 }}
            >
              <div
                className="aspect-[3/4] rounded flex items-center justify-center text-[64px] mb-3 overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-300"
                style={{ background: p.bg, border: i === 0 ? '1px solid rgba(0,140,58,0.4)' : '1px solid rgba(245,196,0,0.2)' }}
              >
                <span>{p.icon}</span>
              </div>
              <p className="font-display text-[18px] tracking-wide">{p.name}</p>
              <p className="text-[12px] text-white/40">{p.label}</p>
              <p className="text-[13px] font-semibold text-[#F5C400] mt-1">{p.price}</p>
            </div>
          ))}
        </div>

        {/* Text */}
        <div>
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-4">
            <span className="w-5 h-px bg-[#008C3A]" /> Destaque da Temporada
          </p>
          <h2 className="font-display leading-none tracking-[2px] mb-5" style={{ fontSize: 'clamp(40px,5.5vw,72px)' }}>
            SELEÇÃO<br /><span className="text-[#F5C400]">BRASIL</span><br />2026
          </h2>
          <p className="text-white/40 text-[14px] leading-relaxed font-light mb-8 max-w-[480px]">
            A nova camisa da Seleção Brasileira para a Copa do Mundo 2026. Modelo jogador premium com tecnologia Dri-FIT ADV e acabamento de nível profissional.
          </p>

          <ul className="divide-y divide-white/[0.06] mb-10">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4 py-3">
                <div className="w-7 h-7 rounded-full bg-[rgba(0,140,58,0.15)] border border-[rgba(0,140,58,0.3)] flex items-center justify-center text-[12px] flex-shrink-0 mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <strong className="block text-[13px] text-white mb-0.5">{f.title}</strong>
                  <span className="text-[13px] text-white/50">{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <a href="#loja" className="inline-block bg-[#F5C400] text-black px-10 py-4 font-display text-[20px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors">
            COMPRAR AGORA
          </a>
        </div>
      </div>
    </section>
  );
}
