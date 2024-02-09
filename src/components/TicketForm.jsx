import { Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useFindTicket } from "../hooks/useTickets";
import { useNavigate } from "react-router-dom";

export const TicketForm = () => {
  const [charging, setCharging] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate()

  const { values, handleChange } = useForm({
    ticket: '',
  });

  useEffect(() => {
    setError(false);
  }, [values])

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error: errorTicket } = useFindTicket(values.ticket);

  //Accion al completar correctamente
  const handleSuccess = () => {
    localStorage.setItem('login-token', data.token);
    navigate( '/register/' + values.ticket )
  }

  const handleSend = (e) => {
    e.preventDefault();
    setSend(true);
    setCharging(true)
  }

  useEffect(() => {
    if(errorTicket){
      setError(true)
      setCharging(false)
    }
    if(data){
      handleSuccess();
    }
  // eslint-disable-next-line
  }, [ send, data, isLoading, errorTicket]) 

  return (
      <Form onSubmit={handleSend}>
          <Form.Group className="my-4">
            <FloatingLabel label="Ticket de Registro">
              <Form.Control aria-label="ticket" id="ticket" name="ticket" onChange={handleChange} required/>
            </FloatingLabel>
          </Form.Group>
          <p>{'*Puede ponerse en contacto con un administrador para obtener un ticket.'}</p>
          <div className="d-grid gap-2">
            {
              !error ? 
                !charging ? 
                <Button as="input" style={{backgroundColor: 'var(--main-green)'}} type="submit" value="Registrarse" />
                : <Button style={{backgroundColor: 'var(--main-green)'}}> 
                  <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Cargando...</span>
                </Button>
              :
              <Button as="input" variant="danger" type="submit" value="Error" />
              }
          </div>
          {
          error &&
          <p style={{color: 'red'}}>{'El ticket ingresado no es válido o ya fue utilizado.'}</p>
        }
        </Form>
  )
}
