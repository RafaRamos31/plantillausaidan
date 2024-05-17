import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearMunicipio } from "./CrearMunicipio.jsx";
import { CrearAldea } from "./CrearAldea.jsx";
import { UserContext } from "../../contexts/UserContext.js";

export const CrearCaserio = ({handleClose, setRefetch, modalRefetch, modal=false}) => {

  const { user } = useContext(UserContext);
  const { aprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    departamentoId: '',
    municipioId: '',
    aldeaId: '',
    geocode: '',
    aprobar: modal ? true : aprove
  });
  
  //Departamento
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos, setRefetch: setRefetchDeptos } = useFetchGetBody('departamentos/list', findParams);
  
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
    if(muniData && !isLoadingMuni && values.departamentoId){
      setMunicipios(muniData)
      setUpdatingMunicipios(false)
    } 
  }, [muniData, isLoadingMuni, errorMuni, values.departamentoId])

  //Editar Lista de Municipios en Formulario
  useEffect(() => {
    if(values.departamentoId && values.departamentoId.length !== 0){
      setFindParamsMunicipios({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'departamentoId',
          value: values.departamentoId
        })
      })
      setQueryMunicipios('municipios/list');
      setRefetchMuni(true)
      setValues({ ...values, geocode: '' });
    }
    else{
      setMunicipios([])
    }
    // eslint-disable-next-line
  }, [values.departamentoId, setValues, setRefetchMuni])

  //Aldea
  const [findParamsAldea, setFindParamsAldea] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [aldeas, setAldeas] = useState([])
  const [queryAldeas, setQueryAldeas] = useState('')
  const { data: aldeasData, isLoading: isLoadingAldeas, error: errorAldeas, setRefetch: setRefetchAldeas } = useFetchGetBody(queryAldeas, findParamsAldea);
  
  useEffect(() => {
    if(aldeasData && !isLoadingAldeas && values.municipioId){
      setAldeas(aldeasData)
      setUpdatingAldeas(false)
    } 
  }, [aldeasData, isLoadingAldeas, errorAldeas, values.municipioId])

  //Editar Lista de Aldeas en Formulario
  useEffect(() => {
    if(values.municipioId && values.municipioId.length !== 0){
      setFindParamsAldea({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'municipioId',
          value: values.municipioId
        })
      })
      setQueryAldeas('aldeas/list')
      setRefetchAldeas(true)
      setValues({ ...values, geocode: '' });
    }
    else{
      setAldeas([])
    }
    // eslint-disable-next-line
  }, [values.municipioId, setValues, setRefetchAldeas])

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
    if(values.aldeaId && values.aldeaId.length !== 0){
      // eslint-disable-next-line
      setGeo(aldeas.find(aldea => aldea.id == values.aldeaId)?.geocode || '000000')
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
            <Form.Control id='nombre' name='nombre' value={values.nombre.toUpperCase()} maxLength={40} autoComplete={'off'} onChange={handleChange}/>
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
                value={values.municipioId}
                name={'municipioId'}
                setValues={setValues}
                setRefetch={setRefetchMuni}
                ModalCreate={CrearMunicipio}
                insert={municipios.length > 0 && user.userPermisos?.acciones['Municipios']['Crear']}
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
                value={values.aldeaId}
                name={'aldeaId'}
                setValues={setValues}
                setRefetch={setRefetchAldeas}
                ModalCreate={CrearAldea}
                insert={aldeas.length > 0 && user.userPermisos?.acciones['Aldeas']['Crear']}
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
