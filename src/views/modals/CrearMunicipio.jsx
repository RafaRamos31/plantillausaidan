import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchPostBody } from "../../hooks/useFetch.js";

export const CrearMunicipio = ({handleClose, setRefetch}) => {
  //Departamento
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos } = useFetchGet('departamentos');
  
  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange } = useForm({
    nombre: '',
    idDepartamento: '',
    geocode: ''
  });

  //Editar Departamento en Formulario
  const [deptoGeo, setDeptoGeo] = useState('')

  useEffect(() => {
    if(values.idDepartamento && values.idDepartamento.length > 0){
      setDeptoGeo(deptos.find(depto => depto._id === values.idDepartamento).geocode)
    }
    else{
      setDeptoGeo('')
    }
    
  }, [values, deptos])
  

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('municipios', {...values, geocode: `${deptoGeo}${values.geocode}`}) 

  const handleCreate = (e) => {
    e.preventDefault();
    if(values.geocode){
      setSend(true)
      setCharging(true)
    }
    else{
      setErrorMessage('Geocode required')
    }
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Municipio Creado')
    setContent('Municipio guardado correctamente.')
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

  return (
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Perfil Municipios</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Municipio:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Departamento:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idDepartamento' name='idDepartamento' value={values.idDepartamento} onChange={handleChange}>
            <option value="">Seleccionar Departamento</option>
            {
              deptos &&
              deptos.map((depto) => (
                <option key={depto._id} value={depto._id}>{depto.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Geocode:
          </Form.Label>
          <Col sm="2">
            <Form.Control disabled readOnly value={deptoGeo}/>
          </Col>
          <Col sm="6">
            <Form.Control id='geocode' name='geocode' value={values.geocode} onChange={handleChange}/>
          </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end">
      {
        !charging ?
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="secondary" onClick={handleCreate}>
          Guardar
        </Button>
        :
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="secondary">
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
    </Card.Footer>
  </Card>
  )
}
