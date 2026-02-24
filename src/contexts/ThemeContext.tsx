import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

interface ThemeContextValue {
    backgroundColor: string;
    primaryColor: string;
    fontFamily: string;
    textColor: string;
    secondaryTextColor: string;
    titleColor: string;
    descriptionColor: string;
    descriptionDishColor: string;
    titleDishColor: string;
    descriptionCategoryColor: string;
    borderLogo: boolean;
    roundedLogo: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
    backgroundColor?: string;
    primaryColor?: string;
    fontFamily?: string;
    titleColor?: string;
    descriptionColor?: string;
    descriptionDishColor?: string;
    titleDishColor?: string;
    descriptionCategoryColor?: string;
    borderLogo?: boolean;
    roundedLogo?: boolean;
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    backgroundColor,
    primaryColor,
    fontFamily,
    titleColor,
    descriptionColor,
    descriptionDishColor,
    titleDishColor,
    descriptionCategoryColor,
    borderLogo,
    roundedLogo,
    children
}) => {
    const theme = useThemeColors(
        backgroundColor,
        primaryColor,
        fontFamily,
        titleColor,
        descriptionColor,
        descriptionDishColor,
        titleDishColor,
        descriptionCategoryColor,
        borderLogo,
        roundedLogo
    );

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
