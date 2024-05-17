import { useContext, useEffect, useState } from "react";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { AproveContext } from "../../contexts/AproveContext.js";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { CrearMunicipio } from "./CrearMunicipio.jsx";
import { UserContext } from "../../contexts/UserContext.js";

export const EditAldea = ({handleClose, setRefetchData, aldea, fixing=false}) => {

  const { user } = useContext(UserContext);
  const { aprove } = useContext(AproveContext);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idAldea: aldea.id,
    nombre: aldea.nombre,
    departamentoId: aldea.departamentoId,
    municipioId: aldea.municipioId,
    geocode: aldea.geocode.substring(4),
    aprobar: aprove
  });

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

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
      setQueryMunicipios('municipios/list')
      setRefetchMuni(true)
      setValues({ ...values });
    }
    else{
      setMunicipios([])
    }
    // eslint-disable-next-line
  }, [values.departamentoId, setValues, setRefetchMuni])

  //Editar Municipio en Formulario
  const [geo, setGeo] = useState('0000')

  useEffect(() => {
    if(values.municipioId && values.municipioId.length !== 0){
      // eslint-disable-next-line
      setGeo(municipios.find(muni => muni.id == values.municipioId)?.geocode || '0000')
    }
    else{
      setGeo('0000')
    }
    
  }, [values, municipios])

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
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('aldeas', 
  {...values, geocode: `${geo}${values.geocode}`}) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const navigate = useNavigate();

  const handleSuccessEdit = () => {
    if(fixing){
      navigate('/reviews/aldeas/'+dataEdit._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      handleClose()
      setShowToast(true)
      actualizarTitulo('Aldea Modificada')
      setContent('Aldea guardada correctamente.')
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
      <h4 className="my-1">Modificar Aldea</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Aldea:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre.toUpperCase()} maxLength={50} onChange={handleChange}/>
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
          <Form.Label column sm="4">
            Geocode:
          </Form.Label>
          <Col sm="4">
            <InputGroup>
              <InputGroup.Text placeholder="00">{geo}</InputGroup.Text>
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
