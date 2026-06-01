export interface Product {
  id: number;
  name: string;
  label: string;
  cat: string;
  badge: 'novo' | 'jogador' | 'esgotado';
  price: string;
  priceNum: number;
  originalPrice?: string;
  icon: string;
  bg: string;
  images?: string[];
  desc: string;
  filter: 'selecao' | 'clube';
  specs?: { key: string; val: string }[];
  active?: boolean; // false = em breve, não aparece na vitrine
  stock?: Record<string, number>; // tamanho → qtd disponível
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}
