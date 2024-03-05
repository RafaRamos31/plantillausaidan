import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IndIndicadores } from '../views/IndIndicadores'
import { IndMonitoreo } from '../views/IndMonitoreo'
import { IndAreasTematicas } from '../views/IndAreasTematicas'
import { IndYears } from '../views/IndYears'
import { IndQuarters } from '../views/IndQuarters'

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
        user.userPermisos?.vistas['Indicadores']['Áreas Temáticas']
        &&
        <Route path="/areas" element={<IndAreasTematicas />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Años Fiscales']
        &&
        <Route path="/years" element={<IndYears />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Trimestres']
        &&
        <Route path="/quarters" element={<IndQuarters />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Monitoreo']
        &&
        <Route path="/monitoreo" element={<IndMonitoreo />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
