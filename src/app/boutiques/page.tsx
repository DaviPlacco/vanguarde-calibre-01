'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import { toast } from '@/store/useToast';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-50 flex items-center justify-center font-serif italic text-gray-400">Loading Map...</div>
});

const boutiques = [
  { 
    city: 'Geneva', 
    address: 'Rue du Rhône 12', 
    type: 'Flagship Store',
    coordsText: '46.2044° N, 6.1432° E',
    latLng: [46.2044, 6.1432] as [number, number],
    offset: { x: 0, y: 0 }
  },
  { 
    city: 'Paris', 
    address: 'Place Vendôme 8', 
    type: 'Luxury Boutique',
    coordsText: '48.8566° N, 2.3522° E',
    latLng: [48.8667, 2.3292] as [number, number],
    offset: { x: -50, y: 30 }
  },
  { 
    city: 'Tokyo', 
    address: 'Ginza 4-Chome', 
    type: 'Artisan Atelier',
    coordsText: '35.6762° N, 139.6503° E',
    latLng: [35.6714, 139.7650] as [number, number],
    offset: { x: 100, y: -40 }
  },
];

export default function BoutiquesPage() {
  const [selectedBoutique, setSelectedBoutique] = useState(boutiques[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [requestedDate, setRequestedDate] = useState('');

  const handleSelectBoutique = (b: typeof boutiques[0]) => {
    setSelectedBoutique(b);
    toast.info('Boutique Selected', `${b.city} Flagship · ${b.address}`, {
      badge: 'SALON LOCATOR'
    });
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
    toast.gold('Private Viewing', `Scheduling consultation for ${selectedBoutique.city} Salon`);
  };

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingOpen(false);
    toast.success(
      'Exclusive Access Requested',
      `Your private viewing at ${selectedBoutique.city} (${selectedBoutique.address}) is submitted. A dedicated liaison will contact you within 2 hours.`,
      { duration: 6000 }
    );
  };

  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <Navigation />
      <CartDrawer />

      <section className="pt-32 md:pt-40 pb-20 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 lg:mb-16"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4">World of <br /><span className="italic">Vanguarde</span></h1>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold">The Global Presence</p>
            </motion.div>
            
            <div className="space-y-6">
              {boutiques.map((b) => (
                <div 
                  key={b.city}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectBoutique(b)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectBoutique(b);
                    }
                  }}
                  className={`w-full text-left group border-b border-black/5 pb-8 transition-all duration-500 cursor-pointer outline-none ${selectedBoutique.city === b.city ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                >
                  <p className="text-[9px] uppercase tracking-widest text-accent font-bold mb-2">{b.type}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className={`text-2xl md:text-4xl font-serif transition-all duration-500 ${selectedBoutique.city === b.city ? 'italic translate-x-2 md:translate-x-4' : ''}`}>
                        {b.city}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mt-2">{b.address}</p>
                    </div>
                    {selectedBoutique.city === b.city && (
                      <motion.button 
                        layoutId="book-btn"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          handleOpenBooking();
                        }}
                        className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors relative z-20 cursor-pointer"
                      >
                        Book Appointment
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Panning Map Container */}
          <div className="flex-1 bg-white border border-black/5 rounded-2xl md:rounded-3xl h-[350px] lg:h-[600px] relative overflow-hidden shadow-2xl shadow-black/5">
             {/* Abstract Grid Pattern */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             </div>
             
             {/* Real Interactive Map Layer */}
             <div className="absolute inset-0 z-10">
                <MapComponent center={selectedBoutique.latLng} />
             </div>

             <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-white via-white/80 to-transparent z-30 pointer-events-none">
                <div className="flex justify-between items-end">
                   <div className="pointer-events-auto">
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Geographic Focus</p>
                      <motion.p 
                        key={selectedBoutique.coordsText}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm md:text-lg font-serif italic"
                      >
                        {selectedBoutique.coordsText}
                      </motion.p>
                   </div>
                   <div className="text-right hidden md:block">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Current Status</p>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Available for Private Viewing</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white p-8 md:p-12 z-[101] shadow-2xl rounded-sm"
            >
              <button 
                onClick={() => setIsBookingOpen(false)} 
                aria-label="Close booking modal"
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors p-2"
              >
                <X className="w-5 h-5 stroke-[1px]" />
              </button>
              
              <h2 className="text-3xl md:text-4xl font-serif mb-8">Private Appointment <br /><span className="italic text-accent">in {selectedBoutique.city}</span></h2>
              
              <form onSubmit={handleConfirmAppointment} className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Location</p>
                    <p className="text-sm text-gray-500">{selectedBoutique.address}, {selectedBoutique.city}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Requested Date</p>
                    <input 
                      type="date" 
                      required
                      value={requestedDate}
                      onChange={(e) => setRequestedDate(e.target.value)}
                      className="text-sm text-gray-700 bg-transparent border-b border-black/10 focus:border-accent focus:outline-none py-1 w-full" 
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Preferred Contact</p>
                    <p className="text-sm text-gray-500">A dedicated consultant will reach out via encrypted channel within 2 hours.</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all duration-500 mt-6 shadow-xl shadow-black/10 cursor-pointer"
                >
                  Confirm Exclusive Access
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}
