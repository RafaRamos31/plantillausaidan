import { Routes, Route, Navigate } from 'react-router-dom'
import { RefetchContextProvider } from '../contexts/RefetchContext'
import { ToastContextProvider } from '../contexts/ToastContext'
import { Home } from '../views/Home'
import { Clientes } from '../views/Clientes'
import { Configuracion } from '../views/Configuracion'
import { ConfigUsuarios } from '../views/ConfigUsuarios'


export const MainRouter = () => {
  return (
    <>
      <RefetchContextProvider>
      <ToastContextProvider>  
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/clientes" element={<Clientes />}></Route>
        <Route path="/configuracion" element={<Configuracion />}></Route>
        <Route path="/configuracion/usuarios" element={<ConfigUsuarios />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
      </ToastContextProvider>
      </RefetchContextProvider>
    </>
  )
}
