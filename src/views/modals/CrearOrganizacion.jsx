import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchPostBody } from "../../hooks/useFetch.js";
import { getArrayNivelesOrganizacion } from "../../services/staticCollections.js";

export const CrearOrganizacion = ({handleClose, setRefetch}) => {
  //Formulario
  const { values, handleChange } = useForm({
    nombre: '',
    codigoOrganizacion: '',
    idOrgtype: '',
    nivelOrganizacion: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: '',
    telefonoOrganizacion: '',
    nombreContacto: '',
    telefonoContacto: '',
    correoContacto: '',
  });

  //Tipo Organizacion
  const [orgtypes, setOrgtypes] = useState([])
  const { data: orgtypesData, isLoading: isLoadingOrgtypes, error: errorOrgtypes } = useFetchGet('orgtypes');
  
  useEffect(() => {
    if(orgtypesData && !isLoadingOrgtypes){
      setOrgtypes(orgtypesData)
    } 
  }, [orgtypesData, isLoadingOrgtypes, errorOrgtypes])

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

  //Aldeas
  const [aldeas, setAldeas] = useState([])
  const [queryAldeas, setQueryAldeas] = useState('')
  const { data: aldeasData, isLoading: isLoadingAldeas, error: errorAldeas, setRefetch: setRefetchAldeas } = useFetchGet(queryAldeas);
  
  useEffect(() => {
    if(aldeasData && !isLoadingAldeas){
      setAldeas(aldeasData)
    } 
  }, [aldeasData, isLoadingAldeas, errorAldeas])

  //Caserios
  const [caserios, setCaserios] = useState([])
  const [queryCaserios, setQueryCaserios] = useState('')
  const { data: caseriosData, isLoading: isLoadingCaserios, error: errorCaserios, setRefetch: setRefetchCaserios } = useFetchGet(queryCaserios);
  
  useEffect(() => {
    if(caseriosData && !isLoadingCaserios){
      setCaserios(caseriosData)
    } 
  }, [caseriosData, isLoadingCaserios, errorCaserios])

  //Editar Municipio en Formulario
  useEffect(() => {
    if(values.idDepartamento && values.idDepartamento.length > 0){
      setQueryMunicipios('municipios/'+values.idDepartamento)
      setRefetchMunicipios(true)
    }
    else{
      setMunicipios([])
    }
    
  }, [values, deptos, setRefetchMunicipios])

  //Editar Aldea en Formulario
  useEffect(() => {
    if(values.idMunicipio && values.idMunicipio.length > 0){
      setQueryAldeas('aldeas/'+values.idMunicipio)
      setRefetchAldeas(true)
    }
    else{
      setMunicipios([])
    }
    
  }, [values, deptos, setRefetchAldeas])

  //Editar Caserio en Formulario
  useEffect(() => {
    if(values.idAldea && values.idAldea.length > 0){
      setQueryCaserios('caserios/'+values.idAldea)
      setRefetchCaserios(true)
    }
    else{
      setCaserios([])
    }
    
  }, [values, deptos, setRefetchCaserios])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('organizaciones', values) 

  const handleCreate = (e) => {
    e.preventDefault();
    setSend(true);
    setCharging(true)
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Organización Creada')
    setContent('Organización guardada correctamente.')
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
      <h4 className="my-1">Perfil Organizaciones</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre de la Organización:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Código de la Organización:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='codigoOrganizacion' name='codigoOrganizacion' value={values.codigoOrganizacion} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Tipo de Organización:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idOrgtype' name='idOrgtype' value={values.idOrgtype} onChange={handleChange}>
            <option value="">Seleccionar Tipo</option>
            {
              orgtypes &&
              orgtypes.map((orgtype) => (
                <option key={orgtype._id} value={orgtype._id}>{orgtype.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nivel de Organización:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='nivelOrganizacion' name='nivelOrganizacion' value={values.nivelOrganizacion} onChange={handleChange}>
            <option value="">Seleccionar Nivel</option>
            {
              getArrayNivelesOrganizacion().map((nivel, index) => (
                <option key={index} value={index}>{nivel}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono de la Organización:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='telefonoOrganizacion' name='telefonoOrganizacion' value={values.telefonoOrganizacion} onChange={handleChange}/>
          </Col>
        </Form.Group>
        
        <Card className='mb-4'>
          <Card.Header>
            <h5>Ubicación</h5>
          </Card.Header>
          <Card.Body className='p-4'>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Departamento:
            </Form.Label>
            <Col sm="8">
            <Form.Select id='idDepartamento' name='idDepartamento' value={values.idDepartamento} onChange={handleChange}>
              <option value="">Seleccionar Departamento</option>
              {
                deptos &&
                deptos.map((departamento) => (
                  <option key={departamento._id} value={departamento._id}>{departamento.nombre}</option>
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
              Aldea:
            </Form.Label>
            <Col sm="8">
            <Form.Select id='idAldea' name='idAldea' value={values.idAldea} onChange={handleChange}>
              <option value="">Seleccionar Aldea</option>
              {
                aldeas &&
                aldeas.map((aldea) => (
                  <option key={aldea._id} value={aldea._id}>{aldea.nombre}</option>
                ))
              }
            </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Caserio:
            </Form.Label>
            <Col sm="8">
            <Form.Select id='idCaserio' name='idCaserio' value={values.idCaserio} onChange={handleChange}>
              <option value="">Seleccionar Caserio</option>
              {
                caserios &&
                caserios.map((caserio) => (
                  <option key={caserio._id} value={caserio._id}>{caserio.nombre}</option>
                ))
              }
            </Form.Select>
            </Col>
          </Form.Group>
          </Card.Body>
        </Card>

        <Card className='mb-4'>
        <Card.Header>
          <h5>Contacto</h5>
        </Card.Header>
        <Card.Body className='p-4'>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre de Contacto:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombreContacto' name='nombreContacto' value={values.nombreContacto} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono de Contacto:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='telefonoContacto' name='telefonoContacto' value={values.telefonoContacto} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Correo de Contacto:
          </Form.Label>
          <Col sm="8">
            <Form.Control type='email' id='correoContacto' name='correoContacto' value={values.correoContacto} onChange={handleChange}/>
          </Col>
        </Form.Group>

          </Card.Body>
        </Card>
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
