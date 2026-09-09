'use client';

import { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/store/useToast';

const CraftSection = ({ title, text, image, index }: { title: string; text: string; image: string; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className={`grid grid-cols-12 gap-10 min-h-[80vh] items-center mb-40 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className={`col-span-12 lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6">Chapter 0{index + 1}</p>
        <h2 className="text-6xl font-serif mb-8 leading-tight">{title}</h2>
        <p className="text-gray-400 text-lg leading-relaxed italic border-l-2 border-accent pl-8 py-2">
          {text}
        </p>
      </div>
      
      <div className={`col-span-12 lg:col-span-6 relative aspect-square rounded-2xl overflow-hidden shadow-2xl ${index % 2 !== 0 ? 'lg:order-1' : 'lg:col-start-7'}`}>
        <motion.div style={{ scale }} className="w-full h-full">
          <Image src={image} alt={title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      </div>
    </motion.div>
  );
};

export default function CraftsmanshipPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const containerRef = useRef(null);

  const chapters = [
    {
      title: "The Birth of \nTitanium",
      text: "Each case begins as a solid block of grade 5 titanium, chosen for its unparalleled strength-to-weight ratio and hypoallergenic properties.",
      image: "/vanguarde-calibre-01/watch-titanium.png"
    },
    {
      title: "The Invisible \nArtisan",
      text: "Our master watchmakers spend over 120 hours on the manual finishing of the Calibre 01, ensuring every bevel catches the light perfectly.",
      image: "/vanguarde-calibre-01/heritage-back.png"
    },
    {
      title: "Chronometric \nElegance",
      text: "Beyond aesthetics, precision is our obsession. Each movement is tested across six positions to exceed COSC standards.",
      image: "/vanguarde-calibre-01/watch-hero.png"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <Navigation onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Editorial Intro */}
      <section className="pt-48 pb-20 px-8 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[12vw] leading-[0.8] font-serif mb-12 select-none">Obsession <br /><span className="italic ml-20 text-accent">is Detail</span></h1>
          <div className="max-w-xl mx-auto">
            <p className="text-gray-400 text-sm uppercase tracking-[0.5em] font-medium mb-20">The Vanguarde Manufacture</p>
          </div>
        </motion.div>
      </section>

      {/* Scrollytelling Sections */}
      <section className="px-8 max-w-[1400px] mx-auto pb-40" ref={containerRef}>
        {chapters.map((chapter, i) => (
          <CraftSection key={i} {...chapter} index={i} />
        ))}
      </section>

      {/* Technical Breakdown CTA */}
      <section className="py-40 bg-[#1A1A1A] text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8">
           <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-8 italic">The Calibre 01 Movement</p>
           <h2 className="text-7xl font-serif mb-12">Engineered for <br />the <span className="italic text-accent">Eternal</span></h2>
           <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
              <div className="text-center">
                 <p className="text-4xl font-serif italic mb-2">248</p>
                 <p className="text-[10px] uppercase tracking-widest text-gray-500">Components</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
              <div className="text-center">
                 <p className="text-4xl font-serif italic mb-2">39</p>
                 <p className="text-[10px] uppercase tracking-widest text-gray-500">Jewels</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
              <div className="text-center">
                 <p className="text-4xl font-serif italic mb-2">5Hz</p>
                 <p className="text-[10px] uppercase tracking-widest text-gray-500">Frequency</p>
              </div>
           </div>
           
           <motion.div 
             whileHover={{ scale: 1.05 }}
             className="mt-20 inline-block"
           >
              <Link 
                 href="/manual"
                 onClick={() => toast.info('Accessing Bureau', 'Loading Calibre 01 horological blueprints...')}
               >
                 <button className="px-12 py-6 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-accent hover:text-white transition-all duration-500 rounded-sm cursor-pointer">
                    Explore Technical Manual
                 </button>
               </Link>
           </motion.div>
        </div>
      </section>
    </main>
  );
}
