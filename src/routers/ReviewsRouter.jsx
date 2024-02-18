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
        user.userPermisos?.acciones['Resultados']['Revisar']
        &&
        <Route path="/resultados" element={<ReviewsResultados />}></Route>
      }
      {
        user.userPermisos?.vistas['Planificación']['Resultados']
        &&
        <Route path="/resultados/:idRevision" element={<ReviewResultado />}></Route>
      }
      
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
