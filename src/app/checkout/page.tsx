'use client';

import { useState, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { toast } from '@/store/useToast';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShieldCheck, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const subscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);

export default function CheckoutPage() {
  const { cart, subtotal } = useStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const mounted = useHydrated();

  // Mock calculations
  const shipping = 0; // Complimentary for luxury items
  const tax = subtotal() * 0.08;
  const total = subtotal() + tax + shipping;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    toast.gold('Authorizing Payment', 'Securing cryptographic handshake with Vanguarde Vault...', {
      badge: 'ENCRYPTED TRANSACTION',
      duration: 3000,
    });

    // Simulate payment processing
    setTimeout(() => {
      router.push('/checkout/success');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#FBFBFB]">
        <h1 className="text-3xl font-serif mb-4">Your collection is empty</h1>
        <p className="text-sm text-gray-500 mb-8 italic">Add a timepiece to proceed with bespoke acquisition.</p>
        <Link href="/collections" className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors">
          Return to Collections
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFBFB] py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-4 cursor-pointer"
            >
              <ChevronLeft className="w-3 h-3" /> Back
            </button>
            <h1 className="text-4xl md:text-5xl font-serif">Checkout</h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Order Reference</p>
            <p className="text-sm font-mono text-accent font-bold">VG-2026-0482</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={handleCompleteOrder} className="space-y-12">
              <section>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-8">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                    <input required defaultValue="Arthur" className="w-full bg-white border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors rounded-sm" />
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                    <input required defaultValue="Pendelton" className="w-full bg-white border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors rounded-sm" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Shipping Address</label>
                    <input required defaultValue="740 Park Avenue, Penthouse B" className="w-full bg-white border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors rounded-sm" />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">City</label>
                    <input required defaultValue="New York" className="w-full bg-white border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors rounded-sm" />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Postal Code</label>
                    <input required defaultValue="10021" className="w-full bg-white border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors rounded-sm" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-8">Secure Payment</h2>
                <div className="bg-white border border-black/5 p-6 md:p-8 rounded-sm space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
                    <input defaultValue="•••• •••• •••• 8842" required className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors font-mono rounded-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">Expiry</label>
                      <input defaultValue="08/29" required className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors font-mono rounded-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">CVC</label>
                      <input defaultValue="891" required className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-sm focus:outline-none focus:border-accent transition-colors font-mono rounded-sm" />
                    </div>
                  </div>
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full py-6 bg-black text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-accent transition-all duration-500 disabled:opacity-50 relative overflow-hidden rounded-sm cursor-pointer shadow-xl shadow-black/10"
              >
                {isProcessing ? (
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    Securing Your Timepiece...
                  </motion.div>
                ) : (
                  "Complete Order"
                )}
              </button>
            </form>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white border border-black/5 p-6 md:p-8 rounded-sm shadow-xs">
                <h3 className="text-xs uppercase tracking-widest font-bold mb-8">Order Summary</h3>
                <div className="space-y-6 mb-10">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg relative overflow-hidden flex-shrink-0 border border-black/5">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1 scale-125" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold truncate">{item.name}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-tighter">{item.variant}</p>
                        <p className="text-[10px] mt-1 text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-serif font-bold">
                        ${mounted ? (item.price * item.quantity).toLocaleString('en-US') : (item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-black/5 pt-8">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                    <span>Subtotal</span>
                    <span>${mounted ? subtotal().toLocaleString('en-US') : subtotal()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                    <span>Complimentary Shipping</span>
                    <span className="text-accent italic font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                    <span>Tax (8%)</span>
                    <span>${mounted ? tax.toLocaleString('en-US') : tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-4 border-t border-black/5 mt-4">
                    <span>Total</span>
                    <span className="text-lg font-serif tabular-nums">
                      ${mounted ? total.toLocaleString('en-US') : total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 border border-black/5 p-6 rounded-sm text-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 mx-auto mb-3 text-accent stroke-[1.25px]" />
                  <p className="text-[9px] uppercase tracking-widest font-bold">Encrypted</p>
                </div>
                <div className="bg-white/70 border border-black/5 p-6 rounded-sm text-center shadow-xs">
                  <Globe className="w-5 h-5 mx-auto mb-3 text-accent stroke-[1.25px]" />
                  <p className="text-[9px] uppercase tracking-widest font-bold">Insured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
