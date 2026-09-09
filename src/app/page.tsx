'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ScrollytellingWatch from '@/components/ScrollytellingWatch';
import SpecsGrid from '@/components/SpecsGrid';
import PersonalizationSection from '@/components/PersonalizationSection';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="relative bg-[#FBFBFB]">
      {/* Dynamic Header */}
      <Navigation onCartOpen={() => setIsCartOpen(true)} />
      
      {/* Cart Component - Managed centrally */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Section - The Grand Entrance */}
      <Hero />

      {/* Scrollytelling Section - The Mechanical Core */}
      <ScrollytellingWatch />

      {/* Features Grid - Asymmetric Editorial */}
      <SpecsGrid />

      {/* Configurator - Interactive Choice */}
      <PersonalizationSection />

      {/* Editorial Footer */}
      <Footer />
    </main>
  );
}
