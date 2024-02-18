import { Navigate, Route, Routes } from 'react-router-dom'
import { ConfigDepartamentos } from '../views/ConfigDepartamentos'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { ConfigUsuarios } from '../views/ConfigUsuarios'
import { ConfigRoles } from '../views/ConfigRoles'
import { ConfigComponentes } from '../views/ConfigComponentes'
import { ConfigMunicipios } from '../views/ConfigMunicipios'
import { ConfigAldeas } from '../views/ConfigAldeas'
import { ConfigCaserios } from '../views/ConfigCaserios'

export const ConfiguracionRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Configuración']['Usuarios']
        &&
        <Route path="/usuarios" element={<ConfigUsuarios />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Roles']
        &&
        <Route path="/roles" element={<ConfigRoles />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Componentes']
        &&
        <Route path="/componentes" element={<ConfigComponentes />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Departamentos']
        &&
        <Route path="/departamentos" element={<ConfigDepartamentos />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Municipios']
        &&
        <Route path="/municipios" element={<ConfigMunicipios />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Aldeas']
        &&
        <Route path="/aldeas" element={<ConfigAldeas />}></Route>
      }
      {
        user.userPermisos?.vistas['Configuración']['Caserios']
        &&
        <Route path="/caserios" element={<ConfigCaserios />}></Route>
      }
      
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
