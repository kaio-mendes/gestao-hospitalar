import { useContext, useEffect } from 'react';
import { ThemeContext } from './providers/dark-mode';

export const ThemeApplier = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = theme ? '#191919' : '#ffffff';
    document.body.style.color = theme ? '#c2c2c2' : '#000000';
  }, [theme]);

  return null;
};
