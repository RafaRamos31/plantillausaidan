import { Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {user, setRefetch} = useContext(UserContext)

  const [charging, setCharging] = useState(false);
  const [isError, setIsError] = useState(false);

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsError(false);
  }, [values])


  //Envio asincrono de formulario
  const { setSend, send, isLoading, data, code, error } = useLogin(values.email, values.password) 
  
  //Accion al completar correctamente
  const handleSuccess = () => {
    localStorage.setItem('user-token', data.token);
    setRefetch(true);
    navigate(0);
  }

  useEffect(() => {
    if(user){
      navigate(-1, {replace: true});
    }
  
  }, [user, navigate])
  

  const handleLogin = (e) => {
    e.preventDefault();

    setIsError(false);
    setCharging(true);
    
    setSend(true);
  }

  useEffect(() => {
    if(!isLoading){
      if(error){
        setIsError(true);
        setCharging(false);
      }
      else{
        handleSuccess();
        setCharging(false);
      }
    }
  // eslint-disable-next-line
  }, [send, isLoading, data, code, error])

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
              !isError ? 
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
          isError &&
          <p className='mt-1' style={{color: 'red'}}>{error}</p>
        }
        </Form>
  )
}
