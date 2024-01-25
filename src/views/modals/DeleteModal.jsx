import { useEffect, useState } from "react";
import { useFetchDeleteBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const DeleteModal = ({handleClose, id, type}) => {

  //Formulario
  const { values, handleChange } = useForm({
    id: id,
    observaciones: ''
  });

  //Envio asincrono de formulario de Eliminar
  const { setSend, send, data, isLoading, error } = useFetchDeleteBody(type, values) 

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  const [chargingDelete, setChargingDelete] = useState(false);

  const handleSendDelete = () => {
    setChargingDelete(true)
    setSend(true)
  }

  //Accion al completar correctamente Eliminacion
  const navigate = useNavigate()

  const handleSuccessDelete = () => {
    handleClose()
    navigate(0)
  }

  useEffect(() => {
    setChargingDelete(false)
    setErrorMessage(error)

    if(data){
      handleSuccessDelete();
    }
  // eslint-disable-next-line
  }, [send, data, isLoading, error])
  
  return (
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Eliminar Registro</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Observaciones</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Puede proporcionar información adicional con las razones para la eliminación." id='observaciones' name='observaciones' value={values.observaciones} onChange={handleChange} />
        </Form.Group>
      </Form>
      <p style={{textAlign: 'center'}}>*<b>AVISO</b>: Los elementos eliminados son ocultados y no se podrán referenciar en nuevos objetos hasta que sean restaurados.</p> 
      <p style={{color: 'red', textAlign: 'center', marginTop: '1rem'}}><b>¿Desea continuar con la eliminación?</b></p>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end align-items-center">
      <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginRight: '0.6rem'}} variant="secondary" onClick={handleClose}>
        Cancelar
      </Button>
      {
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
    </Card.Footer>
  </Card>
  )
}
