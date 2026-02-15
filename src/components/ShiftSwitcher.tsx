import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { MenuShift } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { isLightBackground } from '../utils/colorUtils';

interface ShiftSwitcherProps {
    shifts: MenuShift[];
    activeShiftId: number | string;
    onShiftChange: (id: number) => void;
}

export const ShiftSwitcher: React.FC<ShiftSwitcherProps> = ({
    shifts,
    activeShiftId,
    onShiftChange
}) => {
    const { primaryColor } = useTheme();

    if (!shifts || shifts.length === 0) return null;

    return (
        <div className="flex justify-center w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex relative">
                {shifts.map((shift) => {
                    const isActive = String(activeShiftId) === String(shift.id);

                    const searchName = (shift.name || "").toLowerCase();
                    const searchId = String(shift.id).toLowerCase();

                    const isDay =
                        searchName.includes('dia') ||
                        searchId.includes('dia') ||
                        searchName.includes('día') ||
                        searchId.includes('día') ||
                        searchName.includes('almuerzo') ||
                        searchId.includes('almuerzo') ||
                        searchName.includes('mañana') ||
                        searchId.includes('mañana') ||
                        searchName.includes('day') ||
                        searchId.includes('day') ||
                        searchId.includes('lunch') ||
                        searchName.includes('lunch');

                    const activeTextColor = isLightBackground(primaryColor) ? 'text-zinc-950' : 'text-white';

                    return (
                        <button
                            key={shift.id}
                            onClick={() => onShiftChange(shift.id)}
                            className={`
                                relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                                ${isActive ? `${activeTextColor} scale-[1.05]` : 'text-zinc-400 hover:text-zinc-200'}
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="shiftHighlight"
                                    className="absolute inset-0 rounded-full shadow-lg"
                                    style={{ backgroundColor: primaryColor }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <span className="relative z-20 flex items-center gap-2">
                                {isDay ? (
                                    <Sun size={14} className={`transition-transform duration-300 ${isActive ? activeTextColor : 'text-current'}`} strokeWidth={2.5} />
                                ) : (
                                    <Moon size={14} className={`transition-transform duration-300 ${isActive ? activeTextColor : 'text-current'}`} strokeWidth={2.5} />
                                )}
                                {shift.shortLabel || shift.label || shift.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};