import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RestaurantConfig } from '../types';
import { SPLASH_PROGRESS_INCREMENT, SPLASH_COMPLETION_DELAY } from '../constants/ui';

interface SplashScreenProps {
  restaurant?: RestaurantConfig | null;
  _initialName?: string;
  isDataReady: boolean;
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  restaurant,
  _initialName,
  isDataReady,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  const displayName = restaurant?.name;
  const primaryColor = restaurant?.primaryColor;
  const fontFamily = restaurant?.fontFamily;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (!isDataReady) return 100;

          clearInterval(timer);
          setTimeout(onComplete, SPLASH_COMPLETION_DELAY);
          return 100;
        }
        return prev + SPLASH_PROGRESS_INCREMENT;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete, isDataReady]);

  return (
    <m.div
      className="fixed inset-0 min-h-screen z-[100] flex flex-col items-center justify-center bg-zinc-950 overflow-hidden px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <AnimatePresence mode="wait">
        <m.h1
          key={displayName}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-light tracking-[0.2em] md:tracking-[0.3em] text-white uppercase leading-tight"
          style={{ fontFamily: fontFamily }}
        >
          {displayName}
        </m.h1>
      </AnimatePresence>

      <div className="absolute bottom-12 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <m.div
          className="h-full"
          style={{ backgroundColor: primaryColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </m.div>
  );
};
