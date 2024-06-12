import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { InputDNI } from "../../components/InputDNI.jsx";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearSectores } from "./CrearSectores.jsx";
import { CrearOrgtype } from "./CrearOrgtype.jsx";
import { CrearOrganizacion } from "./CrearOrganizacion.jsx";
import { CrearCargo } from "./CrearCargos.jsx";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { CrearMunicipio } from "./CrearMunicipio.jsx";

export const CrearBeneficiario = ({handleClose, setRefetch, initialDNI=null, setParticipantes, setRegistrados, refreshDNI, modal=false}) => {
  const { user } = useContext(UserContext);

  //Formulario
  const { values, setValues, handleChange } = useForm({
    nombre: '',
    dni: initialDNI ? initialDNI : '',
    sexo: '',
    fechaNacimiento: '',
    telefono: '',
    tipoBeneficiario: '',
    sectorId: '',
    tipoOrganizacionId: '',
    organizacionId: '',
    cargoId: '',
    departamentoId: '',
    municipioId: '',
    procedencia: '',
    anotaciones: '',
    aprobar: user.userPermisos?.acciones['Beneficiarios']['Revisar']
  });


  //Sectores
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [sectores, setSectores] = useState([])
  const { data: sectorData, isLoading: isLoadingSectores, error: errorSectores, setRefetch: setRefetchSectores } = useFetchGetBody('sectores/list', findParams);
  
  //Indicador actualizando con boton
  const [updatingSectores, setUpdatingSectores] = useState(false);

  //Accion Update manual sectores
  const handleUpdate = () => {
    setUpdatingSectores(true);
    setRefetchSectores(true);
  }
  
  useEffect(() => {
    if(sectorData && !isLoadingSectores){
      setSectores(sectorData)
      setUpdatingSectores(false)
    } 
  }, [sectorData, isLoadingSectores, errorSectores])


  //Tipo Organizacion
  const [orgtypes, setOrgtypes] = useState([])
  const [queryOrgtypes, setQueryOrgtypes] = useState([])
  const [findParamsOrgTypes, setFindParamsOrgtypes] = useState({
    sort: '{}',
    filter: '{}'
  })
  const { data: orgtypesData, isLoading: isLoadingOrgtypes, error: errorOrgtypes, setRefetch: setRefetchOrgtypes } = useFetchGetBody(queryOrgtypes, findParamsOrgTypes);
  
  //Accion Update manual orgtypes
  const handleUpdateOrgtypes = () => {
    setUpdatingOrgtypes(true);
    setRefetchOrgtypes(true);
  }

  //Indicador actualizando con boton
  const [updatingOrgtypes, setUpdatingOrgtypes] = useState(false);

  useEffect(() => {
    if(orgtypesData && !isLoadingOrgtypes){
      setOrgtypes(orgtypesData)
      setUpdatingOrgtypes(false)
    } 
  }, [orgtypesData, isLoadingOrgtypes, errorOrgtypes])


  //Cargos
  const [cargos, setCargos] = useState([])
  const [queryCargos, setQueryCargos] = useState([])
  const [findParamsCargos, setFindParamsCargos] = useState({
    sort: '{}',
    filter: '{}'
  })
  const { data: cargosData, isLoading: isLoadingCargos, error: errorCargos, setRefetch: setRefetchCargos } = useFetchGetBody(queryCargos, findParamsCargos);
  
  //Accion Update manual orgtypes
  const handleUpdateCargos = () => {
    setUpdatingCargos(true);
    setRefetchCargos(true);
  }

  //Indicador actualizando con boton
  const [updatingCargos, setUpdatingCargos] = useState(false);

  useEffect(() => {
    if(cargosData && !isLoadingCargos){
      setCargos(cargosData)
      setUpdatingCargos(false)
    } 
  }, [cargosData, isLoadingCargos, errorCargos])


  //Editar Lista de Cargos en Formulario
  useEffect(() => {
    if(values.sectorId && values.sectorId.length !== 0){
      setFindParamsCargos({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'sectorId',
          value: values.sectorId
        })
      })
      setQueryCargos('cargos/list');
      setRefetchCargos(true)
    }
    else{
      setCargos([])
    }
    // eslint-disable-next-line
  }, [values.sectorId, setValues, setRefetchCargos])
  


  //Editar Lista de Orgtypes en Formulario
  useEffect(() => {
    if(values.sectorId && values.sectorId.length !== 0){
      setFindParamsOrgtypes({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'sectorId',
          value: values.sectorId
        })
      })
      setQueryOrgtypes('tiposorganizaciones/list');
      setRefetchOrgtypes(true)
    }
    else{
      setOrgtypes([])
    }
    // eslint-disable-next-line
  }, [values.sectorId, setValues, setRefetchOrgtypes])


  //Organizaciones
  const [organizaciones, setOrganizaciones] = useState([])
  const [queryOrganizaciones, setQueryOrganizaciones] = useState([])
  const [findParamsOrganizaciones, setFindParamsOrganizaciones] = useState({
    sort: '{}',
    filter: '{}'
  })
  const { data: organizacionesData, isLoading: isLoadingOrganizaciones, error: errorOrganizaciones, setRefetch: setRefetchOrganizaciones } = useFetchGetBody(queryOrganizaciones, findParamsOrganizaciones);
  
  //Accion Update manual orgtypes
  const handleUpdateOrganizaciones = () => {
    setUpdatingOrganizaciones(true);
    setRefetchOrganizaciones(true);
  }

  //Indicador actualizando con boton
  const [updatingOrganizaciones, setUpdatingOrganizaciones] = useState(false);

  useEffect(() => {
    if(organizacionesData && !isLoadingOrganizaciones){
      setOrganizaciones(organizacionesData)
      setUpdatingOrganizaciones(false)
    } 
  }, [organizacionesData, isLoadingOrganizaciones, errorOrganizaciones])

  //Editar Lista de Organizaciones en Formulario
  useEffect(() => {
    if(values.tipoOrganizacionId && values.tipoOrganizacionId.length !== 0){
      setFindParamsOrganizaciones({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'tipoOrganizacionId',
          value: values.tipoOrganizacionId
        })
      })
      setQueryOrganizaciones('organizaciones/list');
      setRefetchOrganizaciones(true)
    }
    else{
      setOrganizaciones([])
    }
    // eslint-disable-next-line
  }, [values.tipoOrganizacionId, setValues, setRefetchOrganizaciones])


  //Departamento
  const findParamsDepto = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos, setRefetch: setRefetchDeptos } = useFetchGetBody('departamentos/list', findParamsDepto);
  
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
    }
    else{
      setMunicipios([])
    }
    // eslint-disable-next-line
  }, [values.departamentoId, setValues, setRefetchMuni])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('beneficiarios', values) 

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
    if(setParticipantes){
      setParticipantes(p => p.concat(data))
      setRegistrados(r => {
        if(data.sexo === 'M'){
          r = {...r, hombres: r.hombres + 1}
        }
        else{
          r = {...r, mujeres: r.mujeres + 1}
        }

        if(data.tipoBeneficiario === 'Comunitario'){
          r = {...r, comunitarios: r.comunitarios + 1}
        }
        else{
          r = {...r, institucionales: r.institucionales + 1}
        }
        return r;
      })
      refreshDNI()
    }
    else{
      setRefetch()
    }
    setShowToast(true)
    actualizarTitulo('Beneficiario Creado')
    setContent('Beneficiario guardado correctamente.')
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
      <h4 className="my-1">Crear Beneficiario</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>

        <InputDNI setValues={setValues} search value={values.dni}/>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre del Beneficiario:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control style={{height: '3rem'}} id='nombre' name='nombre' value={values.nombre.toUpperCase()} maxLength={50} autoComplete="off" onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Sexo:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Group>
              <RadioGroup
                row
                name="sexo"
                value={values.sexo}
                onChange={handleChange}
              >
                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
              </RadioGroup>
            </Form.Group>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Fecha de Nacimiento:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control style={{height: '3rem'}} type='date' id='fechaNacimiento' name='fechaNacimiento' value={values.fechaNacimiento} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono del Beneficiario:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control style={{height: '3rem'}} id='telefono' name='telefono' value={values.telefono} maxLength={20} autoComplete="off" onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Tipo de Beneficiario:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Group>
              <RadioGroup
                row
                name="tipoBeneficiario"
                value={values.tipoBeneficiario}
                onChange={handleChange}
              >
                <FormControlLabel value="Comunitario" control={<Radio />} label="Comunitario" />
                <FormControlLabel value="Institucional" control={<Radio />} label="Institucional" />
              </RadioGroup>
            </Form.Group>
          </Col>
        </Form.Group>

        <Card className="mb-4">
          <Card.Header>
            <h5>Organización</h5>
          </Card.Header>
          <Card.Body>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" className="my-auto">
              Sector:
            </Form.Label>
            <Col sm="8">
              <InputGroup>
                  <InputAutocomplete
                    valueList={sectores} 
                    value={values.sectorId}
                    name={'sectorId'}
                    setValues={setValues}
                    setRefetch={setRefetchSectores}
                    ModalCreate={CrearSectores}
                    insert={user.userPermisos?.acciones['Sectores']['Crear']}
                  />
                {
                  !updatingSectores ? 
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
            <Form.Label column sm="4" className="my-auto">
              Tipo de Organización:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <InputGroup>
                  <InputAutocomplete
                    valueList={orgtypes} 
                    value={values.tipoOrganizacionId}
                    name={'tipoOrganizacionId'}
                    setValues={setValues}
                    setRefetch={setRefetchOrgtypes}
                    ModalCreate={CrearOrgtype}
                    insert={sectores.length > 0 && user.userPermisos?.acciones['Tipos de Organizaciones']['Crear']}
                  />
                {
                  !updatingOrgtypes ? 
                  <Button variant="light" onClick={handleUpdateOrgtypes}>
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
              Organización:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <InputGroup>
                <InputAutocomplete
                  valueList={organizaciones} 
                  value={values.organizacionId}
                  name={'organizacionId'}
                  setValues={setValues}
                  setRefetch={setRefetchOrganizaciones}
                  ModalCreate={CrearOrganizacion}
                  insert={orgtypes.length > 0 && user.userPermisos?.acciones['Organizaciones']['Crear']}
                />
                {
                  !updatingOrganizaciones ? 
                  <Button variant="light" onClick={handleUpdateOrganizaciones}>
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

          <Form.Group as={Row} className="mt-4">
            <Form.Label column sm="4" className="my-auto">
              Cargo:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <InputGroup>
                <InputAutocomplete
                  valueList={cargos} 
                  value={values.cargoId}
                  name={'cargoId'}
                  setValues={setValues}
                  setRefetch={setRefetchCargos}
                  ModalCreate={CrearCargo}
                  insert={sectores.length > 0 && user.userPermisos?.acciones['Cargos']['Crear']}
                />
                {
                  !updatingCargos ? 
                  <Button variant="light" onClick={handleUpdateCargos}>
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
          </Card.Body>
        </Card>
        
        <Card className="mb-4">
          <Card.Header>
            <h5>Ubicación</h5>
          </Card.Header>
          <Card.Body className='p-4'>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className="my-auto">
                Departamento:
              </Form.Label>
              <Col sm="8" className="my-auto">
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
                    insert={deptos.length > 0 && user.userPermisos?.acciones['Municipios']['Crear']}
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

            <Form.Group as={Row} className="mb-1">
              <Form.Label column sm="4" className="my-auto">
                Procedencia:
              </Form.Label>
              <Col sm="8" className="my-auto">
                <Form.Control style={{height: '3.5rem'}} id='procedencia' name='procedencia' value={values.procedencia} maxLength={40} onChange={handleChange}/>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="">
          <Card.Header>
            <h5>Anotaciones</h5>
          </Card.Header>
          <Card.Body className='p-4'>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Control id='anotaciones' name='anotaciones'  as="textarea" rows={4} maxLength={500} value={values.anotaciones} onChange={handleChange}/>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
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
