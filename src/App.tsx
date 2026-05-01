import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Phone,
  Globe,
  Mail,
  Calendar,
  Users,
} from 'lucide-react';
import culinaryLogo from './assets/culinary.png';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'starters' | 'mains' | 'desserts' | 'wines';
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Paneer Tikka', description: 'Charred cottage cheese, mint chutney, pickled onions', price: '360', category: 'starters' },
  { id: '2', name: 'Masala Papdi Chaat', description: 'Crisp papdi, spiced potatoes, yogurt, tamarind, sev', price: '280', category: 'starters' },
  { id: '3', name: 'Butter Chicken', description: 'Smoky chicken in a rich tomato-cashew gravy, naan', price: '620', category: 'mains' },
  { id: '4', name: 'Dal Makhani', description: 'Slow-cooked black lentils, cream, garlic tadka, rice', price: '460', category: 'mains' },
  { id: '5', name: 'Gulab Jamun', description: 'Warm milk dumplings, saffron syrup, pistachio', price: '220', category: 'desserts' },
  { id: '6', name: 'Rasmalai', description: 'Soft paneer discs in saffron milk, cardamom, almonds', price: '240', category: 'desserts' },
  { id: '7', name: 'Masala Chai', description: 'Assam tea, ginger, cardamom, whole milk', price: '120', category: 'wines' },
  { id: '8', name: 'Mango Lassi', description: 'Sweet mango yogurt smoothie, chilled and creamy', price: '160', category: 'wines' },
];

const CATEGORIES = ['starters', 'mains', 'desserts', 'wines'] as const;
const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
  starters: 'Starters',
  mains: 'Mains',
  desserts: 'Desserts',
  wines: 'Drinks',
};

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_VIEWPORT = { once: true, amount: 0.28 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.05, ease: EASE },
  },
};

