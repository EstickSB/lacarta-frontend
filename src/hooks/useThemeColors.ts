import { useMemo } from 'react';
import { getContrastTextColor, getSecondaryTextColor } from '../utils/colorUtils';

interface ThemeColors {
    backgroundColor: string;
    primaryColor: string;
    fontFamily: string;
    textColor: string;
    secondaryTextColor: string;
    titleColor: string;
    descriptionColor: string;
    descriptionDishColor: string;
    borderLogo: boolean;
}

export const useThemeColors = (
    backgroundColor?: string,
    primaryColor?: string,
    fontFamily?: string,
    titleColor?: string,
    descriptionColor?: string,
    descriptionDishColor?: string,
    borderLogo?: boolean
): ThemeColors => {
    return useMemo(() => {
        const bg = backgroundColor || '#09090b';
        const primary = primaryColor || '#ffffff';
        const font = fontFamily || 'Outfit';

        return {
            backgroundColor: bg,
            primaryColor: primary,
            fontFamily: font,
            textColor: titleColor || getContrastTextColor(bg),
            secondaryTextColor: descriptionColor || getSecondaryTextColor(bg),
            titleColor: titleColor || getContrastTextColor(bg),
            descriptionColor: descriptionColor || getSecondaryTextColor(bg),
            descriptionDishColor: descriptionDishColor || getContrastTextColor(bg),
            borderLogo: borderLogo ?? true
        };
    }, [backgroundColor, primaryColor, fontFamily, titleColor, descriptionColor, descriptionDishColor, borderLogo]);
};
