'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function SuccessPage() {
  const { cart } = useStore();
  
  // Ideally, clear cart here in a real app
  // useEffect(() => { /* clear cart logic */ }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-8 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <h2 className="text-[30vw] font-serif font-bold text-white uppercase italic">Success</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl text-center z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
          className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-accent/20"
        >
          <Check className="w-10 h-10 text-white stroke-[3px]" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">A Legacy <br /><span className="italic">Secured</span></h1>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg mx-auto italic">
          "Your Vanguarde timepiece is being prepared for secure shipment. A legacy is on its way."
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link href="/" className="px-10 py-5 border border-white/10 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500 rounded-sm">
            Return to Dashboard
          </Link>
          <div className="h-[1px] w-12 bg-white/10 hidden md:block" />
          <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Ref: #VG-2026-0482</p>
        </div>
      </motion.div>
    </main>
  );
}
