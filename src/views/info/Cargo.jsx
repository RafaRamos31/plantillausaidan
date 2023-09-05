import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ClientesNavBar } from '../../components/navBars/ClientesNavBar'
import { useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { UsuarioPill } from '../../components/menuPills/UsuarioPill'

export const Cargo = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idCargo } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('cargo', idCargo);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  if(code === 404){
    return(
    <Layout pagina={'Cargo - No Encontrado'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Cargo No Encontrado</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Cargo - Error'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Cargo</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Cargo - ' + values.nombre} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-person-badge"></i> Cargo: {values.nombre}</h2>
      <h2><i className="bi bi-bank2"></i> {values.organizacion?.nombre || ''}</h2>
      
      <h3 className='mt-5'><i className="bi bi-person-fill"></i> Miembros</h3>
      <div className='d-flex w-100 flex-wrap'>
          <UsuarioPill />
          <UsuarioPill />
          <UsuarioPill />
          <UsuarioPill />
          <UsuarioPill />
      </div>
    </Layout>
    </>
  )
}
