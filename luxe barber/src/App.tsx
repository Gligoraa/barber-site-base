import {
  Calendar,
  Clock,
  Scissors,
  User,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  ChevronRight,
  Star,
  CheckCircle2,
  Gift,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  History,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import { format, addDays, startOfToday, isSameDay, parseISO } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for Tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'Barber' | 'Salon' | 'Special';
};

type Stylist = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
};

type Appointment = {
  id: string;
  serviceId: string;
  stylistId: string;
  date: string; // ISO string
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  clientName: string;
  clientEmail: string;
};

// --- Constants ---

const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'The Express',
    description: 'A fast, precision cut for the busy professional. Includes a quick style and rinse.',
    price: 35,
    duration: 30,
    category: 'Barber'
  },
  {
    id: 's2',
    name: 'Signature Cut & Style',
    description: 'Our premium service. Includes a deep head massage, hot towel treatment, and custom styling.',
    price: 55,
    duration: 60,
    category: 'Barber'
  },
  {
    id: 's3',
    name: 'Classic Beard Trim',
    description: 'Sculpted to perfection with straight razor detailing and beard oil application.',
    price: 25,
    duration: 20,
    category: 'Barber'
  },
  {
    id: 's4',
    name: 'Full Color & Cut',
    description: 'Complete transformation with premium products and expert color matching.',
    price: 120,
    duration: 150,
    category: 'Salon'
  },
  {
    id: 's5',
    name: 'Luxury Blowout',
    description: 'The ultimate pampering session for a flawless, long-lasting style.',
    price: 45,
    duration: 45,
    category: 'Salon'
  }
];

const STYLISTS: Stylist[] = [
  {
    id: 't1',
    name: 'Marco V.',
    specialty: 'Master Barber & Shave Expert',
    bio: 'With 15 years in the craft, Marco specializes in traditional straight-razor techniques and modern fades.',
    image: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.9
  },
  {
    id: 't2',
    name: 'Elena S.',
    specialty: 'Creative Colorist & Stylist',
    bio: 'Elena is a wizard with color. From subtle balayage to bold transformations, she brings art to every cut.',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 5.0
  },
  {
    id: 't3',
    name: 'James L.',
    specialty: 'Modern Texture Specialist',
    bio: 'James focuses on contemporary styles and textured cuts that work with your natural hair flow.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.8
  }
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800'
];

// --- Components ---

const Navbar = ({ onBookClick, onDashboardClick, isDashboard }: { onBookClick: () => void; onDashboardClick: () => void; isDashboard: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
      "pt-[max(1rem,env(safe-area-inset-top))]",
      isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <button 
        className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Luxe & Blade - Scroll to top"
      >
        <Scissors className="w-8 h-8 text-amber-500" aria-hidden="true" />
        <span className="text-xl font-bold tracking-tighter text-white uppercase">Luxe & Blade</span>
      </button>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#team" className="hover:text-white transition-colors">Team</a>
        <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
        <button onClick={onDashboardClick} className="flex items-center gap-2 hover:text-white transition-colors">
          <UserCircle className="w-4 h-4" />
          {isDashboard ? "Home" : "Dashboard"}
        </button>
      </div>

      <button
        onClick={onBookClick}
        className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-amber-500/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Book an appointment now"
      >
        Book Now
      </button>
    </nav>
  );
};

const Hero = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1920"
          alt="Barbershop Atmosphere"
          className="w-full h-full object-cover opacity-40"
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
            Experience the Art of Grooming
          </span>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight leading-none">
            More Than Just a <span className="font-serif italic text-amber-500">Cut</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Escape the noise. We provide a relaxing sanctuary with premium head massages,
            precision techniques, and the finest products for the modern individual.
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

