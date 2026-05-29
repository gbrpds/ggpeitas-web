const items = [
  'Brasil 2026', 'Modelo Jogador', 'Frete Grátis acima R$500',
  'Portugal 2026', 'Real Madrid', 'Barcelona',
  'Pix · Cartão · Parcelamento', 'GG Peitas Premium',
];

export function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#F5C400] py-3 overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-0 animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-condensed text-[13px] font-bold tracking-[3px] uppercase text-black px-9 flex items-center gap-5"
          >
            <span className="text-[8px] opacity-60">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
