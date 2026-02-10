import React from 'react';

interface WatermarkProps {
  textColor?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({ textColor = 'white' }) => {
  return (
    <div className="flex px-10 items-center gap-1 opacity-60 mix-blend-screen">
      <span className="text-[10px] text-white uppercase tracking-widest font-serif font-semibold">
          LACARTA<span className="text-red-600 text-lg leading-none">.</span>
        </span>
    </div>
  );
};