const hoverLift = {
  y: -4,
  transition: { duration: 0.28, ease: EASE },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={culinaryLogo}
            alt="Culinary logo"
            className="w-8 h-8 rounded-full object-cover shadow-sm"
          />
          <h1 className="text-2xl tracking-widest uppercase font-serif">Lumiere</h1>
        </div>

        <div className="hidden md:flex space-x-12 items-center">
          {['Experience', 'Menu', 'About', 'Reservations'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a
            href="#reservations"
            className="bg-brand-ink text-brand-cream px-8 py-3 text-xs uppercase tracking-[0.2em] rounded-full hover:bg-brand-gold transition-all duration-500 transform-gpu hover:-translate-y-0.5"
          >
            Book Table
          </a>
        </div>

        <button
          className="md:hidden transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 160, mass: 0.9 }}
            className="fixed inset-0 bg-brand-cream z-[60] flex flex-col p-12 shadow-2xl"
          >
            <div className="flex justify-end">
              <button
                className="transition-transform duration-300 hover:scale-105 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8">
              {['Experience', 'Menu', 'About', 'Reservations'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif hover:text-brand-gold transition-all duration-500 transform-gpu hover:translate-x-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-brand-ink/40 z-10" />
      <motion.img
        initial={prefersReducedMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
        alt="Restaurant Atmosphere"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transform-gpu"
        style={{ willChange: 'transform' }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-20 text-center text-brand-cream max-w-4xl px-6"
      >
        <motion.div variants={fadeUp}>
          <span className="text-xs uppercase tracking-[0.4em] font-medium mb-6 block">Art of Gastronomy</span>
          <h2 className="text-6xl md:text-9xl mb-8 leading-none">
            Culinary <br /> <span className="italic font-light">Poetry</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mt-12">
            <a
              href="#menu"
              className="group flex items-center space-x-2 text-xs uppercase tracking-[0.2em] border-b border-brand-cream/30 pb-2 hover:border-brand-cream transition-all duration-300 transform-gpu hover:-translate-y-0.5"
            >
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <a
              href="#reservations"
              className="text-xs uppercase tracking-[0.2em] bg-white text-brand-ink px-10 py-5 rounded-full hover:bg-brand-gold hover:text-white transition-all duration-500 transform-gpu hover:-translate-y-0.5"
            >
              Reserve an Entry
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={prefersReducedMotion ? { opacity: 1 } : { y: [0, 8, 0] }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: EASE }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-px h-16 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={prefersReducedMotion ? { opacity: 1 } : { y: ['-100%', '100%', '-100%'] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.6, repeat: Infinity, ease: EASE }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('starters');

  return (
    <section id="menu" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-8 md:space-y-0">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT} className="max-w-xl">
            <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Indian Selection</span>
            <h2 className="text-5xl md:text-7xl leading-tight">Spiced <br /> <span className="italic">Flavors</span></h2>
          </motion.div>

          <div className="flex flex-wrap gap-4 md:gap-8 justify-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-[0.2em] pb-2 transition-all duration-300 border-b-2 transform-gpu hover:-translate-y-0.5 ${
                  activeCategory === cat ? 'border-brand-gold text-brand-ink font-bold' : 'border-transparent text-gray-400'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-12">
          {MENU_ITEMS.filter((item) => item.category === activeCategory).map((item, idx) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={SECTION_VIEWPORT}
              transition={{ delay: idx * 0.08 }}
              whileHover={hoverLift}
              className="group cursor-pointer border-b border-brand-ink/5 pb-8 will-change-transform"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl md:text-2xl group-hover:text-brand-gold transition-colors duration-300 italic transform-gpu group-hover:translate-x-1">
                  {item.name}
                </h3>
                <span className="text-sm font-sans tracking-widest text-brand-gold font-medium">Rs. {item.price}</span>
              </div>
              <p className="text-sm text-gray-500 font-sans tracking-wide leading-relaxed font-light">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={imageReveal}
          className="mt-32 relative h-[600px] overflow-hidden rounded-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
            alt="Kitchen Detail"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform-gpu hover:scale-105"
            style={{ willChange: 'transform, filter' }}
          />
          <div className="absolute inset-0 bg-brand-ink/20 flex flex-col items-center justify-center p-12 text-center text-brand-cream">
            <Star className="w-12 h-12 mb-6 text-brand-gold fill-brand-gold" />
            <h3 className="text-4xl md:text-5xl mb-6">An Indian Dining Experience</h3>
            <p className="max-w-xl text-sm uppercase tracking-[0.2em] opacity-80 leading-loose">
              Every dish is a tribute to regional spices, slow cooking, and bold flavors.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '2',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}. Reservation request sent for ${formData.guests} guests on ${formData.date}.`);
  };

  return (
    <section id="reservations" className="py-32 bg-brand-cream px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-24 items-center">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
            alt="Dining Room"
            loading="lazy"
            decoding="async"
            className="rounded-3xl shadow-2xl h-[700px] w-full object-cover transform-gpu"
            style={{ willChange: 'transform' }}
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={SECTION_VIEWPORT}
          variants={stagger}
          className="w-full md:w-1/2"
        >
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Table Booking</span>
            <h2 className="text-5xl md:text-6xl mb-8">
              Reserve Your <br />
              <span className="italic font-light text-brand-ink/70 underline underline-offset-8 decoration-1 decoration-brand-gold/30">
                Sanctuary
              </span>
            </h2>
            <p className="text-gray-500 max-w-md leading-relaxed font-light mb-12">
              For parties larger than 6, please call us directly to ensure the perfect arrangement for your evening.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jean-Luc Picard"
                  className="w-full bg-transparent border-b border-brand-ink/20 py-4 focus:border-brand-gold outline-none transition-colors text-sm"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="contact@example.com"
                  className="w-full bg-transparent border-b border-brand-ink/20 py-4 focus:border-brand-gold outline-none transition-colors text-sm"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
                  <input
                    type="date"
                    required
                    className="w-full bg-transparent border-b border-brand-ink/20 py-4 focus:border-brand-gold outline-none transition-colors text-sm pr-10"
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Guest Count</label>
                <div className="relative">
                  <Users className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
                  <select
                    className="w-full bg-transparent border-b border-brand-ink/20 py-4 focus:border-brand-gold outline-none transition-colors text-sm pr-10"
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Guests
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="w-full bg-brand-ink text-brand-cream py-6 rounded-full text-xs uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors duration-500 shadow-xl transform-gpu"
            >
              Confirm Reservation
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="about" className="bg-brand-ink text-brand-cream py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif">Lumiere</h2>
          <p className="text-sm text-white/50 leading-relaxed font-light">
            Crafting unforgettable culinary memories through the perfect fusion of light, flavor, and elegance.
          </p>
          <div className="flex space-x-6">
            <Globe className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">Location</h4>
          <div className="space-y-4 text-sm text-white/50 font-light flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
            <p>Church Street <br />Brigade Road, 560001</p>
          </div>
          <div className="space-y-4 text-sm text-white/50 font-light flex items-center space-x-3">
            <Phone className="w-4 h-4 text-brand-gold shrink-0" />
            <p>91 9395685795</p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">Hours</h4>
          <div className="space-y-4 text-sm text-white/50 font-light flex items-start space-x-3">
            <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
            <div className="space-y-2">
              <p>Tues - Thu: 18:00 - 23:00</p>
              <p>Fri - Sun: 17:00 - 00:00</p>
              <p className="italic opacity-60">Closed on Mondays</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">Newsletter</h4>
          <p className="text-xs text-white/50 leading-loose">Join our mailing list for early access to seasonal menu launches and exclusive events.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent text-sm w-full outline-none focus:placeholder:text-brand-gold transition-all"
            />
            <ChevronRight className="w-4 h-4 text-brand-gold" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/30 space-y-4 md:space-y-0">
        <p>(c) 2024 Lumiere Dining Group. All Rights Reserved.</p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          <a href="#" className="hover:text-white transition-colors">Press</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />

      <section className="bg-brand-cream py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={SECTION_VIEWPORT}>
            <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Our Story</span>
            <h2 className="text-5xl md:text-7xl mb-12 leading-none">
              Where Light <br /> Meets <span className="italic">Texture</span>
            </h2>
            <p className="text-lg text-brand-ink/70 leading-relaxed font-light first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2">
              Lumiere was born from a desire to redefine the fine dining landscape. Founded in 2018, we began with a simple philosophy: honor the ingredient, respect the light, and create a space where time slows down.
            </p>
            <div className="mt-12 flex space-x-12">
              <div>
                <span className="text-4xl font-serif text-brand-gold">01.</span>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold">Local Sourcing</p>
              </div>
              <div>
                <span className="text-4xl font-serif text-brand-gold">02.</span>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold">Chef's Table</p>
              </div>
              <div>
                <span className="text-4xl font-serif text-brand-gold">03.</span>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold">Heritage Recipes</p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="show"
              viewport={SECTION_VIEWPORT}
              className="relative z-10 aspect-[4/5] rounded-[100px] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl transform-gpu"
            >
              <img
                src="https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?q=80&w=1974&auto=format&fit=crop"
                alt="Plating detail"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ willChange: 'transform' }}
              />
            </motion.div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <MenuSection />
      <ReservationSection />
      <Footer />
    </div>
  );
}
