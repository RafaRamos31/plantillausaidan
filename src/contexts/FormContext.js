import React, { createContext, useState } from 'react';

// Crea el contexto
const FormContext = createContext();

// Crea un proveedor para el contexto
const FormContextProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(null);
  const [showPrincipal, setShowPrincipal] = useState(false);

  return (
    <FormContext.Provider value={{formValues, setFormValues, showPrincipal, setShowPrincipal}}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormContextProvider };