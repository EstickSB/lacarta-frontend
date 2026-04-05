import React from 'react';
import { m, Variants, AnimatePresence } from 'framer-motion';
import { Dish, DietaryBadge } from '../types';
import { LazyImage } from './LazyImage';
import { Flame, Leaf, WheatOff, Star, Eye, X } from 'lucide-react';
import { normalizeDish } from '../mappers/dishMapper';
import { useTheme } from '../contexts/ThemeContext';
import { ANIMATION_STAGGER_DELAY } from '../constants/ui';

interface DishCardProps {
  dish: Dish;
  index: number;
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-sm">
    {children}
  </div>
);

const BadgeIcon: React.FC<{ type: DietaryBadge; color: string }> = ({ type, color }) => {
  const iconProps = { size: 12, strokeWidth: 2.5, className: 'drop-shadow-md text-white' };

  switch (type) {
    case 'spicy':
      return (
        <Wrapper>
          <Flame {...iconProps} className="text-red-500" />
        </Wrapper>
      );
    case 'vegan':
      return (
        <Wrapper>
          <Leaf {...iconProps} className="text-green-500" />
        </Wrapper>
      );
    case 'gluten-free':
      return (
        <Wrapper>
          <WheatOff {...iconProps} className="text-amber-500" />
        </Wrapper>
      );
    case 'chef-choice':
      return (
        <Wrapper>
          <Star {...iconProps} style={{ color }} fill={color} />
        </Wrapper>
      );
    default:
      return null;
  }
};

export const DishCard: React.FC<DishCardProps> = ({ dish, index }) => {
  const [showModal, setShowModal] = React.useState(false);
  const { primaryColor, titleDishColor, descriptionDishColor, backgroundColor } = useTheme();
  const { imageSrc, priceDisplay, description } = normalizeDish(dish);

  // Bloquear scroll cuando el modal está abierto
  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * ANIMATION_STAGGER_DELAY, ease: 'easeOut' },
    },
  };

  return (
    <m.div
      className="flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-white/5 shadow-sm group"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={cardVariants}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
        <LazyImage
          src={imageSrc}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10 scale-75 origin-top-right">
          {dish.badges?.map((badge) => (
            <BadgeIcon key={badge} type={badge as DietaryBadge} color={primaryColor} />
          ))}
        </div>

        {/* Eye Icon for Detail View */}
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(true)}
          className="absolute bottom-3 right-3 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-center opacity-100 transition-all duration-300"
          aria-label={`Ver detalles de ${dish.name}`}
        >
          <Eye size={18} strokeWidth={2} />
        </m.button>
      </div>

      <div className="flex flex-col p-3 lg:p-4 flex-1">
        <h3
          className="text-sm font-bold leading-tight mb-1 lg:text-base line-clamp-2 cursor-pointer hover:underline underline-offset-4 transition-all"
          style={{ color: titleDishColor }}
          onClick={() => setShowModal(true)}
        >
          {dish.name}
        </h3>

        <p
          className="text-[11px] lg:text-xs leading-relaxed mb-3 grow italic opacity-70"
          style={{
            color: descriptionDishColor,
            whiteSpace: 'pre-wrap',
          }}
        >
          {description?.replace(/\\n/g, '\n')}
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

      {/* Accessibility Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <m.div
              layoutId={`dish-modal-${dish.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
              style={{ backgroundColor }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto overflow-hidden bg-zinc-800">
                <img src={imageSrc} alt={dish.name} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-white/5 to-transparent">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2 block">
                      Detalle del Plato
                    </span>
                    <h2
                      className="text-2xl lg:text-3xl font-bold leading-tight"
                      style={{ color: titleDishColor }}
                    >
                      {dish.name}
                    </h2>
                  </div>

                  <p
                    className="text-sm lg:text-base leading-relaxed opacity-80 italic"
                    style={{ color: descriptionDishColor, whiteSpace: 'pre-wrap' }}
                  >
                    {description?.replace(/\\n/g, '\n')}
                  </p>

                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                        Precio
                      </span>
                      <span
                        className="text-2xl lg:text-3xl font-black"
                        style={{ color: primaryColor }}
                      >
                        {priceDisplay}
                      </span>
                    </div>

                    {dish.badges && dish.badges.length > 0 && (
                      <div className="flex gap-2 mt-4 pt-4">
                        {dish.badges.map((badge) => (
                          <div key={badge} className="scale-100">
                            <BadgeIcon type={badge as DietaryBadge} color={primaryColor} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
