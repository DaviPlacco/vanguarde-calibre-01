'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function MacroHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Immersive scale and position effects
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.9]);
  const y = useTransform(smoothProgress, [0, 1], [0, 50]);
  const x = useTransform(smoothProgress, [0, 1], [0, 20]); // Subtle drift
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#FBFBFB]">
      
      {/* The Monumental Macro Asset */}
      <motion.div 
        style={{ scale, y, x, opacity }}
        className="relative w-full h-full max-w-[1200px] flex items-center justify-center p-8 lg:p-20 lg:ml-auto lg:mr-[-10%]"
      >
        <img 
          src="/vanguarde-calibre-01/vanguarde-macro-hero.jpg" 
          alt="Vanguarde Calibre 01 Engineering" 
          className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        />
        
        {/* Subtle Light Reflection Overlay */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 0.2]),
            rotate: useTransform(smoothProgress, [0, 1], [-10, 10])
          }}
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 pointer-events-none"
        />
      </motion.div>

      {/* Decorative Branding Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full relative">
           <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 opacity-20">
              <span className="text-[10px] uppercase tracking-[0.5em] vertical-text font-bold">Vanguarde Calibre 01</span>
              <div className="w-[1px] h-24 bg-black" />
           </div>
           
           <div className="absolute right-8 bottom-20 flex flex-col items-end gap-2 text-right opacity-30">
              <span className="text-[9px] uppercase tracking-widest font-bold">Ref. 7701-A</span>
              <span className="text-[8px] uppercase tracking-widest">Swiss Made Chronometer</span>
           </div>
        </div>
      </div>

    </div>
  );
}
