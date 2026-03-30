import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  X, 
  Zap, 
  Search, 
  Globe, 
  BarChart3, 
  QrCode, 
  Newspaper, 
  Flame,
  MousePointer2,
  RefreshCw,
  Rocket,
  Brain,
  Mail,
  User,
  Building2,
  LayoutDashboard,
  Smartphone,
  Instagram,
  Facebook
} from 'lucide-react';
import Button from './components/Button';

interface LandingProps {
  onEnterApp: () => void;
}

// --- 3D / Visual Components ---

const MagneticButton = ({ children, onClick, variant = 'primary', className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) / 3);
    y.set((e.clientY - centerY) / 3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref} 
      style={{ x, y }} 
      onMouseMove={handleMouse} 
      onMouseLeave={reset}
      className="inline-block touch-none"
    >
      <Button onClick={onClick} variant={variant} className={className}>
        {children}
      </Button>
    </motion.div>
  );
};

const PhoneMockup = () => {
  // URLs de comida peruana/latina de Unsplash
  const foodImages = [
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop', // Ceviche
    'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=100&h=100&fit=crop', // Lomo saltado
    'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=100&h=100&fit=crop', // Arroz
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=100&h=100&fit=crop', // Pollo
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop', // Ensalada
    'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=100&h=100&fit=crop', // Tacos
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop', // Pizza
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=100&h=100&fit=crop', // Hamburguesa
  ];

  return (
    <div className="relative mx-auto border-richblack bg-richblack border-[12px] rounded-[2.5rem] h-[400px] sm:h-[440px] md:h-[480px] w-[208px] sm:w-[224px] md:w-[240px] shadow-2xl shadow-richblack/40 z-20 transform hover:scale-[1.02] transition-transform duration-500">
      {/* Side Buttons */}
      <div className="h-[28px] w-[3px] bg-richblack absolute -left-[13px] top-[60px] rounded-l-lg"></div>
      <div className="h-[38px] w-[3px] bg-richblack absolute -left-[13px] top-[104px] rounded-l-lg"></div>
      <div className="h-[54px] w-[3px] bg-richblack absolute -right-[13px] top-[120px] rounded-r-lg"></div>
      
      {/* Screen Container */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-offwhite relative">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[75px] h-[24px] bg-black rounded-b-2xl z-20"></div>
        
        {/* Infinite Scroll Content */}
        <motion.div 
          animate={{ y: [-20, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="space-y-4 p-4 pt-10"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 flex gap-2.5 transform hover:scale-105 transition-transform duration-300">
              <img src={foodImages[i]} className="w-14 h-14 rounded-lg object-cover bg-gray-200" alt="Food" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-3 w-10 bg-powerred/10 text-powerred rounded-full"></div>
                  <div className="h-6 w-6 rounded-full bg-richblack text-white flex items-center justify-center text-[10px]">★</div>
                </div>
              </div>
            </div>
          ))}
           {/* Duplicate for Loop */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i + 8} className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 flex gap-2.5">
              <img src={foodImages[i]} className="w-14 h-14 rounded-lg object-cover bg-gray-200" alt="Food" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-3 w-10 bg-powerred/10 rounded-full"></div>
                  <div className="h-6 w-6 rounded-full bg-richblack"></div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Floating UI Elements over phone (Pop-out effect) */}
        <div className="absolute bottom-6 left-4 right-4 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 z-10 flex justify-between items-center">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vista Rápida</span>
                <span className="text-sm font-bold text-richblack">15 Platos</span>
             </div>
             <div className="w-8 h-8 bg-powerred rounded-full flex items-center justify-center text-white shadow-lg shadow-powerred/30">
               <ArrowRight size={14} />
             </div>
        </div>
      </div>
    </div>
  );
};

