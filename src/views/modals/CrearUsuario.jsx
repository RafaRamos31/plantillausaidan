import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { InputDNI } from "../../components/InputDNI.jsx";
import { useNavigate } from "react-router-dom";

export const CrearUsuario = ({handleClose=null, setRefetch=null}) => {

  const navigate = useNavigate();

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    dni: '',
    telefono: '',
    idComponente: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });


  //Componente
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [componentes, setComponentes] = useState([])
  const { data: componentesData, isLoading: isLoadingComponentes, error: errorComponentes, setRefetch: setRefetchComponentes } = useFetchGetBody('list/componentes', findParams, true);
  
  useEffect(() => {
    if(componentesData && !isLoadingComponentes){
      setComponentes(componentesData)
      setUpdating(false);
    } 
  }, [componentesData, isLoadingComponentes, errorComponentes])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('usuarios', values, true) 

  const handleCreate = (e) => {
    e.preventDefault();
    if(values.password !== values.confirmPassword){
      setErrorMessage('Las contraseñas proporcionadas no coinciden.')
    }
    else{
      setSend(true);
      setCharging(true)
    }
  }

  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true);
    setRefetchComponentes(true);
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    setShowToast(true)
    actualizarTitulo('Usuario Creado')
    setContent('Usuario guardado correctamente.')
    setVariant('success')
    navigate('/');
    navigate(0);
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
    <Card.Header className="d-flex justify-content-between align-items-center text-center" style={handleClose ? {backgroundColor: 'var(--main-green)', color: 'white'} : null}>
      <h4 className="my-1">Registrar Usuario</h4>
      {
        handleClose &&
        <CloseButton onClick={handleClose}/>
      }
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} autoComplete={'off'} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <InputDNI value={values.dni} setValues={setValues}/>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='telefono' name='telefono' value={values.telefono} autoComplete={'off'} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Componente:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <Form.Select id='idComponente' name='idComponente' value={values.idComponente} onChange={handleChange}>
                <option value="">Seleccionar Componente</option>
                {
                  componentes &&
                  componentes.map((depto) => (
                    <option key={depto._id} value={depto._id}>{depto.descripcion}</option>
                  ))
                }
              </Form.Select>
              {
                !updating ? 
                <Button variant="light" onClick={handleUpdate}>
                  <i className="bi bi-arrow-clockwise"></i>
                </Button>
                : <Button variant="light">
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
            </InputGroup>
          </Col>
        </Form.Group>

        <Card className='my-4'>
        <Card.Header>
          <h5>Acceso</h5>
        </Card.Header>
        <Card.Body className='p-4'>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Correo Electrónico:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <Form.Control id='correo' name='correo' type={'email'} value={values.correo} autoComplete={'off'} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Contraseña:
            </Form.Label>
            <Col sm="8">
              <Form.Control id='password' name='password' type={'password'} value={values.password} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">
              Confirmar Contraseña:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <Form.Control id='confirmPassword' name='confirmPassword' type={'password'} value={values.confirmPassword} onChange={handleChange}/>
            </Col>
          </Form.Group>

        </Card.Body>
        </Card>
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
