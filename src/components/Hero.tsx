'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "circOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center pt-32 lg:pt-20 overflow-hidden bg-[#FBFBFB]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 h-full z-10"
      >
        {/* Content Block */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left mt-12 lg:mt-0">
          <motion.p 
            variants={itemVariants}
            className="text-accent uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 md:mb-6"
          >
            Series 01 / Movement
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[120px] leading-[1.1] lg:leading-[0.9] font-serif font-light text-balance mb-8"
          >
            Vanguarde <br />
            <span className="italic lg:ml-12">Calibre 01</span>
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-12"
          >
            <div className="hidden lg:block h-[1px] w-20 bg-black/20 mt-4" />
            <p className="max-w-md lg:max-w-xs text-sm md:text-base text-gray-500 leading-relaxed italic">
              A symphony of 248 components working in perfect unison. Engineered for those who appreciate the poetry of time.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <Link href="/manual">
              <button className="group relative px-10 py-5 bg-transparent border border-black/10 hover:border-accent transition-colors duration-500 overflow-hidden rounded-sm">
                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-accent transition-colors">
                  Explore Architecture
                </span>
                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Product Image Block */}
        <motion.div 
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, scale: 1.1, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative lg:absolute lg:right-[-5%] lg:top-[10%] w-full lg:w-[55%] h-[40vh] md:h-[50vh] lg:h-[80%] order-1 lg:order-2"
        >
          <Image 
            src="/watch-hero.png" 
            alt="Vanguarde Calibre 01 Luxury Watch" 
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
      >
        <motion.span 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-widest text-gray-400"
        >
          Discover
        </motion.span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>
    </section>
  );
}
