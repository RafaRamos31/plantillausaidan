import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearMunicipio } from "./CrearMunicipio.jsx";
import { CrearAldea } from "./CrearAldea.jsx";

export const CrearCaserio = ({handleClose, setRefetch, modalRefetch, modal=false}) => {
  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    geocode: '',
    aprobar: modal ? true : aprove
  });

  const handleToggleAprobar = () => {
    setAprove(!aprove)
    setValues({ ...values, aprobar: !values.aprobar });
  }
  
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
      setQueryMunicipios('list/municipios');
      setRefetchMuni(true)
      setValues({ ...values, geocode: '' });
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
      setValues({ ...values, geocode: '' });
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
  
  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('caserios', {...values, geocode: `${geo}${values.geocode}`}) 

  const handleCreate = (e) => {
    e.preventDefault();
    if(values.geocode){
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
    actualizarTitulo('Caserio Creado')
    setContent('Caserio guardado correctamente.')
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
      <h4 className="my-1">Crear Caserio</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Caserio:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={40} autoComplete={'off'} onChange={handleChange}/>
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
                value={values.idDepartamento}
                name={'idDepartamento'}
                setValues={setValues}
                setRefetch={setRefetchDeptos}
                ModalCreate={CrearDepartamento}
              />
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
          <Form.Label column sm="4" className="my-auto">
            Municipio:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <InputAutocomplete 
                valueList={municipios} 
                value={values.idMunicipio}
                name={'idMunicipio'}
                setValues={setValues}
                setRefetch={setRefetchMuni}
                ModalCreate={CrearMunicipio}
              />
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
          <Form.Label column sm="4" className="my-auto">
            Aldea:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <InputAutocomplete 
                valueList={aldeas} 
                value={values.idAldea}
                name={'idAldea'}
                setValues={setValues}
                setRefetch={setRefetchAldeas}
                ModalCreate={CrearAldea}
              />
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
              <Form.Control id='geocode' name='geocode' placeholder="000" maxLength={3} value={values.geocode} autoComplete={'off'} onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        (!modal && user.userPermisos?.acciones['Caserios']['Revisar'])
        ?
        <Form.Group>
          <Form.Check type="checkbox" label="Aprobar al enviar" id='aprobar' name='aprobar' checked={values.aprobar} onChange={handleToggleAprobar}/>
        </Form.Group>
        :
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
  )
}
