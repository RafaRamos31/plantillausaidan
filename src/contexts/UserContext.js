import React, { createContext, useEffect, useState } from 'react';
import { useVerify } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor para el contexto
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data, isLoading, error } = useVerify();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoading){
      if(!error && !error){
        setUser(data.user);
      }
    }
  }, [data, isLoading, error, navigate])
  

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };