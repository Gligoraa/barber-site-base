import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, History, User } from 'lucide-react';
import { Appointment, businessData } from '../config/business-config';

export const Dashboard = ({ bookings }: { bookings: Appointment[] }) => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-16">
          <div className="flex-1">
            <h1 className="text-4xl text-white font-light mb-2">Nadzorna Ploča</h1>
            <p className="text-white/40">Upravljajte svojim terminima i poviješću dolazaka.</p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-3xl border border-white/5">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center font-bold text-black text-xl">G</div>
            <div>
              <p className="text-white font-bold">Gost</p>
              <p className="text-white/40 text-xs">GUEST@EXAMPLE.COM</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-950 border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-5 h-5 text-amber-500" />
                <h2 className="text-white font-bold uppercase tracking-widest text-sm">Predstojeće</h2>
              </div>
              <div className="min-h-[160px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl p-8 text-center bg-black/40">
                <p className="text-white/20 italic mb-4 font-light">Nema zakazanih predstojećih termina.</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-8">
                <History className="w-5 h-5 text-amber-500" />
                <h2 className="text-white font-bold uppercase tracking-widest text-sm">Povijest</h2>
              </div>
              <div className="min-h-[200px] flex flex-col items-center justify-center border border-white/5 rounded-2xl p-8 bg-black/40">
                <p className="text-white/20 italic font-light">Nema prošlih termina.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Brza Statistika</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs uppercase tracking-widest">Ukupno Dolazaka</span>
                  <span className="text-white font-mono text-xl">{bookings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs uppercase tracking-widest">Bodovi Vjernosti</span>
                  <span className="text-amber-500 font-mono text-xl">{bookings.length * 150}</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[60%]" />
                  </div>
                  <p className="text-[10px] text-white/40 mt-2 uppercase tracking-widest">Još 4 dolaska do besplatnog šišanja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
