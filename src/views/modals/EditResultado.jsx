import { useContext, useEffect, useState } from "react";
import { useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { AproveContext } from "../../contexts/AproveContext.js";

export const EditResultado = ({handleClose, setRefetchData, resultado, fixing=false}) => {
  const { aprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange } = useForm({
    idResultado: resultado.id,
    nombre: resultado.nombre.split(' ')[1],
    descripcion: resultado.descripcion,
    aprobar: aprove
  });

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Resultado No Encontrado')
    setContent('El Resultado que deseas modificar ya no existe.')
    setVariant('warning')
  }

  //Accion por defecto envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate()
  }

  //Boton de carga Modificar
  const [chargingEdit, setChargingEdit] = useState(false);
  
  //Envio asincrono de formulario de Modificar
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('resultados', {...values, nombre: `IR ${values.nombre}`}) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const navigate = useNavigate();

  const handleSuccessEdit = () => {
    handleClose()
    if(fixing){
      navigate('/reviews/resultados/'+dataEdit._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      setShowToast(true)
      actualizarTitulo('Resultado Modificado')
      setContent('Resultado guardado correctamente.')
      setVariant('success')
    }
  }

  useEffect(() => {

    if(errorEdit){
      setChargingEdit(false)
      if(codeEdit === 404){
        handleNotFound()
      }
      else{
        setErrorMessage(errorEdit)
      }
    }
    if(dataEdit){
      handleSuccessEdit();
    }
  // eslint-disable-next-line
  }, [sendEdit, dataEdit, isLoadingEdit, errorEdit, codeEdit])
  
  return (
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Modificar Resultado</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Código:
          </Form.Label>
          <Col sm="3">
            <InputGroup>
              <InputGroup.Text placeholder="IR">{'IR'}</InputGroup.Text>
              <Form.Control id='nombre' name='nombre' type="number" value={values.nombre} maxLength={6} min={1} onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Descripción:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='descripcion' name='descripcion'  as="textarea" rows={4} maxLength={500} value={values.descripcion} onChange={handleChange}/>
          </Col>
        </Form.Group>

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        <div></div>
      }
      
      
      {/*Boton Guardar*/}
      {
        !chargingEdit ? 
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', marginLeft: '1rem', width: '9rem'}} variant="secondary" onClick={handleUpdate}>
          Enviar
        </Button>
        : <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', marginLeft: '1rem', width: '9rem'}} variant="secondary">
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
