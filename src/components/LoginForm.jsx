import { Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useLogin } from "../hooks/useAuth";

export const LoginForm = () => {
  const [charging, setCharging] = useState(false);
  const [error, setError] = useState(false);

  const { values, handleChange } = useForm({
    email: '',
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
            <FloatingLabel label="Correo Electrónico">
              <Form.Control aria-label="Usuario" type="email" id="email" name="email" onChange={handleChange} required/>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-4">
            <FloatingLabel label="Contraseña">
              <Form.Control type="password" id="password" name="password" onChange={handleChange} required/>
            </FloatingLabel>
          </Form.Group>
          <div className="d-grid gap-2">
            {
              !error ? 
                !charging ? 
                <Button as="input" style={{backgroundColor: 'var(--main-green)'}} type="submit" value="Iniciar Sesión" />
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
          <p style={{color: 'red'}}>{'Los datos ingresados no son válidos'}</p>
        }
        </Form>
  )
}
