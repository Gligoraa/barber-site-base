import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Scissors, User, ArrowRight } from 'lucide-react';
import { Appointment, businessData } from '../config/business-config';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (newBooking: Appointment) => void;
}

export const BookingModal = ({ isOpen, onClose, onBookingComplete }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = businessData.services;
  const stylists = businessData.stylists;
  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleComplete = () => {
    const stylist = stylists.find(s => s.id === selectedStylist);
    const service = services.find(s => s.id === selectedService);
    
    if (stylist && service) {
      const newBooking: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        date: selectedDate,
        time: selectedTime,
        service: service.name,
        stylistId: stylist.id,
        stylistName: stylist.name,
        price: service.price,
        status: 'upcoming'
      };
      
      onBookingComplete(newBooking);
      onClose();
      // Reset state
      setStep(1);
      setSelectedService('');
      setSelectedStylist('');
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div>
                <h2 className="text-2xl font-light text-white">Book Appointment</h2>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className={`h-1 w-8 rounded-full transition-colors ${s <= step ? 'bg-amber-500' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-8 h-[500px] custom-scrollbar overflow-y-auto">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-6 px-2">Select Service</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedService(s.id); setStep(2); }}
                        className={`group p-6 rounded-3xl border text-left transition-all ${selectedService === s.id ? 'bg-amber-500 border-amber-500 text-black' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold tracking-tight text-lg">{s.name}</span>
                          <span className="font-mono">{s.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-6 px-2">Choose Stylist</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {stylists.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedStylist(s.id); setStep(3); }}
                        className={`group p-4 rounded-3xl border flex items-center gap-4 transition-all ${selectedStylist === s.id ? 'bg-amber-500 border-amber-500 text-black' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'}`}
                      >
                        <img src={s.image} alt={s.name} className="w-14 h-14 rounded-full object-cover grayscale-0" />
                        <div className="text-left">
                          <p className="font-bold">{s.name}</p>
                          <p className={`text-xs uppercase tracking-widest ${selectedStylist === s.id ? 'text-black/60' : 'text-amber-500'}`}>{s.specialty}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-6 px-2">Select Date & Time</h3>
                  <div className="grid gap-8">
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(t => (
                        <button
                          key={t}
                          onClick={() => { setSelectedTime(t); setStep(4); }}
                          className={`p-3 rounded-xl border text-center transition-all ${selectedTime === t ? 'bg-amber-500 border-amber-500 text-black' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-10">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Scissors className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-3xl text-white font-light mb-4">Confirm Selection</h3>
                  <div className="bg-white/5 rounded-[32px] p-8 max-w-sm mx-auto space-y-4 border border-white/5">
                    <p className="text-white/60 text-sm">{services.find(s => s.id === selectedService)?.name}</p>
                    <p className="text-amber-500 font-bold text-xl">with {stylists.find(s => s.id === selectedStylist)?.name}</p>
                    <div className="flex justify-center gap-4 text-white/40 text-sm">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {selectedDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedTime}</span>
                    </div>
                    <p className="text-3xl text-white font-mono mt-4">{services.find(s => s.id === selectedService)?.price}</p>
                  </div>
                  <button
                    onClick={handleComplete}
                    className="mt-12 w-full bg-amber-500 text-black py-5 rounded-full font-bold uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-3"
                  >
                    Confirm Booking <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </div>

            {step > 1 && step < 4 && (
              <div className="p-8 border-t border-white/5 flex justify-start">
                <button onClick={() => setStep(step - 1)} className="text-white/40 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">
                  Back
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
