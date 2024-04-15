import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Container, InputGroup, Modal } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';
import { Loading } from '../../Loading';
import { AvatarChip } from '../../../components/AvatarChip';
import { UserContext } from '../../../contexts/UserContext';
import { InversionesNavBar } from '../../../components/navBars/InversionesNavBar';
import { CrearEventoPresupuestar } from '../../modals/CrearEventoPresupuestar';

export const ReviewEventoPresupuesto = () => {

  const { idRevision } = useParams();
  const endpoint = 'evento'
  const { user } = useContext(UserContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


  //Peticio de datos a la API
  const { data: dataRevision, isLoading: isLoadingRevision, error: errorRevision, setRefetch } = useFetchGet(`${endpoint}/prespuestar/${idRevision}`);


  //Formulario Componente
  const { values, setValues } = useForm({
    id: idRevision,
    aprobado: '',
    observaciones: ''
  });
  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('revisiones/eventos/presupuestar', values) 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true)
  }

  const handleRefetch = () => {
    setRefetch(true);
  }

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleRefetch()
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
        aprobado: dataRevision.estadoPresupuesto
      }) 
    }
    // eslint-disable-next-line
  }, [dataRevision, isLoadingRevision, errorRevision])

  if(isLoadingRevision){
    return <Loading />
  }

  return (
    <>
    <Layout pagina={`Presupuestar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={InversionesNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/inversiones', nombre: 'Inversiones'},
        {link: '/inversiones/presupuestar', nombre: 'Presupuestar Evento'},
        {link: `/reviews/eventos/presupuestar/${idRevision}`, nombre: dataRevision?.nombre || 'Revisión'}
    ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
        <h2><i className="bi bi-calendar2-plus"></i>{` Presupuestar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}</h2>
          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
            <Row className='d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha Presupuestado:</p>
                  {
                    dataRevision.fechaPresupuesto ?
                    <p>{new Date(dataRevision.fechaPresupuesto).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Responsable:</p>
                  {
                    dataRevision.responsablePresupuesto ?
                    <AvatarChip name={dataRevision.responsablePresupuesto.nombre} id={dataRevision.responsablePresupuesto._id}/>
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
            <h5>Monto invertido en el evento</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="numeroFormulario"
                  name="numeroFormulario"
                  value={dataRevision.totalPresupuesto}
                  readOnly
                  disabled
                />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          </Col>
          {
            Number(dataRevision.totalPresupuesto) > 0 &&
            <Button className="px-3" href={dataRevision.enlacePresupuesto} target="_blank" style={{fontWeight: 'bold'}}>Informe de Presupuesto <i className="bi bi-box-arrow-up-right"></i></Button>
          }
        </Row>
        </Col>

        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Dictámen</Form.Label>
            <Form.Select className="mb-3" id='aprobado' name='aprobado' disabled >
              <option value="Aprobado">Finalizado</option>
            </Form.Select>
            {
              (user?.userPermisos.acciones['Eventos']['Presupuestar'] && dataRevision.estadoConsolidado !== 'Finalizado') &&
              <div className="d-grid w-100">
                <Button variant="primary" onClick={handleShowEdit}><i className="bi bi-tools"></i>{' '}Corregir</Button>
              </div>
            }
            <p style={{color: 'red'}}>{errorMessage}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <CrearEventoPresupuestar handleClose={handleCloseEdit} setRefetch={setRefetch} eventValues={{id: dataRevision?._id, nombre: dataRevision?.nombre}} initialValues={dataRevision}/>
    </Modal>
    </>
  )
}
