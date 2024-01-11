import React, { createContext, useEffect, useState } from 'react';
import { useVerify } from '../hooks/useAuth.js';

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor para el contexto
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data, isLoading, error, setRefetch } = useVerify();

  useEffect(() => {
    if(!isLoading){
      if(!error && !error){
        setUser(data.user);
      }
    }
  }, [data, isLoading, error])
  


  return (
    <UserContext.Provider value={{user, setRefetch}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };