import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ClientesNavBar } from '../../components/navBars/ClientesNavBar'
import { useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { InfoLink } from '../../components/InfoLink'
import { EventoPill } from '../../components/menuPills/EventoPill'
import { MapDisplay } from '../../components/MapDisplay'

export const Beneficiario = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idBeneficiario } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('beneficiario', idBeneficiario);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  if(code === 404){
    return(
    <Layout pagina={'Beneficiario - No Encontrado'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Beneficiario No Encontrado</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Beneficiario - Error'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Beneficiario</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Beneficiario - ' + values.nombre} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-people-fill"></i> Beneficiario: {values.nombre}</h2>
      <h3 className='mt-5'><i className="bi bi-book"></i> Resumen</h3>
      <Card className='px-4 py-2' style={{backgroundColor: 'var(--low-green)', fontSize: '1.3rem'}}>
        <ul className='mb-0'>
          <li>Nombre: {values.nombre}</li>
          <li>DNI: {values.dni}</li>
          <li>Sexo: {values.sexo === 1 ? 'Masculino' : 'Femenino'}</li>
          <li>Fecha de Nacimiento: {values.fechaNacimiento}</li>
          <li>Teléfono: {values.telefono}</li>
          <hr />
          <li>Departamento: {<InfoLink type={'departamento'} id={values.departamento?._id} nombre={values.departamento?.nombre}></InfoLink>}</li>
          <li>Municipio: {<InfoLink type={'municipio'} id={values.municipio?._id} nombre={values.municipio?.nombre}></InfoLink>}</li>
          <li>Aldea: {<InfoLink type={'aldea'} id={values.aldea?._id} nombre={values.aldea?.nombre}></InfoLink>}</li>
          <li>Caserio: {<InfoLink type={'caserio'} id={values.caserio?._id} nombre={values.caserio?.nombre}></InfoLink>}</li>
          <hr />
          <li>Organización: {<InfoLink type={'organizacion'} id={values.organizacion?._id} nombre={values.organizacion?.nombre}></InfoLink>}</li>
          <li>Cargo: {<InfoLink type={'cargo'} id={values.cargo?._id} nombre={values.cargo?.nombre}></InfoLink>}</li>
        </ul>
      </Card>
      <MapDisplay initialLocation={values.geolocacion} />
            
      <h3 className='mt-5'><i className="bi bi-bell-fill"></i> Eventos</h3>
      <div className='d-flex w-100 flex-wrap'>
          <EventoPill />
      </div>
    </Layout>
    </>
  )
}
