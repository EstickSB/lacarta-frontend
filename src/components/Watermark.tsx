import React from 'react';

interface WatermarkProps {
  textColor?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({ textColor = 'white' }) => {
  return (
    <div className="flex items-center gap-1 opacity-100">
      <span
        className="text-[10px] uppercase tracking-widest font-serif font-semibold"
        style={{ color: textColor }}
      >
        LACARTA<span className="text-red-600 text-lg leading-none">.</span>
      </span>
    </div>
  );
};
