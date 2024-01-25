import { useEffect, useState } from "react";
import { useFetchDeleteBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const RestoreModal = ({handleClose, id, type}) => {

  //Formulario
  const { values } = useForm({
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
      <h4 className="my-1">Restaurar Registro</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <p style={{textAlign: 'center'}}>*<b>AVISO</b>: Restaurar un registro lo hará visible de nuevo en tablas y menús desplegables correspondientes.</p> 
      <p style={{color: 'red', textAlign: 'center', marginTop: '1rem'}}><b>¿Desea continuar con la restauración?</b></p>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end align-items-center">
      <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginRight: '0.6rem'}} variant="secondary" onClick={handleClose}>
        Cancelar
      </Button>
      {
        !chargingDelete ?
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="primary" onClick={handleSendDelete}>
          Restaurar
        </Button>
        :
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="primary">
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
