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
import { EditDepartamento } from '../../modals/EditDepartamento';
import { UserContext } from '../../../contexts/UserContext';
import { PlanNavBar } from '../../../components/navBars/PlanNavBar';
import { CompareTooltip } from '../../../components/CompareTooltip';

export const ReviewTarea = () => {
  const { idRevision } = useParams();
  const endpoint = 'tarea'

  const { user } = useContext(UserContext);

  const currencyFormat = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  //Peticio de datos a la API
  const { data: dataRevision, isLoading: isLoadingRevision, error: errorRevision, setRefetch } = useFetchGet(`${endpoint}/${idRevision}`);

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
    if(dataRevision && dataRevision.original){
      setQueryOriginal(`${endpoint}/${dataRevision.original}`)
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
  const { setSend, send, data, isLoading, error } = useFetchPutBody('revisiones/tareas', values) 

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
    <Layout pagina={`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={PlanNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/planificacion', nombre: 'Planificación'},
        {link: '/planificacion/tareas', nombre: 'Tareas'},
        {link: '/reviews/tareas', nombre: 'Revisiones'},
        {link: `/reviews/tareas/${idRevision}`, nombre: dataRevision?.componente?.descripcion || 'Revisión'}
    ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
        <h2><i className="bi bi-list-check"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}</h2>
          <div className='d-flex align-items-end' style={{marginBottom: '1rem'}}>
            <h4 className='my-0' style={{fontStyle: 'italic', marginRight: '1rem'}}>{'Versión ' + dataRevision.version}</h4>
            <StatusBadge status={dataRevision.estado}/>
          </div>

          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
            <Row className='d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Edición:</p>
                  <p>{new Date(dataRevision.fechaEdicion).toLocaleString()}</p>
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Editado por:</p>
                  <AvatarChip name={dataRevision.editor.nombre} id={dataRevision.editor._id}/>
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
                    <AvatarChip name={dataRevision.revisor.nombre} id={dataRevision.revisor._id}/>
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
                      <AvatarChip name={dataRevision.eliminador.nombre} id={dataRevision.eliminador._id}/>
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
              (original && original._id !== dataRevision._id) &&
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
                <CompareValue  title={'Nombre de la Tarea:'} value={dataRevision.titulo} original={original?.titulo} compare={compare}/>
                <CompareValue  title={'Código de la Tarea:'} value={dataRevision.nombre} original={original?.nombre} compare={compare}/>
                <CompareValue  title={'Descripción:'} value={dataRevision.descripcion} original={original?.descripcion} compare={compare}/>
                <CompareValue  title={'Componente:'} value={dataRevision.componente?.descripcion} original={original?.componente.descripcion} compare={compare}/>
                <CompareValue  title={'Trimestre:'} value={dataRevision.trimestre?.nombre} original={original?.trimestre.nombre} compare={compare}/>
                <CompareTooltip title={'Sub Actividad:'} 
                value={dataRevision.subactividad.nombre} valueTooltip={dataRevision.subactividad.descripcion}
                original={original?.subactividad.nombre} originalTooltip={original?.subactividad.descripcion}
                compare={compare}/>
                <CompareTooltip title={'Actividad:'} 
                value={dataRevision.actividad.nombre} valueTooltip={dataRevision.actividad.descripcion}
                original={original?.actividad.nombre} originalTooltip={original?.actividad.descripcion}
                compare={compare}/>
                <CompareTooltip title={'Sub Resultado:'} 
                value={dataRevision.subresultado.nombre} valueTooltip={dataRevision.subresultado.descripcion}
                original={original?.subresultado.nombre} originalTooltip={original?.subresultado.descripcion}
                compare={compare}/>
                <CompareTooltip title={'Resultado:'} 
                value={dataRevision.resultado.nombre} valueTooltip={dataRevision.resultado.descripcion}
                original={original?.resultado.nombre} originalTooltip={original?.resultado.descripcion}
                compare={compare}/>
                <CompareValue  title={'Lugar:'} value={dataRevision.lugar} original={original?.lugar} compare={compare}/>
                <CompareValue  title={'Unidad de Medida:'} value={dataRevision.unidadMedida} original={original?.unidadMedida} compare={compare}/>
                <CompareValue  title={'Cantidad programada:'} value={dataRevision.cantidadProgramada} original={original?.cantidadProgramada} compare={compare}/>
                <CompareValue  title={'Gastos estimados:'} value={dataRevision.gastosEstimados.toLocaleString('en-US', currencyFormat)} original={original?.gastosEstimados.toLocaleString('en-US', currencyFormat)} compare={compare}/>
              </Col>
              {
                compare &&
                <Col md={6}>
                  <div className="mb-3">
                    <h5 style={{fontWeight: 'bold'}}>{'Versión ' + original.version}</h5>
                  </div>
                  <CompareValue  title={'Nombre de la Tarea:'} value={dataRevision.titulo} original={original?.titulo} compare={compare}/>
                  <CompareValue  title={'Código de la Tarea:'} value={dataRevision.nombre} original={original?.nombre} compare={compare}/>
                  <CompareValue  title={'Descripción:'} value={dataRevision.descripcion} original={original?.descripcion} compare={compare}/>
                  <CompareValue  title={'Componente:'} value={dataRevision.componente?.descripcion} original={original?.componente.descripcion} compare={compare}/>
                  <CompareValue  title={'Trimestre:'} value={dataRevision.trimestre?.nombre} original={original?.trimestre.nombre} compare={compare}/>
                  <CompareTooltip title={'Sub Actividad:'} 
                  value={dataRevision.subactividad.nombre} valueTooltip={dataRevision.subactividad.descripcion}
                  original={original?.subactividad.nombre} originalTooltip={original?.subactividad.descripcion}
                  compare={compare} hidden/>
                  <CompareTooltip title={'Actividad:'} 
                  value={dataRevision.actividad.nombre} valueTooltip={dataRevision.actividad.descripcion}
                  original={original?.actividad.nombre} originalTooltip={original?.actividad.descripcion}
                  compare={compare} hidden/>
                  <CompareTooltip title={'Sub Resultado:'} 
                  value={dataRevision.subresultado.nombre} valueTooltip={dataRevision.subresultado.descripcion}
                  original={original?.subresultado.nombre} originalTooltip={original?.subresultado.descripcion}
                  compare={compare} hidden/>
                  <CompareTooltip title={'Resultado:'} 
                  value={dataRevision.resultado.nombre} valueTooltip={dataRevision.resultado.descripcion}
                  original={original?.resultado.nombre} originalTooltip={original?.resultado.descripcion}
                  compare={compare} hidden/>
                  <CompareValue  title={'Lugar:'} value={dataRevision.lugar} original={original?.lugar} compare={compare}/>
                  <CompareValue  title={'Unidad de Medida:'} value={dataRevision.unidadMedida} original={original?.unidadMedida} compare={compare}/>
                  <CompareValue  title={'Cantidad programada:'} value={dataRevision.cantidadProgramada} original={original?.cantidadProgramada} compare={compare}/>
                  <CompareValue  title={'Gastos estimados:'} value={dataRevision.gastosEstimados.toLocaleString('en-US', currencyFormat)} original={original?.gastosEstimados.toLocaleString('en-US', currencyFormat)} compare={compare}/>
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
              user.userPermisos?.acciones['Resultados']['Eliminar'] 
              &&
              <DeleteButton  charging={charging} dataRevision={dataRevision} type={`${endpoint}s`} handleSubmit={handleSubmit}/>
            }
            <p style={{color: 'red'}}>{errorMessage}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditDepartamento handleClose={handleCloseEdit} setRefetchData={()=>{}} departamento={{...dataRevision, id: original?._id}} fixing/>
    </Modal>
    </>
  )
}