const PromiseSection = () => {
  const pillars = [
    {
      title: "The Craft",
      desc: "Every cut is a signature. Our master barbers combine centuries-old tradition with modern precision."
    },
    {
      title: "The Sanctuary",
      desc: "Step out of the city and into a space designed for relaxation, premium spirits, and total focus on you."
    },
    {
      title: "The Standard",
      desc: "We use only world-class grooming products. No compromises, just exceptional results every time."
    }
  ];

  return (
    <section id="promise" className="py-24 bg-black border-y border-white/5 scroll-mt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {pillars.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-amber-500 font-bold uppercase tracking-[0.2em] mb-4 text-sm">{p.title}</h3>
              <p className="text-white/70 text-lg font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Our Services</h2>
          <div className="h-1 w-20 bg-amber-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:border-amber-500/30 transition-all focus-within:ring-2 focus-within:ring-amber-500"
              role="article"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-amber-500/10 p-3 rounded-xl group-hover:bg-amber-500 transition-colors">
                  <Scissors className="w-6 h-6 text-amber-500 group-hover:text-black" />
                </div>
                <span className="text-2xl font-mono text-white">${service.price}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {service.duration} MIN
                </span>
                <span className="px-2 py-1 border border-white/10 rounded">
                  {service.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Meet the Team</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Our master stylists bring decades of combined experience and a passion for perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {STYLISTS.map((stylist, idx) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6 group inline-block">
                <div className="absolute -inset-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-48 h-48 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 mx-auto border-4 border-zinc-900"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-amber-500 text-black p-2 rounded-full shadow-xl">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{stylist.name}</h3>
              <p className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-4">{stylist.specialty}</p>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto italic">
                "{stylist.bio}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      name: "David K.",
      text: "The best grooming experience in the city. Marco is a master of the straight razor. The atmosphere is top notch.",
      rating: 5
    },
    {
      name: "Sarah M.",
      text: "Elena transformed my hair. Her color matching is perfect. Finally a salon that truly listens to clients.",
      rating: 5
    },
    {
      name: "Michael R.",
      text: "Premium service from start to finish. The head massage alone is worth the visit. Highly recommended.",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-zinc-900 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">What Our Clients Say</h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-amber-500 fill-current" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
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

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-light text-white mb-4">Portfolio</h2>
            <p className="text-white/50">Real clients, real results. Excellence in every detail.</p>
          </div>
          <button 
            className="text-amber-500 flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all min-h-[44px] px-2 focus:outline-none focus:underline"
            aria-label="Follow our work on Instagram"
          >
            View Instagram <Instagram className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="aspect-square overflow-hidden rounded-2xl bg-zinc-900"
            >
              <img
                src={img}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingModal = ({ isOpen, onClose, onBookingComplete }: { isOpen: boolean; onClose: () => void; onBookingComplete: (booking: Appointment) => void }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '' });

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleComplete = () => {
    if (!selectedService || !selectedStylist || !selectedTime) return;

    const newBooking: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      stylistId: selectedStylist.id,
      date: selectedDate.toISOString(),
      time: selectedTime,
      status: 'upcoming',
      clientName: clientInfo.name,
      clientEmail: clientInfo.email
    };

    onBookingComplete(newBooking);
    onClose();
    // Reset
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedTime('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 bg-zinc-900 w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">Book Appointment</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={cn("h-1 flex-1 rounded-full transition-colors", s <= step ? "bg-amber-500" : "bg-white/10")} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-white mb-4">Select a Service</h3>
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedService(s); setStep(2); }}
                      className={cn(
                        "flex justify-between items-center p-4 rounded-xl border transition-all text-left",
                        selectedService?.id === s.id ? "bg-amber-500 border-amber-500 text-black" : "bg-white/5 border-white/5 text-white hover:border-white/20"
                      )}
                    >
                      <div>
                        <div className="font-bold">{s.name}</div>
                        <div className="text-xs opacity-60 uppercase tracking-wider">{s.duration} min</div>
                      </div>
                      <div className="font-mono">${s.price}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-white mb-4">Choose Your Stylist</h3>
                <div className="grid grid-cols-1 gap-3">
                  {STYLISTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedStylist(s); setStep(3); }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                        selectedStylist?.id === s.id ? "bg-amber-500 border-amber-500 text-black" : "bg-white/5 border-white/5 text-white hover:border-white/20"
                      )}
                    >
                      <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-bold">{s.name}</div>
                        <div className="text-xs opacity-60 uppercase tracking-wider">{s.specialty}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="text-amber-500 text-sm font-bold uppercase tracking-widest mt-4">Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Select Date & Time</h3>
                  <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const date = addDays(startOfToday(), day);
                      const isSelected = isSameDay(date, selectedDate);
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={cn(
                            "flex flex-col items-center min-w-[70px] p-3 rounded-xl border transition-all",
                            isSelected ? "bg-amber-500 border-amber-500 text-black" : "bg-white/5 border-white/5 text-white hover:border-white/20"
                          )}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{format(date, 'EEE')}</span>
                          <span className="text-lg font-bold">{format(date, 'd')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Available Slots</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => { setSelectedTime(time); setStep(4); }}
                        className={cn(
                          "p-3 rounded-lg border text-sm font-mono transition-all",
                          selectedTime === time ? "bg-amber-500 border-amber-500 text-black" : "bg-white/5 border-white/5 text-white hover:border-white/20"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="text-amber-500 text-sm font-bold uppercase tracking-widest">Back</button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-medium text-white mb-4">Confirm Details</h3>
                <div className="bg-white/5 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase tracking-widest">Service</span>
                    <span className="text-white font-bold">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase tracking-widest">Stylist</span>
                    <span className="text-white font-bold">{selectedStylist?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase tracking-widest">Date</span>
                    <span className="text-white font-bold">{format(selectedDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase tracking-widest">Time</span>
                    <span className="text-white font-bold">{selectedTime}</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-white/40 uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-mono text-amber-500">${selectedService?.price}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <button
                  onClick={handleComplete}
                  disabled={!clientInfo.name || !clientInfo.email}
                  className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-50"
                >
                  Confirm Booking
                </button>
                <button onClick={() => setStep(3)} className="w-full text-amber-500 text-sm font-bold uppercase tracking-widest">Back</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ bookings }: { bookings: Appointment[] }) => {
  const upcoming = bookings.filter(b => b.status === 'upcoming');
  const past = bookings.filter(b => b.status !== 'upcoming');

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Client Dashboard</h1>
            <p className="text-white/40">Manage your appointments and grooming history.</p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
              {bookings[0]?.clientName?.charAt(0) || 'G'}
            </div>
            <div>
              <div className="text-white font-bold">{bookings[0]?.clientName || 'Guest User'}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">{bookings[0]?.clientEmail || 'guest@example.com'}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">Upcoming</h2>
              </div>

              {upcoming.length === 0 ? (
                <div className="bg-zinc-900 border border-dashed border-white/10 rounded-3xl p-12 text-center">
                  <p className="text-white/30 italic">No upcoming appointments scheduled.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map(b => {
                    const service = SERVICES.find(s => s.id === b.serviceId);
                    const stylist = STYLISTS.find(s => s.id === b.stylistId);
                    return (
                      <div key={b.id} className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 w-full">
                          <div className="text-center min-w-[60px]">
                            <div className="text-amber-500 font-bold text-2xl">{format(parseISO(b.date), 'dd')}</div>
                            <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{format(parseISO(b.date), 'MMM')}</div>
                          </div>
                          <div className="h-10 w-px bg-white/10 hidden md:block" />
                          <div>
                            <h3 className="text-white font-bold text-lg">{service?.name}</h3>
                            <div className="flex items-center gap-2 text-white/40 text-sm">
                              <User className="w-3 h-3" /> {stylist?.name} • <Clock className="w-3 h-3" /> {b.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button className="flex-1 md:flex-none px-6 py-2 rounded-full border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Reschedule</button>
                          <button className="flex-1 md:flex-none px-6 py-2 rounded-full border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all">Cancel</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <History className="w-5 h-5 text-white/40" />
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">History</h2>
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-white/40 uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Stylist</th>
                      <th className="px-6 py-4">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {past.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-white/20 italic">No past appointments found.</td>
                      </tr>
                    ) : (
                      past.map(b => {
                        const service = SERVICES.find(s => s.id === b.serviceId);
                        const stylist = STYLISTS.find(s => s.id === b.stylistId);
                        return (
                          <tr key={b.id} className="text-white/60">
                            <td className="px-6 py-4">{format(parseISO(b.date), 'MMM dd, yyyy')}</td>
                            <td className="px-6 py-4 font-bold text-white">{service?.name}</td>
                            <td className="px-6 py-4">{stylist?.name}</td>
                            <td className="px-6 py-4 font-mono">${service?.price}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs uppercase tracking-widest">Total Visits</span>
                  <span className="text-white font-mono text-xl">{bookings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs uppercase tracking-widest">Loyalty Points</span>
                  <span className="text-amber-500 font-mono text-xl">{bookings.length * 150}</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[60%]" />
                  </div>
                  <p className="text-[10px] text-white/40 mt-2 uppercase tracking-widest">4 more visits until a free Signature Cut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">Luxe & Blade</span>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Premium grooming for the modern individual. We combine traditional techniques
              with contemporary style to provide an unmatched experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all focus:ring-2 focus:ring-amber-500" aria-label="Visit our Instagram profile">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition-all focus:ring-2 focus:ring-amber-500" aria-label="Visit our Facebook page">
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Location</h4>
            <div className="space-y-4 text-white/40 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                123 Artisan Way,<br />Design District, NY 10012
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                +1 (555) 000-1234
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Hours</h4>
            <div className="space-y-2 text-white/40 text-sm font-mono">
              <div className="flex justify-between">
                <span>Mon - Fri</span>
                <span>09:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-amber-500/50">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2026 Luxe & Blade Barbershop. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [bookings, setBookings] = useState<Appointment[]>([]);

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('luxe_blade_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  const handleBookingComplete = (newBooking: Appointment) => {
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem('luxe_blade_bookings', JSON.stringify(updated));
    // Optional: show success toast or redirect to dashboard
    setIsDashboard(true);
  };

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-amber-500 selection:text-black">
      <Navbar
        onBookClick={() => setIsBookingOpen(true)}
        onDashboardClick={() => setIsDashboard(!isDashboard)}
        isDashboard={isDashboard}
      />

      <AnimatePresence mode="wait">
        {isDashboard ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Dashboard bookings={bookings} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Hero onBookClick={() => setIsBookingOpen(true)} />
            <PromiseSection />
            <ServicesSection />
            <TeamSection />
            <ReviewsSection />
            <GallerySection />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

      {/* Mobile Quick Actions */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40 flex gap-3">
        <a href="tel:+15550001234" className="flex-1 bg-zinc-900 border border-white/10 text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
          <Phone className="w-4 h-4" /> Call
        </a>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-[2] bg-amber-500 text-black h-14 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs shadow-xl shadow-amber-500/20"
        >
          <Calendar className="w-4 h-4" /> Book Now
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </div>
  );
}
