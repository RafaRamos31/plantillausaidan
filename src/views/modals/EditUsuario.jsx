import { useContext, useEffect, useState } from "react";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";
import { InputDNI } from "../../components/InputDNI.jsx";

export const EditUsuario = ({handleClose, setRefetchData, usuario, fixing=false}) => {
  const { user } = useContext(UserContext);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idUsuario: usuario.id,
    nombre: usuario.nombre,
    dni: usuario.dni,
    telefono: usuario.telefono,
    idComponente: usuario.idComponente,
    idRol: usuario.idRol,
  });

  const handleToggleAprobar = () => {
    setValues({ ...values, aprobar: !values.aprobar });
  }

  //Componente
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [componentes, setComponentes] = useState([])
  const { data: componentesData, isLoading: isLoadingComponentes, error: errorComponentes, setRefetch: setRefetchComponentes } = useFetchGetBody('list/componentes', findParams);
  
  useEffect(() => {
    if(componentesData && !isLoadingComponentes){
      setComponentes(componentesData)
      setUpdating(false);
    } 
  }, [componentesData, isLoadingComponentes, errorComponentes])

  //Indicador actualizando con boton componentes
  const [updating, setUpdating] = useState(false);

  //Accion Update manual componentes
  const handleReload = () => {
    setUpdating(true);
    setRefetchComponentes(true);
  }

  //Roles
  const findParamsRol = {
    sort: '{}',
    filter: '{}'
  }
  const [roles, setRoles] = useState([])
  const { data: rolesData, isLoading: isLoadingRoles, error: errorRoles, setRefetch: setRefetchRoles } = useFetchGetBody('list/roles', findParamsRol);
  
  useEffect(() => {
    if(rolesData && !isLoadingRoles){
      setRoles(rolesData)
      setUpdatingRoles(false);
    } 
  }, [rolesData, isLoadingRoles, errorRoles])

  //Indicador actualizando con boton roles
  const [updatingRoles, setUpdatingRoles] = useState(false);

  //Accion Update manual roles
  const handleReloadRoles = () => {
    setUpdatingRoles(true);
    setRefetchRoles(true);
  }

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Municipio No Encontrado')
    setContent('El Municipio que deseas modificar ya no existe.')
    setVariant('warning')
  }


  //Boton de carga Modificar
  const [chargingEdit, setChargingEdit] = useState(false);
  
  //Envio asincrono de formulario de Modificar
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('usuarios', values) 

  const handleSubmit = (e) => {
    e.preventDefault()
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const navigate = useNavigate();

  const handleSuccessEdit = () => {
    if(fixing){
      navigate('/reviews/municipios/'+dataEdit._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      handleClose()
      setShowToast(true)
      actualizarTitulo('Municipio Modificado')
      setContent('Municipio guardado correctamente.')
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
      <Card.Header className="d-flex justify-content-between align-items-center text-center" style={handleClose ? {backgroundColor: 'var(--main-green)', color: 'white'} : null}>
        <h4 className="my-1">Modificar Usuario</h4>
        {
          handleClose &&
          <CloseButton onClick={handleClose}/>
        }
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Nombre:
            </Form.Label>
            <Col sm="8">
              <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange} disabled/>
            </Col>
          </Form.Group>

          <InputDNI value={values.dni} setValues={setValues} disabled/>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Teléfono:
            </Form.Label>
            <Col sm="8">
              <Form.Control id='telefono' name='telefono' value={values.telefono} onChange={handleChange} disabled/>
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
                    componentes.map((componente) => (
                      <option key={componente._id} value={componente._id}>{componente.nombre}</option>
                    ))
                  }
                </Form.Select>
                {
                  !updating ? 
                  <Button variant="light" onClick={handleReload}>
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
        
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Rol:
            </Form.Label>
            <Col sm="8">
              <InputGroup>
                <Form.Select id='idRol' name='idRol' value={values.idRol} onChange={handleChange}>
                  <option value="">Seleccionar Rol</option>
                  {
                    roles &&
                    roles.map((rol) => (
                      <option key={rol._id} value={rol._id}>{rol.nombre}</option>
                    ))
                  }
                </Form.Select>
                {
                  !updatingRoles ? 
                  <Button variant="light" onClick={handleReloadRoles}>
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

        </Form>
        <p style={{color: 'red'}}>{errorMessage}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        {
          user.userPermisos?.acciones['Usuarios']['Revisar']
          ?
          <Form.Group>
            <Form.Check type="checkbox" label="Aprobar al enviar" id='aprobar' name='aprobar' onChange={handleToggleAprobar}/>
          </Form.Group>
          :
          <div></div>
        }
        {
          !chargingEdit ?
          <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="secondary" onClick={handleSubmit}>
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
