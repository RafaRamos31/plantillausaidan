import React, { createContext, useState } from 'react';
import { Toast } from 'react-bootstrap';

// Crea el contexto
const ToastContext = createContext();

// Crea un proveedor para el contexto
const ToastContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [variant, setVariant] = useState('info');

  const actualizarTitulo = (titulo) => {
    setTitle(titulo)
  }

  return (
    <ToastContext.Provider value={{setShowToast, actualizarTitulo, setContent, setVariant}}>
      {children}
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={4000} autohide style={{position: 'absolute', top: 80, right: 20}} bg={variant}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };