'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Cpu, Gauge, Zap, Crosshair } from 'lucide-react';

export default function TechnicalManual() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for Dot Matrix
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePosition({ x, y });
  };

  const springConfig = { damping: 30, stiffness: 200 };
  const dotX = useSpring(useMotionValue(0), springConfig);
  const dotY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    dotX.set(mousePosition.x * 20);
    dotY.set(mousePosition.y * 20);
  }, [mousePosition, dotX, dotY]);

  const stats = [
    { label: 'Components', value: '248', unit: 'Parts', icon: Cpu, desc: 'Individual hand-finished elements' },
    { label: 'Jewels', value: '39', unit: 'Rubies', icon: Zap, desc: 'Friction-reducing synthetic jewels' },
    { label: 'Frequency', value: '5Hz', unit: '36,000 vph', icon: Gauge, desc: 'High-beat precision oscillation' },
  ];

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#0F0F0F] text-[#E0E0E0] overflow-hidden selection:bg-accent selection:text-white"
    >
      {/* Dot Matrix Background with Parallax */}
      <motion.div 
        style={{ x: dotX, y: dotY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%]" 
             style={{ 
               backgroundImage: 'radial-gradient(#E0E0E0 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
      </motion.div>

      {/* Global Blur Entry Overlay */}
      <motion.div 
        initial={{ opacity: 1, backdropFilter: 'blur(40px)' }}
        animate={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="fixed inset-0 z-50 pointer-events-none bg-black/40"
      />

      {/* Navigation / Header */}
      <nav className="relative z-40 flex justify-between items-center p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-accent animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Document v.01.12</p>
            <h1 className="text-xl font-serif italic">Architecture Bureau</h1>
          </div>
        </motion.div>

        <Link href="/">
          <motion.div 
            whileHover={{ rotate: 90, scale: 1.1 }}
            className="w-12 h-12 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-500 rounded-full"
          >
            <X className="w-5 h-5 stroke-[1px]" />
          </motion.div>
        </Link>
      </nav>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Column: Title & Stats */}
        <div className="lg:col-span-5 flex flex-col justify-center py-20 lg:py-0 min-h-[60vh] lg:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-6xl md:text-8xl font-serif mb-12 leading-[1.1]">
              The <span className="italic text-accent">Calibre 01</span> <br /> Architecture
            </h2>
            
            <div className="space-y-12">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (i * 0.2) }}
                  className="flex items-start gap-6 group"
                >
                  <div className="mt-2 p-3 border border-white/5 bg-white/[0.02] group-hover:bg-accent transition-colors duration-500">
                    <stat.icon className="w-5 h-5 stroke-[1px]" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-4xl font-serif">{stat.value}</span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">{stat.unit}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">{stat.label}</p>
                    <p className="text-xs text-gray-600 max-w-xs">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Blueprint */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.8 }}
            className="relative w-full aspect-square max-w-[800px] group"
          >
            {/* Blueprint Image Container with Scanline Effect */}
            <div className="relative w-full h-full border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
              <Image 
                src="/assets/manual/blueprint_calibre_01.png" 
                alt="Technical Blueprint" 
                fill 
                className="object-cover opacity-80 mix-blend-screen transition-transform duration-[2s] group-hover:scale-110"
              />
              
              {/* Scanline Animation */}
              <motion.div 
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-accent/20 blur-[1px] z-10"
              />
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-white/20" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-white/20" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-white/20" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-white/20" />

              {/* Interaction Hint */}
              <div className="absolute bottom-8 right-8 flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                <Crosshair className="w-4 h-4 animate-spin-slow" />
                <span className="text-[9px] uppercase tracking-widest font-bold">Interactive Schematic</span>
              </div>
            </div>

            {/* Float Elements for Depth */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-6 bg-black border border-white/5 backdrop-blur-xl hidden md:block"
            >
              <p className="text-[9px] text-accent font-bold uppercase mb-2">Mechanical Approval</p>
              <div className="flex gap-1 h-8 items-end">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [8, Math.random() * 24 + 8, 8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-[2px] bg-white/20" 
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Mobile Responsive Note */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-gray-500 md:hidden flex items-center gap-2"
      >
        <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
        Pinch to Zoom Schematic Detail
      </motion.div>
    </main>
  );
}
