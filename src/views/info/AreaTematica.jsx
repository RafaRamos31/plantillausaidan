import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ConfigNavBar } from '../../components/navBars/ConfigNavBar'
import { useFetchGet, useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { EventoPill } from '../../components/menuPills/EventoPill'
import { SubareaPill } from '../../components/menuPills/SubareaPill'

export const AreaTematica = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idArea } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('area', idArea);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  //Subareas
  const { data: dataSubareas} = useFetchGet('subareas/'+idArea); 

  if(code === 404){
    return(
    <Layout pagina={'Área Temática - No Encontrado'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Área Temática No Encontrada</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Área Temática - Error'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Área Temática</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Área Temática - ' + values.nombre} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-collection-fill"></i> Área Temática: {values.nombre}</h2>
      
      <h3 className='mt-5'><i className="bi bi-collection"></i> Sub Áreas Temáticas</h3>
      {
        dataSubareas &&
        dataSubareas.length > 0 
        ?
        <div className='d-flex w-100 flex-wrap'>
          {
            dataSubareas.map(subarea => (
              <>
                <SubareaPill data={subarea}/>
                <SubareaPill data={subarea}/>
              </>
            ))
          }
        </div>
        :
        <Card className='mb-4 py-4 justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
          <i className="bi bi-x-circle" style={{fontSize: '4rem', fontWeight: 'bold'}}></i>
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Sub Áreas Temáticas.</p>
        </Card>
      }
      
      <h3 className='mt-5'><i className="bi bi-bell-fill"></i> Eventos</h3>
      <div className='d-flex w-100 flex-wrap'>
          <EventoPill />
          <EventoPill />
          <EventoPill />
          <EventoPill />
          <EventoPill />
          <EventoPill />
          <EventoPill />
          <EventoPill />
      </div>

    </Layout>
    </>
  )
}
