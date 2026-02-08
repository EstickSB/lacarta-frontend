import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { MenuShift } from '../types';

interface ShiftSwitcherProps {
    shifts: MenuShift[];
    activeShiftId: string;
    onShiftChange: (id: string) => void;
    primaryColor: string;
}

export const ShiftSwitcher: React.FC<ShiftSwitcherProps> = ({
    shifts,
    activeShiftId,
    onShiftChange,
    primaryColor
}) => {
    if (!shifts || shifts.length === 0) return null;

    return (
        <div className="flex justify-center w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex relative">
                {shifts.map((shift) => {
                    const isActive = activeShiftId === shift.id;
                    const isDay = shift.id.toLowerCase().includes('day') || shift.name.toLowerCase().includes('dia');

                    return (
                        <button
                            key={shift.id}
                            onClick={() => onShiftChange(shift.id)}
                            className={`
                relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300
                ${isActive ? 'text-black' : 'text-white/60 hover:text-white'}
              `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="shiftHighlight"
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: primaryColor }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <span className="relative z-20 flex items-center gap-2">
                                {isDay ? <Sun size={14} /> : <Moon size={14} />}
                                {shift.shortLabel || shift.label || shift.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
