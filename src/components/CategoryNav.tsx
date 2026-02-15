import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryNavProps {
  categories: Category[];
  activeId: number | null;
  onSelect: (id: number) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeId, onSelect }) => {
  const { primaryColor, fontFamily, textColor } = useTheme();

  return (
    <nav className="w-full py-3 lg:py-0">
      <div
        className="
          flex overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 gap-6 items-center justify-start 
          lg:flex-col lg:items-start lg:gap-4 lg:px-0 lg:whitespace-normal lg:overflow-y-auto 
          lg:max-h-[260px] lg:pr-4 scroll-primary [scrollbar-width:none] lg:[scrollbar-width:auto]
        "
        style={{
          // @ts-ignore
          '--scrollbar-color': primaryColor
        }}
      >
        {categories.map((category) => {
          const isActive = String(activeId) === String(category.id);
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className="relative shrink-0 flex flex-col items-center justify-center cursor-pointer group lg:items-start lg:w-full lg:text-left"
            >
              <div className="flex items-center gap-3 w-full">
                <motion.div
                  className="hidden lg:block shrink-0 w-6 h-[1px] bg-white/20 transition-all duration-300 group-hover:w-10"
                  animate={{
                    backgroundColor: isActive ? primaryColor : 'rgba(255,255,255,0.2)',
                    width: isActive ? 40 : 24
                  }}
                />

                <span
                  className={`
                    text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300
                    lg:text-[13px] lg:tracking-[0.2em] lg:leading-snug lg:block
                    ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}
                  `}
                  style={{
                    color: isActive ? primaryColor : textColor,
                    fontFamily
                  }}
                >
                  {category.title}
                </span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute -bottom-3 w-1 h-1 rounded-full lg:hidden"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
            </button>
          );
        })}
        <div className="w-2 shrink-0 lg:hidden" />
      </div>
    </nav>
  );
};