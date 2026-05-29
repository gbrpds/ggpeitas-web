const items = [
  { icon: '🏆', title: 'Produto Original', desc: 'Trabalhamos apenas com importações originais. Cada peça com autenticidade garantida e nota fiscal.' },
  { icon: '👕', title: 'Modelo Jogador', desc: 'A versão usada em campo pelos atletas profissionais. Sem recortes de custo, sem versão torcedor.' },
  { icon: '⚡', title: 'Envio Rápido', desc: 'Pedidos processados em 24h. Envio via Correios ou transportadora com rastreamento em tempo real.' },
  { icon: '💳', title: 'Pague Como Quiser', desc: 'PIX com desconto, cartão em até 12x, Mercado Pago e muito mais.' },
  { icon: '🔒', title: 'Compra Segura', desc: 'Plataforma com criptografia SSL, dados protegidos e política de troca em até 7 dias.' },
  { icon: '💬', title: 'Suporte Ativo', desc: 'Atendimento via WhatsApp e Instagram. Respondemos em até 2h no horário comercial.' },
];

export function WhySection() {
  return (
    <section id="sobre" className="bg-[#050505] py-24 px-[5%]">
      <div className="max-w-[600px] mb-14">
        <p className="flex items-center gap-3 text-[10px] font-bold tracking-[4px] uppercase text-[#008C3A] mb-3">
          <span className="w-5 h-px bg-[#008C3A]" /> Por que escolher a GG Peitas
        </p>
        <h2 className="font-display leading-none tracking-[2px]" style={{ fontSize: 'clamp(40px,5.5vw,72px)' }}>
          QUALIDADE<br /><span className="text-[#008C3A]">GARANTIDA</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-white/[0.07] rounded overflow-hidden">
        {items.map((item) => (
          <div
            key={item.title}
            className="p-9 bg-[#111] border-r border-white/[0.07] hover:bg-[rgba(0,140,58,0.06)] transition-colors group relative"
          >
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008C3A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <div className="text-[28px] mb-5">{item.icon}</div>
            <h3 className="font-condensed text-[24px] font-bold tracking-wide mb-2">{item.title}</h3>
            <p className="text-[13px] text-white/50 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
