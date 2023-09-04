import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ConfigNavBar } from '../../components/navBars/ConfigNavBar'
import { useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { EventoPill } from '../../components/menuPills/EventoPill'

export const SubAreaTematica = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idSubarea } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('subarea', idSubarea);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  if(code === 404){
    return(
    <Layout pagina={'Sub Área Temática - No Encontrado'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Sub Área Temática No Encontrada</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Sub Área Temática - Error'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Sub Área Temática</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Sub Área Temática - ' + values.nombre} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-collection-fill"></i> Sub Área Temática: {values.nombre}</h2>
            
      <h3 className='mt-5'><i className="bi bi-bell-fill"></i> Eventos</h3>
      <div className='d-flex w-100 flex-wrap'>
          <EventoPill />
          <EventoPill />
          <EventoPill />
      </div>

    </Layout>
    </>
  )
}
