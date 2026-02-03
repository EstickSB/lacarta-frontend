import React from 'react';

export const Watermark: React.FC = () => {
  return (
    <div className="absolute bottom-6 right-6 z-40 pointer-events-none">
      <div className="flex items-center gap-1 opacity-50 mix-blend-screen">
        <span className="text-[10px] text-white uppercase tracking-widest font-serif font-semibold">
          LACARTA<span className="text-red-600 text-lg leading-none">.</span>
        </span>
      </div>
    </div>
  );
};