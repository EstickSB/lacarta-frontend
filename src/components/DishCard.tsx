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

export const DishCard: React.FC<DishCardProps> = ({ dish, primaryColor, textColor, index, layout = 'standard' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Adaptación de datos
  const imageSrc = dish.imageUrl || dish.image || '';
  const priceDisplay = typeof dish.price === 'string' ? dish.price : `S/ ${dish.price.toFixed(2)}`;
  const description = dish.description || '';

  // Heuristic: If description is longer than 120 chars, we treat it as "long text" for standard layout
  const isLongText = description.length > 120;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: index * 0.05, ease: "easeOut" }
    }
  };

  // Compact Layout (Used for grid view / all items currently)
  if (layout === 'compact') {
    return (
      <motion.div
        className="flex flex-col h-full group cursor-default"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        variants={cardVariants}
      >
        {/* Image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-zinc-900 mb-4 transition-transform duration-500 lg:group-hover:scale-[1.02]">
          <LazyImage src={imageSrc} alt={dish.name} />

          {/* Badges */}
          <div className="absolute top-2 right-2 flex gap-1 z-10 scale-90 origin-top-right">
            {dish.badges?.map((badge, idx) => (
              <BadgeIcon key={idx} type={badge as DietaryBadge} color={primaryColor} />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center grow px-1">
          <h3 className="text-sm font-bold leading-tight mb-2 tracking-wide lg:text-lg lg:mb-3" style={{ color: textColor }}>
            {dish.name}
          </h3>

          <p className="text-xs font-normal leading-relaxed text-gray-300 mb-3 lg:text-sm lg:mb-4 lg:max-w-[90%]">
            {description}
          </p>

          <span className="font-serif text-sm font-semibold italic mt-auto lg:text-base tracking-wider" style={{ color: primaryColor }}>
            {priceDisplay}
          </span>
        </div>
      </motion.div>
    );
  }

  // Standard Layout (Cinematic horizontal grid)
  return (
    <motion.div
      className="w-full grid grid-cols-[140px_1fr] gap-4 group cursor-default h-full bg-white/5 rounded-2xl overflow-hidden p-2 lg:grid-cols-[200px_1fr] lg:gap-8 lg:p-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={cardVariants}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-zinc-900 transition-shadow duration-500 lg:group-hover:shadow-2xl lg:group-hover:shadow-white/5">
        <LazyImage src={imageSrc} alt={dish.name} className="transition-transform duration-700 lg:group-hover:scale-105" />
        <div className="absolute top-2 right-2 flex gap-1 z-10 scale-75 origin-top-right">
          {dish.badges?.map((badge, idx) => (
            <BadgeIcon key={idx} type={badge as DietaryBadge} color={primaryColor} />
          ))}
        </div>
      </div>

      <div className="flex flex-col py-1 pr-2 flex-1 min-w-0">
        <div className="flex flex-col mb-1.5">
          <h3 className="text-base font-bold leading-tight lg:text-2xl truncate mb-1" style={{ color: textColor }}>
            {dish.name}
          </h3>
          <span className="font-serif text-base font-medium lg:text-xl italic" style={{ color: primaryColor }}>
            {priceDisplay}
          </span>
        </div>

        <div className="relative grow">
          <motion.p
            layout="position"
            className={`
              text-xs font-normal leading-relaxed text-gray-400 lg:text-sm
              ${isExpanded ? '' : 'line-clamp-2 lg:line-clamp-3'}
            `}
          >
            {description}
          </motion.p>

          {isLongText && (
            <motion.button
              layout="position"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="flex items-center gap-1 mt-1 text-[9px] uppercase font-bold tracking-widest hover:opacity-80 transition-opacity focus:outline-none lg:text-[10px]"
              style={{ color: primaryColor }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <>Read Less <ChevronUp size={10} /></>
              ) : (
                <>Read More <ChevronDown size={10} /></>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};