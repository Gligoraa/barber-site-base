import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { businessData } from '../config/business-config';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero = ({ onBookClick }: HeroProps) => {
  const { tagline, heroPromise } = businessData;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src={businessData.gallery[0]}
          alt={businessData.name}
          className="w-full h-full object-cover opacity-40 blur-sm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-amber-500 text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            {tagline}
          </span>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight leading-none">
            {heroPromise.main} <span className="font-serif italic text-amber-500">{heroPromise.italics}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {heroPromise.subtext}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all focus:ring-2 focus:ring-amber-500"
              aria-label="Book your appointment today"
            >
              Reserve Your Chair
            </button>
            <a 
              href="#promise"
              className="w-full sm:w-auto border border-white/20 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              aria-label="Learn about our quality promise"
            >
              Our Philosophy
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
        <ChevronRight className="w-6 h-6 rotate-90" />
      </div>
    </section>
  );
};
