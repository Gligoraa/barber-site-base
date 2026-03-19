import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { businessData } from '../config/business-config';

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Naše <span className="text-amber-500 italic font-serif">Usluge</span></h2>
          <p className="text-white/40 max-w-xl font-light leading-relaxed">
            Od preciznog oblikovanja brade do potpunih modernih transformacija, naše usluge su prilagođene jedinstvenim crtama svakog klijenta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {businessData.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group flex justify-between items-end pb-8 border-b border-white/5 hover:border-amber-500/30 transition-colors"
              role="article"
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{service.name}</h3>
                  <span className="text-white/30 text-xs uppercase tracking-widest">{service.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono text-amber-500/80 group-hover:text-amber-500 transition-colors">{service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
