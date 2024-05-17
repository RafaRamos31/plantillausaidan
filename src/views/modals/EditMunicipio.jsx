import { useContext, useEffect, useState } from "react";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { AproveContext } from "../../contexts/AproveContext.js";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { UserContext } from "../../contexts/UserContext.js";

export const EditMunicipio = ({handleClose, setRefetchData, municipio, fixing=false}) => {

  const { user } = useContext(UserContext);
  const { aprove } = useContext(AproveContext);

  //Departamento
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos, setRefetch: setRefetchDeptos } = useFetchGetBody('departamentos/list', findParams);

  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
      setUpdating(false);
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)
  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleReload = () => {
    setUpdating(true);
    setRefetchDeptos(true);
  }

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idMunicipio: municipio.id,
    nombre: municipio.nombre,
    departamentoId: municipio.departamentoId,
    geocode: municipio.geocode.substring(2),
    aprobar: aprove
  });


  //Editar Departamento en Formulario
  const [deptoGeo, setDeptoGeo] = useState('00')

  useEffect(() => {
    if(values.departamentoId && values.departamentoId.length !== 0){
      // eslint-disable-next-line
      setDeptoGeo(deptos.find(depto => depto.id == values.departamentoId)?.geocode)
    }
    else{
      setDeptoGeo('00')
    }
    
  }, [values, deptos])

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

  //Accion por defecto envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.geocode.length > 0){
      handleUpdate();
    }
    else{
      setErrorMessage('Geocode required')
    }
  }

  //Boton de carga Modificar
  const [chargingEdit, setChargingEdit] = useState(false);
  
  //Envio asincrono de formulario de Modificar
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('municipios', 
  {...values, geocode: `${deptoGeo}${values.geocode}`}) 

  const handleUpdate = () => {
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
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Modificar Municipio</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Municipio:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre.toUpperCase()} maxLength={40} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4" className="my-auto">
            Departamento:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <InputAutocomplete 
                valueList={deptos} 
                value={values.departamentoId}
                name={'departamentoId'}
                setValues={setValues}
                setRefetch={setRefetchDeptos}
                ModalCreate={CrearDepartamento}
                insert={user.userPermisos?.acciones['Departamentos']['Crear']}
              />
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
            Geocode:
          </Form.Label>
          <Col sm='3'>
          <InputGroup>
            <InputGroup.Text placeholder="00">{deptoGeo}</InputGroup.Text>
              <Form.Control id='geocode' name='geocode' placeholder="00" maxLength={2} value={values.geocode} onChange={handleChange}/>
            </InputGroup>
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
