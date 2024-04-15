import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Container, Modal, Spinner, InputGroup } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';
import { Loading } from '../../Loading';
import { AvatarChip } from '../../../components/AvatarChip';
import { CompareValue } from '../../../components/CompareValue';
import { UserContext } from '../../../contexts/UserContext';
import { EventosNavBar } from '../../../components/navBars/EventosNavBar';
import { Box, Chip, } from '@mui/material';
import { CrearEventoTerminar } from '../../modals/CrearEventoTerminar';

export const ReviewEventoFinalizar = () => {

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: 'none',
    borderRadius: '3px'
  };

  const { idRevision } = useParams();
  const endpoint = 'evento';
  const { user } = useContext(UserContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)


  //Peticio de datos a la API
  const { data: dataRevision, isLoading: isLoadingRevision, error: errorRevision, setRefetch } = useFetchGet(`${endpoint}/finalizar/${idRevision}`);


  //Formulario Componente
  const { values, handleChange, setValues } = useForm({
    id: idRevision,
    aprobado: '',
    observaciones: ''
  });
  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('revisiones/eventos/finalizar', values) 

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


  //Carga de datos del evento
  useEffect(() => {
    if(!isLoadingRevision && dataRevision && !errorRevision){
      setValues({...values, 
        observaciones: dataRevision.observacionesFinalizacion || '',
        aprobado: dataRevision.estadoRevisionFinalizacion
      }) 
    }
    // eslint-disable-next-line
  }, [dataRevision, isLoadingRevision, errorRevision])

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Activar comparacion
  const [compare] = useState(false)

  const boolReview = (dataRevision && dataRevision.estadoRevisionFinalizacion === 'Pendiente' && user?.userPermisos.acciones['Eventos']['Aprobar Finalizar'])

  if(isLoadingRevision){
    return <Loading />
  }

  return (
    <>
    <Layout pagina={`Finalización ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/terminar', nombre: 'Finalizacion'},
        {link: `/reviews/eventos/finalizar/${idRevision}`, nombre: dataRevision?.nombre || 'Revisión'}
    ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
        <h2><i className="bi bi-flag-fill"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} (Finalización)`}</h2>
          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
            <Row className='d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Creación:</p>
                  <p>{new Date(dataRevision?.fechaCreacion).toLocaleString()}</p>
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Creado por:</p>
                  <AvatarChip name={dataRevision.responsableCreacion?.nombre} id={dataRevision.responsableCreacion?._id}/>
                </div>
              </Col>
            </Row>

            <Row className='mt-3 d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Finalización:</p>
                  {
                    dataRevision.fechaFinalizacionEvento ?
                    <p>{new Date(dataRevision.fechaFinalizacionEvento).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Finalizado por:</p>
                  {
                    dataRevision.responsableFinalizacion ?
                    <AvatarChip name={dataRevision.responsableFinalizacion.nombre} id={dataRevision.responsableFinalizacion._id}/>
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
                    dataRevision.fechaRevisionFinalizacion ?
                    <p>{new Date(dataRevision.fechaRevisionFinalizacion).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                  {
                    dataRevision.revisorFinalizacion ?
                    <AvatarChip name={dataRevision.revisorFinalizacion.nombre} id={dataRevision.revisorFinalizacion._id}/>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
            </Row>
          </Container>

          <div className='mt-3 d-flex align-items-center'>
            <h4>Información del Evento</h4>
          </div>
          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px', marginTop: '1rem'}}>
            <Row>
                <h5>Resumen</h5>
                <hr />
                <CompareValue  title={'N° de Formulario:'} value={dataRevision.numeroFormulario} original={dataRevision?.numeroFormulario} compare={compare}/>
                <h6>Duración</h6>
                <Form.Group as={Row} >
                  <Col sm={6} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Días'}</InputGroup.Text>
                      <Form.Control id='totalDias' name='totalDias' type={"number"} value={dataRevision.totalDias} readOnly />
                    </InputGroup>
                  </Col>
                  <Col sm={6} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Horas'}</InputGroup.Text>
                      <Form.Control id='totalHoras' name='totalHoras' type="number" value={dataRevision.totalHoras} readOnly />
                    </InputGroup>
                  </Col>
                </Form.Group>
                <CompareValue  title={'Tipo de Evento:'} value={dataRevision.tipoEvento[0]?.nombre} original={dataRevision.tipoEvento[0]?.nombre} compare={compare}/>
                <h6 className='mt-2'>Sectores:</h6>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} className='mb-3'>
                  {dataRevision.sectores.map((sector, index) => (
                    <Chip key={index} label={sector.nombre}/>
                  ))}
                </Box>
                <h6 className='mt-2'>Niveles:</h6>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} className='mb-3'>
                  {dataRevision.niveles.map((nivel, index) => (
                    <Chip key={index} label={nivel}/>
                  ))}
                </Box>
                <CompareValue  title={'Logros:'} value={dataRevision.logros} original={dataRevision?.logros} compare={compare}/>
                <CompareValue  title={'Compromisos:'} value={dataRevision.compromisos} original={dataRevision?.compromisos} compare={compare}/>
                <h5 className='mt-3'>Participantes</h5>
                <hr />
                <h6>Por Género</h6>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={4} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'M'}</InputGroup.Text>
                      <Form.Control id='participantesHombres' name='participantesHombres' type={"number"} value={dataRevision.participantesHombres} readOnly />
                    </InputGroup>
                  </Col>
                  <Col sm={4} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'F'}</InputGroup.Text>
                      <Form.Control id='participantesMujeres' name='participantesMujeres' type="number"  value={dataRevision.participantesMujeres} readOnly/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="my-2">
                      <InputGroup.Text>{'Total'}</InputGroup.Text>
                      <Form.Control id='totalGenero' name='totalGenero' type="number" value={Number(dataRevision.participantesMujeres) + Number(dataRevision.participantesHombres)} readOnly/>
                    </InputGroup>
                  </Col>
                </Form.Group>

                <h6>Por Sector</h6>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={4} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Com'}</InputGroup.Text>
                      <Form.Control id='participantesComunitarios' name='participantesComunitarios' type={"number"} min={0} value={dataRevision.participantesComunitarios} readOnly />
                    </InputGroup>
                  </Col>
                  <Col sm={4} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Inst.'}</InputGroup.Text>
                      <Form.Control id='participantesInstitucionales' name='participantesInstitucionales' type={"number"} min={0} value={dataRevision.participantesInstitucionales} readOnly  />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="my-2">
                      <InputGroup.Text>{'Total'}</InputGroup.Text>
                      <Form.Control id='totalSector' name='totalSector' type="number" value={Number(dataRevision.participantesComunitarios) + Number(dataRevision.participantesInstitucionales)} readOnly/>
                    </InputGroup>
                  </Col>
                  </Form.Group>

                <h5 className='mt-3'>Medios de Verificación</h5>
                <hr />
                <Button className="mt-2 p-2" href={dataRevision.enlaceFormulario} target="_blank" style={{fontWeight: 'bold'}}>Formulario de Participantes <i className="bi bi-box-arrow-up-right"></i></Button>
                <Button className="mt-2 p-2" href={dataRevision.enlaceFotografias} target="_blank" style={{fontWeight: 'bold'}}>Evidencias Fotográficas <i className="bi bi-box-arrow-up-right"></i></Button>
            </Row>
            
          </Container>
        </Col>

        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Dictámen</Form.Label>
            <Form.Select className="mb-3" id='aprobado' name='aprobado' value={values.aprobado} onChange={handleChange} disabled={!boolReview}>
              <option>Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={5} id='observaciones' name='observaciones' value={values.observaciones} onChange={handleChange} disabled={!boolReview}/>
            </Form.Group>
            {
              (dataRevision && dataRevision.estadoRevisionFinalizacion === 'Rechazado' && user?.userPermisos.acciones['Eventos']['Finalizar']) &&
              <div className="d-grid w-100">
                <Button variant="primary" onClick={handleShowEdit}><i className="bi bi-tools"></i>{' '}Corregir</Button>
              </div>
            }
            {
              (boolReview) &&
              <div className="d-grid w-100">
                {/**Boton para guardar revision */}
                {
                  !charging ?
                  <Button style={buttonStyle} onClick={handleSubmit}><i className="bi bi-check2-square"></i>{' '}Guardar revisión</Button>
                  :
                  <Button style={buttonStyle}>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Cargando...</span>
                  </Button>
                }
              </div>
            }
            <p style={{color: 'red'}}>{errorMessage}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <CrearEventoTerminar handleClose={handleCloseEdit} setRefetch={setRefetch} eventValues={{id: dataRevision?._id, nombre: dataRevision?.nombre}} initialValues={dataRevision}/>
    </Modal>
    </>
  )
}
