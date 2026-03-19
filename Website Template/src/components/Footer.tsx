import React from 'react';
import { Scissors, Instagram, Facebook, MapPin, Phone } from 'lucide-react';
import { businessData } from '../config/business-config';

export const Footer = () => {
  return (
    <footer className="bg-black pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center font-black rotate-12">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white uppercase tracking-tighter">{businessData.name}</span>
            </div>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-10 max-w-sm">
              Premium usluga za modernog muškarca. Spajamo tradicionalne tehnike sa suvremenim stilom kako bismo pružili neponovljivo iskustvo.
            </p>
            <div className="flex gap-4">
              <a 
                href={businessData.contact.social.instagram} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-amber-500 hover:bg-amber-500/10 transition-all focus:ring-2 focus:ring-amber-500"
                aria-label={`Follow ${businessData.name} on Instagram`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={businessData.contact.social.facebook} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-amber-500 hover:bg-amber-500/10 transition-all focus:ring-2 focus:ring-amber-500"
                aria-label={`Follow ${businessData.name} on Facebook`}
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] mb-10 text-sm">Lokacija</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start text-white/60">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="font-light">{businessData.contact.address}</p>
              </div>
              <div className="flex gap-4 items-center text-white/60">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="font-light">{businessData.contact.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] mb-10 text-sm">Radno Vrijeme</h4>
            <div className="space-y-4 text-white/60 font-light font-mono text-sm leading-relaxed">
              <div className="flex justify-between">
                <span>Pon - Pet</span>
                <span>{businessData.hours.mon_fri}</span>
              </div>
              <div className="flex justify-between">
                <span>Subota</span>
                <span>{businessData.hours.sat}</span>
              </div>
              <div className="flex justify-between">
                <span>Nedjelja</span>
                <span className="text-amber-500/50">{businessData.hours.sun}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2026 {businessData.name} Frizerski salon. Sva prava pridržana.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Pravila Privatnosti</a>
            <a href="#" className="hover:text-white transition-colors">Uvjeti Korištenja</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
