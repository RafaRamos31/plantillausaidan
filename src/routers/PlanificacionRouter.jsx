import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { PlanResultados } from '../views/PlanResultados'
import { PlanActividades } from '../views/PlanActividades'
import { PlanTareas } from '../views/PlanTareas'
import { PlanMonitoreo } from '../views/PlanMonitoreo'
import { PlanSubResultados } from '../views/PlanSubResultados'
import { PlanSubActividades } from '../views/PlanSubActividades'
import { PlanYears } from '../views/PlanYears'
import { PlanQuarters } from '../views/PlanQuarters'

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
        user.userPermisos?.vistas['Planificación']['Sub Resultados']
        &&
        <Route path="/subresultados" element={<PlanSubResultados />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Actividades']
        &&
        <Route path="/actividades" element={<PlanActividades />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Sub Actividades']
        &&
        <Route path="/subactividades" element={<PlanSubActividades />}></Route>
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
      {
        user.userPermisos?.vistas['Planificación']['Años Fiscales']
        &&
        <Route path="/years" element={<PlanYears />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Trimestres']
        &&
        <Route path="/quarters" element={<PlanQuarters />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
