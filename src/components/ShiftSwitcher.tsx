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

                    // Lógica mejorada: Buscamos palabras clave de día o almuerzo
                    const searchName = (shift.name || "").toLowerCase();
                    const searchId = (shift.id || "").toLowerCase();

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

                    // Helper para contraste (en línea para simplicidad)
                    const isPrimaryLight = (hex: string) => {
                        if (!hex || hex.length < 7) return false;
                        const r = parseInt(hex.slice(1, 3), 16);
                        const g = parseInt(hex.slice(3, 5), 16);
                        const b = parseInt(hex.slice(5, 7), 16);
                        return ((r * 299 + g * 587 + b * 114) / 1000) > 155;
                    };

                    const activeTextColor = isPrimaryLight(primaryColor) ? 'text-zinc-950' : 'text-white';

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
                                {/* Ahora sí mostrará el Sol si encuentra "Almuerzo" */}
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