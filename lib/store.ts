import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface Store {
  cart: CartItem[];
  cartOpen: boolean;
  modalProduct: Product | null;
  selectedSize: string | null;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQty: (productId: number, size: string, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  openModal: (product: Product) => void;
  closeModal: () => void;
  setSelectedSize: (size: string | null) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  cartOpen: false,
  modalProduct: null,
  selectedSize: null,

  addToCart: (product, size) => {
    set((state) => {
      const existing = state.cart.find(
        (c) => c.id === product.id && c.size === size
      );
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === product.id && c.size === size
              ? { ...c, qty: c.qty + 1 }
              : c
          ),
        };
      }
      return { cart: [...state.cart, { ...product, size, qty: 1 }] };
    });
  },

  removeFromCart: (productId, size) => {
    set((state) => ({
      cart: state.cart.filter(
        (c) => !(c.id === productId && c.size === size)
      ),
    }));
  },

  updateQty: (productId, size, delta) => {
    set((state) => ({
      cart: state.cart
        .map((c) =>
          c.id === productId && c.size === size
            ? { ...c, qty: c.qty + delta }
            : c
        )
        .filter((c) => c.qty > 0),
    }));
  },

  clearCart: () => set({ cart: [] }),

  setCartOpen: (open) => set({ cartOpen: open }),
  openModal: (product) => set({ modalProduct: product, selectedSize: null }),
  closeModal: () => set({ modalProduct: null, selectedSize: null }),
  setSelectedSize: (size) => set({ selectedSize: size }),

  cartTotal: () =>
    get().cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0),
  cartCount: () =>
    get().cart.reduce((sum, item) => sum + item.qty, 0),
}));
