'use client';

import { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from '@/store/useToast';
import Image from 'next/image';
import Link from 'next/link';

const subscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CartDrawer({ isOpen: propsIsOpen, onClose: propsOnClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem, subtotal, isCartOpen, closeCart } = useStore();
  const mounted = useHydrated();

  // Open if either local prop is true OR global store isCartOpen is true
  const isOpen = Boolean(propsIsOpen) || isCartOpen;

  const handleClose = () => {
    if (propsOnClose) {
      propsOnClose();
    }
    closeCart();
  };

  const handleQuantityChange = (id: string, variant: string, name: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      removeItem(id, variant);
      toast.warning('Item Removed', `${name} (${variant}) removed from your collection`);
    } else {
      updateQuantity(id, variant, delta);
      if (delta > 0) {
        toast.info('Quantity Updated', `Increased to ${newQty} × ${name}`);
      } else {
        toast.info('Quantity Updated', `Reduced to ${newQty} × ${name}`);
      }
    }
  };

  const handleRemove = (id: string, variant: string, name: string) => {
    removeItem(id, variant);
    toast.warning('Item Removed', `${name} (${variant}) removed from your collection`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer - Slide In Animation */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FBFBFB]/95 backdrop-blur-2xl border-l border-black/10 z-[101] shadow-2xl p-8 md:p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold mb-1">Your Portfolio</p>
                <h2 className="text-2xl font-serif">Curated Collection</h2>
              </div>
              <button 
                onClick={handleClose} 
                aria-label="Close cart"
                className="p-2.5 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.5px]" />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-16">
                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
                    <Trash2 className="w-6 h-6 stroke-[1px] text-gray-300" />
                  </div>
                  <p className="font-serif italic text-lg text-gray-600">Your collection is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Explore our timepieces to reserve an heirloom</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className="flex gap-5 pb-6 border-b border-black/5 last:border-0">
                    <div className="w-20 h-20 bg-white rounded-xl border border-black/5 relative overflow-hidden flex-shrink-0 shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2 scale-125" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-accent font-bold">Vanguarde</p>
                          <h3 className="text-base font-serif truncate">{item.name}</h3>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">{item.variant}</p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.variant, item.name)}
                          className="text-gray-300 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                          title="Remove timepiece"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 border border-black/10 rounded-full px-3 py-1 bg-white/80 shadow-xs">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.variant, item.name, item.quantity, -1)}
                            aria-label="Decrease quantity"
                            className="text-gray-400 hover:text-black transition-colors p-0.5 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center tabular-nums">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.variant, item.name, item.quantity, 1)}
                            aria-label="Increase quantity"
                            className="text-gray-400 hover:text-black transition-colors p-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-serif font-bold tabular-nums">
                          ${mounted ? (item.price * item.quantity).toLocaleString('en-US') : (item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/5 pt-8 mt-auto">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400 text-xs uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-bold font-serif tabular-nums">
                    ${mounted ? subtotal().toLocaleString('en-US') : subtotal()}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mb-6 italic text-balance">
                  Complimentary secure courier and bespoke insurance included with every timepiece.
                </p>
                <Link 
                  href="/checkout"
                  onClick={() => {
                    handleClose();
                    toast.gold('Securing Timepieces', 'Transferring to encrypted checkout...');
                  }}
                  className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors duration-500 rounded-sm text-center block shadow-lg shadow-black/10 active:scale-[0.99] cursor-pointer"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
