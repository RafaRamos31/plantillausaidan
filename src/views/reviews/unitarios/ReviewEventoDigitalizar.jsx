import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Container, Spinner, Card, InputGroup } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';
import { Loading } from '../../Loading';
import { AvatarChip } from '../../../components/AvatarChip';
import { UserContext } from '../../../contexts/UserContext';
import { EventosNavBar } from '../../../components/navBars/EventosNavBar';
import { ParticipantesGridReview } from '../../../components/ParticipantesGridReview';

export const ReviewEventoDigitalizar = () => {

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: 'none',
    borderRadius: '3px'
  };

  const { idRevision } = useParams();
  const endpoint = 'evento'
  const { user } = useContext(UserContext);
  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)


  //Peticio de datos a la API
  const { data: dataRevision, isLoading: isLoadingRevision, error: errorRevision, setRefetch } = useFetchGet(`${endpoint}s/participantes/${idRevision}`);


  //Formulario Componente
  const { values, handleChange, setValues } = useForm({
    id: idRevision,
    aprobado: '',
    observaciones: ''
  });
  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('eventos/digitalizar', values) 

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
        observaciones: dataRevision.observacionesDigitacion || '',
        aprobado: dataRevision.estadoRevisionDigitacion
      }) 
    }
    // eslint-disable-next-line
  }, [dataRevision, isLoadingRevision, errorRevision])

  const boolReview = (dataRevision && dataRevision.estadoRevisionDigitacion === 'Pendiente' && user?.userPermisos.acciones['Eventos']['Aprobar Digitalizar'])

  if(isLoadingRevision){
    return <Loading />
  }

  return (
    <>
    <Layout pagina={`Digitación ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/digitar', nombre: 'Digitación'},
        {link: `/reviews/eventos/digitalizar/${idRevision}`, nombre: dataRevision?.numeroFormulario || 'Revisión'}
    ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
        <h2><i className="bi bi-pencil-square"></i>{` Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}</h2>
          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
            <Row className='d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Digitación:</p>
                  {
                    dataRevision.fechaDigitacion ?
                    <p>{new Date(dataRevision.fechaDigitacion).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Digitalizador:</p>
                  {
                    dataRevision.responsableDigitacion ?
                    <AvatarChip name={dataRevision.responsableDigitacion.nombre} id={dataRevision.responsableDigitacion.id}/>
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
                    dataRevision.fechaRevisionDigitacion ?
                    <p>{new Date(dataRevision.fechaRevisionDigitacion).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                  {
                    dataRevision.revisorDigitacion ?
                    <AvatarChip name={dataRevision.revisorDigitacion.nombre} id={dataRevision.revisorDigitacion.id}/>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
            </Row>
          </Container>

          <Row>
          <Col md={12} className='mt-3'>
            <Form.Group className="mb-3">
            <h5>Nombre del Evento</h5>
            <Col sm="12">
              <Form.Control
                id="nombre"
                name="nombre"
                as="textarea"
                rows={2}
                maxLength={200}
                value={dataRevision.nombre}
                autoComplete="off"
                readOnly
                disabled
              />
            </Col>
            </Form.Group>
          </Col>
          <Col md={12} className='mb-3'>
            <h5>Número de Formulario</h5>
            <Form.Control
              id="numeroFormulario"
              name="numeroFormulario"
              value={dataRevision.numeroFormulario}
              readOnly
              disabled
            />
          </Col>
          <Col md={6}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Participantes Formulario</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Por Género</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Masculinos'}</InputGroup.Text>
                    <Form.Control id='participantesHombres' name='participantesHombres' disabled type={"number"} min={0} value={dataRevision.participantesHombres} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Femeninos'}</InputGroup.Text>
                    <Form.Control id='participantesMujeres' name='participantesMujeres' disabled type="number" min={0} value={dataRevision.participantesMujeres} />
                  </InputGroup>
                </Col>
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Género'}</InputGroup.Text>
                  <Form.Control id='totalGenero' name='totalGenero' type="number" value={Number(dataRevision.participantesHombres) + Number(dataRevision.participantesMujeres)} readOnly/>
                </InputGroup>
              </Form.Group>

              <h6>Por Tipo de Beneficiario</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Comunitarios'}</InputGroup.Text>
                    <Form.Control id='participantesComunitarios' name='participantesComunitarios' disabled type={"number"} min={0} value={dataRevision.participantesComunitarios} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Institucionales'}</InputGroup.Text>
                    <Form.Control id='participantesInstitucionales' name='participantesInstitucionales' disabled type="number" min={0} value={dataRevision.participantesInstitucionales} />
                  </InputGroup>
                </Col>
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Tipo'}</InputGroup.Text>
                  <Form.Control id='totalTipo' name='totalTipo' type="number" value={Number(dataRevision.participantesComunitarios) + Number(dataRevision.participantesInstitucionales)} readOnly/>
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Participantes Registrados</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Por Género</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Masculinos'}</InputGroup.Text>
                    <Form.Control id='participantesHombres' name='participantesHombres' disabled type={"number"} min={0} value={dataRevision.registradosHombres} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Femeninos'}</InputGroup.Text>
                    <Form.Control id='participantesMujeres' name='participantesMujeres' disabled type="number" min={0} value={dataRevision.registradosMujeres} />
                  </InputGroup>
                </Col>
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Género'}</InputGroup.Text>
                  <Form.Control id='totalGenero' name='totalGenero' type="number" value={Number(dataRevision.registradosHombres) + Number(dataRevision.registradosMujeres)} readOnly/>
                </InputGroup>
              </Form.Group>

              <h6>Por Tipo de Beneficiario</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Comunitarios'}</InputGroup.Text>
                    <Form.Control id='participantesComunitarios' name='participantesComunitarios' disabled type={"number"} min={0} value={dataRevision.registradosComunitarios} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Institucionales'}</InputGroup.Text>
                    <Form.Control id='participantesInstitucionales' name='participantesInstitucionales' disabled type="number" min={0} value={dataRevision.registradosInstitucionales} />
                  </InputGroup>
                </Col>
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Tipo'}</InputGroup.Text>
                  <Form.Control id='totalTipo' name='totalTipo' type="number" value={Number(dataRevision.registradosComunitarios) + Number(dataRevision.registradosInstitucionales)} readOnly/>
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>
          </Col>
        </Row>

          <div className='d-flex align-items-center justify-content-between'>
            <h4>Participantes del Evento</h4>
            <Button variant='info' className="px-3" href={dataRevision.enlaceFormulario} target="_blank" style={{fontWeight: 'bold'}}>Formulario de Participantes <i className="bi bi-box-arrow-up-right"></i></Button>
          </div>
          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px', marginTop: '1rem'}}>
            <ParticipantesGridReview participantes={dataRevision?.participantes}/>
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
              (dataRevision && dataRevision.estadoRevisionDigitacion === 'Rechazado'  && user?.userPermisos.acciones['Eventos']['Digitalizar']) &&
              <div className="d-grid w-100">
                <a href={`/eventos/digitar/${dataRevision.id}`} className="d-grid w-100">
                  <Button variant="primary"><i className="bi bi-tools"></i>{' '}Corregir</Button>
                </a>
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
    </>
  )
}
