import { useParams } from 'react-router-dom'
import { Layout } from '../Layout'
import { ClientesNavBar } from '../../components/navBars/ClientesNavBar'
import { useFetchGet, useFetchGetById } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { InfoLink } from '../../components/InfoLink'
import { EventoPill } from '../../components/menuPills/EventoPill'
import { getElementNivelesOrganizacion } from '../../services/staticCollections'
import { CargoPill } from '../../components/menuPills/CargoPill'

export const Organizacion = () => {

  //General Data
  const [values, setValues] = useState({})
  const { idOrganizacion } = useParams();
  const { data, isLoading, error, code } = useFetchGetById('organizacion', idOrganizacion);

  useEffect(() => {
    if(!isLoading){
      setValues(data)
    }

  }, [data, isLoading, error])

  //Cargos
  const { data: dataCargos} = useFetchGet('cargos/'+idOrganizacion); 

  if(code === 404){
    return(
    <Layout pagina={'Organización - No Encontrado'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-question-circle" style={{fontSize: '3rem'}}></i>
        <h2>Organización No Encontrada</h2>
      </div>
    </Layout>
    )
  }

  if(code === 500){
    return(
    <Layout pagina={'Organización - Error'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
        <i className="bi bi-x-circle" style={{fontSize: '3rem'}}></i>
        <h2>Error al Obtener Organización</h2>
        <p>{error}</p>
      </div>
    </Layout>
    )
  }
  
  return (
    <>
    <Layout pagina={'Organización - ' + values.nombre} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-bank2"></i> Organización: {values.nombre}</h2>
      <h3 className='mt-5'><i className="bi bi-book"></i> Resumen</h3>
      <Card className='px-4 py-2' style={{backgroundColor: 'var(--low-green)', fontSize: '1.3rem'}}>
        <ul className='mb-0'>
          <li>Nombre: {values.nombre}</li>
          <li>Código de la Organización: {values.codigoOrganizacion}</li>
          <li>Tipo de Organización: {<InfoLink type={'orgtype'} id={values.tipoOrganizacion?._id} nombre={values.tipoOrganizacion?.nombre}></InfoLink>}</li>
          <li>Nivel de la Organización: {getElementNivelesOrganizacion(values.nivelOrganizacion)}</li>
          <li>Teléfono Organización: {values.telefonoOrganizacion}</li>
          <hr />
          <li>Departamento: {<InfoLink type={'departamento'} id={values.departamento?._id} nombre={values.departamento?.nombre}></InfoLink>}</li>
          <li>Municipio: {<InfoLink type={'municipio'} id={values.municipio?._id} nombre={values.municipio?.nombre}></InfoLink>}</li>
          <li>Aldea: {<InfoLink type={'aldea'} id={values.aldea?._id} nombre={values.aldea?.nombre}></InfoLink>}</li>
          <li>Caserio: {<InfoLink type={'caserio'} id={values.caserio?._id} nombre={values.caserio?.nombre}></InfoLink>}</li>
          <hr />
          <li>Nombre de Contacto: {values.nombreContacto}</li>
          <li>Teléfono de Contacto: {values.telefonoContacto}</li>
          <li>Correo de Contacto: {values.correoContacto}</li>
        </ul>
      </Card>
            
      <h3 className='mt-5'><i className="bi bi-person-badge"></i> Cargos</h3>
      {
        dataCargos &&
        dataCargos.length > 0 
        ?
        <div className='d-flex w-100 flex-wrap'>
          {
            dataCargos.map(cargo => (
              <CargoPill key={cargo._id} data={cargo}/>
            ))
          }
        </div>
        :
        <Card className='mb-4 py-4 justify-content-center align-items-center' style={{backgroundColor: 'pink'}}>
          <i className="bi bi-x-circle" style={{fontSize: '4rem', fontWeight: 'bold'}}></i>
          <p className='mb-0' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No se han registrado Cargos para esta Organización.</p>
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
