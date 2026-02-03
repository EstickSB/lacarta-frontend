import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RestaurantConfig } from '../types';

interface SplashScreenProps {
  config: RestaurantConfig & {
    logo?: string;
    coverImage?: string;
  };
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ config, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1.5;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-[100dvh] z-[100] flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <h1
          className="text-4xl font-light tracking-[0.3em] text-white uppercase"
          style={{ fontFamily: config.fontFamily }}
        >
          {config.name}
        </h1>
      </motion.div>

      {/* Loading Bar at Base */}
      <div className="absolute bottom-12 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: config.primaryColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};