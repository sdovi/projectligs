import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [array, setArray] = useState([]);

  return (
    <Context.Provider value={{ array, setArray }}>
      {children}
    </Context.Provider>
  );
};
