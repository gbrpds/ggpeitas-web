export interface Product {
  id: number;
  name: string;
  label: string;
  cat: string;
  badge: 'novo' | 'jogador' | 'esgotado';
  price: string;
  priceNum: number;
  icon: string;
  bg: string;
  desc: string;
  filter: 'selecao' | 'clube';
  specs?: { key: string; val: string }[];
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}
