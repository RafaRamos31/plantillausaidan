import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { HistoryDepartamento } from '../views/history/HistoryDepartamento'
import { HistoryMunicipio } from '../views/history/HistoryMunicipio'
import { HistoryAldea } from '../views/history/HistoryAldea'
import { HistoryCaserio } from '../views/history/HistoryCaserio'
import { HistoryComponente } from '../views/history/HistoryComponente'
import { HistoryRol } from '../views/history/HistoryRol'
import { HistoryUsuario } from '../views/history/HistoryUsuario'
import { HistorySector } from '../views/history/HistorySector'
import { HistoryCargo } from '../views/history/HistoryCargo'
import { HistoryOrgType } from '../views/history/HistoryOrgtype'
import { HistoryOrganizacion } from '../views/history/HistoryOrganizacion'
import { HistoryBeneficiario } from '../views/history/HistoryBeneficiario'
import { HistoryResultado } from '../views/history/HistoryResultado'
import { HistoryIndicador } from '../views/history/HistoryIndicadores'
import { HistoryAreaTematica } from '../views/history/HistoryAreasTematicas'
import { HistorySubResultado } from '../views/history/HistorySubResultado'
import { HistoryActividad } from '../views/history/HistoryActividad'
import { HistorySubActividad } from '../views/history/HistorySubActividad'
import { HistoryYear } from '../views/history/HistoryYear'
import { HistoryQuarter } from '../views/history/HistoryQuarter'

export const HistorialRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.acciones['Departamentos']['Ver Historial']
        &&
        <Route path="/departamentos/:id" element={<HistoryDepartamento />}></Route>
      }
      {
        user.userPermisos?.acciones['Municipios']['Ver Historial']
        &&
        <Route path="/municipios/:id" element={<HistoryMunicipio />}></Route>
      }
      {
        user.userPermisos?.acciones['Aldeas']['Ver Historial']
        &&
        <Route path="/aldeas/:id" element={<HistoryAldea />}></Route>
      }
      {
        user.userPermisos?.acciones['Caserios']['Ver Historial']
        &&
        <Route path="/caserios/:id" element={<HistoryCaserio />}></Route>
      }
      {
        user.userPermisos?.acciones['Componentes']['Ver Historial']
        &&
        <Route path="/componentes/:id" element={<HistoryComponente />}></Route>
      }
      {
        user.userPermisos?.acciones['Roles']['Ver Historial']
        &&
        <Route path="/roles/:id" element={<HistoryRol />}></Route>
      }
      {
        user.userPermisos?.acciones['Usuarios']['Ver Historial']
        &&
        <Route path="/usuarios/:id" element={<HistoryUsuario />}></Route>
      }
      {
        user.userPermisos?.acciones['Sectores']['Ver Historial']
        &&
        <Route path="/sectores/:id" element={<HistorySector />}></Route>
      }
      {
        user.userPermisos?.acciones['Cargos']['Ver Historial']
        &&
        <Route path="/cargos/:id" element={<HistoryCargo />}></Route>
      }
      {
        user.userPermisos?.acciones['Tipos de Organizaciones']['Ver Historial']
        &&
        <Route path="/tipoOrganizaciones/:id" element={<HistoryOrgType />}></Route>
      }
      {
        user.userPermisos?.acciones['Organizaciones']['Ver Historial']
        &&
        <Route path="/organizaciones/:id" element={<HistoryOrganizacion />}></Route>
      }
      {
        user.userPermisos?.acciones['Beneficiarios']['Ver Historial']
        &&
        <Route path="/beneficiarios/:id" element={<HistoryBeneficiario />}></Route>
      }
      {
        user.userPermisos?.acciones['Indicadores']['Ver Historial']
        &&
        <Route path="/indicadores/:id" element={<HistoryIndicador />}></Route>
      }
      {
        user.userPermisos?.acciones['Áreas Temáticas']['Ver Historial']
        &&
        <Route path="/areastematicas/:id" element={<HistoryAreaTematica />}></Route>
      }
      {
        user.userPermisos?.acciones['Años Fiscales']['Ver Historial']
        &&
        <Route path="/years/:id" element={<HistoryYear />}></Route>
      }
      {
        user.userPermisos?.acciones['Trimestres']['Ver Historial']
        &&
        <Route path="/quarters/:id" element={<HistoryQuarter />}></Route>
      }
      {
        user.userPermisos?.acciones['Resultados']['Ver Historial']
        &&
        <Route path="/resultados/:id" element={<HistoryResultado />}></Route>
      }
      {
        user.userPermisos?.acciones['Sub Resultados']['Ver Historial']
        &&
        <Route path="/subresultados/:id" element={<HistorySubResultado />}></Route>
      }
      {
        user.userPermisos?.acciones['Actividades']['Ver Historial']
        &&
        <Route path="/actividades/:id" element={<HistoryActividad />}></Route>
      }
      {
        user.userPermisos?.acciones['Sub Actividades']['Ver Historial']
        &&
        <Route path="/subactividades/:id" element={<HistorySubActividad />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
