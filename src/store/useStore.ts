import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  color: string;
}

interface AppState {
  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, variant: string) => void;
  updateQuantity: (id: string, variant: string, delta: number) => void;
  totalItems: () => number;
  subtotal: () => number;

  // Product State
  currentVariant: ProductVariant;
  setCurrentVariant: (variant: ProductVariant) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial Product Variant
  currentVariant: { 
    id: 'black', 
    name: 'Obsidian Leather', 
    image: '/vanguarde-calibre-01/watch-hero.png', 
    color: '#1A1A1A' 
  },
  setCurrentVariant: (variant) => set({ currentVariant: variant }),

  // Cart Management
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  clearCart: () => set({ cart: [] }),
  cart: [
    // Pre-populate with 1 item for demo purposes as seen in image_8
    {
      id: 'calibre-01',
      name: 'Calibre 01',
      variant: 'Obsidian Leather',
      price: 12400,
      quantity: 1,
      image: '/vanguarde-calibre-01/watch-hero.png'
    }
  ],

  addItem: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id && i.variant === item.variant);
    if (existing) {
      return {
        cart: state.cart.map(i => 
          (i.id === item.id && i.variant === item.variant) 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),

  removeItem: (id, variant) => set((state) => ({
    cart: state.cart.filter(i => !(i.id === id && i.variant === variant))
  })),

  updateQuantity: (id, variant, delta) => set((state) => {
    const newCart = state.cart.map(i => {
      if (i.id === id && i.variant === variant) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter((i): i is CartItem => i !== null);

    return { cart: newCart };
  }),

  totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
  subtotal: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
