'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MacroHero from './MacroHero';

export default function ScrollytellingWatch() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-[#FBFBFB] overflow-hidden">
      
      {/* Background Typography Layer */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <h2 className="text-[35vw] font-serif font-bold text-black opacity-[0.03] whitespace-nowrap">
          ENGINE
        </h2>
      </div>

      {/* Main Visual Layer: Macro Hero */}
      <div className="relative z-10">
        <MacroHero />
      </div>

      {/* Foreground Content (Static Editorial Layout) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-12 lg:px-24 h-full flex flex-col justify-center">
          
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.7em] text-accent font-bold mb-6 italic opacity-60">Pure Architecture</p>
            <h2 className="text-[7vw] font-serif leading-[0.8] mb-8 text-black/90">
              Mechanical <br />
              <span className="italic ml-[0.3em]">Excellence</span>
            </h2>
            <div className="w-20 h-[1px] bg-accent/20" />
            
            {/* Contextual Sub-caption */}
            <p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold max-w-[200px] leading-relaxed">
              Vanguarde Calibre 01 <br />
              Limited Edition
            </p>
          </div>

          <div className="self-end text-right max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4">Precision</p>
            <p className="text-gray-400 font-serif italic text-xl leading-tight">
              A macro-perspective on <br />Swiss chronometry.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