const DNAInteraction = () => {
  const [filter, setFilter] = useState<'ALL' | 'VEGAN' | 'SPICY' | 'GLUTEN'>('ALL');

  const items = [
    { id: 1, name: 'Tacos Al Pastor', type: 'SPICY', img: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=50&h=50&fit=crop' },
    { id: 2, name: 'Buddha Bowl', type: 'VEGAN', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&h=50&fit=crop' },
    { id: 3, name: 'Risotto Trufa', type: 'GLUTEN', img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=50&h=50&fit=crop' },
    { id: 4, name: 'Curry Rojo', type: 'SPICY', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=50&h=50&fit=crop' },
    { id: 5, name: 'Ensalada Kale', type: 'VEGAN', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50&h=50&fit=crop' },
  ];

  const filteredItems = filter === 'ALL' ? items : items; 

  return (
    <div className="bg-white rounded-xl p-5 md:p-6 border border-gray-100 shadow-xl relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Search size={100} />
      </div>
      <h3 className="font-serif text-xl mb-5">ADN Gastronómico</h3>
      
      {/* Interactive Buttons */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
        {['VEGAN', 'SPICY', 'GLUTEN'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(filter === f ? 'ALL' : f as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 transform border flex-shrink-0 ${
              filter === f 
                ? 'bg-richblack text-white scale-110 shadow-lg border-richblack' 
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border-gray-100'
            }`}
          >
            {f === 'VEGAN' && '🌱 '}
            {f === 'SPICY' && '🌶️ '}
            {f === 'GLUTEN' && '🌾 '}
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
           const isMatch = filter === 'ALL' || item.type === filter;
           return (
             <motion.div 
               layout
               initial={false}
               animate={{ 
                 opacity: isMatch ? 1 : 0.3, 
                 scale: isMatch ? 1 : 0.95,
                 x: isMatch ? 0 : 0
               }}
               key={item.id}
               className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                 isMatch ? 'bg-white shadow-sm border border-gray-100' : 'bg-transparent'
               }`}
             >
                <img src={item.img} className="w-10 h-10 rounded-lg bg-gray-200 object-cover" alt={item.name}/>
                <div className="flex-1">
                  <div className="font-medium text-sm text-richblack">{item.name}</div>
                  <div className="h-2 w-16 bg-gray-100 rounded-full mt-1"></div>
                </div>
                {filter === item.type && (
                  <motion.div layoutId="match-badge" className="text-[10px] font-bold text-powerred bg-powerred/10 px-2 py-1 rounded-full">
                    MATCH
                  </motion.div>
                )}
             </motion.div>
           );
        })}
      </div>
    </div>
  );
};

const HolographicQR = () => (
  <motion.div 
    whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
    className="relative w-44 h-44 bg-white rounded-3xl flex items-center justify-center border border-gray-100 shadow-2xl perspective-1000 group cursor-pointer"
  >
     {/* Glow Pulse */}
     <div className="absolute inset-0 rounded-3xl bg-powerred/20 blur-xl animate-pulse"></div>
     
     {/* Physical Thickness (Fake 3D) */}
     <div className="absolute top-2 left-2 w-full h-full bg-gray-200 rounded-3xl -z-10"></div>
     
     <QrCode size={64} className="text-richblack relative z-10" />
     
     {/* Orbiting Particles */}
     <div className="absolute w-full h-full animate-spin-slow">
        <div className="absolute -top-4 left-1/2 w-2 h-2 bg-green-500 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-4 -right-4 w-3 h-3 bg-red-500 rounded-full blur-[1px]"></div>
        <div className="absolute top-1/2 -left-6 w-2 h-2 bg-yellow-500 rounded-full blur-[1px]"></div>
     </div>

     <div className="absolute bottom-3 text-[10px] font-bold tracking-[0.3em] text-gray-400">ESCANEA</div>
  </motion.div>
);


const Navbar = ({ onEnterApp }: { onEnterApp: () => void }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Cómo Funciona', href: '#como-funciona' },
    { name: 'Fundadores', href: '#fundadores' }
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div className="w-full max-w-4xl bg-[#121212]/90 backdrop-blur-[12px] rounded-2xl border border-amber-500/20 px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-powerred blur-md opacity-40 rounded-full"></div>
            <div className="w-8 h-8 bg-richblack rounded-full border border-white/10 flex items-center justify-center relative z-10">
              <span className="text-powerred font-serif font-bold italic text-lg">L</span>
            </div>
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-wide">LaCarta</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="relative text-gray-400 hover:text-white text-sm font-medium transition-colors group"
            >
              {link.name}
              <motion.div
                className="absolute -bottom-2 left-1/2 w-1 h-1 bg-powerred rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ translateX: "-50%" }}
                layoutId="navDot"
              />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            const el = document.getElementById('fundadores');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-white/10 transition-all backdrop-blur-sm"
        >
          Empezar Gratis
        </button>
      </div>
    </motion.nav>
  );
};

const SocialProof = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const locals = [
    {
      name: "Local Fundador 1",
      initials: "L1",
      bgColor: "bg-richblack",
      instagram: "#",
      carta: "#"
    },
    {
      name: "Local Fundador 2",
      initials: "L2",
      bgColor: "bg-powerred",
      instagram: "#",
      carta: "#"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100 overflow-visible">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl mb-3 text-richblack">Locales Fundadores que Confían en Nosotros</h2>
          <p className="text-gray-500 text-sm">Liderando la transformación digital en la gastronomía.</p>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          {locals.map((local, i) => (
            <motion.div 
              key={i}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Bubble animation layer - BEHIND the card */}
              <div className="absolute inset-0 flex justify-center">
                {/* Single drop that falls down from center */}
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={hoveredIndex === i ? {
                    opacity: [0, 1, 1, 0],
                    y: [0, 100, 100, 100],
                    scale: [0, 1, 1, 0],
                    transition: { duration: 0.35, ease: "easeIn", times: [0, 0.5, 0.7, 1] }
                  } : {
                    opacity: 0, y: 0, scale: 0,
                    transition: { duration: 0.2 }
                  }}
                  className="absolute top-1/2 w-4 h-4 bg-gray-400 rounded-full z-0"
                />

                {/* Instagram bubble - splits left */}
                <motion.a
                  href={local.instagram}
                  initial={{ opacity: 0, y: 100, x: 0, scale: 0 }}
                  animate={hoveredIndex === i ? {
                    opacity: 1,
                    y: 130,
                    x: -40,
                    scale: 1,
                    transition: { duration: 0.4, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }
                  } : {
                    opacity: 0, y: 100, x: 0, scale: 0,
                    transition: { duration: 0.25 }
                  }}
                  className="absolute top-1/2 w-11 h-11 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-0"
                >
                  <Instagram size={20} className="text-white" />
                </motion.a>

                {/* Carta bubble - splits right */}
                <motion.a
                  href={local.carta}
                  initial={{ opacity: 0, y: 100, x: 0, scale: 0 }}
                  animate={hoveredIndex === i ? {
                    opacity: 1,
                    y: 130,
                    x: 40,
                    scale: 1,
                    transition: { duration: 0.4, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                  } : {
                    opacity: 0, y: 100, x: 0, scale: 0,
                    transition: { duration: 0.25 }
                  }}
                  className="absolute top-1/2 w-11 h-11 bg-powerred rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-0"
                >
                  <Newspaper size={20} className="text-white" />
                </motion.a>
              </div>

              {/* Main Card - ON TOP */}
              <div className="w-52 h-52 bg-offwhite rounded-2xl border border-gray-200 flex items-center justify-center shadow-lg relative z-10">
                <div className={`w-20 h-20 ${local.bgColor} rounded-2xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl font-serif">{local.initials}</span>
                </div>
              </div>
              
              <p className="text-center mt-14 text-sm font-medium text-gray-600">{local.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FoundingLocalsForm = () => {
  return (
    <section id="fundadores" className="py-16 px-6 bg-richblack text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#E6002610_0%,transparent_50%)]"></div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        <div>
          <div className="inline-block bg-powerred/10 text-powerred px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Early Access
          </div>
          <h2 className="font-serif text-2xl md:text-4xl mb-6 leading-tight">
            Únete a los <br/>
            <span className="text-powerred italic">Locales Fundadores</span>.
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Estamos seleccionando un grupo exclusivo de restaurantes para liderar la nueva era de la gastronomía digital. Envía tu solicitud y nos pondremos en contacto contigo para una implementación personalizada.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Check size={18} className="text-powerred" />
              </div>
              <span className="text-gray-300">Implementación asistida y personalizada</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Check size={18} className="text-powerred" />
              </div>
              <span className="text-gray-300">Beneficios exclusivos de por vida</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Check size={18} className="text-powerred" />
              </div>
              <span className="text-gray-300">Prioridad en nuevas funcionalidades</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Nombre del Responsable</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-powerred transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Nombre del Local</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Ej. La Pizzería Central"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-powerred transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="juan@ejemplo.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-powerred transition-colors"
                />
              </div>
            </div>

            <button className="w-full bg-powerred hover:bg-red-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-powerred/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
              Enviar solicitud <ArrowRight size={20} />
            </button>
            <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">Nos pondremos en contacto en menos de 24h</p>
          </form>
        </div>
      </div>
    </section>
  );
};

const Landing: React.FC<LandingProps> = ({ onEnterApp }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <div className="min-h-screen bg-offwhite font-sans selection:bg-powerred selection:text-white overflow-x-hidden">
      <Navbar onEnterApp={onEnterApp} />
      
      {/* 1. Hero Section (3D Dynamic) */}
      <section className="relative w-full h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-visible">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center z-10">
          {/* Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] mb-5 text-richblack tracking-tight">
                Convierte tu carta en una <span className="text-powerred italic relative">
                  experiencia digital
                  <span className="absolute bottom-1 left-0 w-full h-1.5 bg-powerred/10 -z-10"></span>
                </span> con QR.
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                La mejor forma de visualizar y explorar un menú. Actualiza en segundos, muestra fotos profesionales y ofrece una experiencia moderna a tus clientes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <MagneticButton 
                  onClick={() => {
                    const el = document.getElementById('fundadores');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="shadow-2xl shadow-powerred/20 w-full sm:w-auto"
                >
                   Unirme como Fundador
                </MagneticButton>
                <MagneticButton 
                  variant="ghost" 
                  onClick={() => {
                    const el = document.getElementById('fundadores');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="border border-richblack/10 w-full sm:w-auto"
                >
                   Solicitar Acceso
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* 3D Visuals */}
          <div className="relative order-2 lg:order-2 flex justify-center perspective-1000 mt-8 lg:mt-0">
             {/* Parallax Phone */}
             <motion.div style={{ y: y2, rotateY: -10, rotateX: 5 }} className="relative z-20">
                <PhoneMockup />
             </motion.div>

             {/* Floating Elements (Food Holograms) */}
             <motion.img 
               style={{ y: y1 }}
               src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=150&h=150&fit=crop" 
               className="absolute top-20 -right-4 md:-right-12 w-20 h-20 md:w-24 md:h-24 rounded-full shadow-2xl border-3 border-white z-30 hidden sm:block object-cover"
               animate={{ y: [0, 20, 0] }}
               transition={{ repeat: Infinity, duration: 6 }}
               alt="Hamburguesa"
             />
             <motion.img 
               src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&h=150&fit=crop" 
               className="absolute bottom-40 -left-4 md:-left-12 w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl border-3 border-white z-30 hidden sm:block grayscale hover:grayscale-0 transition-all object-cover"
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 5, delay: 1 }}
               alt="Pizza"
             />

             {/* Holographic QR */}
             <motion.div 
               style={{ y: y1 }}
               className="absolute top-1/2 -right-12 md:-right-16 z-10 hidden xl:block"
             >
               <HolographicQR />
             </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Pain Point (Real Restaurant Problems) */}
      <section id="beneficios" className="py-14 md:py-20 px-6 bg-white border-y border-gray-100 relative">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-10 md:mb-12">
             <h2 className="font-serif text-2xl md:text-4xl mb-3 text-richblack">Lo que pierdes <span className="text-powerred italic">HOY</span> en tu restaurante</h2>
             <p className="text-gray-500 text-base">Cada día sin modernizar tu carta es una oportunidad perdida.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "Cartas Físicas Obsoletas", d: "PDFs imposibles de leer en móviles, cartas sucias o rotas.", icon: <X className="text-red-500" /> },
                { t: "Stock Desactualizado", d: "Platos que se acaban pero siguen en la carta física.", icon: <RefreshCw className="text-orange-500" /> },
                { t: "Tiempo Perdido", d: "Clientes preguntando por cada plato, fotos y precios.", icon: <Zap className="text-yellow-500" /> },
                { t: "Mala Primera Impresión", d: "Una carta vieja da imagen de local anticuado.", icon: <BarChart3 className="text-gray-400" /> }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">{item.icon}</div>
                   <h3 className="font-bold text-richblack mb-2 text-sm">{item.t}</h3>
                   <p className="text-gray-500 text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>

           <div className="mt-10 bg-richblack text-white rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-powerred/20 blur-[120px]"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">LaCarta es la solución a <span className="text-powerred italic">TODO</span> eso.</h3>
                  <p className="text-gray-400 text-sm">Digitaliza tu menú, actualízalo en segundos y ofrece la mejor experiencia de visualización. Tus clientes explorarán tu oferta de forma moderna y sin fricción.</p>
                </div>
                <Button 
                  onClick={() => {
                    const el = document.getElementById('fundadores');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="bg-powerred hover:bg-red-600 border-none px-8 py-4 text-lg"
                >
                  Modernizar mi carta
                </Button>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Core Feature: Carta Digital QR */}
      <section id="como-funciona" className="py-16 px-6 bg-offwhite overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-powerred/10 rounded-full blur-[100px]"></div>
            <PhoneMockup />
            {/* Floating Experience Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute top-1/4 right-0 md:-right-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 z-30 max-w-[180px] hidden lg:block"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
                  <Check size={14} />
                </div>
                <span className="text-[11px] font-bold text-richblack">Carta del Día</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-gray-100 rounded-full"></div>
                <div className="h-1.5 w-2/3 bg-gray-100 rounded-full"></div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[9px] text-gray-400">Menú Actualizado</span>
                <span className="text-[10px] font-bold text-powerred">En Vivo</span>
              </div>
            </motion.div>
          </div>

          <div>
            <div className="inline-block bg-powerred/10 text-powerred px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Experiencia Digital
            </div>
            <h2 className="font-serif text-2xl md:text-4xl mb-6 leading-tight text-richblack">
              La mejor forma de <br/>
              <span className="text-powerred italic">explorar un menú</span>.
            </h2>
            
            <div className="space-y-6">
              {[
                { t: "Escanean el QR", d: "Un código único en cada mesa. Acceso instantáneo." },
                { t: "Exploran tu oferta", d: "Fotos HD, descripciones completas, filtros por preferencias." },
                { t: "Toman su decisión", d: "Ven todo el menú antes de elegir, sin prisas." },
                { t: "Experiencia memorable", d: "Una carta digital moderna eleva la percepción de tu marca." }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-9 h-9 rounded-full bg-richblack text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-powerred transition-colors text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-richblack mb-1">{step.t}</h4>
                    <p className="text-gray-500 leading-relaxed text-sm">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-richblack font-medium italic text-sm">"Sin apps, sin cartas sucias, sin confusiones."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How it Works: Simple & Fast */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 text-richblack">Empieza en menos de <span className="text-powerred">5 minutos</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10"></div>
            
            {[
              { t: "Creas tu carta", d: "Sube tus platos, fotos y precios en segundos.", icon: <Newspaper /> },
              { t: "Generas tu QR", d: "Descarga e imprime tus códigos únicos.", icon: <QrCode /> },
              { t: "Tus clientes exploran", d: "Escanean, descubren y disfrutan.", icon: <MousePointer2 /> }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                <div className="w-12 h-12 mx-auto bg-richblack text-white rounded-xl flex items-center justify-center mb-5 shadow-xl shadow-richblack/20">
                  {step.icon}
                </div>
                <h4 className="font-bold text-base mb-2 text-richblack">{step.t}</h4>
                <p className="text-gray-500 text-xs">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features (Simplified Language) */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl mb-3 text-richblack">Tecnología que <span className="text-powerred">impresiona</span></h2>
            <p className="text-gray-500 text-sm">Diseñado para que tu única preocupación sea cocinar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-powerred/10 text-powerred rounded-xl flex items-center justify-center mb-4"><LayoutDashboard size={20} /></div>
                <h3 className="font-bold text-base mb-3 text-richblack">Actualización Instantánea</h3>
                <p className="text-gray-500 leading-relaxed">Marca platos como agotados en un click desde tu celular. Los cambios se reflejan en tiempo real para todos.</p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-powerred/10 text-powerred rounded-xl flex items-center justify-center mb-4"><Smartphone size={20} /></div>
                <h3 className="font-bold text-base mb-3 text-richblack">Diseño Premium</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Cartas digitales con fotos de alta calidad que hacen justicia a tus platos. Primera impresión inolvidable.</p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-powerred/10 text-powerred rounded-xl flex items-center justify-center mb-4"><BarChart3 size={20} /></div>
                <h3 className="font-bold text-base mb-3 text-richblack">Menús Adaptables</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Crea menús diferentes para desayuno, almuerzo, cena o días especiales. Control total de tu oferta.</p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-powerred/10 text-powerred rounded-xl flex items-center justify-center mb-4"><Brain size={20} /></div>
                <h3 className="font-bold text-base mb-3 text-richblack">Mensajes en Secciones</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Añade descripciones o mensajes personalizados en cada categoría. Cuenta la historia de cada sección de tu menú.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Social Proof & Testimonials */}
      <SocialProof />

      {/* 8. Founding Locals Form */}
      <FoundingLocalsForm />

      {/* 9. Footer */}
      <footer className="py-16 px-6 bg-richblack text-white text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E6002610_0%,transparent_70%)]"></div>
         <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">Es hora de que tu carta trabaje para ti.</h2>
            <div className="flex justify-center mb-10">
               <Button 
                onClick={() => {
                  const el = document.getElementById('fundadores');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="bg-powerred text-white hover:bg-red-600 border-none px-8 py-4 text-base shadow-2xl shadow-powerred/40 hover:scale-110 transition-transform"
               >
                  Unirme como Fundador
               </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 mb-10">
               <a href="#" className="hover:text-white transition-colors">Términos</a>
               <a href="#" className="hover:text-white transition-colors">Privacidad</a>
               <a href="#" className="hover:text-white transition-colors">Blog Gastronómico</a>
               <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
            
            <p className="text-gray-600 text-xs">© 2026 LaCarta Technology. Designed for the future of dining.</p>
         </div>
      </footer>

    </div>
  );
};

export default Landing;
