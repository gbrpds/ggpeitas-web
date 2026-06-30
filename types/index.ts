export interface Product {
  id: number;
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
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}
