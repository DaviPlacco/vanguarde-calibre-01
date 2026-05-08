'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, subtotal } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer - Slide In Animation */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-xl border-l border-white/20 z-[101] shadow-2xl p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-serif">Your Collection</h2>
              <button 
                onClick={onClose} 
                aria-label="Close cart"
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 stroke-[1px]" />
              </button>
            </div>

            <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <p className="font-serif italic text-lg">Your collection is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover scale-150" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Vanguarde</p>
                      <h3 className="text-lg font-serif mb-1">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-4">{item.variant}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 border border-black/10 rounded-full px-4 py-1.5 bg-white/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.variant, -1)}
                            aria-label="Decrease quantity"
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center tabular-nums">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.variant, 1)}
                            aria-label="Increase quantity"
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold tabular-nums">
                          ${mounted ? (item.price * item.quantity).toLocaleString('en-US') : (item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/5 pt-10 mt-auto">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400 text-xs uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg font-bold font-serif tabular-nums">
                    ${mounted ? subtotal().toLocaleString('en-US') : subtotal()}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mb-8 italic text-balance">
                  Complimentary secure shipping and bespoke insurance included with every Vanguarde timepiece.
                </p>
                <Link 
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-6 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors duration-500 rounded-sm text-center block"
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
