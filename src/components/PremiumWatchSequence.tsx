'use client';

/**
 * FOLDER STRUCTURE: /public/assets/sequence/frame-0.jpg to frame-16.jpg
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface PremiumWatchSequenceProps {
  frameCount?: number;
  assetsPath?: string;
  fallbackImagePath?: string;
}

export default function PremiumWatchSequence({ 
  frameCount = 17, 
  assetsPath = '/assets/sequence/frame-', 
  fallbackImagePath = '/watch-hero.png'
}: PremiumWatchSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // 1. Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);
  const showIndicator = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // 2. High-End Loading (Promise.all Strategy)
  useEffect(() => {
    const loadImages = async () => {
      const promises = [];
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 0; i < frameCount; i++) {
        const promise = new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = `${assetsPath}${i}.jpg`;
          img.onload = () => {
            loadedImages[i] = img;
            setLoadPercentage(prev => prev + (100 / frameCount));
            resolve(img);
          };
          img.onerror = () => {
             console.warn(`[Vanguarde] Missing frame: ${i}`);
             resolve(new Image()); // Resolve with empty to not block the stack
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      // Trigger sticky behavior only after 50% frames are cached
      setIsReadyToAnimate(true);
    };

    loadImages();
  }, [frameCount, assetsPath]);

  // 3. Canvas Rendering
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const drawFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const { width: canvasWidth, height: canvasHeight } = canvas;
      
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, x, y;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        x = 0;
        y = (canvasHeight - drawHeight) / 2;
      } else {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        x = (canvasWidth - drawWidth) / 2;
        y = 0;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, drawWidth, drawHeight);
    };

    const unsubscribe = frameIndex.on('change', (latest) => {
      drawFrame(latest);
    });

    drawFrame(0);
    return () => unsubscribe();
  }, [images, frameCount, frameIndex]);

  // Sync Canvas Size
  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[180vh] w-full"
      style={{ marginBottom: '-20vh' }} // Negative margin to pull next section closer
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: The Visual Engine */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Static Fallback (Hero) - Always there as base */}
          {!isReadyToAnimate && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center p-12"
            >
               <img 
                 src={fallbackImagePath} 
                 alt="Vanguarde Heritage" 
                 className="max-w-[800px] w-full h-auto object-contain opacity-50 grayscale"
               />
               <div className="absolute bottom-20 flex flex-col items-center gap-4">
                  <div className="w-32 h-[1px] bg-black/5 relative overflow-hidden">
                    <motion.div 
                      className="absolute left-0 h-full bg-accent"
                      style={{ width: `${loadPercentage}%` }}
                    />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">Synchronizing Sequence</span>
               </div>
            </motion.div>
          )}

          {/* High-Performance Canvas */}
          <canvas 
            ref={canvasRef}
            className={`w-full h-full object-contain pointer-events-none transition-opacity duration-700 ${isReadyToAnimate ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxWidth: '1200px' }}
          />
        </div>

        {/* Layer 2: Guidance UI */}
        <motion.div 
          style={{ opacity: showIndicator }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-accent/20 relative overflow-hidden">
             <motion.div 
               className="absolute top-0 w-full h-1/2 bg-accent"
               animate={{ y: [0, 48, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
