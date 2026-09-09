'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { toast } from '@/store/useToast';

export default function ShippingReturns() {
  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('concierge@vanguarde.com');
    }
    toast.success('Concierge Email Copied', 'concierge@vanguarde.com copied to clipboard.', {
      badge: 'CONCIERGE DESK'
    });
  };

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
            Concierge Services
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-8">
            Shipping <span className="italic">& Returns</span>
          </h1>
          <div className="h-[1px] w-24 bg-black/10 mx-auto lg:mx-0" />
        </motion.div>

        <motion.div variants={itemVariants} className="prose prose-sm md:prose-base prose-neutral max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-serif italic mb-6">1. Global Delivery</h2>
            <p className="text-gray-600 leading-relaxed italic">
              Vanguarde offers complimentary, fully insured global shipping. Every timepiece is transported via our secure concierge network to ensure its precision is preserved during transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">2. Logistics & Insurance</h2>
            <p className="text-gray-600 leading-relaxed">
              Upon dispatch, a dedicated liaison will provide you with secure tracking credentials. All shipments are insured for their full value, providing peace of mind until the moment of unveiling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">3. Return Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We offer a 14-day window for returns of unworn timepieces. The security seal must remain intact, and the piece must be returned in its original artisanal packaging with all documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">4. Valuation & Refunds</h2>
            <p className="text-gray-600 leading-relaxed">
              Returned timepieces undergo a rigorous inspection by our master watchmakers to verify their condition. Once cleared, a refund will be processed to the original payment method within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">5. Contact Concierge</h2>
            <p className="text-gray-600 leading-relaxed italic">
              Should you require assistance with your delivery or return, our concierge team is available at{' '}
              <button 
                type="button"
                onClick={handleCopyEmail}
                className="text-accent border-b border-accent/30 hover:border-accent cursor-pointer font-bold inline-block"
              >
                concierge@vanguarde.com
              </button>.
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
