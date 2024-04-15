import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { InversionesList } from '../views/InversionesList'
import { InversionesAreas } from '../views/InversionesAreas'
import { EventosPresupuesto } from '../views/EventosPresupuesto'

export const InversionesRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Inversiones']['Inversiones']
        &&
        <Route path="/list" element={<InversionesList />}></Route>
      }
      {
        user.userPermisos?.vistas['Inversiones']['Áreas Temáticas']
        &&
        <Route path="/areas" element={<InversionesAreas />}></Route>
      }
      {
        user.userPermisos?.vistas['Inversiones']['Categorias']
        &&
        <Route path="/categorias" element={<InversionesAreas />}></Route>
      }
      {
        user.userPermisos?.vistas['Inversiones']['Sub Categorias']
        &&
        <Route path="/subcategorias" element={<InversionesAreas />}></Route>
      }

      <Route path="/presupuestar" element={<EventosPresupuesto />}></Route>

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
