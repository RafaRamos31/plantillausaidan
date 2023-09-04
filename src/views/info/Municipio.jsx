import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ConfigNavBar } from '../../components/navBars/ConfigNavBar'
import { useFetchGet, useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { OrganizacionPill } from '../../components/menuPills/OrganizacionPill'
import { AldeaPill } from '../../components/menuPills/AldeaPill'
import { InfoLink } from '../../components/InfoLink'
import { EventoPill } from '../../components/menuPills/EventoPill'

export const Municipio = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idMunicipio } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('municipio', idMunicipio);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  //Aldeas
  const { data: dataAldeas} = useFetchGet('aldeas/'+idMunicipio); 

  if(code === 404){
    return(
    <Layout pagina={'Municipio - No Encontrado'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Municipio No Encontrado</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Municipio - Error'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Municipio</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Municipio - ' + values.nombre} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Municipio: {values.nombre}</h2>
      <h3 className='mt-5'><i className="bi bi-book"></i> Resumen</h3>
      <Card className='px-4 py-2' style={{backgroundColor: 'var(--low-green)', fontSize: '1.3rem'}}>
        <ul className='mb-0'>
          <li>Nombre: {values.nombre}</li>
          <li>Geocode: {values.geocode}</li>
          <li>Departamento: {<InfoLink type={'departamento'} id={values.departamento?._id} nombre={values.departamento?.nombre}></InfoLink>}</li>
        </ul>
      </Card>
      
      <h3 className='mt-5'><i className="bi bi-geo-alt-fill"></i> Aldeas</h3>
      {
        dataAldeas &&
        dataAldeas.length > 0 
        ?
        <div className='d-flex w-100 flex-wrap'>
          {
            dataAldeas.map(aldea => (
              <>
                <AldeaPill data={aldea}/>
                <AldeaPill data={aldea}/>
              </>
            ))
          }
        </div>
        :
        <Card className='mb-4 py-4 justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
          <i className="bi bi-x-circle" style={{fontSize: '4rem', fontWeight: 'bold'}}></i>
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Aldeas para este Municipio.</p>
        </Card>
      }
      
      <h3 className='mt-5'><i className="bi bi-bank2"></i> Organizaciones</h3>
      <div className='d-flex w-100 flex-wrap'>
          <OrganizacionPill />
          <OrganizacionPill />
          <OrganizacionPill />
      </div>

      <h3 className='mt-5'><i className="bi bi-bell-fill"></i> Eventos</h3>
      <div className='d-flex w-100 flex-wrap'>
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
