import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ConfigNavBar } from '../../components/navBars/ConfigNavBar'
import { useFetchGet, useFetchGetById, useFetchGetBody } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { OrganizacionPill } from '../../components/menuPills/OrganizacionPill'
import { InfoLink } from '../../components/InfoLink'
import { EventoPill } from '../../components/menuPills/EventoPill'
import { CaserioPill } from '../../components/menuPills/CaserioPill'

export const Aldea = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idAldea } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('aldea', idAldea);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  //Caserios
  const { data: dataCaserios} = useFetchGet('caserios/'+idAldea); 

  //Organizaciones
  const { data: organizacionesData } = useFetchGetBody('getorganizaciones', {
    tipoOrganizacion: '',
    nivelOrganizacion: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea,
    idCaserio: ''
  });

  if(code === 404){
    return(
    <Layout pagina={'Aldea - No Encontrado'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Aldea No Encontrada</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Aldea - Error'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Aldea</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Aldea - ' + values.nombre} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Aldea: {values.nombre}</h2>
      <h3 className='mt-5'><i className="bi bi-book"></i> Resumen</h3>
      <Card className='px-4 py-2' style={{backgroundColor: 'var(--low-green)', fontSize: '1.3rem'}}>
        <ul className='mb-0'>
          <li>Nombre: {values.nombre}</li>
          <li>Geocode: {values.geocode}</li>
          <li>Departamento: {<InfoLink type={'departamento'} id={values.municipio?.departamento?._id} nombre={values.municipio?.departamento?.nombre}></InfoLink>}</li>
          <li>Municipio: {<InfoLink type={'municipio'} id={values.municipio?._id} nombre={values.municipio?.nombre}></InfoLink>}</li>
        </ul>
      </Card>
      
      <h3 className='mt-5'><i className="bi bi-geo-alt-fill"></i> Caserios</h3>
      {
        dataCaserios &&
        dataCaserios.length > 0 
        ?
        <div className='d-flex w-100 flex-wrap'>
          {
            dataCaserios.map(caserio => (
              <CaserioPill key={caserio._id} data={caserio}/>
            ))
          }
        </div>
        :
        <Card className='mb-4 py-4 justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
          <i className="bi bi-x-circle" style={{fontSize: '4rem', fontWeight: 'bold'}}></i>
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Caserios para esta Aldea.</p>
        </Card>
      }
      
      <h3 className='mt-5'><i className="bi bi-bank2"></i> Organizaciones</h3>
      {
        organizacionesData &&
        organizacionesData.length > 0 
        ?
        <div className='d-flex w-100 flex-wrap'>
          {
            organizacionesData.map(organizacion => (
              <OrganizacionPill key={organizacion._id} data={organizacion}/>
            ))
          }
        </div>
        :
        <Card className='mb-4 py-4 justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
          <i className="bi bi-x-circle" style={{fontSize: '4rem', fontWeight: 'bold'}}></i>
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Organizaciones para esta Aldea.</p>
        </Card>
      }

      <h3 className='mt-5'><i className="bi bi-bell-fill"></i> Eventos</h3>
      <div className='d-flex w-100 flex-wrap'>
          <EventoPill />
          <EventoPill />
          <EventoPill />
          <EventoPill />
      </div>

    </Layout>
    </>
  )
}
