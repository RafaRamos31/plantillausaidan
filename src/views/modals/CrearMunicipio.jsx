import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { UserContext } from "../../contexts/UserContext.js";

export const CrearMunicipio = ({handleClose, setRefetch, modalRefetch, modal=false}) => {
  const { user } = useContext(UserContext);
  const { aprove } = useContext(AproveContext);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombreMuni: '',
    departamentoId: '',
    geocodeMuni: '',
    aprobar: modal ? true : aprove
  });
  
  
  //Departamento
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos, setRefetch: setRefetchDeptos } = useFetchGetBody('departamentos/list', findParams);
  
  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true);
    setRefetchDeptos(true);
  }
  
  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
      setUpdating(false)
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)


  //Editar Departamento en Formulario
  const [deptoGeo, setDeptoGeo] = useState('00')

  useEffect(() => {
    if(values.departamentoId && values.departamentoId.length !== 0){
      setDeptoGeo(deptos.find(depto => depto.id === values.departamentoId)?.geocode)
    }
    else{
      setDeptoGeo('00')
    }
    
  }, [values, deptos])
  
  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('municipios', {
    ...values, 
    nombre: values.nombreMuni,
    geocode: `${deptoGeo}${values.geocodeMuni}`
  }) 

  const handleCreate = (e) => {
    e.preventDefault();
    if(values.geocodeMuni){
      setSend(true)
      setCharging(true)
    }
    else{
      setErrorMessage('Geocode required')
    }
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose()
    if(modal){
      modalRefetch(true)
    }
    else{
      setRefetch()
    }
    setShowToast(true)
    actualizarTitulo('Municipio Creado')
    setContent('Municipio guardado correctamente.')
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
    <>
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Crear Municipio</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Municipio:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombreMuni' name='nombreMuni' value={values.nombreMuni.toUpperCase()} maxLength={40} autoComplete={'off'} onChange={handleChange}/>
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
                <Button variant="light" onClick={handleUpdate}>
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
          <Col sm="3">
            <InputGroup>
              <InputGroup.Text placeholder="00">{deptoGeo}</InputGroup.Text>
              <Form.Control id='geocodeMuni' name='geocodeMuni' placeholder="00" maxLength={2} value={values.geocodeMuni} autoComplete={'off'} onChange={handleChange}/>
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
      {
        !charging ?
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginLeft: '1rem'}} variant="secondary" onClick={handleCreate}>
          Enviar
        </Button>
        :
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginLeft: '1rem'}} variant="secondary">
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
  </>
  )
}
