import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { businessData } from '../config/business-config';

export const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl font-light text-white mb-4">Portfolio</h2>
            <p className="text-white/50 font-light italic">Real clients, real results. Excellence in every detail.</p>
          </div>
          <a 
            href={businessData.contact.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all min-h-[44px] px-2 focus:outline-none focus:underline"
            aria-label="Follow our work on Instagram"
          >
            View Instagram <Instagram className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {businessData.gallery.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square relative overflow-hidden rounded-3xl group shadow-2xl"
            >
              <img
                src={img}
                alt={`Portfolio ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
