/**
 * Zustand Store for Wizard Store AI
 * Global state management
 */

import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: any[];
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  theme: 'dark' | 'light';
  pendingQuery: string | null;

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  toggleTheme: () => void;
  setPendingQuery: (query: string | null) => void;
}

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('wizard-theme') as 'dark' | 'light') || 'dark';
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  theme: getInitialTheme(),
  pendingQuery: null,

  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...message,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
      },
    ],
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearMessages: () => set({ messages: [] }),

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('wizard-theme', newTheme);
    }
    return { theme: newTheme };
  }),

  setPendingQuery: (query) => set({ pendingQuery: query }),
}));

// ── Cart Store ────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  hydrated: boolean;
  addItem: (product: { productId: string; name: string; price: number }, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const CART_KEY = 'wizard_cart';

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  hydrated: false,

  addItem: (product, qty = 1) => set((state) => {
    const existing = state.items.find((i) => i.productId === product.productId);
    const items = existing
      ? state.items.map((i) =>
          i.productId === product.productId ? { ...i, quantity: i.quantity + qty } : i
        )
      : [...state.items, { ...product, quantity: qty }];
    saveCart(items);
    return { items };
  }),

  removeItem: (productId) => set((state) => {
    const items = state.items.filter((i) => i.productId !== productId);
    saveCart(items);
    return { items };
  }),

  updateQuantity: (productId, qty) => set((state) => {
    const items = qty <= 0
      ? state.items.filter((i) => i.productId !== productId)
      : state.items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
    saveCart(items);
    return { items };
  }),

  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));

// Hydrate cart from localStorage on client mount
if (typeof window !== 'undefined') {
  useCartStore.setState({ items: loadCart(), hydrated: true });
}
