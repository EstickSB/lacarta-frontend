import React, { useState } from 'react';
import { m } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-zinc-800 ${className}`}>
      {/* Shimmer Placeholder */}
      {!isLoaded && <div className="absolute inset-0 z-10 animate-pulse bg-zinc-700/50" />}

      {/* Actual Image */}
      <m.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover block ${className}`}
      />
    </div>
  );
};
