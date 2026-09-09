import { create } from 'zustand';

export type ToastType = 'success' | 'gold' | 'cart' | 'info' | 'warning';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  image?: string;
  price?: number;
  badge?: string;
  action?: ToastAction;
}

export interface Toast extends ToastOptions {
  id: string;
  createdAt: number;
  duration: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (options) => {
    const id = options.id || Math.random().toString(36).substring(2, 9);
    const duration = options.duration ?? (options.type === 'cart' ? 5000 : 4000);
    const newToast: Toast = {
      ...options,
      id,
      type: options.type || 'gold',
      duration,
      createdAt: Date.now(),
    };

    set((state) => ({
      // Keep up to 4 toasts visible at a time
      toasts: [...state.toasts.slice(-3), newToast],
    }));

    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

// Convenient imperative API callable from any component or function
export const toast = {
  custom: (options: ToastOptions) => useToastStore.getState().addToast(options),
  
  gold: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    useToastStore.getState().addToast({
      title,
      description,
      type: 'gold',
      badge: 'VANGUARDE BESPOKE',
      ...options,
    }),

  success: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    useToastStore.getState().addToast({
      title,
      description,
      type: 'success',
      badge: 'CONFIRMED',
      ...options,
    }),

  info: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    useToastStore.getState().addToast({
      title,
      description,
      type: 'info',
      badge: 'INFORMATION',
      ...options,
    }),

  warning: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    useToastStore.getState().addToast({
      title,
      description,
      type: 'warning',
      badge: 'NOTICE',
      ...options,
    }),

  cart: (item: {
    name: string;
    variant?: string;
    image?: string;
    price?: number;
    description?: string;
    action?: ToastAction;
  }) =>
    useToastStore.getState().addToast({
      title: 'Added to Collection',
      description: item.description || `${item.name}${item.variant ? ` · ${item.variant}` : ''}`,
      type: 'cart',
      image: item.image,
      price: item.price,
      badge: 'COLLECTION UPDATED',
      action: item.action,
      duration: 5000,
    }),

  dismiss: (id: string) => useToastStore.getState().removeToast(id),
  clear: () => useToastStore.getState().clearToasts(),
};
