export interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  stylistId: string;
  stylistName: string;
  price: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Review {
  name: string;
  text: string;
  rating: number;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  heroPromise: {
    main: string;
    italics: string;
    subtext: string;
  };
  philosophy: {
    title: string;
    desc: string;
  }[];
  services: Service[];
  stylists: Stylist[];
  reviews: Review[];
  gallery: string[];
  contact: {
    address: string;
    phone: string;
    email: string;
    social: {
      instagram: string;
      facebook: string;
    };
  };
  hours: {
    mon_fri: string;
    sat: string;
    sun: string;
  };
  theme: {
    primaryColor: string; // TailWind class or Hex
    secondaryColor: string;
  };
}

export const businessData: BusinessConfig = {
  name: "Luxe & Blade",
  tagline: "Experience the Art of Grooming",
  heroPromise: {
    main: "More Than Just a",
    italics: "Cut",
    subtext: "Escape the noise. We provide a relaxing sanctuary with premium head massages, precision techniques, and the finest products for the modern individual."
  },
  philosophy: [
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
  ],
  services: [
    { id: '1', name: 'Express Grooming', price: '$35', duration: '30 mins' },
    { id: '2', name: 'Signature Cut & Style', price: '$55', duration: '45 mins' },
    { id: '3', name: 'Luxury Beard Trim', price: '$25', duration: '20 mins' },
    { id: '4', name: 'Precision Color', price: '$120+', duration: '90 mins' },
    { id: '5', name: 'Executive Package', price: '$95', duration: '75 mins' }
  ],
  stylists: [
    {
      id: '1',
      name: 'Marco Rossi',
      specialty: 'Master Barber',
      bio: 'Award-winning master of traditional straight razor shaves and precision beard styling.',
      image: 'https://images.unsplash.com/photo-1534030347209-c87cd1b7bc2c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '2',
      name: 'Elena Vance',
      specialty: 'Senior Stylist',
      bio: 'Specialist in modern texturized cuts and avant-garde male grooming techniques.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '3',
      name: 'James Chen',
      specialty: 'Color Artist',
      bio: 'Renowned expert in subtle grey blending and creative male hair coloring.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    }
  ],
  reviews: [
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
  ],
  gallery: [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800'
  ],
  contact: {
    address: '123 Artisan Way, Design District, NY 10012',
    phone: '+1 (555) 000-1234',
    email: 'info@luxeblade.com',
    social: {
      instagram: 'https://instagram.com/luxeblade',
      facebook: 'https://facebook.com/luxeblade'
    }
  },
  hours: {
    mon_fri: '09:00 - 20:00',
    sat: '10:00 - 18:00',
    sun: 'Closed'
  },
  theme: {
    primaryColor: 'amber-500',
    secondaryColor: 'zinc-950'
  }
};
