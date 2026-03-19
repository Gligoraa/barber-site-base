import React from 'react';
import { Star } from 'lucide-react';
import { businessData } from '../config/business-config';

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-zinc-900 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Što Kažu Naši Klijenti</h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-amber-500 fill-current" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessData.reviews.map((r, i) => (
            <div key={i} className="bg-black/40 p-10 rounded-3xl border border-white/5 relative">
              <div className="text-amber-500 text-4xl font-serif absolute top-6 left-6 opacity-20">"</div>
              <p className="text-white/70 italic mb-8 relative z-10">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 text-xs font-bold">
                  {r.name.charAt(0)}
                </div>
                <span className="text-white font-medium">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
