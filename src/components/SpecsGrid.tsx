'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Clock, Droplets } from 'lucide-react';
import { toast } from '@/store/useToast';

const specs = [
  { 
    title: "Power Reserve", 
    value: "72 Hours", 
    detail: "Double barrel system providing three full days of autonomy.",
    icon: Clock 
  },
  { 
    title: "Water Resistance", 
    value: "100 Meters", 
    detail: "Double-gasket screw-down crown for aquatic exploration.",
    icon: Droplets 
  },
  { 
    title: "Vibrations", 
    value: "28,800 bph", 
    detail: "High-frequency movement for impeccable sweeping motion.",
    icon: Zap 
  },
  { 
    title: "Warranty", 
    value: "10 Years", 
    detail: "A testament to our confidence in Vanguarde craftsmanship.",
    icon: Shield 
  },
];

export default function SpecsGrid() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-8">
        <div className="editorial-grid">
          <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
            <h2 className="text-5xl font-serif leading-tight mb-8">Technical <br /><span className="italic">Superiority</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Every screw, bridge, and spring is finished by hand under a microscope. Perfection is our only baseline.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {specs.map((spec, index) => (
              <motion.div 
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => toast.gold(`${spec.title}: ${spec.value}`, spec.detail, { badge: 'HOROLOGICAL SPEC' })}
                className="group p-8 border border-black/5 hover:border-accent/30 transition-all duration-500 rounded-2xl bg-[#FBFBFB] hover:shadow-2xl hover:shadow-accent/5 cursor-pointer"
              >
                <spec.icon className="w-6 h-6 mb-6 stroke-[1px] text-accent group-hover:scale-110 transition-transform duration-500" />
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{spec.title}</p>
                <h3 className="text-3xl font-serif mb-4">{spec.value}</h3>
                <p className="text-xs text-gray-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {spec.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
