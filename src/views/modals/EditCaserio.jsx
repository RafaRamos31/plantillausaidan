import { useContext, useEffect, useState } from "react";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";

export const EditCaserio = ({handleClose, setRefetchData, caserio, fixing=false}) => {
  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idCaserio: caserio.id,
    nombre: caserio.nombre,
    idDepartamento: caserio.idDepartamento || caserio.departamento._id,
    idMunicipio: caserio.idMunicipio || caserio.municipio._id,
    idAldea: caserio.idAldea || caserio.aldea._id,
    geocode: caserio.geocode.substring(6),
    aprobar: aprove
  });
  
  const handleToggleAprobar = () => {
    setAprove(!aprove);
    setValues({ ...values, aprobar: !values.aprobar });
  }

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Departamento
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos, setRefetch: setRefetchDeptos } = useFetchGetBody('list/departamentos', findParams);
  
  //Indicador actualizando con boton departamento
  const [updatingDepto, setUpdatingDepto] = useState(false);

  //Accion Update manual
  const handleUpdateDepto = () => {
    setUpdatingDepto(true);
    setRefetchDeptos(true);
  }
  
  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
      setUpdatingDepto(false)
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Municipio
  const [findParamsMunicipios, setFindParamsMunicipios] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [municipios, setMunicipios] = useState([])
  const [queryMunicipios, setQueryMunicipios] = useState('')
  const { data: muniData, isLoading: isLoadingMuni, error: errorMuni, setRefetch: setRefetchMuni } = useFetchGetBody(queryMunicipios, findParamsMunicipios);
  
  //Indicador actualizando con boton departamento
  const [updatingMunicipios, setUpdatingMunicipios] = useState(false);

  //Accion Update manual
  const handleUpdateMunicipios = () => {
    setUpdatingMunicipios(true);
    setRefetchMuni(true);
  }
  
  useEffect(() => {
    if(muniData && !isLoadingMuni && values.idDepartamento){
      setMunicipios(muniData)
      setUpdatingMunicipios(false)
    } 
  }, [muniData, isLoadingMuni, errorMuni, values.idDepartamento])

  //Editar Lista de Municipios en Formulario
  useEffect(() => {
    if(values.idDepartamento && values.idDepartamento.length > 0){
      setFindParamsMunicipios({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'departamento',
          value: values.idDepartamento
        })
      })
      setQueryMunicipios('list/municipios')
      setRefetchMuni(true)
      setValues({ ...values });
    }
    else{
      setMunicipios([])
    }
    // eslint-disable-next-line
  }, [values.idDepartamento, setValues, setRefetchMuni])

  //Aldea
  const [findParamsAldea, setFindParamsAldea] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [aldeas, setAldeas] = useState([])
  const [queryAldeas, setQueryAldeas] = useState('')
  const { data: aldeasData, isLoading: isLoadingAldeas, error: errorAldeas, setRefetch: setRefetchAldeas } = useFetchGetBody(queryAldeas, findParamsAldea);
  
  useEffect(() => {
    if(aldeasData && !isLoadingAldeas && values.idMunicipio){
      setAldeas(aldeasData)
      setUpdatingAldeas(false)
    } 
  }, [aldeasData, isLoadingAldeas, errorAldeas, values.idMunicipio])

  //Editar Lista de Aldeas en Formulario
  useEffect(() => {
    if(values.idMunicipio && values.idMunicipio.length > 0){
      setFindParamsAldea({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'municipio',
          value: values.idMunicipio
        })
      })
      setQueryAldeas('list/aldeas')
      setRefetchAldeas(true)
      setValues({ ...values});
    }
    else{
      setAldeas([])
    }
    // eslint-disable-next-line
  }, [values.idMunicipio, setValues, setRefetchAldeas])

  //Indicador actualizando con boton departamento
  const [updatingAldeas, setUpdatingAldeas] = useState(false);

  //Accion Update manual
  const handleUpdateAldeas = () => {
    setUpdatingAldeas(true);
    setRefetchAldeas(true);
  }

  //Editar Aldea en Formulario
  const [geo, setGeo] = useState('000000')

  useEffect(() => {
    if(values.idAldea && values.idAldea.length > 0){
      setGeo(aldeas.find(aldea => aldea._id === values.idAldea)?.geocode || '000000')
    }
    else{
      setGeo('000000')
    }
    
  }, [values, aldeas])

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Caserio No Encontrado')
    setContent('El Caserio que deseas modificar ya no existe.')
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
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('caserios', 
  {...values, geocode: `${geo}${values.geocode}`}) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const navigate = useNavigate();

  const handleSuccessEdit = () => {
    if(fixing){
      navigate('/reviews/caserios/'+dataEdit._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      handleClose()
      setShowToast(true)
      actualizarTitulo('Caserio Modificado')
      setContent('Caserio guardado correctamente.')
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
      <h4 className="my-1">Modificar Caserio</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Caserio:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={40} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Departamento:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <Form.Select id='idDepartamento' name='idDepartamento' value={values.idDepartamento} onChange={handleChange}>
                <option value="">Seleccionar Departamento</option>
                {
                  deptos &&
                  deptos.map((depto) => (
                    <option key={depto._id} value={depto._id}>{depto.nombre}</option>
                  ))
                }
              </Form.Select>
              {
                !updatingDepto ? 
                <Button variant="light" onClick={handleUpdateDepto}>
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
            Municipio:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <Form.Select id='idMunicipio' name='idMunicipio' value={values.idMunicipio} onChange={handleChange}>
                <option value="">Seleccionar Municipio</option>
                {
                  municipios &&
                  municipios.map((muni) => (
                    <option key={muni._id} value={muni._id}>{muni.nombre}</option>
                  ))
                }
              </Form.Select>
              {
                !updatingMunicipios ? 
                <Button variant="light" onClick={handleUpdateMunicipios}>
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
            Aldea:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <Form.Select id='idAldea' name='idAldea' value={values.idAldea} onChange={handleChange}>
                <option value="">Seleccionar Aldea</option>
                {
                  aldeas &&
                  aldeas.map((aldea) => (
                    <option key={aldea._id} value={aldea._id}>{aldea.nombre}</option>
                  ))
                }
              </Form.Select>
              {
                !updatingAldeas ? 
                <Button variant="light" onClick={handleUpdateAldeas}>
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
          <Col sm="4">
            <InputGroup>
              <InputGroup.Text placeholder="00">{geo}</InputGroup.Text>
              <Form.Control id='geocode' name='geocode' placeholder="000" maxLength={3} value={values.geocode} onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Caserios']['Revisar']
        ?
        <Form.Group>
          <Form.Check type="checkbox" label="Aprobar al enviar" id='aprobar' name='aprobar' checked={values.aprobar} onChange={handleToggleAprobar}/>
        </Form.Group>
        :
        <div></div>
      }
      {
        !chargingEdit ?
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginLeft: '1rem'}} variant="secondary" onClick={handleSubmit}>
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
  )
}
