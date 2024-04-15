import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { ReviewsDepartamentos } from '../views/reviews/ReviewsDepartamentos'
import { ReviewDepartamento } from '../views/reviews/unitarios/ReviewDepartamento'
import { ReviewsMunicipios } from '../views/reviews/ReviewsMunicipios'
import { ReviewMunicipio } from '../views/reviews/unitarios/ReviewMunicipio'
import { ReviewsRoles } from '../views/reviews/ReviewRoles'
import { ReviewRol } from '../views/reviews/unitarios/ReviewRol'
import { ReviewsAldeas } from '../views/reviews/ReviewsAldeas'
import { ReviewAldea } from '../views/reviews/unitarios/ReviewAldea'
import { ReviewsCaserios } from '../views/reviews/ReviewsCaserios'
import { ReviewCaserio } from '../views/reviews/unitarios/ReviewCaserio'
import { ReviewsComponentes } from '../views/reviews/ReviewsComponentes'
import { ReviewsComponente } from '../views/reviews/unitarios/ReviewComponente'
import { ReviewsUsuarios } from '../views/reviews/ReviewsUsuarios'
import { ReviewUsuario } from '../views/reviews/unitarios/ReviewUsuario'
import { ReviewsSectores } from '../views/reviews/ReviewsSectores'
import { ReviewSector } from '../views/reviews/unitarios/ReviewSector'
import { ReviewsCargos } from '../views/reviews/ReviewsCargos'
import { ReviewCargo } from '../views/reviews/unitarios/ReviewCargo'
import { ReviewsOrgTypes } from '../views/reviews/ReviewsOrgTypes'
import { ReviewOrgType } from '../views/reviews/unitarios/ReviewOrgType'
import { ReviewsOrganizaciones } from '../views/reviews/ReviewsOrganizaciones'
import { ReviewOrganizacion } from '../views/reviews/unitarios/ReviewOrganizacion'
import { ReviewsBeneficiarios } from '../views/reviews/ReviewsBeneficiarios'
import { ReviewBeneficiario } from '../views/reviews/unitarios/ReviewBeneficiario'
import { ReviewsResultados } from '../views/reviews/ReviewsResultados'
import { ReviewResultado } from '../views/reviews/unitarios/ReviewResultado'
import { ReviewsIndicadores } from '../views/reviews/ReviewIndicadores'
import { ReviewIndicador } from '../views/reviews/unitarios/ReviewIndicador'
import { ReviewsAreasTematicas } from '../views/reviews/ReviewsAreasTematicas'
import { ReviewAreaTematica } from '../views/reviews/unitarios/ReviewAreaTematica'
import { ReviewsSubResultados } from '../views/reviews/ReviewsSubResultados'
import { ReviewSubResultado } from '../views/reviews/unitarios/ReviewSubResultado'
import { ReviewsActividades } from '../views/reviews/ReviewsActividades'
import { ReviewActividad } from '../views/reviews/unitarios/ReviewActividad'
import { ReviewsSubActividades } from '../views/reviews/ReviewsSubActividades'
import { ReviewSubActividad } from '../views/reviews/unitarios/ReviewSubActividad'
import { ReviewsYears } from '../views/reviews/ReviewsYears'
import { ReviewYear } from '../views/reviews/unitarios/ReviewYear'
import { ReviewsQuarters } from '../views/reviews/ReviewsQuarters'
import { ReviewQuarter } from '../views/reviews/unitarios/ReviewQuarter'
import { ReviewsTareas } from '../views/reviews/ReviewsTareas'
import { ReviewTarea } from '../views/reviews/unitarios/ReviewTarea'
import { ReviewEventoCrear } from '../views/reviews/unitarios/ReviewEventoCrear'
import { ReviewEventoFinalizar } from '../views/reviews/unitarios/ReviewEventoFinalizar'
import { ReviewEventoDigitalizar } from '../views/reviews/unitarios/ReviewEventoDigitalizar'
import { ReviewsTiposEventos } from '../views/reviews/ReviewsTiposEventos'
import { ReviewTipoEvento } from '../views/reviews/unitarios/ReviewTipoEvento'
import { ReviewEventoPresupuesto } from '../views/reviews/unitarios/ReviewEventoPresupuestar'

export const ReviewsRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.acciones['Departamentos']['Revisar']
        &&
        <Route path="/departamentos" element={<ReviewsDepartamentos />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Departamentos']
        &&
        <Route path="/departamentos/:idRevision" element={<ReviewDepartamento />}></Route>
      }

      {
        user.userPermisos?.acciones['Municipios']['Revisar']
        &&
        <Route path="/municipios" element={<ReviewsMunicipios />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Municipios']
        &&
        <Route path="/municipios/:idRevision" element={<ReviewMunicipio />}></Route>
      }

      {
        user.userPermisos?.acciones['Aldeas']['Revisar']
        &&
        <Route path="/aldeas" element={<ReviewsAldeas />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Aldeas']
        &&
        <Route path="/aldeas/:idRevision" element={<ReviewAldea />}></Route>
      }

      {
        user.userPermisos?.acciones['Caserios']['Revisar']
        &&
        <Route path="/caserios" element={<ReviewsCaserios />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Caserios']
        &&
        <Route path="/caserios/:idRevision" element={<ReviewCaserio />}></Route>
      }

      {
        user.userPermisos?.acciones['Componentes']['Revisar']
        &&
        <Route path="/componentes" element={<ReviewsComponentes />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Componentes']
        &&
        <Route path="/componentes/:idRevision" element={<ReviewsComponente />}></Route>
      }

      {
        user.userPermisos?.acciones['Roles']['Revisar']
        &&
        <Route path="/roles" element={<ReviewsRoles />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Roles']
        &&
        <Route path="/roles/:idRevision" element={<ReviewRol />}></Route>
      }

      {
        user.userPermisos?.acciones['Usuarios']['Revisar']
        &&
        <Route path="/usuarios" element={<ReviewsUsuarios />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Usuarios']
        &&
        <Route path="/usuarios/:idRevision" element={<ReviewUsuario />}></Route>
      }

      {
        user.userPermisos?.acciones['Tipos de Eventos']['Revisar']
        &&
        <Route path="/tiposEventos" element={<ReviewsTiposEventos />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Tipos de Eventos']
        &&
        <Route path="/tiposEventos/:idRevision" element={<ReviewTipoEvento />}></Route>
      } 

      {
        user.userPermisos?.acciones['Sectores']['Revisar']
        &&
        <Route path="/sectores" element={<ReviewsSectores />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Sectores']
        &&
        <Route path="/sectores/:idRevision" element={<ReviewSector />}></Route>
      }

      {
        user.userPermisos?.acciones['Cargos']['Revisar']
        &&
        <Route path="/cargos" element={<ReviewsCargos />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Cargos']
        &&
        <Route path="/cargos/:idRevision" element={<ReviewCargo />}></Route>
      }

      {
        user.userPermisos?.acciones['Tipos de Organizaciones']['Revisar']
        &&
        <Route path="/tipoOrganizaciones" element={<ReviewsOrgTypes />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Tipos de Organizaciones']
        &&
        <Route path="/tipoOrganizaciones/:idRevision" element={<ReviewOrgType />}></Route>
      }

      {
        user.userPermisos?.acciones['Organizaciones']['Revisar']
        &&
        <Route path="/organizaciones" element={<ReviewsOrganizaciones />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Organizaciones']
        &&
        <Route path="/organizaciones/:idRevision" element={<ReviewOrganizacion />}></Route>
      }

      {
        user.userPermisos?.acciones['Beneficiarios']['Revisar']
        &&
        <Route path="/beneficiarios" element={<ReviewsBeneficiarios />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Beneficiarios']
        &&
        <Route path="/beneficiarios/:idRevision" element={<ReviewBeneficiario />}></Route>
      }

      {
        user.userPermisos?.acciones['Indicadores']['Revisar']
        &&
        <Route path="/indicadores" element={<ReviewsIndicadores />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Indicadores']
        &&
        <Route path="/indicadores/:idRevision" element={<ReviewIndicador />}></Route>
      }

      {
        user.userPermisos?.acciones['Áreas Temáticas']['Revisar']
        &&
        <Route path="/areastematicas" element={<ReviewsAreasTematicas />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Áreas Temáticas']
        &&
        <Route path="/areastematicas/:idRevision" element={<ReviewAreaTematica />}></Route>
      }

      {
        user.userPermisos?.acciones['Años Fiscales']['Revisar']
        &&
        <Route path="/years" element={<ReviewsYears />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Áreas Temáticas']
        &&
        <Route path="/years/:idRevision" element={<ReviewYear />}></Route>
      }

      {
        user.userPermisos?.acciones['Trimestres']['Revisar']
        &&
        <Route path="/quarters" element={<ReviewsQuarters />}></Route>
      }
      {
        user.userPermisos?.vistas['Indicadores']['Trimestres']
        &&
        <Route path="/quarters/:idRevision" element={<ReviewQuarter />}></Route>
      }

      {
        user.userPermisos?.acciones['Resultados']['Revisar']
        &&
        <Route path="/resultados" element={<ReviewsResultados />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Resultados']
        &&
        <Route path="/resultados/:idRevision" element={<ReviewResultado />}></Route>
      }

      {
        user.userPermisos?.acciones['Sub Resultados']['Revisar']
        &&
        <Route path="/subresultados" element={<ReviewsSubResultados />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Sub Resultados']
        &&
        <Route path="/subresultados/:idRevision" element={<ReviewSubResultado />}></Route>
      }

      {
        user.userPermisos?.acciones['Actividades']['Revisar']
        &&
        <Route path="/actividades" element={<ReviewsActividades />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Actividades']
        &&
        <Route path="/actividades/:idRevision" element={<ReviewActividad />}></Route>
      }

      {
        user.userPermisos?.acciones['Sub Actividades']['Revisar']
        &&
        <Route path="/subactividades" element={<ReviewsSubActividades />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Sub Actividades']
        &&
        <Route path="/subactividades/:idRevision" element={<ReviewSubActividad />}></Route>
      }

      {
        user.userPermisos?.acciones['Tareas']['Revisar']
        &&
        <Route path="/tareas" element={<ReviewsTareas />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Tareas']
        &&
        <Route path="/tareas/:idRevision" element={<ReviewTarea />}></Route>
      }

      <Route path="/eventos/aprobacion/:idRevision" element={<ReviewEventoCrear />}></Route>
      <Route path="/eventos/finalizar/:idRevision" element={<ReviewEventoFinalizar />}></Route>
      <Route path="/eventos/digitalizar/:idRevision" element={<ReviewEventoDigitalizar />}></Route>
      <Route path="/eventos/presupuestar/:idRevision" element={<ReviewEventoPresupuesto />}></Route>
      
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
