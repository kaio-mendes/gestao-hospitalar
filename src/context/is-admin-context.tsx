import React, { createContext, useState, type Dispatch, type FC, type SetStateAction } from 'react';

interface IsAdminContextType {
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export const isAdminContext = createContext<IsAdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
  name: '',
  setName: () => {},
});

interface IsAdminProvideProps {
  children: React.ReactNode;
}

export const IsAdminProvider: FC<IsAdminProvideProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');

  return <isAdminContext.Provider value={{ isAdmin, setIsAdmin, name, setName }}>{children}</isAdminContext.Provider>;
};
