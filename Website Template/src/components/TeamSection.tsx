import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { businessData } from '../config/business-config';

export const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Meet the Artists</h2>
          <p className="text-white/50 max-w-xl mx-auto font-light leading-relaxed">
            Our master stylists bring decades of combined experience and a passion for perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {businessData.stylists.map((stylist, idx) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
              role="article"
            >
              <div className="relative mb-6 inline-block">
                <div className="absolute -inset-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500" />
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-48 h-48 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 mx-auto border-4 border-zinc-900 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-amber-500 text-black p-2 rounded-full shadow-xl">
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{stylist.name}</h3>
              <p className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-4 tracking-[0.2em]">{stylist.specialty}</p>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto italic font-light">
                "{stylist.bio}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
