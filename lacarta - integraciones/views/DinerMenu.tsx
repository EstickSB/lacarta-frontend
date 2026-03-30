import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Star, 
  Plus, 
  Minus, 
  X, 
  Flame,
  Leaf,
  WheatOff,
  ChevronLeft,
  Info,
  Clock,
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';
import { MenuItem, CATEGORIES } from '../types';

// --- MOCK DATA ---
const RESTAURANT = {
  name: 'La Mar Cebichería',
  logo: 'https://ui-avatars.com/api/?name=La+Mar&background=E60026&color=fff',
  accentColor: '#E60026'
};

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Lomo Saltado', description: 'Trozos de lomo fino salteados al wok con cebolla, tomate, ají amarillo y salsa de soya. Acompañado de papas fritas crujientes y arroz blanco.', price: 45.00, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', category: 'Fondos', tags: ['traditional'], allergens: ['soy'], spiceLevel: 0, stockStatus: 'AVAILABLE', smartTags: ['Plato Estrella'], popularity: 100 },
  { id: '2', name: 'Ceviche Clásico', description: 'Pesca del día marinada en leche de tigre clásica, ají limo, culantro y cebolla roja. Servido con choclo y camote glaseado.', price: 38.00, image: 'https://images.unsplash.com/photo-1562967677-4c07b789975b?auto=format&fit=crop&w=600&q=80', category: 'Entradas', tags: ['pescatarian'], allergens: ['fish'], spiceLevel: 2, stockStatus: 'AVAILABLE', smartTags: ['Plato Estrella'], popularity: 95 },
  { id: '3', name: 'Tiradito Nikkei', description: 'Finas láminas de atún bañadas en salsa de tamarindo y soya, con toques de aceite de sésamo y chalaquita.', price: 42.00, image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=600&q=80', category: 'Entradas', tags: ['pescatarian'], allergens: ['fish', 'soy'], spiceLevel: 1, stockStatus: 'AVAILABLE', smartTags: [], popularity: 88 },
  { id: '4', name: 'Arroz con Mariscos', description: 'Arroz criollo al wok con mixtura de mariscos, ají panca, vino blanco y queso parmesano.', price: 48.00, image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80', category: 'Fondos', tags: [], allergens: ['shellfish', 'dairy'], spiceLevel: 1, stockStatus: 'SOLD_OUT', smartTags: [], popularity: 92 },
  { id: '5', name: 'Causa Limeña', description: 'Suave masa de papa amarilla prensada con ají amarillo y limón, rellena de pulpa de cangrejo y palta.', price: 28.00, image: 'https://images.unsplash.com/photo-1626804475297-41609ea064eb?auto=format&fit=crop&w=600&q=80', category: 'Entradas', tags: [], allergens: ['shellfish'], spiceLevel: 1, stockStatus: 'AVAILABLE', smartTags: [], popularity: 85 },
  { id: '6', name: 'Suspiro a la Limeña', description: 'Clásico postre peruano a base de manjar blanco de yemas, coronado con merengue al oporto y canela.', price: 22.00, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80', category: 'Postres', tags: ['vegetarian'], allergens: ['dairy', 'eggs'], spiceLevel: 0, stockStatus: 'AVAILABLE', smartTags: [], popularity: 78 },
];

// --- COMPONENTS ---

const SkeletonImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
      )}
      <img 
        src={src} 
        alt={alt} 
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />
    </div>
  );
};

