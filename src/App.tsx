import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import type { RestaurantConfig } from './types';
import { SplashScreen } from './components/SplashScreen';
import { DishCard } from './components/DishCard';
import { LazyImage } from './components/LazyImage';
import { Watermark } from './components/Watermark';
import { CategoryNav } from './components/CategoryNav';
import { useRestaurant } from './hooks/useRestaurant';

function App() {
  // Extraer slug del pathname: /res/pepitas/menu -> pepitas
  const slug = window.location.pathname.split('/')[2] || 'pepitas';
  
  const { restaurant, loading: apiLoading, error } = useRestaurant(slug);
  const [showSplash, setShowSplash] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');

  // Refs for scrolling
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Update active category when restaurant loads
  useEffect(() => {
    if (restaurant?.categories.length) {
      setActiveCategory(restaurant.categories[0].id);
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurant) {
      document.title = `${restaurant.name} - Digital Menu`;
    }
  }, [restaurant]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    const yOffset = -100;
    if (element) {
      if (window.innerWidth >= 1024) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Loading state - Show splash while API loads
  const isLoading = apiLoading || showSplash;

  // Error state
  if (!isLoading && (error || !restaurant)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900 text-gray-100">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl mb-4">😔</h1>
            <h2 className="text-2xl font-serif mb-2">Restaurante no encontrado</h2>
            <p className="text-sm opacity-70 mb-4">
              {error?.message || 'No pudimos cargar el menú'}
            </p>
            <p className="text-xs opacity-50">
              URL: /res/{slug}/menu
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Don't render main content until we have restaurant data
  if (!restaurant) {
    return null;
  }

  const config = restaurant;

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-zinc-900 text-gray-100">
      <div
        className={`
          relative flex flex-col w-full shadow-2xl transition-all duration-500
          max-w-[450px] bg-black
          ${isLoading
            ? 'h-[100dvh] overflow-hidden'
            : 'h-[100dvh] overflow-hidden lg:h-auto lg:min-h-screen lg:max-w-7xl lg:overflow-visible lg:bg-transparent lg:shadow-none'
          }
        `}
        style={{
          fontFamily: config.fontFamily,
          backgroundColor: config.backgroundColor
        }}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <SplashScreen
              config={{
                ...config,
                // Adaptar tipos del backend al frontend
                logo: config.logoUrl || '',
                coverImage: config.coverUrl || '',
              }}
              onComplete={() => setShowSplash(false)}
            />
          )}
        </AnimatePresence>

        <div className="
            flex-1 relative scroll-smooth
            overflow-y-auto no-scrollbar
            lg:overflow-visible
          "
        >
          {/* Header Section */}
          <motion.header
            className="relative w-full shrink-0 h-[25vh] lg:h-[50vh]"
            initial="hidden"
            animate="visible"
            variants={viewVariants}
          >
            <div className="absolute inset-0 z-0 overflow-hidden lg:rounded-b-3xl">
              {config.coverUrl ? (
                <LazyImage 
                  src={config.coverUrl} 
                  alt="Cover" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div 
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor}40, ${config.backgroundColor})`
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black/40 lg:bg-black/30" />
            </div>

            {/* Logo */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 lg:-bottom-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {config.logoUrl ? (
                  <div
                    className="
                      w-20 h-20 rounded-full border-[1px] shadow-2xl overflow-hidden bg-black
                      lg:w-32 lg:h-32 lg:border-2
                    "
                    style={{ borderColor: config.primaryColor }}
                  >
                    <img 
                      src={config.logoUrl} 
                      alt={config.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div
                    className="
                      w-20 h-20 rounded-full border-[1px] shadow-2xl flex items-center justify-center bg-black
                      lg:w-32 lg:h-32 lg:border-2
                    "
                    style={{ borderColor: config.primaryColor }}
                  >
                    <span 
                      className="text-2xl lg:text-4xl font-serif"
                      style={{ color: config.primaryColor }}
                    >
                      {config.name.charAt(0)}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.header>

          {/* Restaurant Info */}
          <motion.section
            className="mt-12 mb-6 px-6 text-center lg:mt-20 lg:mb-12 lg:max-w-2xl lg:mx-auto"
            initial="hidden"
            animate="visible"
            variants={viewVariants}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="
                text-2xl font-serif tracking-wide mb-1
                lg:text-5xl lg:mb-4
              "
              style={{ color: textColor }}
            >
              {config.name}
            </h1>
            {config.description && (
              <p
                className="
                  text-xs font-sans font-light opacity-80 leading-relaxed uppercase tracking-widest
                  lg:text-sm lg:tracking-[0.3em]
                "
                style={{ color: textColor }}
              >
                {config.description}
              </p>
            )}
          </motion.section>

          {/* Sticky Navigation */}
          <motion.div
            className="sticky top-0 z-40"
            initial="hidden"
            animate="visible"
            variants={viewVariants}
            transition={{ delay: 0.3 }}
          >
            <CategoryNav
              categories={config.categories}
              activeId={activeCategory}
              onSelect={scrollToCategory}
              primaryColor={config.primaryColor}
              fontFamily={config.fontFamily}
            />
          </motion.div>

          {/* Menu Categories */}
          <main className="
              px-5 pb-24 pt-8
              lg:px-12 lg:pt-16 lg:pb-32
            ">
            {config.categories.map((category) => (
              <div
                key={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="mb-16 last:mb-0 scroll-mt-32 lg:mb-32"
              >
                {/* Category Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center mb-8 gap-4 lg:mb-12"
                >
                  <div className="h-[1px] w-8 bg-white/20 lg:w-24" />
                  <h2
                    className="
                      text-lg font-serif italic
                      lg:text-3xl
                    "
                    style={{ color: config.primaryColor }}
                  >
                    {category.title}
                  </h2>
                  <div className="h-[1px] w-8 bg-white/20 lg:w-24" />
                </motion.div>

                {/* Layout Logic */}
                {category.type === 'drink' ? (
                  <div className="
                    grid grid-cols-2 gap-4
                    lg:grid-cols-4 lg:gap-8 lg:gap-y-12
                  ">
                    {category.dishes.map((dish, index) => (
                      <DishCard
                        key={dish.id}
                        dish={{
                          ...dish,
                          image: dish.imageUrl || '',
                          //@ts-ignore
                          price: `S/ ${dish.price.toFixed(2)}`,
                          badges: dish.badges as any,
                        }}
                        primaryColor={config.primaryColor}
                        textColor={textColor}
                        index={index}
                        layout="compact"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="
                    flex flex-col gap-10
                    lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20 lg:items-start
                  ">
                    {category.dishes.map((dish, index) => (
                      <DishCard
                        key={dish.id}
                        dish={{
                          ...dish,
                          image: dish.imageUrl || '',
                          //@ts-ignore
                          price: `S/ ${dish.price.toFixed(2)}`,
                          badges: dish.badges as any,
                        }}
                        primaryColor={config.primaryColor}
                        textColor={textColor}
                        index={index}
                        layout="standard"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </main>
        </div>

        <div className="lg:fixed lg:bottom-8 lg:right-8 lg:z-50">
          <Watermark />
        </div>
      </div>
    </div>
  );
}

export default App;