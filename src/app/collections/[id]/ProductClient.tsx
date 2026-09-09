'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { toast } from '@/store/useToast';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ChevronRight, ArrowLeft, Maximize2, X } from 'lucide-react';
import Link from 'next/link';

const subscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);

interface ProductDetail {
  id: string;
  name: string;
  ref: string;
  price: number;
  description: string;
  images: string[];
  specs: Record<string, string>;
}

// Mock data fetching simulation
const getProductData = (id: string): ProductDetail => {
  const products: Record<string, ProductDetail> = {
    'heritage-1952': {
      id: 'heritage-1952',
      name: 'Heritage 1952',
      ref: 'Ref. HS2',
      price: 18500,
      description: 'A timeless tribute to the golden era of Swiss watchmaking. Featuring a meticulously hand-finished automatic movement and a signature obsidian leather strap.',
      images: ['/vanguarde-calibre-01/IMAGE 1.png', '/vanguarde-calibre-01/IMAGE 2.png', '/vanguarde-calibre-01/IMAGE 3.png', '/vanguarde-calibre-01/IMAGE 4.png'],
      specs: { case: '40mm Silver Titanium', movement: 'V.01 Automatic', reserve: '72 Hours' }
    },
    'sky-gazer': {
      id: 'sky-gazer',
      name: 'Sky-Gazer',
      ref: 'Ref. SQ09',
      price: 24200,
      description: 'Engineered for the modern explorer. The Sky-Gazer features a skeletonized titanium architecture that reveals the complex cosmic choreography within.',
      images: ['/vanguarde-calibre-01/IMAGE 9.png', '/vanguarde-calibre-01/IMAGE 10.png', '/vanguarde-calibre-01/IMAGE 11.png', '/vanguarde-calibre-01/IMAGE 12.png'],
      specs: { case: '42mm Brushed Titanium', movement: 'V.02 Skeleton', reserve: '68 Hours' }
    },
    'oceanic-deep': {
      id: 'oceanic-deep',
      name: 'Oceanic Deep',
      ref: 'Ref. OD44',
      price: 14800,
      description: 'A masterpiece of nautical precision. The Oceanic Deep combines military-grade water resistance with the warm, textured elegance of cognac calfskin.',
      images: ['/vanguarde-calibre-01/IMAGE 5.png', '/vanguarde-calibre-01/IMAGE 6.png', '/vanguarde-calibre-01/IMAGE 7.png', '/vanguarde-calibre-01/IMAGE 8.png'],
      specs: { case: '44mm Satin Titanium', movement: 'V.03 Diver', reserve: '80 Hours' }
    }
  };
  return products[id] || products['heritage-1952'];
};

export default function ProductClient({ id }: { id: string }) {
  const product = getProductData(id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const mounted = useHydrated();
  const { addItem, openCart } = useStore();

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isExpanded]);

  const handleOpenZoom = () => {
    setIsExpanded(true);
    toast.info('High-Resolution Inspection', `Inspecting ${product.name} micro-finishing in 4K`);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      variant: product.ref,
      price: product.price,
      image: product.images[0]
    });

    toast.cart({
      name: product.name,
      variant: product.ref,
      price: product.price,
      image: product.images[0],
      description: `${product.name} reserved in your private collection.`,
      action: {
        label: 'View Cart',
        onClick: () => {
          setIsCartOpen(true);
          openCart();
        },
      },
    });

    setIsCartOpen(true);
  };

  const handleConciergeClick = () => {
    toast.gold('Bespoke Concierge Liaison', 'Initiating secure direct line with a master horologist...');
  };

  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <Navigation onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20 cursor-zoom-out"
          >
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 p-4 bg-black text-white rounded-full hover:bg-accent transition-colors z-[110]"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={product.images[activeImage]} 
                alt={product.name} 
                fill 
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          
          {/* Gallery Side */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <Link href="/collections" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              <ArrowLeft className="w-3 h-3" /> Back to Collection
            </Link>

            <div 
              className="relative aspect-[4/5] bg-white rounded-2xl md:rounded-3xl overflow-hidden group cursor-zoom-in"
              onClick={handleOpenZoom}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-4 md:p-12 transition-transform duration-700 group-hover:scale-110" 
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenZoom();
                }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white shadow-lg z-10 cursor-pointer"
              >
                 <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => {
                    setActiveImage(i);
                    toast.info('Angle Perspective', `Perspective ${i + 1} of ${product.name}`);
                  }}
                  className={`relative aspect-square bg-white rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === i ? 'border-accent' : 'border-transparent hover:border-gray-200'}`}
                >
                  <Image src={img} alt={`Angle ${i}`} fill className="object-cover p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-center py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4">Precision Series</p>
              <h1 className="text-6xl font-serif mb-2">{product.name}</h1>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{product.ref}</p>
              
              <p className="text-gray-500 leading-relaxed mb-12 text-lg italic">
                {product.description}
              </p>

              <div className="grid grid-cols-3 gap-8 mb-12 border-y border-black/5 py-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">{key}</p>
                    <p className="text-[10px] font-bold uppercase">{value as string}</p>
                  </div>
                ))}
              </div>

              {/* Product Actions: Price and CTA */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0 mb-16">
                <div className="flex flex-col">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Investment Value</p>
                  <span className="text-4xl md:text-3xl lg:text-4xl font-serif">
                    ${mounted ? product.price.toLocaleString('en-US') : product.price}
                  </span>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full md:w-auto px-12 h-14 md:h-12 lg:h-14 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all duration-500 rounded-sm shadow-xl shadow-black/5 cursor-pointer"
                >
                  Add to Collection
                </button>
              </div>

              {/* Concierge Card */}
              <a 
                href={`https://wa.me/351912345678?text=Olá, gostaria de solicitar o serviço Bespoke Concierge para o modelo ${product.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleConciergeClick}
                className="mt-8 p-6 bg-white border border-black/5 rounded-2xl flex items-center gap-5 group hover:border-accent/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 cursor-pointer"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <ChevronRight className="w-5 h-5 stroke-[1px]" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">Bespoke Concierge</p>
                   <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Complimentary setup & hand delivery</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