const DishModal = ({ dish, isOpen, onClose, onAdd, qty }: { dish: MenuItem | null, isOpen: boolean, onClose: () => void, onAdd: (d: number) => void, qty: number }) => {
  if (!dish) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
          />
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] rounded-t-[2rem] z-[110] max-h-[90vh] overflow-y-auto custom-scrollbar border-t border-white/10"
            style={{ '--accent': RESTAURANT.accentColor } as React.CSSProperties}
          >
            <div className="sticky top-0 right-0 p-4 flex justify-end z-10 pointer-events-none">
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto border border-white/10">
                    <X size={20} />
                </button>
            </div>
            
            <div className="-mt-14">
                <SkeletonImage src={dish.image} alt={dish.name} className="w-full h-72 rounded-t-[2rem]" />
            </div>

            <div className="p-6 pb-32">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-white mb-1">{dish.name}</h2>
                        <div className="text-xl font-mono text-[var(--accent)] font-bold">${dish.price.toFixed(2)}</div>
                    </div>
                    {dish.smartTags.includes('Plato Estrella') && (
                        <div className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-[var(--accent)]/20">
                            <Star size={12} className="fill-[var(--accent)]" /> Estrella
                        </div>
                    )}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {dish.description}
                </p>

                {/* Allergens & Info */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {dish.allergens.includes('fish') && <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/5"><UtensilsCrossed size={12}/> Pescado</div>}
                    {dish.allergens.includes('soy') && <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/5"><Leaf size={12}/> Soya</div>}
                    {dish.spiceLevel > 0 && (
                        <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1.5 rounded-lg text-xs text-orange-400 border border-orange-500/20">
                            <Flame size={12}/> Picante {dish.spiceLevel}/5
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-white/10">
                {dish.stockStatus === 'SOLD_OUT' ? (
                    <div className="w-full py-4 rounded-2xl bg-white/5 text-gray-500 text-center font-bold uppercase tracking-widest text-sm">
                        Agotado
                    </div>
                ) : (
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center justify-between bg-white/5 rounded-2xl p-2 border border-white/10 w-32">
                            <button onClick={() => onAdd(-1)} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors"><Minus size={18}/></button>
                            <span className="font-bold text-lg w-8 text-center">{qty}</span>
                            <button onClick={() => onAdd(1)} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors"><Plus size={18}/></button>
                        </div>
                        <button 
                            onClick={() => { onAdd(qty === 0 ? 1 : 0); onClose(); }}
                            className="flex-1 py-4 rounded-2xl bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_var(--accent)] shadow-[var(--accent)]/20 active:scale-[0.98] transition-transform"
                        >
                            {qty > 0 ? 'Actualizar' : 'Agregar'} • ${(dish.price * (qty || 1)).toFixed(2)}
                        </button>
                    </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- MAIN DINER MENU ---

const DinerMenu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
    const [filter, setFilter] = useState<'ALL' | 'STAR' | 'AVAILABLE'>('ALL');
    const [cart, setCart] = useState<Record<string, number>>({});
    const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Refs for ScrollSpy
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;
            setIsScrolled(scrollContainerRef.current.scrollTop > 50);
            
            // ScrollSpy Logic (simplified)
            const scrollPos = scrollContainerRef.current.scrollTop + 200;
            let currentCat = activeCategory;
            
            for (const cat of CATEGORIES) {
                const el = categoryRefs.current[cat];
                if (el && el.offsetTop <= scrollPos) {
                    currentCat = cat;
                }
            }
            if (currentCat !== activeCategory) {
                setActiveCategory(currentCat);
                // Scroll category nav to center active item
                const navEl = document.getElementById(`nav-${currentCat}`);
                if (navEl) {
                    navEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [activeCategory]);

    const scrollToCategory = (cat: string) => {
        setActiveCategory(cat);
        const el = categoryRefs.current[cat];
        if (el && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: el.offsetTop - 140, // Offset for sticky headers
                behavior: 'smooth'
            });
        }
    };

    const updateCart = (id: string, delta: number) => {
        setCart((prev) => {
          const current = prev[id] || 0;
          const next = Math.max(0, current + delta);
          if (next === 0) { const { [id]: _, ...rest } = prev; return rest; }
          return { ...prev, [id]: next };
        });
    };

    const cartTotal = Object.entries(cart).reduce((acc: number, [id, qty]: [string, number]) => {
        const item = MENU_ITEMS.find(m => m.id === id);
        return acc + (item?.price || 0) * qty;
    }, 0);

    const cartValues = Object.values(cart) as number[];
    const cartItemsCount: number = cartValues.reduce((a, b) => a + b, 0);

    // Filter logic
    const getFilteredItems = (cat: string) => {
        let items = MENU_ITEMS.filter(item => item.category === cat);
        if (filter === 'STAR') items = items.filter(i => i.smartTags.includes('Plato Estrella'));
        if (filter === 'AVAILABLE') items = items.filter(i => i.stockStatus === 'AVAILABLE');
        return items;
    };

    return (
        <div 
            className="h-screen w-full bg-[#050505] text-white font-sans overflow-hidden flex flex-col selection:bg-[var(--accent)] selection:text-white"
            style={{ '--accent': RESTAURANT.accentColor } as React.CSSProperties}
        >
            {/* DYNAMIC HEADER */}
            <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between px-4 pt-safe-top h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                            <img src={RESTAURANT.logo} className="w-full h-full object-cover" />
                        </div>
                        <h1 className="font-serif text-lg font-bold tracking-tight">{RESTAURANT.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white"><Search size={16}/></button>
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white"><Info size={16}/></button>
                    </div>
                </div>

                {/* STICKY CATEGORY NAV */}
                <div className="px-2 pb-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-2">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                id={`nav-${cat}`}
                                onClick={() => scrollToCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                    activeCategory === cat 
                                        ? 'bg-white text-black shadow-md scale-105' 
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar pt-32 pb-24 px-4 scroll-smooth">
                
                {/* SMART FILTERS */}
                <div className="flex gap-2 mb-8">
                    <button 
                        onClick={() => setFilter(filter === 'STAR' ? 'ALL' : 'STAR')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            filter === 'STAR' ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30' : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'
                        }`}
                    >
                        <Star size={12} className={filter === 'STAR' ? 'fill-[var(--accent)]' : ''} /> Platos Estrella
                    </button>
                    <button 
                        onClick={() => setFilter(filter === 'AVAILABLE' ? 'ALL' : 'AVAILABLE')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            filter === 'AVAILABLE' ? 'bg-green-500/10 text-green-500 border-green-500/30' : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'
                        }`}
                    >
                        <CheckCircle2 size={12} /> Disponibles
                    </button>
                </div>

                {/* MENU SECTIONS */}
                {CATEGORIES.map(cat => {
                    const items = getFilteredItems(cat);
                    if (items.length === 0) return null;

                    return (
                        <div key={cat} ref={el => categoryRefs.current[cat] = el} className="mb-12 scroll-mt-36">
                            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                {cat}
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                            </h2>
                            
                            {/* GRID POWER (2 Columns) */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item, index) => (
                                        <motion.div 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            onClick={() => setSelectedDish(item)}
                                            className={`bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex flex-col active:scale-[0.98] transition-transform cursor-pointer ${item.stockStatus === 'SOLD_OUT' ? 'opacity-60 grayscale-[0.5]' : ''}`}
                                        >
                                            <div className="relative aspect-square">
                                                <SkeletonImage src={item.image} alt={item.name} className="w-full h-full" />
                                                
                                                {/* Badges */}
                                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                                    {item.smartTags.includes('Plato Estrella') && (
                                                        <div className="bg-black/60 backdrop-blur-md text-[var(--accent)] p-1.5 rounded-full border border-white/10">
                                                            <Star size={12} className="fill-[var(--accent)]" />
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Quantity Badge */}
                                                {cart[item.id] > 0 && (
                                                    <div className="absolute top-2 right-2 bg-[var(--accent)] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-[var(--accent)]/40">
                                                        {cart[item.id]}
                                                    </div>
                                                )}

                                                {item.stockStatus === 'SOLD_OUT' && (
                                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                                                        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">Agotado</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="p-3 flex flex-col flex-1 justify-between">
                                                <div>
                                                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-1">{item.name}</h3>
                                                    <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">{item.description}</p>
                                                </div>
                                                <div className="flex justify-between items-end mt-auto">
                                                    <span className="text-sm font-mono font-bold text-gray-300">${item.price.toFixed(2)}</span>
                                                    {item.stockStatus !== 'SOLD_OUT' && (
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); updateCart(item.id, 1); }}
                                                            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--accent)] transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* GLASSMORPHISM BOTTOM NAVBAR (Cart) */}
            <AnimatePresence>
                {cartItemsCount > 0 && (
                    <motion.div 
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-4 left-4 right-4 z-50"
                    >
                        <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-bold">
                                    {cartItemsCount}
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total</div>
                                    <div className="text-lg font-mono font-bold text-white">${cartTotal.toFixed(2)}</div>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-white text-black rounded-xl font-bold text-sm active:scale-95 transition-transform">
                                Ver Orden
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DISH MODAL */}
            <DishModal 
                dish={selectedDish} 
                isOpen={!!selectedDish} 
                onClose={() => setSelectedDish(null)} 
                onAdd={(qty) => {
                    if (selectedDish) {
                        updateCart(selectedDish.id, qty - (cart[selectedDish.id] || 0));
                    }
                }}
                qty={selectedDish ? (cart[selectedDish.id] || 0) : 0}
            />
        </div>
    );
};

export default DinerMenu;