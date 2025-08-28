import React, { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
interface ListStyleProviderProps {
  children: ReactNode;
}

interface ListStyleContextType {
  isList: boolean;
  setIsList: Dispatch<SetStateAction<boolean>>;
}

const ListStyleContext = createContext<ListStyleContextType>({} as ListStyleContextType);

export const ListStyleProvider: React.FC<ListStyleProviderProps> = ({ children }) => {
  const [isList, setIsList] = useState(false);

  return <ListStyleContext.Provider value={{ isList, setIsList }}>{children}</ListStyleContext.Provider>;
};

export const useListStyle = () => useContext(ListStyleContext);

export default ListStyleProvider;
