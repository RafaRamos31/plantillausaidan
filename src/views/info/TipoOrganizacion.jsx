import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ClientesNavBar } from '../../components/navBars/ClientesNavBar'
import { useFetchGetBody, useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { OrganizacionPill } from '../../components/menuPills/OrganizacionPill'
import { Card } from 'react-bootstrap'

export const TipoOrganizacion = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idOrgtype } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('orgtype', idOrgtype);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])


  //Organizaciones
  const { data: organizacionesData } = useFetchGetBody('getorganizaciones', {
    tipoOrganizacion: idOrgtype,
    nivelOrganizacion: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: ''
  });

  if(code === 404){
    return(
    <Layout pagina={'Tipo de Organización - No Encontrado'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Tipo de Organización No Encontrada</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Tipo de Organización - Error'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Tipo de Organización</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Tipo de Organización - ' + values.nombre} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-bank"></i> Tipo de Organización: {values.nombre}</h2>
      
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
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Organizaciones para este Tipo de Organización.</p>
        </Card>
      }
    </Layout>
    </>
  )
}
