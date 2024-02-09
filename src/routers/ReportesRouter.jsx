import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Reportes } from '../views/Reportes';

export const ReportesRouter = () => {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {
        user.userPermisos?.vistas['Reportes']['Reportes']
        &&
        <Route path="/reportes" element={<Reportes />}></Route>
      }

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
