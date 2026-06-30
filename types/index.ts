export interface Product {
  id: number;
  slug: string;        // URL amigável ex: brasil-2026-home
  name: string;
  label: string;
  cat: string;
  badge: 'novo' | 'jogador' | 'esgotado' | 'retro';
  price: string;
  priceNum: number;
  originalPrice?: string;
  icon: string;
  bg: string;
  images?: string[];
  desc: string;
  filter: 'selecao' | 'clube';
  category: 'selecoes' | 'times-br' | 'retro'; // categoria principal da loja
  specs?: { key: string; val: string }[];
  active?: boolean;   // false = em breve
  stock?: Record<string, number>;
  stockModel?: string; // nome do modelo no banco de estoque (ex: "Brasil 2026 Home")
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}
