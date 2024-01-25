import React, { createContext, useEffect, useState } from 'react';
import { useVerify } from '../hooks/useAuth.js';

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor para el contexto
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setRefetch, isLoading, data, code } = useVerify();

  useEffect(() => {
    if(!isLoading){
      if(code === 200){
        setUser(data.user);
      }
    }
  }, [isLoading, data, code])
  


  return (
    <UserContext.Provider value={{user,  isLoading, code, setRefetch}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };