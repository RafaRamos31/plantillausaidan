import React, { createContext, useEffect } from 'react';
import { useVerify } from '../hooks/useAuth.js';

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor para el contexto
const UserContextProvider = ({ children }) => {
  const { data, isLoading, error } = useVerify();

  useEffect(() => {
    if(!isLoading){
      console.log(data)
      console.log(error)
    }
  }, [data, isLoading, error])
  

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };