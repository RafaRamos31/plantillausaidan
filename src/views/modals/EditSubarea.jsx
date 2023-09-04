import { useContext, useEffect, useState } from "react";
import { useFetchDeleteBody, useFetchGet, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";

export const EditSubarea = ({handleClose, setRefetch, subarea}) => {
  //Areas Tematicas
  const [areas, setAreas] = useState([])
  const { data: areasData, isLoading: isLoadingAreas, error: errorAreas } = useFetchGet('areas');
  
  useEffect(() => {
    if(areasData && !isLoadingAreas){
      setAreas(areasData)
    } 
  }, [areasData, isLoadingAreas, errorAreas])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange } = useForm({
    idSubarea: subarea.id,
    nombre: subarea.nombre,
    idArea: subarea.idArea
  });

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Sub Área Temática No Encontrada')
    setContent('La Sub Área Temática que deseas modificar ya no existe.')
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
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('subareas', values) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion
  const handleSuccessEdit = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Sub Área Temática Modificada')
    setContent('Sub Área Temática guardada correctamente.')
    setVariant('success')
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

  //Boton de confirmar Eliminacion
  const [showDelete, setShowDelete] = useState(false);
  const [chargingDelete, setChargingDelete] = useState(false);

  const handleDelete = () => {
    setShowDelete(true)
    setErrorMessage('Presione de nuevo para confirmar la eliminación')
  }

  //Envio asincrono de formulario de Eliminar
  const { setSend: setSendDelete, send: sendDelete, data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, code: codeDelete } = useFetchDeleteBody('subareas', {idSubarea: values.idSubarea}) 

  const handleSendDelete = () => {
    setChargingDelete(true)
    setSendDelete(true)
  }

  //Accion al completar correctamente Eliminacion
  const handleSuccessDelete = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Sub Área Temática Eliminada')
    setContent('Sub Área Temática eliminada correctamente.')
    setVariant('success')
  }

  useEffect(() => {
    setChargingDelete(false)
    if(codeDelete === 404){
      handleNotFound()
    }
    else{
      setErrorMessage(errorDelete)
    }

    if(dataDelete){
      handleSuccessDelete();
    }
  // eslint-disable-next-line
  }, [sendDelete, dataDelete, isLoadingDelete, errorDelete])
  
  return (
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Perfil Sub Áreas Temáticas</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="idMunicipio">
          <Form.Label column sm="4">
            uuid:
          </Form.Label>
          <Col sm="8">
            <Form.Control readOnly disabled value={values.idSubarea}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Áreas Temáticas:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idArea' name='idArea' value={values.idArea} onChange={handleChange}>
            <option value="">Seleccionar Áreas Temática</option>
            {
              areas &&
              areas.map((area) => (
                <option key={area._id} value={area._id}>{area.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Sub Área Temática:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end">
      {/*Boton Eliminar*/}
      {
        !showDelete ? 
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="secondary" onClick={handleDelete}>
          Eliminar
        </Button>
        :
        !chargingDelete ?
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="danger" onClick={handleSendDelete}>
          Eliminar
        </Button>
        :
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="danger">
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
      
      {/*Boton Guardar*/}
      {
        !chargingEdit ? 
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', marginLeft: '1rem', width: '9rem'}} variant="secondary" onClick={handleUpdate}>
          Guardar
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
