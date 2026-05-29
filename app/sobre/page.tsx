import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Target, Heart, ShieldCheck, Package, Star } from 'lucide-react';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-[68px]">

      {/* Hero */}
      <section className="relative py-28 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,196,0,0.07),transparent_60%)]" />
        <div className="max-w-[900px] mx-auto relative">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#F5C400] mb-4">
            <span className="w-5 h-px bg-[#F5C400]" /> Nossa história
          </p>
          <h1 className="font-display leading-none tracking-[2px] mb-6" style={{ fontSize: 'clamp(48px,7vw,96px)' }}>
            FUTEBOL.<br />
            <span className="text-[#F5C400]">ESTILO.</span><br />
            PRESENÇA.
          </h1>
          <p className="text-white/50 text-[16px] leading-relaxed max-w-[580px]">
            A GG Peitas nasceu da paixão pelo futebol e pela vontade de trazer camisetas de qualidade importada para quem realmente entende de estilo dentro e fora de campo.
          </p>
        </div>
      </section>

      {/* Sobre a empresa */}
      <section className="py-20 px-[5%] border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-4">
              <span className="w-5 h-px bg-[#008C3A]" /> Quem somos
            </p>
            <h2 className="font-display text-[40px] tracking-[1px] leading-tight mb-6">
              CRIADA POR<br />APAIXONADOS<br />
              <span className="text-[#F5C400]">POR FUTEBOL</span>
            </h2>
            <div className="flex flex-col gap-4 text-white/50 text-[15px] leading-relaxed">
              <p>
                A GG Peitas surgiu no Rio Grande do Sul com um objetivo simples: democratizar o acesso a camisetas importadas de qualidade premium, sem abrir mão da experiência de compra.
              </p>
              <p>
                Sabemos o que é ser torcedor. Sabemos o que é querer representar sua seleção com orgulho, com uma camisa que chega perfeita, bem embalada, e que faz você se sentir especial desde o momento em que abre a caixa.
              </p>
              <p>
                Cada pedido é preparado com cuidado manual, perfumado e enviado com carinho — porque acreditamos que a experiência de compra faz parte do produto.
              </p>
            </div>
          </div>

          {/* Card destaque */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[rgba(245,196,0,0.04)] rounded-3xl blur-2xl" />
            <div className="relative bg-[#111] border border-[rgba(245,196,0,0.15)] rounded-2xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgba(245,196,0,0.1)] flex items-center justify-center">
                  <MapPin size={22} className="text-[#F5C400]" />
                </div>
                <div>
                  <p className="font-bold text-[15px]">Localização</p>
                  <p className="text-white/40 text-[13px]">Rio Grande do Sul, Brasil</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,140,58,0.1)] flex items-center justify-center">
                  <Package size={22} className="text-[#008C3A]" />
                </div>
                <div>
                  <p className="font-bold text-[15px]">Envio para todo o Brasil</p>
                  <p className="text-white/40 text-[13px]">Frete grátis em todos os pedidos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgba(245,196,0,0.1)] flex items-center justify-center">
                  <ShieldCheck size={22} className="text-[#F5C400]" />
                </div>
                <div>
                  <p className="font-bold text-[15px]">Produto 100% importado</p>
                  <p className="text-white/40 text-[13px]">Qualidade premium garantida</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgba(192,132,252,0.1)] flex items-center justify-center">
                  <Star size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-bold text-[15px]">Experiência única</p>
                  <p className="text-white/40 text-[13px]">Embalagem premium + brinde exclusivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 px-[5%] bg-[#0a0a0a] border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#F5C400] mb-3">O que nos move</p>
            <h2 className="font-display text-[48px] tracking-[2px]">NOSSO <span className="text-[#F5C400]">PROPÓSITO</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                color: 'text-[#F5C400]',
                bg: 'bg-[rgba(245,196,0,0.08)]',
                border: 'border-[rgba(245,196,0,0.15)]',
                title: 'Missão',
                desc: 'Entregar camisetas importadas de qualidade premium com uma experiência de compra que vai além do produto — do atendimento até a caixa na sua porta.',
              },
              {
                icon: Heart,
                color: 'text-red-400',
                bg: 'bg-[rgba(248,113,113,0.08)]',
                border: 'border-[rgba(248,113,113,0.15)]',
                title: 'Paixão',
                desc: 'Somos torcedores antes de sermos lojistas. Cada camisa que enviamos representa a emoção do futebol — e isso está em cada detalhe do que fazemos.',
              },
              {
                icon: ShieldCheck,
                color: 'text-[#008C3A]',
                bg: 'bg-[rgba(0,140,58,0.08)]',
                border: 'border-[rgba(0,140,58,0.15)]',
                title: 'Compromisso',
                desc: 'Transparência, qualidade e respeito ao cliente. Cada pedido é tratado com a seriedade que você merece — do pagamento à entrega.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`${item.bg} border ${item.border} rounded-xl p-7`}>
                  <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-5`}>
                    <Icon size={22} className={item.color} />
                  </div>
                  <h3 className={`font-display text-[24px] tracking-wide mb-3 ${item.color}`}>{item.title}</h3>
                  <p className="text-white/50 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%] border-t border-white/[0.06]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-display text-[48px] tracking-[2px] mb-4">
            PRONTO PARA <span className="text-[#F5C400]">JOGAR</span>?
          </h2>
          <p className="text-white/40 text-[15px] mb-8 leading-relaxed">
            Explore nossa coleção e vista a camisa da sua seleção com o estilo que ela merece.
          </p>
          <Link
            href="/#loja"
            className="inline-flex items-center gap-3 bg-[#F5C400] text-black px-10 py-4 font-display text-[20px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors"
          >
            VER COLEÇÃO
          </Link>
        </div>
      </section>

    </div>
  );
}
