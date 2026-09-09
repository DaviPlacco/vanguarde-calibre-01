'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <main className="min-h-screen bg-[#FBFBFB] text-[#1A1A1A]">
      <Navigation />
      <CartDrawer />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-32 max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-16 md:mb-24 text-center lg:text-left">
          <p className="text-accent uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">
            Legal Information
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-8">
            Terms of <span className="italic">Service</span>
          </h1>
          <div className="h-[1px] w-24 bg-black/10 mx-auto lg:mx-0" />
        </motion.div>

        <motion.div variants={itemVariants} className="prose prose-sm md:prose-base prose-neutral max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-serif italic mb-6">1. Acceptance</h2>
            <p className="text-gray-600 leading-relaxed italic">
              By accessing the Vanguarde digital platform, you agree to abide by the codes of excellence and terms outlined herein.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">2. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All designs, movements, and visual assets associated with the Vanguarde Calibre 01 are protected by international copyright laws. Unauthorized reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">3. Product Availability</h2>
            <p className="text-gray-600 leading-relaxed">
              Due to the artisanal nature of our horology, production is limited. Possession is subject to availability and artisanal lead times.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">4. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Vanguarde is not liable for indirect damages arising from the use of our digital assets. Precision in information is our goal, but evolution is constant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">5. Governance</h2>
            <p className="text-gray-600 leading-relaxed italic">
              These terms are governed by the laws of Switzerland, the heart of mechanical watchmaking excellence.
            </p>
          </section>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-24 pt-12 border-t border-black/5 text-center lg:text-left text-[10px] uppercase tracking-widest text-gray-400">
          Last Updated: May 2026
        </motion.div>
      </motion.div>
      <Footer />
    </main>
  );
}
