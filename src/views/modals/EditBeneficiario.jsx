import { useContext, useEffect, useState } from "react";
import { useFetchDeleteBody, useFetchGet, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { MapInput } from "../../components/MapInput.jsx";

export const EditBeneficiario = ({handleClose, setRefetch, beneficiario}) => {

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, setValues, handleChange } = useForm({
    idBeneficiario: beneficiario.id,
    nombre: beneficiario.nombre,
    dni: beneficiario.dni,
    sexo: beneficiario.sexo,
    fechaNacimiento: beneficiario.fechaNacimiento,
    telefono: beneficiario.telefono,
    idDepartamento: beneficiario.departamento,
    idMunicipio: beneficiario.municipio,
    idAldea: beneficiario.aldea,
    idCaserio: beneficiario.caserio,
    idOrganizacion: beneficiario.organizacion,
    idCargo: beneficiario.cargo,
    geolocacion: beneficiario.geolocacion,
  });

  const changeLocation = (location) => {
    setValues((previos) => {
      return { ...previos, 'geolocacion': location }
    });
  }

  const changeSexo = (value) => {
    setValues({ ...values, 'sexo': value });
  }

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


  //Organizacion
  const [organizaciones, setOrganizaciones] = useState([])
  const { data: organizacionesData, isLoading: isLoadingOrganizaciones, error: errorOrganizaciones } = useFetchGet('organizacioneslist');
  
  useEffect(() => {
    if(organizacionesData && !isLoadingOrganizaciones){
      setOrganizaciones(organizacionesData)
    } 
  }, [organizacionesData, isLoadingOrganizaciones, errorOrganizaciones])

  //Cargos
  const [cargos, setCargos] = useState([])
  const [queryCargos, setQueryCargos] = useState('')
  const { data: cargosData, isLoading: isLoadingCargos, error: errorCargos, setRefetch: setRefetchCargos } = useFetchGet(queryCargos);
  
  useEffect(() => {
    if(cargosData && !isLoadingCargos){
      setCargos(cargosData)
    } 
  }, [cargosData, isLoadingCargos, errorCargos])

  //Editar Cargo en Formulario
  useEffect(() => {
    if(values.idOrganizacion && values.idOrganizacion.length > 0){
      setQueryCargos('cargos/'+values.idOrganizacion)
      setRefetchCargos(true)
    }
    else{
      setCargos([])
    }
    
  }, [values, organizaciones, setRefetchCargos])


  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Beneficiario No Encontrado')
    setContent('El Beneficiario que deseas modificar ya no existe.')
    setVariant('warning')
  }

  //Accion por defecto envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate()
  }

  //Boton de carga Modificar
  const [chargingEdit, setChargingEdit] = useState(false);
  
  //Envio asincrono de formulario de Modificar
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('beneficiarios', values) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion
  const handleSuccessEdit = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Beneficiario Modificado')
    setContent('Beneficiario guardado correctamente.')
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
  const { setSend: setSendDelete, send: sendDelete, data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, code: codeDelete } = useFetchDeleteBody('beneficiarios', {idBeneficiario: values.idBeneficiario}) 

  const handleSendDelete = () => {
    setChargingDelete(true)
    setSendDelete(true)
  }

  //Accion al completar correctamente Eliminacion
  const handleSuccessDelete = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Beneficiario Eliminado')
    setContent('Beneficiario eliminado correctamente.')
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
      <h4 className="my-1">Perfil Beneficiarios</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre del Beneficiario:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            DNI:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='dni' name='dni' value={values.dni} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Sexo:
          </Form.Label>
          <Col sm="8">
            <div className="d-flex">
              <div>
                <Form.Check
                  type="radio"
                  label="M"
                  name="sexo"
                  value={1}
                  checked={values.sexo === 1}
                  onChange={() => changeSexo(1)}
                  />
              </div>
              <div className="mx-3">
                <Form.Check
                  type="radio"
                  label="F"
                  name="sexo"
                  value={2}
                  checked={values.sexo === 2}
                  onChange={() => changeSexo(2)}
                />
              </div>
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Fecha de Nacimiento:
          </Form.Label>
          <Col sm="8">
            <Form.Control type='date' id='fechaNacimiento' name='fechaNacimiento'  value={values.fechaNacimiento} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='telefono' name='telefono' value={values.telefono} onChange={handleChange}/>
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

        <MapInput changeLocation={changeLocation} initialLocation={values.geolocacion}/>

        <Card className='my-4'>
        <Card.Header>
          <h5>Organizacion</h5>
        </Card.Header>
        <Card.Body className='p-4'>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Organización:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idOrganizacion' name='idOrganizacion' value={values.idOrganizacion} onChange={handleChange}>
            <option value="">Seleccionar Organización</option>
            {
              organizaciones &&
              organizaciones.map((organizacion) => (
                <option key={organizacion._id} value={organizacion._id}>{organizacion.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Cargo:
          </Form.Label>
          <Col sm="8">
          <Form.Select id='idCargo' name='idCargo' value={values.idCargo} onChange={handleChange}>
            <option value="">Seleccionar Cargo</option>
            {
              cargos &&
              cargos.map((cargo) => (
                <option key={cargo._id} value={cargo._id}>{cargo.nombre}</option>
              ))
            }
          </Form.Select>
          </Col>
        </Form.Group>

        </Card.Body>
        </Card>
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
