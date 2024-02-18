import React, { createContext, useState } from 'react';

// Crea el contexto
const AproveContext = createContext();

// Crea un proveedor para el contexto
const AproveContextProvider = ({ children }) => {
  const [aprove, setAprove] = useState(false);

  return (
    <AproveContext.Provider value={{aprove, setAprove}}>
      {children}
    </AproveContext.Provider>
  );
};

export { AproveContext, AproveContextProvider };