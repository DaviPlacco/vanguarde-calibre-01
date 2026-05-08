'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function Navigation({ onCartOpen }: { onCartOpen: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useStore((state) => state.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Collections', href: '/collections' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'Boutiques', href: '/boutiques' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'py-4 bg-white/80 backdrop-blur-md border-b border-black/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif tracking-widest uppercase hover:opacity-70 transition-opacity z-[110]">
            Vanguarde
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <ul className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={`transition-colors hover:text-black ${pathname === link.href ? 'text-black font-bold' : 'text-gray-400'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 md:gap-6">
              <button 
                onClick={onCartOpen}
                aria-label={`Open shopping cart, ${totalItems} items`}
                className="relative group p-2 z-[110]"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[9px] flex items-center justify-center rounded-full font-bold tabular-nums"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
              
              <button 
                aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"} 
                className="md:hidden p-2 z-[110] relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                  <motion.span 
                    animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[1.5px] bg-black block origin-center" 
                  />
                  <motion.span 
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-full h-[1.5px] bg-black block" 
                  />
                  <motion.span 
                    animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[1.5px] bg-black block origin-center" 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-white z-[90] flex flex-col justify-center px-8 md:hidden"
          >
            <ul className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className={`text-5xl font-serif tracking-tight ${pathname === link.href ? 'text-black' : 'text-gray-300'}`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-20">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-4">Support</p>
              <p className="text-xl font-serif italic text-gray-800">Concierge Service Available</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
