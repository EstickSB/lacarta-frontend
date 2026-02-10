import { useMemo } from 'react';
import { getContrastTextColor, getSecondaryTextColor } from '../utils/colorUtils';

interface ThemeColors {
    backgroundColor: string;
    primaryColor: string;
    fontFamily: string;
    textColor: string;
    secondaryTextColor: string;
}

export const useThemeColors = (
    backgroundColor?: string,
    primaryColor?: string,
    fontFamily?: string
): ThemeColors => {
    return useMemo(() => {
        const bg = backgroundColor || '#09090b';
        const primary = primaryColor || '#ffffff';
        const font = fontFamily || 'Outfit';

        return {
            backgroundColor: bg,
            primaryColor: primary,
            fontFamily: font,
            textColor: getContrastTextColor(bg),
            secondaryTextColor: getSecondaryTextColor(bg)
        };
    }, [backgroundColor, primaryColor, fontFamily]);
};
