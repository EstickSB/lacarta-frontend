import { useState, useEffect } from 'react';
import { MenuShift } from '../types';

export const useCurrentShift = (shifts: MenuShift[] = []) => {
    const [activeShiftId, setActiveShiftId] = useState<string>('');

    useEffect(() => {
        if (!shifts || shifts.length === 0) return;

        const getCurrentShift = () => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            const current = shifts.find(shift => {
                const [startHours, startMinutes] = shift.startTime.split(':').map(Number);
                const [endHours, endMinutes] = shift.endTime.split(':').map(Number);

                const startTotal = startHours * 60 + startMinutes;
                const endTotal = endHours * 60 + endMinutes;

                if (startTotal <= endTotal) {
                    // Turno normal (ej: 08:00 a 20:00)
                    return currentMinutes >= startTotal && currentMinutes < endTotal;
                } else {
                    // Turno que cruza la medianoche (ej: 20:00 a 04:00)
                    return currentMinutes >= startTotal || currentMinutes < endTotal;
                }
            });

            return current ? current.id : (shifts[0]?.id || '');
        };

        setActiveShiftId(getCurrentShift());

        // Opcional: Actualizar cada minuto
        const interval = setInterval(() => {
            setActiveShiftId(getCurrentShift());
        }, 60000);

        return () => clearInterval(interval);
    }, [shifts]);

    return { activeShiftId, setActiveShiftId };
};
