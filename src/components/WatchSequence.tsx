'use client';

/**
 * ASSET CONFIGURATION:
 * Path: /public/assets/sequence/frame-0.jpg to frame-16.jpg (Total 17 frames)
 * Fallback: /watch-hero.png
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface WatchSequenceProps {
  className?: string;
}

export default function WatchSequence({ className = '' }: WatchSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Full 360 Degree Rotation (24 frames)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Range 0-23 for a full seamless rotation
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, 23]);

  // 2. High-End Loader
  useEffect(() => {
    const preloadImages = async () => {
      const promises = [];
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 0; i < 24; i++) {
        const promise = new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = `/assets/sequence/frame-${i}.jpg`;
          img.onload = () => {
            loadedImages[i] = img;
            resolve(img);
          };
          img.onerror = () => {
            console.warn(`[Vanguarde] Missing frame ${i}`);
            resolve(new Image());
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  // 3. High-Precision Canvas Drawing
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const render = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const { width: cw, height: ch } = canvas;
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;

      let dw, dh, x, y;

      // object-fit: contain logic
      if (imgRatio > canvasRatio) {
        dw = cw;
        dh = cw / imgRatio;
        x = 0;
        y = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imgRatio;
        x = (cw - dw) / 2;
        y = 0;
      }

      context.clearRect(0, 0, cw, ch);
      context.drawImage(img, x, y, dw, dh);
    };

    const unsubscribe = frameIndex.on('change', (v) => render(v));
    render(0); // Initial frame

    return () => unsubscribe();
  }, [images, frameIndex]);

  // Resize handler for Canvas DPR
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className={`relative h-[150vh] w-full ${className}`}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: Static Fallback (Always present as base) */}
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center p-20"
          >
            <img 
              src="/watch-hero.png" 
              alt="Vanguarde Fallback" 
              className="max-w-[800px] w-full h-full object-contain opacity-40 grayscale"
            />
          </motion.div>
        )}

        {/* Layer 2: High-Performance Canvas */}
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none z-10"
          style={{ width: '100vw', height: '100vh', maxWidth: '1400px' }}
        />

        {/* Layer 3: Interaction Hint */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-10 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[8px] uppercase tracking-[0.6em] text-accent font-bold">Spin to Explore</span>
          <div className="w-[1px] h-10 bg-accent/30" />
        </motion.div>

      </div>
    </div>
  );
}
