import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
  primaryColor: string;
  fontFamily: string;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeId, onSelect, primaryColor, fontFamily }) => {
  return (
    <div className="
      w-full bg-zinc-900/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3
      lg:bg-zinc-900/80 lg:border-white/5 lg:py-5
    ">
      <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar px-6 gap-8 items-center justify-start lg:justify-center w-full">
        {categories.map((category) => {
          const isActive = activeId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className="relative shrink-0 flex flex-col items-center justify-center cursor-pointer group"
            >
              <span
                className={`
                  text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300
                  lg:text-sm lg:tracking-[0.25em]
                  ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}
                `}
                style={{
                  color: isActive ? primaryColor : '#fff',
                  fontFamily
                }}
              >
                {category.title}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-3 w-1 h-1 rounded-full lg:-bottom-4"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};