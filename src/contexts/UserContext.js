import React, { createContext } from 'react';
//import useValidate from '../hooks/useValidate.js';

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor para el contexto
const UserContextProvider = ({ children }) => {
  //const user = useValidate(localStorage.getItem("user-id"))
  const user = {};

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };