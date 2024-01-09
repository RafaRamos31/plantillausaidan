import { Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useLogin } from "../hooks/useAuth";

export const TicketForm = () => {
  const [charging, setCharging] = useState(false);
  const [error, setError] = useState(false);

  const { values, handleChange } = useForm({
    ticket: '',
    password: ''
  });

  useEffect(() => {
    setError(false);
  }, [values])


  //Envio asincrono de formulario
  const { setSend: setSendLogin, 
          send: sendLogin, 
          data: dataLogin, 
          isLoading: isLoadingLogin, 
          error: errorLogin } = useLogin(values.email, values.password) 
  
  //Accion al completar correctamente
  const handleSuccess = () => {
    localStorage.setItem('user-token', dataLogin.token);
    window.location.reload();
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setSendLogin(true);
    setCharging(true)
  }

  useEffect(() => {
    if(errorLogin){
      setError(true)
      setCharging(false)
    }
    if(dataLogin){
      handleSuccess();
    }
  // eslint-disable-next-line
  }, [sendLogin, dataLogin, isLoadingLogin, errorLogin])

  return (
      <Form onSubmit={handleLogin}>
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
