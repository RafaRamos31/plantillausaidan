import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IndIndicadores } from '../views/IndIndicadores'
import { IndRegistro } from '../views/IndRegistro'
import { IndMonitoreo } from '../views/IndMonitoreo'
import { IndReportes } from '../views/IndReportes'

export const IndicadoresRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Indicadores']['Indicadores']
        &&
        <Route path="/indicadores" element={<IndIndicadores />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Registro']
        &&
        <Route path="/registro" element={<IndRegistro />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Monitoreo']
        &&
        <Route path="/monitoreo" element={<IndMonitoreo />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Reportes']
        &&
        <Route path="/reportes" element={<IndReportes />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
