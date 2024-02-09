import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { PlanResultados } from '../views/PlanResultados'
import { PlanIndicadores } from '../views/PlanIndicadores'
import { PlanEstrategias } from '../views/PlanEstrategias'
import { PlanActividades } from '../views/PlanActividades'
import { PlanTareas } from '../views/PlanTareas'
import { PlanMonitoreo } from '../views/PlanMonitoreo'

export const PlanificacionRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Planificación']['Resultados']
        &&
        <Route path="/resultados" element={<PlanResultados />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Indicadores']
        &&
        <Route path="/indicadores" element={<PlanIndicadores />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Estrategias']
        &&
        <Route path="/estrategias" element={<PlanEstrategias />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Actividades']
        &&
        <Route path="/actividades" element={<PlanActividades />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Tareas']
        &&
        <Route path="/tareas" element={<PlanTareas />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Monitoreo']
        &&
        <Route path="/monitoreo" element={<PlanMonitoreo />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
