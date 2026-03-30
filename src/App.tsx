import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Landing from './Landing';
import { SplashScreen } from './components/SplashScreen';

// Lazy loading de páginas que no son landing
const Terminos = lazy(() => import('./Terminos'));
const Privacidad = lazy(() => import('./Privacidad'));
import { DishCard } from './components/DishCard';
import { LazyImage } from './components/LazyImage';
import { Watermark } from './components/Watermark';
import { CategoryNav } from './components/CategoryNav';
import { ShiftSwitcher } from './components/ShiftSwitcher';
import { RestaurantInfo } from './components/RestaurantInfo';
import { ThemeProvider } from './contexts/ThemeContext';
import { useRestaurant } from './hooks/useRestaurant';
import { useCurrentShift } from './hooks/useCurrentShift';
import { useRouting } from './hooks/useRouting';
import { useThemeColors } from './hooks/useThemeColors';
import { filterMenuByShift } from './utils/menuFilters';
import { MOBILE_SCROLL_OFFSET, DESKTOP_BREAKPOINT } from './constants/ui';
import { Info } from 'lucide-react';

function MenuView() {
  const { slug, initialName } = useRouting();
  const [activeShiftId, setActiveShiftId] = useState<number | string | null>(null);
  const { restaurant, loading: apiLoading, error } = useRestaurant(slug, activeShiftId);
  const [showSplash, setShowSplash] = useState(true);

  const { activeShiftId: currentDefaultShiftId } = useCurrentShift(restaurant?.shifts || []);

  useEffect(() => {
    if (!activeShiftId && currentDefaultShiftId) {
      setActiveShiftId(currentDefaultShiftId);
    }
  }, [currentDefaultShiftId]);

  const filteredCategories = useMemo(() => {
    if (!restaurant) return [];
    return filterMenuByShift(restaurant.categories, activeShiftId);
  }, [restaurant, activeShiftId]);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const mainContentRef = useRef<HTMLDivElement>(null);

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

  const handleShiftChange = (newShiftId: string | number) => {
    if (newShiftId === activeShiftId) return;
    setActiveShiftId(newShiftId);

    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToCategory = (id: number) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];

    if (element) {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const y = element.getBoundingClientRect().top + window.pageYOffset + MOBILE_SCROLL_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const isAppReady = !apiLoading && !showSplash;

  const theme = useThemeColors(
    restaurant?.backgroundColor,
    restaurant?.primaryColor,
    restaurant?.fontFamily,
    restaurant?.titleColor,
    restaurant?.descriptionColor,
    restaurant?.descriptionDishColor,
    restaurant?.titleDishColor,
    restaurant?.descriptionCategoryColor,
    restaurant?.borderLogo,
    restaurant?.roundedLogo
  );

  const currentCategory = useMemo(() => {
    if (filteredCategories.length === 0) return null;
    return filteredCategories.find(c => String(c.id) === String(activeCategory)) || filteredCategories[0];
  }, [filteredCategories, activeCategory]);

  if (isAppReady && (error || !restaurant)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 text-gray-100 px-6">
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-6xl mb-4">😔</h1>
          <h2 className="text-2xl font-serif mb-2">Restaurante no encontrado</h2>
          <p className="text-sm opacity-70 mb-4">{error?.message || 'No pudimos cargar el menú'}</p>
        </m.div>
      </div>
    );
  }

  return (
    <ThemeProvider
      backgroundColor={restaurant?.backgroundColor}
      primaryColor={restaurant?.primaryColor}
      fontFamily={restaurant?.fontFamily}
      titleColor={restaurant?.titleColor}
      descriptionColor={restaurant?.descriptionColor}
      descriptionDishColor={restaurant?.descriptionDishColor}
      titleDishColor={restaurant?.titleDishColor}
      descriptionCategoryColor={restaurant?.descriptionCategoryColor}
      borderLogo={restaurant?.borderLogo}
      roundedLogo={restaurant?.roundedLogo}
    >
      <div className="flex min-h-screen w-full text-gray-100" style={{ fontFamily: theme.fontFamily, backgroundColor: theme.backgroundColor }}>
        <AnimatePresence mode="wait">
          {showSplash && (
            <SplashScreen
              restaurant={restaurant}
              initialName={initialName}
              isDataReady={!apiLoading}
              onComplete={() => setShowSplash(false)}
            />
          )}
        </AnimatePresence>

        <div className={`relative w-full transition-opacity duration-700 lg:grid lg:grid-cols-[380px_1fr] lg:h-screen lg:overflow-hidden ${showSplash ? 'opacity-0' : 'opacity-100'}`}>

          <header className="lg:hidden relative w-full mb-2">
            <div className="relative h-[30vh] w-full overflow-hidden">
              <LazyImage src={restaurant?.coverUrl || ''} alt="Cover" className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${theme.backgroundColor})` }} />
            </div>
            <div className="relative px-6 -mt-4 pb-4">
              <RestaurantInfo restaurant={restaurant} isMobile={true} />
              {restaurant?.shifts && restaurant.shifts.length > 0 && (
                <div className="mt-6">
                  <ShiftSwitcher
                    shifts={restaurant.shifts}
                    activeShiftId={activeShiftId}
                    onShiftChange={handleShiftChange}
                  />
                </div>
              )}
            </div>
          </header>

          <aside className="hidden lg:flex flex-col relative h-screen border-r border-white/5 z-30 overflow-hidden" style={{ backgroundColor: theme.backgroundColor }}>
            <div className="absolute inset-0 z-0 opacity-10">
              <LazyImage src={restaurant?.coverUrl || ''} alt="Cover" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/80" />
            </div>

            <div className="relative z-10 flex flex-col h-full px-8 py-12">
              <div className="shrink-0 mb-10">
                <RestaurantInfo restaurant={restaurant} />
                {restaurant?.shifts && restaurant.shifts.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <ShiftSwitcher
                      shifts={restaurant.shifts}
                      activeShiftId={activeShiftId}
                      onShiftChange={handleShiftChange}
                    />
                  </div>
                )}
              </div>

              <div className="flex-none overflow-y-auto scroll-primary pr-2 lg:max-h-[280px] scroll-smooth">
                <CategoryNav
                  categories={filteredCategories}
                  activeId={activeCategory}
                  onSelect={scrollToCategory}
                />
              </div>

              <div className="mt-auto pt-8 flex justify-center">
                <Watermark textColor={theme.descriptionColor} />
              </div>
            </div>
          </aside>

          <div className="lg:hidden sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/5" style={{ backgroundColor: `${theme.backgroundColor}dd` }}>
            <CategoryNav
              categories={filteredCategories}
              activeId={activeCategory}
              onSelect={scrollToCategory}
            />
          </div>

          <main
            ref={mainContentRef}
            className="flex-1 relative lg:overflow-y-auto lg:h-full custom-scrollbar"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <AnimatePresence mode="wait">
              <m.div
                key={`${activeShiftId}-${activeCategory}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-8 pb-10 lg:px-12 lg:py-16 min-h-[50vh]"
              >
                {currentCategory ? (
                  <div className="max-w-6xl mx-auto">
                    {currentCategory.description?.trim() && (
                      <m.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          delay: 0.1
                        }}
                        className="mb-12 mx-auto w-full"
                      >
                        <div className="relative group p-[1px] rounded-[1.5rem] overflow-hidden shadow-xl">
                          <div
                            className="absolute inset-0 rounded-[1.5rem]"
                            style={{
                              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.05), transparent)',
                              padding: '1px'
                            }}
                          />
                          <div
                            className="relative bg-white/95 backdrop-blur-md rounded-[1.5rem] p-5 lg:p-7 shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6"
                          >
                            <div className="shrink-0">
                              <div
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 shadow-sm"
                                style={{ color: theme.primaryColor }}
                              >
                                <Info size={20} />
                              </div>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1 block">
                                Información de categoría
                              </span>
                              <p
                                className="text-[14px] lg:text-[15px] leading-relaxed text-gray-700 font-medium"
                                style={{
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-word',
                                }}
                              >
                                {currentCategory.description?.replace(/\\n/g, '\n')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </m.div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                      {currentCategory.dishes.map((dish, index) => (
                        <DishCard
                          key={`${dish.id}-${activeShiftId}`}
                          dish={dish}
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
              </m.div>
            </AnimatePresence>

            <div className="lg:hidden pb-12 flex justify-center w-full">
              <Watermark textColor={theme.descriptionColor} />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

function App() {
  const path = window.location.pathname;
  const isRestaurantPage = path.startsWith('/restaurante/') || path.startsWith('/rest/') || path.startsWith('/restaurant/');

  if (isRestaurantPage) {
    return <MenuView />;
  }

  if (path === '/terminos') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center"><p className="text-gray-500">Cargando...</p></div>}>
        <Terminos />
      </Suspense>
    );
  }

  if (path === '/privacidad') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center"><p className="text-gray-500">Cargando...</p></div>}>
        <Privacidad />
      </Suspense>
    );
  }

  return <Landing onEnterApp={() => {}} />;
}

export default App;
