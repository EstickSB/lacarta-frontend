import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Dish, DietaryBadge } from '../types';
import { LazyImage } from './LazyImage';
import { Flame, Leaf, WheatOff, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  primaryColor: string;
  textColor: string;
  index: number;
  layout?: 'standard' | 'compact';
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-sm">
    {children}
  </div>
);

const BadgeIcon: React.FC<{ type: DietaryBadge; color: string }> = ({ type, color }) => {
  const iconProps = { size: 12, strokeWidth: 2.5, className: "drop-shadow-md text-white" };

  switch (type) {
    case 'spicy': return <Wrapper><Flame {...iconProps} className="text-red-500" /></Wrapper>;
    case 'vegan': return <Wrapper><Leaf {...iconProps} className="text-green-500" /></Wrapper>;
    case 'gluten-free': return <Wrapper><WheatOff {...iconProps} className="text-amber-500" /></Wrapper>;
    case 'chef-choice': return <Wrapper><Star {...iconProps} style={{ color }} fill={color} /></Wrapper>;
    default: return null;
  }
};

export const DishCard: React.FC<DishCardProps> = ({ dish, primaryColor, textColor, index }) => {
  // Adaptación de datos
  const imageSrc = dish.imageUrl || dish.image || '';
  const priceDisplay = typeof dish.price === 'string' ? dish.price : `S/ ${dish.price.toFixed(2)}`;
  const description = dish.description || '';

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.05, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-white/5 shadow-sm group"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={cardVariants}
    >
      {/* Portada del Plato - Centrado en la parte superior */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
        <LazyImage
          src={imageSrc}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges Flotantes */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10 scale-75 origin-top-right">
          {dish.badges?.map((badge, idx) => (
            <BadgeIcon key={idx} type={badge as DietaryBadge} color={primaryColor} />
          ))}
        </div>
      </div>

      {/* Contenido del Plato */}
      <div className="flex flex-col p-3 lg:p-4 flex-1">
        <h3
          className="text-sm font-bold leading-tight mb-1 lg:text-base line-clamp-2"
          style={{ color: textColor }}
        >
          {dish.name}
        </h3>

        <p
          className="text-[11px] lg:text-xs leading-relaxed mb-3 grow italic opacity-70"
          style={{ color: textColor }}
        >
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-2">
          <span
            className="text-sm lg:text-base font-bold tracking-tight"
            style={{ color: primaryColor }}
          >
            {priceDisplay}
          </span>
        </div>
      </div>
    </motion.div>
  );
};