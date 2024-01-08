import { Routes, Route, Navigate } from 'react-router-dom'
import { RefetchContextProvider } from '../contexts/RefetchContext'
import { ToastContextProvider } from '../contexts/ToastContext'
import { Home } from '../views/Home'
import { Clientes } from '../views/Clientes'
import { Configuracion } from '../views/Configuracion'
import { ConfigUsuarios } from '../views/ConfigUsuarios'
import { ConfigRoles } from '../views/ConfigRoles'
import { Planificacion } from '../views/Planificacion'
import { Indicadores } from '../views/Indicadores'
import { ClientBeneficiarios } from '../views/ClientBeneficiarios'
import { PlanResultados } from '../views/PlanResultados'
import { PlanIndicadores } from '../views/PlanIndicadores'
import { PlanEstrategias } from '../views/PlanEstrategias'
import { PlanTareas } from '../views/PlanTareas'
import { PlanActividades } from '../views/PlanActividades'
import { PlanMonitoreo } from '../views/PlanMonitoreo'
import { IndIndicadores } from '../views/IndIndicadores'
import { IndRegistro } from '../views/IndRegistro'
import { IndMonitoreo } from '../views/IndMonitoreo'
import { IndReportes } from '../views/IndReportes'
import { ConfigComponentes } from '../views/ConfigComponentes'
import { ConfigDepartamentos } from '../views/ConfigDepartamentos'
import { ConfigMunicipios } from '../views/ConfigMunicipios'
import { ConfigAldeas } from '../views/ConfigAldeas'
import { ConfigCaserios } from '../views/ConfigCaserios'
import { ConfigAreas } from '../views/ConfigAreas'
import { ConfigSubAreas } from '../views/ConfigSubAreas'
import { ClientOrgtypes } from '../views/ClientOrgtypes'
import { ClientOrganizaciones } from '../views/ClientOrganizaciones'
import { Departamento } from '../views/info/Departamento'
import { Municipio } from '../views/info/Municipio'
import { Aldea } from '../views/info/Aldea'
import { Caserio } from '../views/info/Caserio'
import { AreaTematica } from '../views/info/AreaTematica'
import { SubAreaTematica } from '../views/info/SubAreaTematica'
import { ClientCargos } from '../views/ClientCargos'
import { Organizacion } from '../views/info/Organizacion'
import { TipoOrganizacion } from '../views/info/TipoOrganizacion'
import { Cargo } from '../views/info/Cargo'
import { Beneficiario } from '../views/info/Beneficiario'
import { Reportes } from '../views/Reportes'
import { Inversiones } from '../views/Inversiones'
import { InversionesAreas } from '../views/InversionesAreas'
import { InversionesList } from '../views/InversionesList'
import { Login } from '../views/Login'


export const MainRouter = () => {
  return (
    <>
      <RefetchContextProvider>
      <ToastContextProvider>  
      <Routes>
        <Route index element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/clientes" element={<Clientes />}></Route>
        <Route path="/clientes/beneficiarios" element={<ClientBeneficiarios />}></Route>
        <Route path="/clientes/organizaciones" element={<ClientOrganizaciones />}></Route>
        <Route path="/clientes/orgtypes" element={<ClientOrgtypes />}></Route>
        <Route path="/clientes/cargos" element={<ClientCargos />}></Route>

        <Route path="/inversiones" element={<Inversiones />}></Route>
        <Route path="/inversiones/list" element={<InversionesList />}></Route>
        <Route path="/inversiones/areas" element={<InversionesAreas />}></Route>

        <Route path="/planificacion" element={<Planificacion />}></Route>
        <Route path="/planificacion/resultados" element={<PlanResultados />}></Route>
        <Route path="/planificacion/indicadores" element={<PlanIndicadores />}></Route>
        <Route path="/planificacion/estrategias" element={<PlanEstrategias />}></Route>
        <Route path="/planificacion/tareas" element={<PlanTareas />}></Route>
        <Route path="/planificacion/actividades" element={<PlanActividades />}></Route>
        <Route path="/planificacion/monitoreo" element={<PlanMonitoreo />}></Route>

        <Route path="/indicadores" element={<Indicadores />}></Route>
        <Route path="/indicadores/indicadores" element={<IndIndicadores />}></Route>
        <Route path="/indicadores/registro" element={<IndRegistro />}></Route>
        <Route path="/indicadores/monitoreo" element={<IndMonitoreo />}></Route>
        <Route path="/indicadores/reportes" element={<IndReportes />}></Route>

        <Route path="/reportes" element={<Reportes />}></Route>

        <Route path="/configuracion" element={<Configuracion />}></Route>
        <Route path="/configuracion/usuarios" element={<ConfigUsuarios />}></Route>
        <Route path="/configuracion/roles" element={<ConfigRoles />}></Route>
        <Route path="/configuracion/componentes" element={<ConfigComponentes />}></Route>
        <Route path="/configuracion/departamentos" element={<ConfigDepartamentos />}></Route>
        <Route path="/configuracion/municipios" element={<ConfigMunicipios />}></Route>
        <Route path="/configuracion/aldeas" element={<ConfigAldeas />}></Route>
        <Route path="/configuracion/caserios" element={<ConfigCaserios />}></Route>
        <Route path="/configuracion/areas" element={<ConfigAreas />}></Route>
        <Route path="/configuracion/subareas" element={<ConfigSubAreas />}></Route>

        <Route path="/info/departamento/:idDepartamento" element={<Departamento />}></Route>
        <Route path="/info/municipio/:idMunicipio" element={<Municipio />}></Route>
        <Route path="/info/aldea/:idAldea" element={<Aldea />}></Route>
        <Route path="/info/caserio/:idCaserio" element={<Caserio />}></Route>
        <Route path="/info/area/:idArea" element={<AreaTematica />}></Route>
        <Route path="/info/subarea/:idSubarea" element={<SubAreaTematica />}></Route>
        <Route path="/info/organizacion/:idOrganizacion" element={<Organizacion />}></Route>
        <Route path="/info/orgtype/:idOrgtype" element={<TipoOrganizacion />}></Route>
        <Route path="/info/cargo/:idCargo" element={<Cargo />}></Route>
        <Route path="/info/beneficiario/:idBeneficiario" element={<Beneficiario />}></Route>

        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
      </ToastContextProvider>
      </RefetchContextProvider>
    </>
  )
}
