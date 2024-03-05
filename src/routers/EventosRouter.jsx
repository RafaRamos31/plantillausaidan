import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { EventosRegistro } from '../views/EventosRegistro'

export const EventosRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Eventos']['Registro']
        &&
        <Route path="/registro" element={<EventosRegistro />}></Route>
      }
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
