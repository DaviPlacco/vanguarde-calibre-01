'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useStore, ProductVariant } from '@/store/useStore';

const variants: ProductVariant[] = [
  { id: 'black', name: 'Obsidian Leather', image: '/watch-hero.png', color: '#1A1A1A' },
  { id: 'titanium', name: 'Brushed Titanium', image: '/watch-titanium.png', color: '#8E8E8E' },
  { id: 'cognac', name: 'Cognac Calfskin', image: '/watch-cognac.png', color: '#5D3A1A' },
];

export default function PersonalizationSection() {
  const { currentVariant, setCurrentVariant, addItem } = useStore();

  const handleAddToCart = () => {
    addItem({
      id: 'calibre-01',
      name: 'Calibre 01',
      variant: currentVariant.name,
      price: 12400,
      image: currentVariant.image
    });
  };

  return (
    <section className="py-32 bg-[#FBFBFB] overflow-hidden">
      <div className="container mx-auto px-8 editorial-grid">
        <div className="col-span-12 lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4">Personalization</p>
          <h2 className="text-6xl font-serif mb-8 leading-tight">Tailor Your <br /><span className="italic">Legacy</span></h2>
          
          <div className="space-y-6">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setCurrentVariant(variant)}
                aria-label={`Select ${variant.name} variant`}
                className="flex items-center gap-6 w-full text-left group outline-none"
              >
                <div 
                  className={`w-12 h-12 rounded-full border-2 p-1 transition-all duration-300 ${currentVariant.id === variant.id ? 'border-accent scale-110' : 'border-transparent group-hover:border-gray-200'}`}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: variant.color }} />
                </div>
                <div>
                  <p className={`text-xs uppercase tracking-widest font-bold transition-colors ${currentVariant.id === variant.id ? 'text-black' : 'text-gray-400'}`}>
                    {variant.name}
                  </p>
                  <p className="text-[10px] text-gray-400">Available Signature Collection</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12">
            <button 
              onClick={handleAddToCart}
              className="px-10 py-5 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent transition-colors duration-500 rounded-sm shadow-xl shadow-black/10 active:scale-95"
            >
              Reserve Your Timepiece
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 relative h-[600px] flex items-center justify-center">
          {/* Background Label */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
             <span className="text-[15vw] font-serif font-bold uppercase">{currentVariant.id}</span>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentVariant.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full h-full"
            >
              <Image 
                src={currentVariant.image} 
                alt={`Vanguarde Calibre 01 in ${currentVariant.name}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
