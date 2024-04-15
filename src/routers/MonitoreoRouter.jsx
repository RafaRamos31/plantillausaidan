import { Navigate, Route, Routes } from 'react-router-dom'
//import { useContext } from 'react'
//import { UserContext } from '../contexts/UserContext'
import { EventosAprobacionMEL } from '../views/EventosAprobacionMEL'
import { EventosConsolidado } from '../views/EventosConsolidado'
import { EventosConsolidarForm } from '../views/EventoConsolidarForm'

export const MonitoreoRouter = () => {

  //const {user} = useContext(UserContext);

  return (
    <Routes>
      <Route path="/aprobacion" element={<EventosAprobacionMEL />}></Route>

      <Route path="/consolidado" element={<EventosConsolidado />}></Route>
      <Route path="/consolidado/:idEvento" element={<EventosConsolidarForm />}></Route>

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
