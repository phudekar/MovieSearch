import React, { createContext, useContext } from 'react';
import defaultStyle from './defaultStyle';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children, theme }) => {
    return (
        <ThemeContext.Provider value={{ theme: { ...defaultStyle, ...theme } }} >
            {children}
        </ThemeContext.Provider >
    )
}
export default ThemeProvider;