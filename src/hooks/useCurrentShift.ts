import { useState, useEffect, useCallback } from 'react';
import { MenuShift } from '../types';
import { SHIFT_UPDATE_INTERVAL } from '../constants/ui';

export const useCurrentShift = (shifts: MenuShift[] = []) => {
  const getCurrentShift = useCallback(() => {
    if (!shifts || shifts.length === 0) return '';
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const current = shifts.find((shift) => {
      const [startHours, startMinutes] = shift.startTime.split(':').map(Number);
      const [endHours, endMinutes] = shift.endTime.split(':').map(Number);

      const startTotal = startHours * 60 + startMinutes;
      const endTotal = endHours * 60 + endMinutes;

      if (startTotal <= endTotal) {
        return currentMinutes >= startTotal && currentMinutes < endTotal;
      } else {
        return currentMinutes >= startTotal || currentMinutes < endTotal;
      }
    });

    return current ? current.id : (shifts[0]?.id ?? '');
  }, [shifts]);

  const [activeShiftId, setActiveShiftId] = useState<number | string>(() => getCurrentShift());

  useEffect(() => {
    setActiveShiftId(getCurrentShift());

    const interval = setInterval(() => {
      setActiveShiftId(getCurrentShift());
    }, SHIFT_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [getCurrentShift]);

  return { activeShiftId, setActiveShiftId };
};
