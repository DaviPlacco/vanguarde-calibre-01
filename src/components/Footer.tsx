'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from '@/store/useToast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.warning('Email Required', 'Please enter a valid email address for private invitations.');
      return;
    }

    toast.gold(
      'Inner Circle Access Granted',
      `An exclusive salon invitation has been dispatched to ${email.trim()}.`,
      {
        badge: 'BESPOKE INVITATION',
        duration: 5000,
      }
    );
    setEmail('');
  };

  const handleSocialClick = (platform: string) => {
    toast.info('Connecting Channel', `Opening official Vanguarde ${platform} salon...`);
  };

  return (
    <footer className="py-32 border-t border-black/5 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 italic">Inquiry & Bespoke</p>
            <h2 className="text-6xl font-serif mb-12 leading-tight">Join the <br /><span className="italic">Inner Circle</span></h2>
            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for private invitations" 
                  className="w-full bg-transparent border-b border-black/20 py-4 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-gray-300 italic pr-16"
                />
                <button 
                  type="submit" 
                  className="absolute right-0 bottom-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-black hover:text-accent transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-3 lg:col-start-8">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-8">Navigation</p>
            <ul className="space-y-4 text-sm text-gray-400 font-serif italic">
              <li><Link href="/collections" className="hover:text-black transition-colors">Collections</Link></li>
              <li><Link href="/craftsmanship" className="hover:text-black transition-colors">Craftsmanship</Link></li>
              <li><Link href="/boutiques" className="hover:text-black transition-colors">Boutiques</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-8">Legal</p>
            <ul className="space-y-4 text-[10px] text-gray-400 uppercase tracking-widest">
              <li><Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-black/5 pt-12">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">© 2026 Vanguarde Chronos. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
             <button 
               type="button"
               onClick={() => handleSocialClick('Instagram')}
               className="text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:text-accent transition-colors"
             >
               Instagram
             </button>
             <button 
               type="button"
               onClick={() => handleSocialClick('LinkedIn')}
               className="text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:text-accent transition-colors"
             >
               LinkedIn
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
