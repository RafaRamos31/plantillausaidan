import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { ClientBeneficiarios } from '../views/ClientBeneficiarios'
import { ClientOrganizaciones } from '../views/ClientOrganizaciones'
import { ClientOrgtypes } from '../views/ClientOrgtypes'
import { ClientCargos } from '../views/ClientCargos'
import { ClientSectores } from '../views/ClientSectores'
import { ClientesMonitoreo } from '../views/ClientesMonitoreo'

export const ClientesRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Clientes']['Beneficiarios']
        &&
        <Route path="/beneficiarios" element={<ClientBeneficiarios />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Organizaciones']
        &&
        <Route path="/organizaciones" element={<ClientOrganizaciones />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Tipos de Organizaciones']
        &&
        <Route path="/tipoOrganizaciones" element={<ClientOrgtypes />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Cargos']
        &&
        <Route path="/cargos" element={<ClientCargos />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Sectores']
        &&
        <Route path="/sectores" element={<ClientSectores />}></Route>
      }
      {
        user.userPermisos?.vistas['Clientes']['Monitoreo']
        &&
        <Route path="/monitoreo" element={<ClientesMonitoreo />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
