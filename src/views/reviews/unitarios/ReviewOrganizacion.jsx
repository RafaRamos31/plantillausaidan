import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Container, Modal } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';
import { Loading } from '../../Loading';
import { AvatarChip } from '../../../components/AvatarChip';
import { StatusBadge } from '../../../components/StatusBadge';
import { CompareValue } from '../../../components/CompareValue';
import { ReviewButton } from '../../../components/ReviewButton';
import { DeleteButton } from '../../../components/DeleteButton';
import { UserContext } from '../../../contexts/UserContext';
import { ClientesNavBar } from '../../../components/navBars/ClientesNavBar';
import { EditOrganizacion } from '../../modals/EditOrganizacion';

export const ReviewOrganizacion = () => {
  const { idRevision } = useParams();
  const endpoint = 'organizacion'

  const { user } = useContext(UserContext);

  //Peticio de datos a la API
  const { data: dataRevision, isLoading: isLoadingRevision, error: errorRevision, setRefetch } = useFetchGet(`${endpoint}es/id/${idRevision}`);

  //Original
  const [original, setOriginal] = useState(null)
  const [queryOriginal, setQueryOriginal] = useState('')
  const { data: originalData, isLoading: isLoadingOriginal, error: errorOriginal, setRefetch: setRefetchOriginal } = useFetchGet(queryOriginal);
  
  useEffect(() => {
    if(originalData && !isLoadingOriginal){
      setOriginal(originalData)
    } 
  }, [originalData, isLoadingOriginal, errorOriginal])

  //Obtener datos de Original
  useEffect(() => {
    if(dataRevision && dataRevision.originalId){
      setQueryOriginal(`${endpoint}es/id/${dataRevision.originalId}`)
      setRefetchOriginal(true)
    }
    else{
      setOriginal(null)
    }
    
  }, [ dataRevision, setQueryOriginal, setRefetchOriginal, setOriginal ])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    id: idRevision,
    aprobado: '',
    observaciones: ''
  });

  useEffect(() => {
    if(!isLoadingRevision && dataRevision && !errorRevision){
      setValues({...values, 
        observaciones: dataRevision.observaciones || '',
        aprobado: dataRevision.estado !== 'En revisión' ? dataRevision.estado === 'Validado' ? 'true' : 'false' : ''
      }) 
    }
    // eslint-disable-next-line
  }, [dataRevision, isLoadingRevision, errorRevision])
  

   //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('organizaciones/revisar', values) 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true)
    setCharging(true)
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  const handleRefetch = () => {
    setRefetch(true);
  }

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleRefetch()
    setCharging(false)
    setShowToast(true)
    actualizarTitulo(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Revisado`)
    setContent(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} revisado correctamente.`)
    setVariant('success')
  }

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(error){
      setErrorMessage(error)
      setCharging(false)
    }
    if(data){
      handleSuccess();
    }
  // eslint-disable-next-line
  }, [send, data, isLoading, error])

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Activar comparacion
  const [compare, setCompare] = useState(false)

  const handleCompare = () => {
    setCompare(!compare)
  }

  if(isLoadingRevision){
    return <Loading />
  }

  return (
    <>
    <Layout pagina={`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={ClientesNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/clientes', nombre: 'Configuración'},
        {link: '/clientes/organizaciones', nombre: 'Organizaciones'},
        {link: '/reviews/organizaciones', nombre: 'Revisiones'},
        {link: `/reviews/organizaciones/${idRevision}`, nombre: dataRevision?.nombre || 'Revisión'}
    ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
        <h2><i className="bi bi-bank2"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}</h2>
          <div className='d-flex align-items-end' style={{marginBottom: '1rem'}}>
            <h4 className='my-0' style={{fontStyle: 'italic', marginRight: '1rem'}}>{'Versión ' + dataRevision.version}</h4>
            <StatusBadge status={dataRevision.estado}/>
          </div>

          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
            <Row className='d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Edición:</p>
                  {
                    dataRevision.fechaEdicion ?
                    <p>{new Date(dataRevision.fechaEdicion).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Editado por:</p>
                  {
                    dataRevision.editor ?
                    <AvatarChip name={dataRevision.editor.nombre} id={dataRevision.editor.id}/>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
            </Row>

            <Row className='mt-3 d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Revisión:</p>
                  {
                    dataRevision.fechaRevision ?
                    <p>{new Date(dataRevision.fechaRevision).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                  {
                    dataRevision.revisor ?
                    <AvatarChip name={dataRevision.revisor.nombre} id={dataRevision.revisor.id}/>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
            </Row>

            {
              dataRevision.estado === 'Eliminado' &&
              <Row className='mt-3 d-flex align-items-center'>
                <Col>
                  <div className='d-flex align-items-center'>
                    <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Eliminación:</p>
                    {
                      dataRevision.fechaEliminacion ?
                      <p>{new Date(dataRevision.fechaEliminacion).toLocaleString()}</p>
                      :
                      <p>--</p>
                    }
                  </div>
                </Col>
                <Col>
                  <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Eliminado por:</p>
                    {
                      dataRevision.eliminador ?
                      <AvatarChip name={dataRevision.eliminador.nombre} id={dataRevision.eliminador.id}/>
                      :
                      <p>--</p>
                    }
                  </div>
                </Col>
              </Row>
            }
          </Container>
          <div className='mt-3 d-flex align-items-center'>
            <h4>Información del Registro</h4>
            {
              (original && original.id !== dataRevision.id) &&
              <Button className='my-2 mx-3' variant="light" onClick={handleCompare}>
                <i className="bi bi-arrow-left-right"></i>{' '}
                Comparar con Publicado
              </Button>
            }
          </div>
          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px', marginTop: '1rem'}}>
            <Row>
              <Col md={6}>
                {
                  compare &&
                  <div className="mb-3">
                    <h5 style={{fontWeight: 'bold'}}>{'Versión ' + dataRevision.version}</h5>
                  </div>
                }
                <CompareValue  title={'Nombre:'} value={dataRevision.nombre} original={original?.nombre} compare={compare}/>
                {
                  dataRevision.codigo &&
                  <CompareValue  title={'Código:'} value={dataRevision.codigo} original={original?.codigo} compare={compare}/>
                }
                {
                  dataRevision.telefono &&
                  <CompareValue  title={'Teléfono Organización:'} value={dataRevision.telefono} original={original?.telefono} compare={compare}/>
                }
                <hr />
                {
                  dataRevision.sector &&
                  <CompareValue  title={'Sector:'} value={dataRevision.sector?.nombre} original={original?.sector?.nombre} compare={compare}/>
                }
                {
                  dataRevision.tipoOrganizacion &&
                  <CompareValue  title={'Tipo de Organización:'} value={dataRevision.tipoOrganizacion?.nombre} original={original?.tipoOrganizacion?.nombre} compare={compare}/>
                }
                {
                  dataRevision.tipoSector &&
                  <CompareValue  title={'Tipo de Sector:'} value={dataRevision.tipoSector} original={original?.tipoSector} compare={compare}/>
                }
                <hr />
                {
                  dataRevision.departamento &&
                  <CompareValue  title={'Departamento:'} value={dataRevision.departamento?.nombre} original={original?.departamento?.nombre} compare={compare}/>
                }
                {
                  dataRevision.municipio &&
                  <CompareValue  title={'Municipio:'} value={dataRevision.municipio?.nombre} original={original?.municipio?.nombre} compare={compare}/>
                }
                {
                  dataRevision.aldea &&
                  <CompareValue  title={'Aldea:'} value={dataRevision.aldea?.nombre} original={original?.aldea?.nombre} compare={compare}/>
                }
                {
                  dataRevision.caserio &&
                  <CompareValue  title={'Caserio:'} value={dataRevision.caserio?.nombre} original={original?.caserio?.nombre} compare={compare}/>
                }
                <hr />
                {
                  dataRevision.nombreContacto &&
                  <CompareValue  title={'Nombre Contacto:'} value={dataRevision.nombreContacto} original={original?.nombreContacto} compare={compare}/>
                }
                {
                  dataRevision.telefonoContacto &&
                  <CompareValue  title={'Teléfono Contacto:'} value={dataRevision.telefonoContacto} original={original?.telefonoContacto} compare={compare}/>
                }
                {
                  dataRevision.correoContacto &&
                  <CompareValue  title={'Correo Contacto:'} value={dataRevision.correoContacto} original={original?.correoContacto} compare={compare}/>
                }
              </Col>
              {
                compare &&
                <Col md={6}>
                  <div className="mb-3">
                    <h5 style={{fontWeight: 'bold'}}>{'Versión ' + original.version}</h5>
                  </div>
                  <CompareValue  title={'Nombre:'} value={dataRevision.nombre} original={original?.nombre} compare={compare} hidden/>
                {
                  original?.codigo &&
                  <CompareValue  title={'Código:'} value={dataRevision.codigo} original={original?.codigo} compare={compare} hidden/>
                }
                {
                  original?.telefono &&
                  <CompareValue  title={'Teléfono Organización:'} value={dataRevision.telefono} original={original?.telefono} compare={compare} hidden/>
                }
                <hr />
                {
                  original?.sector &&
                  <CompareValue  title={'Sector:'} value={dataRevision.sector?.nombre} original={original?.sector?.nombre} compare={compare} hidden/>
                }
                {
                  original?.tipoOrganizacion &&
                  <CompareValue  title={'Tipo de Organización:'} value={dataRevision.tipoOrganizacion?.nombre} original={original?.tipoOrganizacion?.nombre} compare={compare} hidden/>
                }
                {
                  original?.tipoSector &&
                  <CompareValue  title={'Tipo de Sector:'} value={dataRevision.tipoSector} original={original?.tipoSector} compare={compare} hidden/>
                }
                <hr />
                {
                  original?.departamento &&
                  <CompareValue  title={'Departamento:'} value={dataRevision.departamento?.nombre} original={original?.departamento?.nombre} compare={compare} hidden/>
                }
                {
                  original?.municipio &&
                  <CompareValue  title={'Municipio:'} value={dataRevision.municipio?.nombre} original={original?.municipio?.nombre} compare={compare} hidden/>
                }
                {
                  original?.aldea &&
                  <CompareValue  title={'Aldea:'} value={dataRevision.aldea?.nombre} original={original?.aldea?.nombre} compare={compare} hidden/>
                }
                {
                  original?.caserio &&
                  <CompareValue  title={'Caserio:'} value={dataRevision.caserio?.nombre} original={original?.caserio?.nombre} compare={compare} hidden/>
                }
                <hr />
                {
                  original?.nombreContacto &&
                  <CompareValue  title={'Nombre Contacto:'} value={dataRevision.nombreContacto} original={original?.nombreContacto} compare={compare} hidden/>
                }
                {
                  original?.telefonoContacto &&
                  <CompareValue  title={'Teléfono Contacto:'} value={dataRevision.telefonoContacto} original={original?.telefonoContacto} compare={compare} hidden/>
                }
                {
                  original?.correoContacto &&
                  <CompareValue  title={'Correo Contacto:'} value={dataRevision.correoContacto} original={original?.correoContacto} compare={compare} hidden/>
                }
                </Col>
              }
            </Row>
            
          </Container>
        </Col>

        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            {
              (dataRevision && (dataRevision.estado !== 'Publicado' && dataRevision.estado !== 'Eliminado' )) &&
              <>
                <Form.Label>Dictámen</Form.Label>
                <Form.Select className="mb-3" id='aprobado' name='aprobado' value={values.aprobado} onChange={handleChange} disabled={dataRevision && dataRevision.estado !== 'En revisión'}>
                  <option>Seleccionar Dictámen</option>
                  <option value="true">Validado</option>
                  <option value="false">Rechazado</option>
                </Form.Select>
              </>
            }
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={5} id='observaciones' name='observaciones' value={values.observaciones} onChange={handleChange} disabled={dataRevision && dataRevision.estado !== 'En revisión'}/>
            </Form.Group>
            {
              (dataRevision && dataRevision.estado === 'Rechazado') ?
              <div className="d-grid w-100">
                <Button variant="primary" onClick={handleShowEdit}><i className="bi bi-tools"></i>{' '}Corregir</Button>
              </div>
              :
              <ReviewButton  charging={charging} dataRevision={dataRevision} handleSubmit={handleSubmit}/>
            }
            {
              user.userPermisos?.acciones['Organizaciones']['Eliminar'] 
              &&
              <DeleteButton  charging={charging} dataRevision={dataRevision} type={`${endpoint}es`} handleSubmit={handleSubmit}/>
            }
            <p style={{color: 'red'}}>{errorMessage}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditOrganizacion handleClose={handleCloseEdit} setRefetchData={()=>{}} organizacion={{...dataRevision, id: original?.id}} fixing/>
    </Modal>
    </>
  )
}
