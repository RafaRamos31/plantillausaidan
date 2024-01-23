import React, { useContext, useState, useEffect } from 'react'
import { Layout } from '../../Layout'
import { ConfigNavBar } from '../../../components/navBars/ConfigNavBar'
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import { ToastContext } from '../../../contexts/ToastContext';
import { useFetchGet, useFetchPutBody } from '../../../hooks/useFetch';

export const ReviewDepartamento = () => {
  const { idDepartamento } = useParams();

  //Peticio de datos a la API
  const { data: dataDept, isLoading: isLoadingDept, error: errorDept, setRefetch } = useFetchGet('departamento/' + idDepartamento);

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
        observaciones: dataDept.observaciones,
        aprobado: dataDept.estado !== 'En revisión' ? dataDept.estado === 'Validado' ? 'true' : 'false' : ''
      }) 
    }
  }, [dataDept, isLoadingDept, errorDept, values, setValues])
  

   //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('departamentos/revisar', values) 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true)
    setCharging(true)
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    setRefetch()
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

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: 'none',
    borderRadius: '3px'
  };

  return (
    <Layout pagina={'Configuracion'} SiteNavBar={ConfigNavBar}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
          {idDepartamento}
          <h6>{dataDept?.nombre}</h6>
        </Col>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Dictámen</Form.Label>
            <Form.Select className="mb-3" id='aprobado' name='aprobado' value={values.aprobado} onChange={handleChange} disabled={dataDept && dataDept.estado !== 'En revisión'}>
              <option>Seleccionar Dictámen</option>
              <option value="true">Validado</option>
              <option value="false">Rechazado</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={5} id='observaciones' name='observaciones' value={values.observaciones} onChange={handleChange} disabled={dataDept && dataDept.estado !== 'En revisión'}/>
            </Form.Group>
            <div className="d-grid w-100">
              {
                !charging ?
                <Button style={buttonStyle} onClick={handleSubmit} disabled={dataDept && dataDept.estado !== 'En revisión'}>Guardar revisión</Button>
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
            <p style={{color: 'red'}}>{errorMessage}</p>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}
