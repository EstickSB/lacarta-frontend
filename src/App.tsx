import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { SplashScreen } from './components/SplashScreen';
import { DishCard } from './components/DishCard';
import { LazyImage } from './components/LazyImage';
import { Watermark } from './components/Watermark';
import { CategoryNav } from './components/CategoryNav';
import { ShiftSwitcher } from './components/ShiftSwitcher';
import { useRestaurant } from './hooks/useRestaurant';
import { useCurrentShift } from './hooks/useCurrentShift';
import { filterMenuByShift } from './utils/menuFilters';

function App() {
  const slug = window.location.pathname.split('/')[2];
  const { restaurant, loading: apiLoading, error } = useRestaurant(slug);
  const [showSplash, setShowSplash] = useState(true);

  // Shift Logic
  const { activeShiftId, setActiveShiftId } = useCurrentShift(restaurant?.shifts || []);

  // Memoized filtered categories
  const filteredCategories = useMemo(() => {
    if (!restaurant) return [];
    return filterMenuByShift(restaurant.categories, activeShiftId);
  }, [restaurant, activeShiftId]);

  const [activeCategory, setActiveCategory] = useState('');

  // Refs for scrolling
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Update active category when shift or restaurant changes
  useEffect(() => {
    if (filteredCategories.length > 0) {
      setActiveCategory(filteredCategories[0].id);
    }
  }, [filteredCategories]);

  useEffect(() => {
    if (restaurant) {
      document.title = `${restaurant.name} - Digital Menu`;
    }
  }, [restaurant]);

  const handleShiftChange = (newShiftId: string) => {
    if (newShiftId === activeShiftId) return;
    setActiveShiftId(newShiftId);

    // Reset scroll positions
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];

    if (element) {
      if (window.innerWidth >= 1024) {
        // Desktop: Scroll the right panel container
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Mobile: Standard scroll with offset for sticky header
        const yOffset = -140;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const textColor = '#F5F5F7';
  const viewVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contentTransitionVariants: Variants = {
    enter: { opacity: 0, y: 20, filter: "blur(5px)" },
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(5px)" }
  };

  const isLoading = apiLoading || showSplash;

  if (!isLoading && (error || !restaurant)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 text-gray-100 px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-6xl mb-4">😔</h1>
          <h2 className="text-2xl font-serif mb-2">Restaurante no encontrado</h2>
          <p className="text-sm opacity-70 mb-4">{error?.message || 'No pudimos cargar el menú'}</p>
        </motion.div>
      </div>
    );
  }

  if (!restaurant) return null;

  const config = restaurant;

  // Header/Info Subcomponent
  const RestaurantInfo = ({ className = "", isMobile = false }) => (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className={`relative z-20 ${isMobile ? '-mt-12 mb-4' : 'mb-4 lg:mb-6'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-full overflow-hidden bg-zinc-900 shadow-2xl ${isMobile ? 'w-24 h-24 border-2' : 'w-24 h-24 lg:w-32 lg:h-32 border-[1px] lg:border-2 lg:mx-auto'}`}
          style={{ borderColor: config.primaryColor }}
        >
          <img src={config.logoUrl || ''} alt={config.name} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <h1 className={`font-serif tracking-wide mb-2 ${isMobile ? 'text-3xl font-medium' : 'text-2xl lg:text-3xl lg:mb-4'}`} style={{ color: textColor }}>
        {config.name}
      </h1>

      <p className={`font-sans font-light opacity-80 leading-relaxed uppercase tracking-widest mx-auto ${isMobile ? 'text-[10px] max-w-[280px] mb-4' : 'text-[10px] lg:text-xs lg:tracking-[0.2em] max-w-xs'}`} style={{ color: textColor }}>
        {config.description}
      </p>

      {(config.address || config.phone) && (
        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-1 opacity-70 mb-5 lg:mb-0 ${isMobile ? 'text-xs' : 'text-[10px] lg:text-xs lg:mt-3'}`}>
          {config.address && (
            <div className="flex items-center gap-1.5">
              <MapPin size={10} className="text-white" />
              <span>{config.address}</span>
            </div>
          )}
          {config.address && config.phone && <span className="hidden lg:block w-1 h-1 rounded-full bg-white/30" />}
          {config.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={10} className="text-white" />
              <span>{config.phone}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-gray-100 overflow-x-hidden" style={{ fontFamily: config.fontFamily }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen
            config={config}
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      <div className={`relative w-full transition-opacity duration-700 lg:grid lg:grid-cols-[400px_1fr] lg:h-screen lg:overflow-hidden ${isLoading ? 'opacity-0' : 'opacity-100'}`}>

        {/* MOBILE HEADER */}
        <header className="lg:hidden relative w-full mb-2">
          <div className="relative h-[38vh] w-full overflow-hidden">
            <LazyImage src={config.coverUrl || ''} alt="Cover" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-zinc-950" />
          </div>
          <div className="relative px-6 -mt-4 pb-4">
            <RestaurantInfo isMobile={true} />
            {config.shifts && config.shifts.length > 0 && (
              <div className="mt-2">
                <ShiftSwitcher
                  shifts={config.shifts}
                  activeShiftId={activeShiftId}
                  onShiftChange={handleShiftChange}
                  primaryColor={config.primaryColor}
                />
              </div>
            )}
          </div>
        </header>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col relative h-full bg-zinc-950 border-r border-white/5 z-30">
          <div className="absolute inset-0 z-0 opacity-30">
            <LazyImage src={config.coverUrl || ''} alt="Cover" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 flex flex-col h-full p-8 lg:p-10 overflow-y-auto custom-scrollbar">
            <div className="mt-4">
              <RestaurantInfo className="!items-start !text-left" />
            </div>
            {config.shifts && config.shifts.length > 0 && (
              <div className="mt-8 w-full flex justify-start">
                <ShiftSwitcher
                  shifts={config.shifts}
                  activeShiftId={activeShiftId}
                  onShiftChange={handleShiftChange}
                  primaryColor={config.primaryColor}
                />
              </div>
            )}
            <div className="mt-8 grow">
              <CategoryNav
                categories={filteredCategories}
                activeId={activeCategory}
                onSelect={scrollToCategory}
                primaryColor={config.primaryColor}
                fontFamily={config.fontFamily}
              />
            </div>
            <div className="pt-12 pb-4">
              <Watermark />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main
          ref={mainContentRef}
          className="flex-1 relative bg-zinc-950 scroll-smooth lg:overflow-y-auto lg:h-full lg:no-scrollbar"
        >
          {/* Mobile Sticky Nav */}
          <div className="sticky top-0 z-40 lg:hidden w-full">
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg" />
            <div className="relative">
              <CategoryNav
                categories={filteredCategories}
                activeId={activeCategory}
                onSelect={scrollToCategory}
                primaryColor={config.primaryColor}
                fontFamily={config.fontFamily}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeShiftId}
              initial="enter"
              animate="center"
              exit="exit"
              variants={contentTransitionVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-5 py-8 pb-32 lg:px-16 lg:py-20 min-h-[50vh]"
            >
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  ref={el => { categoryRefs.current[category.id] = el; }}
                  className="mb-12 last:mb-0 scroll-mt-36 lg:mb-40 lg:scroll-mt-24"
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={viewVariants}
                    className="flex items-center gap-4 mb-6 lg:mb-12"
                  >
                    <div className="h-8 w-1 lg:hidden rounded-full" style={{ backgroundColor: config.primaryColor }} />
                    <h2 className="text-2xl font-serif italic lg:text-4xl" style={{ color: config.primaryColor }}>
                      {category.title}
                    </h2>
                    <div className="hidden lg:block h-[1px] w-full bg-white/10 ml-4" />
                  </motion.div>

                  <div className={`grid gap-4 ${category.type === 'drink' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-2'}`}>
                    {category.dishes.map((dish, index) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        primaryColor={config.primaryColor}
                        textColor={textColor}
                        index={index}
                        layout={category.type === 'drink' ? 'compact' : 'standard'}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {filteredCategories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                  <span className="text-4xl mb-4">🌙</span>
                  <p className="text-center font-serif italic">No hay platos disponibles en este turno</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="lg:hidden">
            <Watermark />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;