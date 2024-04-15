import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Container, Modal, Spinner } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';
import { Loading } from '../../Loading';
import { AvatarChip } from '../../../components/AvatarChip';
import { CompareValue } from '../../../components/CompareValue';
import { UserContext } from '../../../contexts/UserContext';
import { CompareTooltip } from '../../../components/CompareTooltip';
import { EventosNavBar } from '../../../components/navBars/EventosNavBar';
import { Box, Chip, Tooltip } from '@mui/material';
import moment from 'moment';
import { EditEvento } from '../../modals/EditEvento';

export const ReviewEventoCrear = () => {

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
  const { data: dataRevision, isLoading: isLoadingRevision, error: errorRevision, setRefetch } = useFetchGet(`${endpoint}/crear/${idRevision}`);


  //Formulario Componente
  const { values, handleChange, setValues } = useForm({
    id: idRevision,
    aprobado: '',
    observaciones: ''
  });
  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('revisiones/eventos/crear/componente', values) 

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


  //Formulario MEL
  const { values: valuesMEL, handleChange: handleChangeMEL, setValues: setValuesMEL } = useForm({
    id: idRevision,
    aprobado: '',
    observaciones: ''
  });

  //Envio asincrono de formulario
  const { setSend: setSendMEL, send: sendMEL, data: dataMEL, isLoading: isLoadingMEL, error: errorMEL } = useFetchPutBody('revisiones/eventos/crear/mel', valuesMEL) 

  const handleSubmitMEL = (e) => {
    e.preventDefault();
    setSendMEL(true)
    setChargingMEL(true)
  }

  //Boton de carga
  const [chargingMEL, setChargingMEL] = useState(false);

  //Accion al completar correctamente
  const handleSuccessMEL = () => {
    handleRefetch()
    setChargingMEL(false)
    setShowToast(true)
    actualizarTitulo(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Revisado`)
    setContent(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} revisado correctamente.`)
    setVariant('success')
  }

  //Efecto al enviar el formulario
  const [errorMessageMEL, setErrorMessageMEL] = useState('');

  useEffect(() => {
    if(error){
      setErrorMessageMEL(error)
      setChargingMEL(false)
    }
    if(dataMEL){
      handleSuccessMEL();
    }
  // eslint-disable-next-line
  }, [sendMEL, dataMEL, isLoadingMEL, errorMEL])


  //Carga de datos del evento
  useEffect(() => {
    if(!isLoadingRevision && dataRevision && !errorRevision){
      setValues({...values, 
        observaciones: dataRevision.observacionesPlanificacionComponente || '',
        aprobado: dataRevision.estadoPlanificacionComponente
      }) 

      setValuesMEL({...valuesMEL, 
        observaciones: dataRevision.observacionesPlanificacionMEL || '',
        aprobado: dataRevision.estadoPlanificacionMEL
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

  const boolReview = (dataRevision && dataRevision.estadoPlanificacionComponente === 'Pendiente' && user?.userPermisos.acciones['Eventos']['Aprobar Crear'] && user.userComponente === dataRevision.componenteEncargado?._id)
  const boolReviewMEL = (dataRevision && dataRevision.estadoPlanificacionMEL === 'Pendiente' && user?.userPermisos.acciones['Eventos']['Aprobar Crear MEL'])

  if(isLoadingRevision){
    return <Loading />
  }

  return (
    <>
    <Layout pagina={`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/aprobacion', nombre: 'Aprobación'},
        {link: `/reviews/eventos/aprobacion/${idRevision}`, nombre: dataRevision?.nombre || 'Revisión'}
    ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
        <h2><i className="bi bi-list-check"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}</h2>
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
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Revisión (Componente):</p>
                  {
                    dataRevision.fechaRevisionComponente ?
                    <p>{new Date(dataRevision.fechaRevisionComponente).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                  {
                    dataRevision.revisorPlanificacionComponente ?
                    <AvatarChip name={dataRevision.revisorPlanificacionComponente.nombre} id={dataRevision.revisorPlanificacionComponente._id}/>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
            </Row>

            <Row className='mt-3 d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Revisión (MEL):</p>
                  {
                    dataRevision.fechaRevisionMEL ?
                    <p>{new Date(dataRevision.fechaRevisionMEL).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                  {
                    dataRevision.revisorPlanificacionMEL ?
                    <AvatarChip name={dataRevision.revisorPlanificacionMEL.nombre} id={dataRevision.revisorPlanificacionMEL._id}/>
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
                <h5>Información General</h5>
                <hr />
                <CompareValue  title={'Nombre del Evento:'} value={dataRevision.nombre} original={dataRevision?.nombre} compare={compare}/>
                <CompareTooltip title={'Tarea:'} 
                  value={dataRevision.tarea?.nombre} valueTooltip={dataRevision.tarea?.descripcion}
                  original={dataRevision?.tarea.nombre} originalTooltip={dataRevision?.tarea.descripcion}
                  compare={compare}/>
                <CompareTooltip title={'Componente:'} 
                  value={dataRevision.componenteEncargado?.nombre} valueTooltip={dataRevision.componenteEncargado?.descripcion}
                  original={dataRevision?.componenteEncargado.nombre} originalTooltip={dataRevision?.componenteEncargado.descripcion}
                  compare={compare}/>
                <CompareTooltip title={'Área Temática:'} 
                  value={dataRevision.areaTematica?.nombre} valueTooltip={dataRevision.areaTematica?.descripcion}
                  original={dataRevision.areaTematica?.nombre} originalTooltip={dataRevision.areaTematica?.nombre}
                  compare={compare}/>
                <CompareValue  title={'Fecha/Hora de Inicio:'} value={moment(dataRevision.fechaInicio).format('DD/MM/YYYY hh:mm a')} original={dataRevision.fechaInicio} compare={compare}/>
                <CompareValue  title={'Fecha/Hora de Finalización:'} value={moment(dataRevision.fechaFinal).format('DD/MM/YYYY hh:mm a')} original={dataRevision.fechaInicio} compare={compare}/>
                <h5 className='mt-3'>Ubicación</h5>
                <hr />
                <CompareValue  title={'Departamento:'} value={dataRevision.departamento?.nombre} original={dataRevision?.nombre} compare={compare}/>
                <CompareValue  title={'Municipio:'} value={dataRevision.municipio?.nombre} original={dataRevision?.nombre} compare={compare}/>
                <CompareValue  title={'Aldea:'} value={dataRevision.aldea?.nombre} original={dataRevision?.nombre} compare={compare}/>
                <CompareValue  title={'Caserio:'} value={dataRevision.caserio?.nombre} original={dataRevision?.nombre} compare={compare}/>
                <h5 className='mt-3'>Coordinación</h5>
                <hr />
                <h6>Organizador:</h6>
                <AvatarChip name={dataRevision.organizador?.nombre} id={dataRevision.organizador?._id}/>
                <h6 className='mt-2'>Componentes:</h6>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {dataRevision.componentes.map((componente) => (
                    <Tooltip key={componente._id} title={componente.descripcion} placement="top" arrow followCursor>
                      <Chip label={componente.nombre} style={{cursor: 'help'}}/>
                    </Tooltip>
                  ))}
                </Box>
                <h6 className='mt-2'>Colaboradores:</h6>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {dataRevision.colaboradores.map((colaborador) => (
                    <AvatarChip name={colaborador.nombre} id={colaborador._id}/>
                  ))}
                </Box>
            </Row>
            
          </Container>
        </Col>

        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Dictámen (Componente)</Form.Label>
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
              (dataRevision && dataRevision.estadoPlanificacionComponente === 'Rechazado' && user?.userPermisos.acciones['Eventos']['Crear'] && user.userComponente === dataRevision.componenteEncargado?._id) &&
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

          <Form onSubmit={handleSubmitMEL} className='my-4'>
            <Form.Label>Dictámen (MEL)</Form.Label>
            <Form.Select className="mb-3" id='aprobado' name='aprobado' value={valuesMEL.aprobado} onChange={handleChangeMEL} disabled={!boolReviewMEL}>
              <option>Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={5} id='observaciones' name='observaciones' value={valuesMEL.observaciones} onChange={handleChangeMEL} disabled={!boolReviewMEL}/>
            </Form.Group>
            {
              (dataRevision && dataRevision.estadoPlanificacionMEL === 'Rechazado' && user?.userPermisos.acciones['Eventos']['Crear'] && user.userComponente === dataRevision.componenteEncargado?._id) &&
              <div className="d-grid w-100">
                <Button variant="primary" onClick={handleShowEdit}><i className="bi bi-tools"></i>{' '}Corregir</Button>
              </div>
            }
            {
              boolReviewMEL &&
              <div className="d-grid w-100">
                {/**Boton para guardar revision */}
                {
                  !chargingMEL ?
                  <Button style={buttonStyle} onClick={handleSubmitMEL}><i className="bi bi-check2-square"></i>{' '}Guardar revisión</Button>
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
            <p style={{color: 'red'}}>{errorMessageMEL}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditEvento handleClose={handleCloseEdit} setRefetchData={()=>{}} evento={{...dataRevision, id: dataRevision?._id}} fixing/>
    </Modal>
    </>
  )
}
