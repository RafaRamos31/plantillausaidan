import { useContext, useEffect, useState } from "react";
import { useFetchDeleteBody, useFetchGet, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";

export const EditAldea = ({handleClose, setRefetch, aldea}) => {
  //Departamento
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos } = useFetchGet('departamentos');
  
  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Municipios
  const [municipios, setMunicipios] = useState([])
  const [queryMunicipios, setQueryMunicipios] = useState('')
  const { data: municipiosData, isLoading: isLoadingMunicipios, error: errorMunicipios, setRefetch: setRefetchMunicipios } = useFetchGet(queryMunicipios);
  
  useEffect(() => {
    if(municipiosData && !isLoadingMunicipios){
      setMunicipios(municipiosData)
    } 
  }, [municipiosData, isLoadingMunicipios, errorMunicipios])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange } = useForm({
    idAldea: aldea.id,
    nombre: aldea.nombre,
    idMunicipio: aldea.idMunicipio,
    idDepartamento: aldea.idDepartamento,
    geocode: aldea.geocode.substring(4)
  });

  //Editar Municipio en Formulario
  const [municipioGeo, setMunicipioGeo] = useState('')

  useEffect(() => {
    if(values.idDepartamento && values.idDepartamento.length > 0){
      setQueryMunicipios('municipios/'+values.idDepartamento)
      setRefetchMunicipios(true)
    }
    else{
      setMunicipios([])
      setMunicipioGeo('')
    }
    
  }, [values, deptos, setRefetchMunicipios])

  useEffect(() => {
    if(values.idMunicipio && values.idMunicipio.length > 0){
      setMunicipioGeo(municipios.find(municipio => municipio._id === values.idMunicipio)?.geocode)
    }
    else{
      setMunicipioGeo('')
    }
    
  }, [values, municipios])


  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Aldea No Encontrada')
    setContent('La Aldea que deseas modificar ya no existe.')
    setVariant('warning')
  }

  //Accion por defecto envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.geocode.length > 0){
      handleUpdate()
    }
    else{
      setErrorMessage('Geocode required')
    }
    
  }

  //Boton de carga Modificar
  const [chargingEdit, setChargingEdit] = useState(false);
  
  //Envio asincrono de formulario de Modificar
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('aldeas', 
  {...values, geocode: `${municipioGeo}${values.geocode}`}) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion
  const handleSuccessEdit = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Aldea Modificada')
    setContent('Aldea guardada correctamente.')
    setVariant('success')
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

  //Boton de confirmar Eliminacion
  const [showDelete, setShowDelete] = useState(false);
  const [chargingDelete, setChargingDelete] = useState(false);

  const handleDelete = () => {
    setShowDelete(true)
    setErrorMessage('Presione de nuevo para confirmar la eliminación')
  }

  //Envio asincrono de formulario de Eliminar
  const { setSend: setSendDelete, send: sendDelete, data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, code: codeDelete } = useFetchDeleteBody('aldeas', {idAldea: values.idAldea}) 

  const handleSendDelete = () => {
    setChargingDelete(true)
    setSendDelete(true)
  }

  //Accion al completar correctamente Eliminacion
  const handleSuccessDelete = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Aldea Eliminada')
    setContent('Aldea eliminada correctamente.')
    setVariant('success')
  }

  useEffect(() => {
    setChargingDelete(false)
    if(codeDelete === 404){
      handleNotFound()
    }
    else{
      setErrorMessage(errorDelete)
    }

    if(dataDelete){
      handleSuccessDelete();
    }
  // eslint-disable-next-line
  }, [sendDelete, dataDelete, isLoadingDelete, errorDelete])
  
  return (
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Perfil Aldeas</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="idMunicipio">
          <Form.Label column sm="4">
            uuid:
          </Form.Label>
          <Col sm="8">
            <Form.Control readOnly disabled value={values.idMunicipio}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Aldea:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Departamento:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idDepartamento' name='idDepartamento' value={values.idDepartamento} onChange={handleChange}>
            <option value="">Seleccionar Departamento</option>
            {
              deptos &&
              deptos.map((depto) => (
                <option key={depto._id} value={depto._id}>{depto.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Municipio:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idMunicipio' name='idMunicipio' value={values.idMunicipio} onChange={handleChange}>
            <option value="">Seleccionar Municipio</option>
            {
              municipios &&
              municipios.map((municipio) => (
                <option key={municipio._id} value={municipio._id}>{municipio.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Geocode:
          </Form.Label>
          <Col sm="3">
            <Form.Control disabled readOnly value={municipioGeo}/>
          </Col>
          <Col sm="5">
            <Form.Control id='geocode' name='geocode' value={values.geocode} onChange={handleChange}/>
          </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end">
      {/*Boton Eliminar*/}
      {
        !showDelete ? 
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem'}} variant="secondary" onClick={handleDelete}>
          Eliminar
        </Button>
        :
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
      
      {/*Boton Guardar*/}
      {
        !chargingEdit ? 
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', marginLeft: '1rem', width: '9rem'}} variant="secondary" onClick={handleUpdate}>
          Guardar
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
