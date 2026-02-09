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
  const slug = window.location.pathname.split('/')[2] || 'pepitas';
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

  // Fallback config to prevent crashes during loading
  const fallbackConfig: any = {
    name: "La Martina",
    description: "Restobar & Grill",
    primaryColor: "#E60026",
    backgroundColor: "#09090b",
    fontFamily: "Inter",
    logoUrl: "",
    coverUrl: "",
    shifts: []
  };

  const config = restaurant || fallbackConfig;

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

  const isLightBackground = (hex: string) => {
    if (!hex || hex.length < 7) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const isLight = isLightBackground(config.backgroundColor);
  const textColor = isLight ? '#18181b' : '#F5F5F7';
  const secondaryTextColor = isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';

  // Header/Info Subcomponent - Strictly Centered
  const RestaurantInfo = ({ isMobile = false }) => (
    <div className="flex flex-col items-center text-center w-full">
      <div className={`relative z-20 ${isMobile ? '-mt-12 mb-4' : 'mb-6'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-full overflow-hidden bg-zinc-900 shadow-2xl ${isMobile ? 'w-24 h-24 border-2' : 'w-24 h-24 lg:w-32 lg:h-32 border-2 lg:mx-auto'}`}
          style={{ borderColor: config.primaryColor }}
        >
          {config.logoUrl && <img src={config.logoUrl} alt={config.name} className="w-full h-full object-cover" />}
        </motion.div>
      </div>

      <h1 className="font-bold tracking-tight mb-2 text-2xl lg:text-4xl" style={{ color: textColor }}>
        {config.name}
      </h1>

      <p className="text-sm opacity-70 leading-relaxed max-w-[280px] lg:max-w-md mx-auto" style={{ color: secondaryTextColor }}>
        {config.description}
      </p>

      {(config.address || config.phone) && (
        <div
          className="flex flex-col gap-y-2 mt-4 mb-2 opacity-60 items-center text-center"
          style={{ color: secondaryTextColor }}
        >
          {config.phone && (
            <div className="flex items-center gap-2">
              <Phone size={11} style={{ color: config.primaryColor }} />
              <span className="text-[11px] tracking-wide font-medium">{config.phone}</span>
            </div>
          )}

          {config.address && (
            <div className="flex items-start gap-2 max-w-[240px]">
              <MapPin size={11} className="mt-0.5 shrink-0" style={{ color: config.primaryColor }} />
              <span className="text-[11px] leading-tight font-medium">{config.address}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Get active category data
  const currentCategory = filteredCategories.find(c => c.id === activeCategory) || filteredCategories[0];

  return (
    <div className="flex min-h-screen w-full text-gray-100 overflow-x-hidden" style={{ fontFamily: config.fontFamily, backgroundColor: config.backgroundColor }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen
            config={config}
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      <div className={`relative w-full transition-opacity duration-700 lg:grid lg:grid-cols-[380px_1fr] lg:h-screen lg:overflow-hidden ${isLoading ? 'opacity-0' : 'opacity-100'}`}>

        {/* MOBILE HEADER */}
        <header className="lg:hidden relative w-full mb-2">
          <div className="relative h-[30vh] w-full overflow-hidden">
            <LazyImage src={config.coverUrl || ''} alt="Cover" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${config.backgroundColor})` }} />
          </div>
          <div className="relative px-6 -mt-4 pb-4">
            <RestaurantInfo isMobile={true} />
            {config.shifts && config.shifts.length > 0 && (
              <div className="mt-6">
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
        <aside className="hidden lg:flex flex-col relative h-screen border-r border-white/5 z-30 overflow-hidden" style={{ backgroundColor: config.backgroundColor }}>
          <div className="absolute inset-0 z-0 opacity-10">
            <LazyImage src={config.coverUrl || ''} alt="Cover" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          <div className="relative z-10 flex flex-col h-full px-8 py-12">
            <div className="shrink-0 mb-10">
              <RestaurantInfo />
              {config.shifts && config.shifts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <ShiftSwitcher
                    shifts={config.shifts}
                    activeShiftId={activeShiftId}
                    onShiftChange={handleShiftChange}
                    primaryColor={config.primaryColor}
                  />
                </div>
              )}
            </div>

            <div className="flex-none overflow-y-auto scroll-primary pr-2 lg:max-h-[280px] scroll-smooth">
              <CategoryNav
                categories={filteredCategories}
                activeId={activeCategory}
                onSelect={scrollToCategory}
                primaryColor={config.primaryColor}
                fontFamily={config.fontFamily}
              />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main
          ref={mainContentRef}
          className="flex-1 relative lg:overflow-y-auto lg:h-full custom-scrollbar"
          style={{ backgroundColor: config.backgroundColor }}
        >
          {/* Mobile Category Tabs */}
          <div className="sticky top-0 z-40 lg:hidden w-full backdrop-blur-md border-b border-white/5" style={{ backgroundColor: `${config.backgroundColor}dd` }}>
            <CategoryNav
              categories={filteredCategories}
              activeId={activeCategory}
              onSelect={scrollToCategory}
              primaryColor={config.primaryColor}
              fontFamily={config.fontFamily}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeShiftId}-${activeCategory}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-8 pb-10 lg:px-12 lg:py-16 min-h-[50vh]"
            >
              {currentCategory ? (
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                    {currentCategory.dishes.map((dish, index) => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        primaryColor={config.primaryColor}
                        textColor={textColor}
                        index={index}
                      />
                    ))}
                  </div>

                  {currentCategory.dishes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-40">
                      <span className="text-4xl mb-4">🍽️</span>
                      <p className="text-center">No hay platos disponibles en esta categoría</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                  <span className="text-4xl mb-4">🌙</span>
                  <p className="text-center font-serif italic text-xl">Selecciona una categoría para comenzar</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Watermark exclusivo para móvil con visibilidad corregida */}
          <div className="lg:hidden pb-12 flex justify-center w-full">
            <Watermark />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;