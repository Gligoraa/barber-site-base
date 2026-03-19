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
  name: "FadeRoom Barber",
  tagline: "Premium muški frizerski salon",
  heroPromise: {
    main: "Više od običnog",
    italics: "Šišanja",
    subtext: "FadeRoom je premium frizerski salon u Rijeci. Rezervirajte termin brzo i jednostavno. Šišanje, brijanje i styling na jednom mjestu."
  },
  philosophy: [
    {
      title: "Zanat",
      desc: "Svaki rez je naš potpis. Spajamo tradiciju zanata s modernom preciznošću."
    },
    {
      title: "Oaza za muškarce",
      desc: "Zaboravite na gradsku vrevu. Uživajte u prostoru stvorenom za opuštanje i potpunu posvećenost vama."
    },
    {
      title: "Standard",
      desc: "Koristimo samo prvoklasne proizvode. Nema kompromisa, samo vrhunski rezultati svaki put."
    }
  ],
  services: [
    { id: '1', name: 'Šišanje', price: '20,00 €', duration: '30 min' },
    { id: '2', name: 'Pranje i stiliziranje', price: '10,00 €', duration: '15 min' },
    { id: '3', name: 'Uređivanje brade', price: '15,00 €', duration: '20 min' },
    { id: '4', name: 'Šišanje i uređenje brade', price: '30,00 €', duration: '50 min' },
    { id: '5', name: 'Dječje šišanje', price: '15,00 €', duration: '30 min' }
  ],
  stylists: [
    {
      id: '1',
      name: 'Ivan Matić',
      specialty: 'Master Barber',
      bio: 'Nagrađivani majstor klasičnog brijanja i preciznog stiliziranja brade.',
      image: 'https://images.unsplash.com/photo-1534030347209-c87cd1b7bc2c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '2',
      name: 'Luka Horvat',
      specialty: 'Senior Barber',
      bio: 'Stručnjak za moderne teksturirane frizure i avangardne tehnike brijanja.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '3',
      name: 'Marko Kovač',
      specialty: 'Barber',
      bio: 'Poznat po Fade tehnikama, savršenim prijelazima i modernim stilovima.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    }
  ],
  reviews: [
    {
      name: "David K.",
      text: "Najbolje iskustvo šišanja u gradu. Ivan je majstor svog zanata. Atmosfera je vrhunska.",
      rating: 5
    },
    {
      name: "Sanjin M.",
      text: "Marko mi je potpuno transformirao frizuru. Konačno frizerski salon koji zaista sluša klijente.",
      rating: 5
    },
    {
      name: "Mihael R.",
      text: "Premium usluga od početka do kraja. Topla preporuka svima u Rijeci.",
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
    address: 'Ulica..., Rijeka, 51000 HR',
    phone: '+385-XX-XXX-XXXX',
    email: 'info@faderoom.hr',
    social: {
      instagram: 'https://instagram.com/faderoom',
      facebook: 'https://facebook.com/faderoom'
    }
  },
  hours: {
    mon_fri: '09:00 - 20:00',
    sat: '09:00 - 15:00',
    sun: 'Zatvoreno'
  },
  theme: {
    primaryColor: 'zinc-100',
    secondaryColor: 'zinc-950'
  }
};
