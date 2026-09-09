'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { toast } from '@/store/useToast';

export default function PrivacyPolicy() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('privacy@vanguarde.com');
    }
    toast.success('Privacy Officer Email Copied', 'privacy@vanguarde.com copied to clipboard.', {
      badge: 'LEGAL & PRIVACY'
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
      <Navigation onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
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
            Privacy <span className="italic">Policy</span>
          </h1>
          <div className="h-[1px] w-24 bg-black/10 mx-auto lg:mx-0" />
        </motion.div>

        <motion.div variants={itemVariants} className="prose prose-sm md:prose-base prose-neutral max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-serif italic mb-6">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed italic">
              At Vanguarde, your privacy is as paramount as the precision of our movements. This policy outlines how we handle your personal information with the utmost discretion and security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">2. Data Collection</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information only when necessary to provide you with a bespoke experience. This includes details provided during acquisition, concierge consultations, or newsletter subscriptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">3. Use of Information</h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is utilized exclusively to enhance your journey with Vanguarde. We never share or sell your information to third parties. It is used for order fulfillment, personalized service, and updates on our latest horological breakthroughs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">4. Security</h2>
            <p className="text-gray-600 leading-relaxed">
              Our digital infrastructure is protected by industry-leading encryption protocols, ensuring that your personal and financial details remain as impenetrable as a tourbillon cage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-6">5. Contact</h2>
            <p className="text-gray-600 leading-relaxed italic">
              For any inquiries regarding your data, please contact our concierge at{' '}
              <button 
                type="button"
                onClick={handleCopyEmail}
                className="text-accent border-b border-accent/30 hover:border-accent cursor-pointer font-bold inline-block"
              >
                privacy@vanguarde.com
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
