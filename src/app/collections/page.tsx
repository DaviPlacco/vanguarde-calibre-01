'use client';

import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const otherModels = [
  { id: 'heritage-1952', name: 'Heritage 1952', ref: 'Ref. HS2', price: '$18,500', image: '/vanguarde-calibre-01/watch-hero.png' },
  { id: 'sky-gazer', name: 'Sky-Gazer', ref: 'Ref. SQ09', price: '$24,200', image: '/vanguarde-calibre-01/watch-titanium.png' },
  { id: 'oceanic-deep', name: 'Oceanic Deep', ref: 'Ref. OD44', price: '$14,800', image: '/vanguarde-calibre-01/watch-cognac.png' },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <Navigation />
      <CartDrawer />

      <section className="pt-40 pb-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-7xl font-serif mb-4">Our <br /><span className="italic">Collections</span></h1>
            <p className="text-gray-400 text-sm tracking-widest uppercase">The Archive of Time</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherModels.map((watch, index) => (
              <Link 
                key={watch.name}
                href={`/collections/${watch.id}`}
                className="group cursor-pointer"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden mb-6">
                    <Image 
                      src={watch.image} 
                      alt={watch.name} 
                      fill 
                      className="object-contain p-12 transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif">{watch.name}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{watch.ref}</p>
                    </div>
                    <span className="text-sm font-bold">{watch.price}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
