import React, { createContext, useState } from 'react';

// Crea el contexto
const RefetchContext = createContext();

// Crea un proveedor para el contexto
const RefetchContextProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);

  return (
    <RefetchContext.Provider value={{refetch, setRefetch}}>
      {children}
    </RefetchContext.Provider>
  );
};

export { RefetchContext, RefetchContextProvider };