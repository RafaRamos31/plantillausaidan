import { Routes, Route, Navigate } from 'react-router-dom'
import { RefetchContextProvider } from '../contexts/RefetchContext'
import { ToastContextProvider } from '../contexts/ToastContext'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Home } from '../views/Home'
import { Clientes } from '../views/Clientes'
import { Configuracion } from '../views/Configuracion'
import { Planificacion } from '../views/Planificacion'
import { Indicadores } from '../views/Indicadores'
import { Reportes } from '../views/Reportes'
import { Inversiones } from '../views/Inversiones'
import { Login } from '../views/Login'
import { Register } from '../views/Register'
import { ConfiguracionRouter } from './ConfiguracionRouter'
import { ReviewsRouter } from './ReviewsRouter'
import { HistorialRouter } from './HistorialRouter'
import { IndicadoresRouter } from './IndicadoresRouter'
import { ClientesRouter } from './ClientesRouter'
import { PlanificacionRouter } from './PlanificacionRouter'
import { InversionesRouter } from './InversionesRouter'
import { ReportesRouter } from './ReportesRouter'

export const MainRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <>
      <RefetchContextProvider>
      <ToastContextProvider>  
      <Routes>
        <Route index element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register/:idTicket" element={<Register />}></Route>

        {
          user && 
          <>
            {
              (user.userPermisos?.vistas['Clientes'] && Object.values(user.userPermisos?.vistas['Clientes']).some(valor => valor === true))
              &&
              <Route path="/clientes" element={<Clientes />}></Route>
            }
            <Route path="/clientes/*" element={<ClientesRouter />}></Route>

            {
              (user.userPermisos?.vistas['Inversiones'] && Object.values(user.userPermisos?.vistas['Inversiones']).some(valor => valor === true))
              &&
              <Route path="/inversiones" element={<Inversiones />}></Route>
            }
            <Route path="/inversiones/*" element={<InversionesRouter />}></Route>

            {
              (user.userPermisos?.vistas['Planificación'] && Object.values(user.userPermisos?.vistas['Planificación']).some(valor => valor === true))
              &&
              <Route path="/planificacion" element={<Planificacion />}></Route>
            }
            <Route path="/planificacion/*" element={<PlanificacionRouter />}></Route>

            {
              (user.userPermisos?.vistas['Indicadores'] && Object.values(user.userPermisos?.vistas['Indicadores']).some(valor => valor === true))
              &&
              <Route path="/indicadores" element={<Indicadores />}></Route>
            }
            <Route path="/indicadores/*" element={<IndicadoresRouter />}></Route>

            {
              (user.userPermisos?.vistas['Reportes'] && Object.values(user.userPermisos?.vistas['Reportes']).some(valor => valor === true))
              &&
              <Route path="/reportes" element={<Reportes />}></Route>
            }
            <Route path="/reportes/*" element={<ReportesRouter />}></Route>

            {
              (user.userPermisos?.vistas['Configuración'] && Object.values(user.userPermisos?.vistas['Configuración']).some(valor => valor === true))
              &&
              <Route path="/configuracion" element={<Configuracion />}></Route>
            }
            <Route path="/configuracion/*" element={<ConfiguracionRouter />}></Route>

            <Route path="/reviews/*" element={<ReviewsRouter />}></Route>  

            <Route path="/historial/*" element={<HistorialRouter />}></Route>

            <Route path="*" element={<Navigate to="/" />} />
          </>
        }
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </ToastContextProvider>
      </RefetchContextProvider>
    </>
  )
}
