import React, { createContext, useEffect, useState, type SetStateAction } from 'react';

type ThemeContextType = {
  theme: boolean;
  setTheme: React.Dispatch<SetStateAction<boolean>>;
  toogleTheme: () => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ChangeThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('@theme');
    return saved ? JSON.parse(saved) : false;
  });
  const toogleTheme = () => {
    setTheme(prev => !prev);
  };

  useEffect(() => {
    window.localStorage.setItem('@theme', JSON.stringify(theme));
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toogleTheme }}>{children}</ThemeContext.Provider>;
};
