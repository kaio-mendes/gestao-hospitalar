import { useContext } from 'react';
import { ThemeContext } from '../providers/dark-mode';

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Tipo undefine');
  }

  const { theme } = context;
  return <h1 style={{ marginLeft: '2rem', textAlign: 'start', color: theme ? 'white' : '' }}>{title}</h1>;
};
