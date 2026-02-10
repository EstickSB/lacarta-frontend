import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

interface ThemeContextValue {
    backgroundColor: string;
    primaryColor: string;
    fontFamily: string;
    textColor: string;
    secondaryTextColor: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
    backgroundColor?: string;
    primaryColor?: string;
    fontFamily?: string;
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    backgroundColor,
    primaryColor,
    fontFamily,
    children
}) => {
    const theme = useThemeColors(backgroundColor, primaryColor, fontFamily);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
