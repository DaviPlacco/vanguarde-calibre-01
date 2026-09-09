'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  AlertCircle, 
  X, 
  Clock,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { Toast, useToastStore } from '@/store/useToast';

interface ToastItemProps {
  toast: Toast;
}

export default function ToastItem({ toast }: ToastItemProps) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const remainingTimeRef = useRef<number>(toast.duration);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = Date.now();

    const updateTimer = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;

      if (!isPaused) {
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - delta);
        const percent = (remainingTimeRef.current / toast.duration) * 100;
        setProgress(percent);

        if (remainingTimeRef.current <= 0) {
          removeToast(toast.id);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    };

    animationFrameRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, toast.duration, toast.id, removeToast]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const getIcon = () => {
    switch (toast.type) {
      case 'gold':
        return <Sparkles className="w-4 h-4 text-accent animate-pulse" />;
      case 'cart':
        return <ShoppingBag className="w-4 h-4 text-accent" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'info':
      default:
        return <Clock className="w-4 h-4 text-accent/80" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="status"
      aria-live="polite"
      className="relative w-full max-w-md bg-[#121212]/95 backdrop-blur-2xl border border-white/10 hover:border-accent/40 rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white overflow-hidden transition-colors duration-300 group pointer-events-auto"
    >
      {/* Subtle Radial Glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start gap-4 relative z-10">
        {/* Watch Image Thumbnail (if present) or Icon Badge */}
        {toast.image ? (
          <div className="relative w-12 h-12 rounded-lg bg-white/[0.04] border border-white/15 flex-shrink-0 overflow-hidden flex items-center justify-center shadow-inner">
            <Image
              src={toast.image}
              alt={toast.title}
              fill
              className="object-contain p-1 scale-125"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm">
            {getIcon()}
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 min-w-0 pr-6">
          {toast.badge && (
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1 h-1 rounded-full bg-accent animate-ping" />
              <p className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold">
                {toast.badge}
              </p>
            </div>
          )}

          <h4 className="font-serif text-[15px] font-normal text-white tracking-wide leading-snug">
            {toast.title}
          </h4>

          {toast.description && (
            <p className="text-xs text-neutral-400 font-sans mt-0.5 leading-relaxed truncate-2-lines">
              {toast.description}
            </p>
          )}

          {/* Optional Price & Action */}
          <div className="flex items-center gap-3 mt-3">
            {toast.price !== undefined && (
              <span className="text-xs font-serif text-white font-bold tabular-nums">
                ${toast.price.toLocaleString('en-US')}
              </span>
            )}

            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-accent hover:text-white transition-colors bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-full border border-accent/20 cursor-pointer"
              >
                <span>{toast.action.label}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => removeToast(toast.id)}
          aria-label="Dismiss notification"
          className="absolute top-4 right-4 text-neutral-500 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all duration-200 cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[1.5px]" />
        </button>
      </div>

      {/* Countdown Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent via-[#E5C98E] to-accent transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
