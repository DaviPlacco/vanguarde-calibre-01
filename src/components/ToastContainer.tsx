'use client';

import { useSyncExternalStore } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/store/useToast';
import ToastItem from './ToastItem';

const subscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const isHydrated = useHydrated();

  if (!isHydrated || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[999] w-[calc(100vw-3rem)] max-w-md pointer-events-none"
    >
      <div className="relative w-full h-[120px]">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast, index) => {
            const distanceFromFront = toasts.length - 1 - index;
            return (
              <ToastItem
                key={toast.id}
                toast={toast}
                distanceFromFront={distanceFromFront}
                totalInStack={toasts.length}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
