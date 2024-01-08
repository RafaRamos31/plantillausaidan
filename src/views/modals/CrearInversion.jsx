import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchPostBody } from "../../hooks/useFetch.js";
import { getArraySectores } from "../../services/staticCollections.js";

export const CrearInversion = ({handleClose, setRefetch}) => {
  //Formulario
  const { values, handleChange } = useForm({
    nombre: '',
    sector: '',
    idArea: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: '',
    fecha: '',
    monto: ''
  });

  //Areas
  const [areas, setAreas] = useState([])
  const { data: areasData, isLoading: isLoadingAreas, error: errorAreas } = useFetchGet('areasinv');
  
  useEffect(() => {
    if(areasData && !isLoadingAreas){
      setAreas(areasData)
    } 
  }, [areasData, isLoadingAreas, errorAreas])

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
  const { setSend, send, data, isLoading, error } = useFetchPostBody('inversiones', values) 

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
    actualizarTitulo('Inversión Creada')
    setContent('Inversión guardada correctamente.')
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
      <h4 className="my-1">Perfil Inversiónes</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Sector:
            </Form.Label>
            <Col sm="8">
            <Form.Select id='sector' name='sector' value={values.sector} onChange={handleChange}>
              <option value="">Seleccionar Sector</option>
              {
                getArraySectores().map((sector, index) => (
                  <option key={index} value={index}>{sector}</option>
                ))
              }
            </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Área Temática:
            </Form.Label>
            <Col sm="8">
            <Form.Select id='idArea' name='idArea' value={values.idArea} onChange={handleChange}>
              <option value="">Seleccionar Área Temática</option>
              {
                areas &&
                areas.map((area) => (
                  <option key={area._id} value={area._id}>{area.nombre}</option>
                ))
              }
            </Form.Select>
            </Col>
          </Form.Group>

        <Card>
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Fecha de la Inversión:
          </Form.Label>
          <Col sm="8">
            <Form.Control type='date' id='fecha' name='fecha' value={values.fecha} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Monto:
          </Form.Label>
          <Col sm="8">
            <InputGroup className="mb-3">
              <InputGroup.Text>L.</InputGroup.Text>
              <Form.Control placeholder="0.00" id='monto' name='monto' value={values.monto} onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>
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
