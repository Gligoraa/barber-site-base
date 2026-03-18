import React from 'react';
import { Scissors, LayoutDashboard } from 'lucide-react';
import { businessData } from '../config/business-config';

interface NavbarProps {
  onBookClick: () => void;
  onDashboardClick: () => void;
  isDashboard: boolean;
}

export const Navbar = ({ onBookClick, onDashboardClick, isDashboard }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
      <div className="flex items-center gap-8 pointer-events-auto">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group focus:ring-2 focus:ring-amber-500 rounded-lg px-2"
          aria-label={`${businessData.name} Home`}
        >
          <div className="w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/20">
            <Scissors className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="text-white font-black text-xl tracking-tighter uppercase">{businessData.name}</span>
        </button>
        
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#team" className="hover:text-white transition-colors">Team</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <button 
            onClick={onDashboardClick}
            className="flex items-center gap-2 text-amber-500 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-3 h-3" />
            {isDashboard ? 'Home' : 'Dashboard'}
          </button>
        </div>
      </div>

      <button
        onClick={onBookClick}
        className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-amber-500/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black pointer-events-auto"
        aria-label="Book an appointment now"
      >
        Book Now
      </button>
    </nav>
  );
};
