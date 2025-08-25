import React, { createContext, useState, type Dispatch, type FC, type SetStateAction } from 'react';

interface IsAdminContextType {
  isAdmin: string;
  setIsAdmin: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export const isAdminContext = createContext<IsAdminContextType>({
  isAdmin: '',
  setIsAdmin: () => {},
  name: '',
  setName: () => {},
});

interface IsAdminProvideProps {
  children: React.ReactNode;
}

export const IsAdminProvider: FC<IsAdminProvideProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState([]);
  const [name, setName] = useState('');
  return <isAdminContext.Provider value={{ isAdmin, setIsAdmin, name, setName }}>{children}</isAdminContext.Provider>;
};
