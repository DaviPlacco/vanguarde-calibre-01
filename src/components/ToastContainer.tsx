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

  if (!isHydrated) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 max-w-[calc(100vw-3rem)] pointer-events-none items-end"
    >
      <div className="flex flex-col gap-3 w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
