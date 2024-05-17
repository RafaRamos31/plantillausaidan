import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { EventosTablero } from '../views/EventosRegistro'
import { EventosPlanificacion } from '../views/EventosPlanificacion'
import { EventosTabla } from '../views/EventosTabla'
import { EventosAprobacion } from '../views/EventosAprobacion'
import { EventosAprobacionMEL } from '../views/EventosAprobacionMEL'
import { EventosTerminar } from '../views/EventosTerminar'
import { EventosDigitar } from '../views/EventosDigitar'
import { EventosDigitarForm } from '../views/EventoDigitarForm'
import { EventosConsolidado } from '../views/EventosConsolidado'
import { EventosPresupuesto } from '../views/EventosPresupuesto'
import { EventosConsolidarForm } from '../views/EventoConsolidarForm'
import { RefetchContextProvider } from '../contexts/RefetchContext'

export const EventosRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Eventos']['Planificación']
        &&
        <Route path="/tabla" element={<EventosTabla />}></Route>
      }
      {
        user.userPermisos?.vistas['Eventos']['Planificación']
        &&
        <Route path="/planificacion" element={<EventosPlanificacion />}></Route>
      }
      {
        user.userPermisos?.vistas['Eventos']['Tablero']
        &&
        <Route path="/tablero" 
        element=
        {
          <RefetchContextProvider>
            <EventosTablero />
          </RefetchContextProvider>
        }
        ></Route>
      }


      <Route path="/aprobacion" element={<EventosAprobacion />}></Route>
      <Route path="/aprobacionMEL" element={<EventosAprobacionMEL />}></Route>
      <Route path="/terminar" element={<EventosTerminar />}></Route>
      <Route path="/digitar" element={<EventosDigitar />}></Route>
      <Route path="/digitar/:idEvento" element={<EventosDigitarForm />}></Route>
      <Route path="/consolidado" element={<EventosConsolidado />}></Route>
      <Route path="/verificacion" element={<EventosPresupuesto />}></Route>
      <Route path="/consolidado" element={<EventosConsolidado />}></Route>
      <Route path="/consolidado/:idEvento" element={<EventosConsolidarForm />}></Route>


      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
