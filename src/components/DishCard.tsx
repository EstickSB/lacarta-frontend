import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Dish, DietaryBadge } from '../types';
import { LazyImage } from './LazyImage';
import { Flame, Leaf, WheatOff, Star } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  primaryColor: string;
  textColor: string;
  index: number;
  layout?: 'standard' | 'compact';
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-black/40 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
    {children}
  </div>
);

const BadgeIcon: React.FC<{ type: DietaryBadge; color: string }> = ({ type, color }) => {
  const iconProps = { size: 12, strokeWidth: 2.5, className: "drop-shadow-md text-white" };

  switch (type) {
    case 'spicy': return <Wrapper><Flame {...iconProps} className="text-red-400" /></Wrapper>;
    case 'vegan': return <Wrapper><Leaf {...iconProps} className="text-green-400" /></Wrapper>;
    case 'gluten-free': return <Wrapper><WheatOff {...iconProps} className="text-amber-400" /></Wrapper>;
    case 'chef-choice': return <Wrapper><Star {...iconProps} style={{ color }} fill={color} /></Wrapper>;
    default: return null;
  }
};

export const DishCard: React.FC<DishCardProps> = ({ dish, primaryColor, textColor, index, layout = 'standard' }) => {
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: index * 0.05, ease: "easeOut" }
    }
  };

  // Obtener la imagen - priorizar 'image' para compatibilidad, sino usar 'imageUrl'
  const imageSrc = dish.image || dish.imageUrl || '';
  // Asegurar que price sea string
  const priceDisplay = typeof dish.price === 'string' ? dish.price : `S/ ${dish.price.toFixed(2)}`;

  // Compact Layout (For Drinks/Grid)
  if (layout === 'compact') {
    return (
      <motion.div
        className="flex flex-col h-full group cursor-default"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={cardVariants}
      >
        <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-zinc-900 mb-3 transition-transform duration-500 lg:group-hover:scale-[1.02]">
          {imageSrc ? (
            <LazyImage src={imageSrc} alt={dish.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <span className="text-4xl opacity-20">🍽️</span>
            </div>
          )}
          {/* Minimal Badges for compact */}
          {dish.badges && dish.badges.length > 0 && (
            <div className="absolute top-1 right-1 flex gap-1 z-10 scale-75 origin-top-right">
              {dish.badges.map((badge, idx) => (
                <BadgeIcon key={idx} type={badge as DietaryBadge} color={primaryColor} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center text-center grow">
          <h3 className="text-sm font-bold leading-tight mb-1 lg:text-base lg:mb-2" style={{ color: textColor }}>
            {dish.name}
          </h3>
          {dish.description && (
            <p className="text-[10px] font-light leading-snug opacity-60 line-clamp-2 mb-2 lg:text-xs lg:mb-3 lg:max-w-[80%]" style={{ color: textColor }}>
              {dish.description}
            </p>
          )}
          <span className="font-mono text-sm font-medium mt-auto lg:text-base" style={{ color: primaryColor }}>
            {priceDisplay}
          </span>
        </div>
      </motion.div>
    );
  }

  // Standard Layout (For Food/List)
  return (
    <motion.div
      className="w-full flex flex-col gap-3 group cursor-default"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={cardVariants}
    >
      {/* Image Container 16:9 */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-zinc-900 transition-shadow duration-500 lg:group-hover:shadow-2xl lg:group-hover:shadow-white/5">
        {imageSrc ? (
          <LazyImage src={imageSrc} alt={dish.name} className="transition-transform duration-700 lg:group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <span className="text-6xl opacity-20">🍽️</span>
          </div>
        )}

        {/* Badges Overlay */}
        {dish.badges && dish.badges.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            {dish.badges.map((badge, idx) => (
              <BadgeIcon key={idx} type={badge as DietaryBadge} color={primaryColor} />
            ))}
          </div>
        )}
      </div>

      {/* Content Block */}
      <div className="flex flex-col px-1 lg:px-2">
        <div className="flex justify-between items-baseline mb-1 lg:mb-2">
          <h3 className="text-lg font-bold leading-tight lg:text-2xl" style={{ color: textColor }}>
            {dish.name}
          </h3>
          <span className="font-mono text-lg font-medium ml-4 shrink-0 lg:text-xl" style={{ color: primaryColor }}>
            {priceDisplay}
          </span>
        </div>

        {dish.description && (
          <p className="text-sm font-light leading-snug opacity-70 line-clamp-2 lg:text-base lg:line-clamp-3 lg:leading-relaxed" style={{ color: textColor }}>
            {dish.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};