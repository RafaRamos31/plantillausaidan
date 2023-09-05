import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ConfigNavBar } from '../../components/navBars/ConfigNavBar'
import { useFetchGetById, useFetchGetBody } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { OrganizacionPill } from '../../components/menuPills/OrganizacionPill'
import { InfoLink } from '../../components/InfoLink'
import { EventoPill } from '../../components/menuPills/EventoPill'

export const Caserio = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idCaserio } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('caserio', idCaserio);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  //Organizaciones
  const { data: organizacionesData } = useFetchGetBody('getorganizaciones', {
    tipoOrganizacion: '',
    nivelOrganizacion: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio
  });


  if(code === 404){
    return(
    <Layout pagina={'Caserio - No Encontrado'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Caserio No Encontrado</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Caserio - Error'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Caserio</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Caserio - ' + values.nombre} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Caserio: {values.nombre}</h2>
      <h3 className='mt-5'><i className="bi bi-book"></i> Resumen</h3>
      <Card className='px-4 py-2' style={{backgroundColor: 'var(--low-green)', fontSize: '1.3rem'}}>
        <ul className='mb-0'>
          <li>Nombre: {values.nombre}</li>
          <li>Geocode: {values.geocode}</li>
          <li>Departamento: {<InfoLink type={'departamento'} id={values.aldea?.municipio?.departamento?._id} nombre={values.aldea?.municipio?.departamento?.nombre}></InfoLink>}</li>
          <li>Municipio: {<InfoLink type={'municipio'} id={values.aldea?.municipio?._id} nombre={values.aldea?.municipio?.nombre}></InfoLink>}</li>
          <li>Aldea: {<InfoLink type={'aldea'} id={values.aldea?._id} nombre={values.aldea?.nombre}></InfoLink>}</li>
        </ul>
      </Card>
            
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
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Organizaciones para este Caserio.</p>
        </Card>
      }

      <h3 className='mt-5'><i className="bi bi-bell-fill"></i> Eventos</h3>
      <div className='d-flex w-100 flex-wrap'>
          <EventoPill />
      </div>

    </Layout>
    </>
  )
}
