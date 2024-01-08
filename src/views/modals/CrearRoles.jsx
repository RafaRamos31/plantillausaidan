import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Accordion, Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchPostBody } from "../../hooks/useFetch.js";

export const CrearRoles = ({handleClose, setRefetch}) => {

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange } = useForm({
    nombre: ''
  });

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('roles', values) 

  const handleCreate = (e) => {
    e.preventDefault();
    setSend(true)
    setCharging(true)
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Rol Creado')
    setContent('Rol guardado correctamente.')
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
      <h4 className="my-1">Perfil Roles</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre del rol:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>
        <h5>Permisos</h5>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Vistas</Accordion.Header>
            <Accordion.Body>
              <div>
                <Form.Switch className="w-33" inline label="Clientes" />
                <Form.Switch className="w-33" inline label="Inversiones" />
                <Form.Switch className="w-33" inline label="Planificación" />
                <Form.Switch className="w-33" inline label="Indicadores" />
                <Form.Switch className="w-33" inline label="Reportes" />
                <Form.Switch className="w-33" inline label="Configuración" />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Acciones</Accordion.Header>
            <Accordion.Body>

              <Accordion>
                <Accordion.Item eventKey="a1">
                  <Accordion.Header>Usuarios</Accordion.Header>
                  <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Ver</Form.Label>
                    <Form.Select id="verUsuarios">
                      <option value={0}>Ninguno</option>
                      <option value={1}>Personal</option>
                      <option value={2}>Agregados</option>
                      <option value={3}>Del mismo componente</option>
                      <option value={4}>Todos</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Crear</Form.Label>
                    <Form.Select id="crearUsuarios">
                      <option value={0}>Sin Permisos</option>
                      <option value={1}>Crear</option>
                      <option value={2}>Aprobar creación</option>
                      <option value={3}>Crear y Aprobar</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Actualizar</Form.Label>
                    <Form.Select id="actualizarUsuarios">
                      <option value={0}>Sin Permisos</option>
                      <option value={1}>Actualizar</option>
                      <option value={2}>Aprobar actualización</option>
                      <option value={3}>Actualizar y aprobar</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Eliminar</Form.Label>
                    <Form.Select id="verUsuarios">
                      <option value={0}>Sin Permisos</option>
                      <option value={1}>Eliminar</option>
                      <option value={2}>Aprobar eliminación</option>
                      <option value={3}>Eliminar y aprobar</option>
                    </Form.Select>
                  </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="a2">
                  <Accordion.Header>Organizaciones</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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
