import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { ConfigNavBar } from '../../../components/navBars/ConfigNavBar'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';
import { Loading } from '../../Loading';
import { AvatarChip } from '../../../components/AvatarChip';
import { StatusBadge } from '../../../components/StatusBadge';
import { CompareValue } from '../../../components/CompareValue';
import { ReviewButton } from '../../../components/ReviewButton';
import { DeleteButton } from '../../../components/DeleteButton';

export const ReviewDepartamento = () => {
  const { idDepartamento } = useParams();

  //Peticio de datos a la API
  const { data: dataDept, isLoading: isLoadingDept, error: errorDept, setRefetch } = useFetchGet('departamento/' + idDepartamento);

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
    if(dataDept && dataDept.original){
      setQueryOriginal('departamento/'+dataDept.original)
      setRefetchOriginal(true)
    }
    else{
      setOriginal(null)
    }
    
  }, [ dataDept, setQueryOriginal, setRefetchOriginal, setOriginal ])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idDepartamento: idDepartamento,
    aprobado: '',
    observaciones: ''
  });

  useEffect(() => {
    if(!isLoadingDept && dataDept && !errorDept){
      setValues({...values, 
        observaciones: dataDept.observaciones || '',
        aprobado: dataDept.estado !== 'En revisión' ? dataDept.estado === 'Validado' ? 'true' : 'false' : ''
      }) 
    }
    // eslint-disable-next-line
  }, [dataDept, isLoadingDept, errorDept])
  

   //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('revisiones/departamentos', values) 

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
    actualizarTitulo('Departamento Revisado')
    setContent('Departamento revisado correctamente.')
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


  //Activar comparacion
  const [compare, setCompare] = useState(false)

  const handleCompare = () => {
    setCompare(!compare)
  }

  if(isLoadingDept){
    return <Loading />
  }

  return (
    <Layout pagina={'Revisión - Departamento'} SiteNavBar={ConfigNavBar}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
          <h2><i className="bi bi-geo-alt-fill"></i> Departamento</h2>
          <div className='d-flex align-items-end' style={{marginBottom: '1rem'}}>
            <h4 className='my-0' style={{fontStyle: 'italic', marginRight: '1rem'}}>{'Versión ' + dataDept.version}</h4>
            <StatusBadge status={dataDept.estado}/>
          </div>

          <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
            <Row className='d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Edición:</p>
                  <p>{new Date(dataDept.fechaEdicion).toLocaleString()}</p>
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Editado por:</p>
                  <AvatarChip name={dataDept.editor.nombre} id={dataDept.editor._id}/>
                </div>
              </Col>
            </Row>

            <Row className='mt-3 d-flex align-items-center'>
              <Col>
                <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Revisión:</p>
                  {
                    dataDept.fechaRevision ?
                    <p>{new Date(dataDept.fechaRevision).toLocaleString()}</p>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center'>
                <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                  {
                    dataDept.revisor ?
                    <AvatarChip name={dataDept.revisor.nombre} id={dataDept.revisor._id}/>
                    :
                    <p>--</p>
                  }
                </div>
              </Col>
            </Row>

            {
              dataDept.estado === 'Eliminado' &&
              <Row className='mt-3 d-flex align-items-center'>
                <Col>
                  <div className='d-flex align-items-center'>
                    <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Eliminación:</p>
                    {
                      dataDept.fechaEliminacion ?
                      <p>{new Date(dataDept.fechaEliminacion).toLocaleString()}</p>
                      :
                      <p>--</p>
                    }
                  </div>
                </Col>
                <Col>
                  <div className='d-flex align-items-center'>
                  <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Eliminado por:</p>
                    {
                      dataDept.eliminador ?
                      <AvatarChip name={dataDept.eliminador.nombre} id={dataDept.eliminador._id}/>
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
              (original && original._id !== dataDept._id) &&
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
                    <h5 style={{fontWeight: 'bold'}}>{'Versión ' + dataDept.version}</h5>
                  </div>
                }
                <CompareValue  title={'Nombre del Departamento:'} value={dataDept.nombre} original={original?.nombre} compare={compare}/>
                <CompareValue  title={'Geocode:'} value={dataDept.geocode} original={original?.geocode} compare={compare}/>
              </Col>
              {
                compare &&
                <Col md={6}>
                  <div className="mb-3">
                    <h5 style={{fontWeight: 'bold'}}>{'Versión ' + original.version}</h5>
                  </div>
                  <CompareValue  title={'Nombre del Departamento:'} value={dataDept.nombre} original={original?.nombre} compare={compare} hidden/>
                  <CompareValue  title={'Geocode:'} value={dataDept.geocode} original={original?.geocode} compare={compare} hidden/>
                </Col>
              }
            </Row>
            
          </Container>
        </Col>

        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            {
              (dataDept && (dataDept.estado !== 'Publicado' && dataDept.estado !== 'Eliminado' )) &&
              <>
                <Form.Label>Dictámen</Form.Label>
                <Form.Select className="mb-3" id='aprobado' name='aprobado' value={values.aprobado} onChange={handleChange} disabled={dataDept && dataDept.estado !== 'En revisión'}>
                  <option>Seleccionar Dictámen</option>
                  <option value="true">Validado</option>
                  <option value="false">Rechazado</option>
                </Form.Select>
              </>
            }
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={5} id='observaciones' name='observaciones' value={values.observaciones} onChange={handleChange} disabled={dataDept && dataDept.estado !== 'En revisión'}/>
            </Form.Group>
            <ReviewButton  charging={charging} dataDept={dataDept} original={original} handleSubmit={handleSubmit}/>
            <DeleteButton  charging={charging} dataDept={dataDept} handleSubmit={handleSubmit}/>
            <p style={{color: 'red'}}>{errorMessage}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}
