import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { MapInput } from "../../components/MapInput.jsx";
import { UserContext } from "../../contexts/UserContext.js";
import { InputDNI } from "../../components/InputDNI.jsx";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AproveContext } from "../../contexts/AproveContext.js";

export const CrearBeneficiario = ({handleClose, setRefetch}) => {
  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Formulario
  const { values, setValues, handleChange } = useForm({
    nombre: '',
    dni: '',
    sexo: '',
    fechaNacimiento: '',
    telefono: '',
    idSector: '',
    idTipoOrganizacion: '',
    idOrganizacion: '',
    idCargo: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: '',
    geolocacion: '',
    aprobar: aprove
  });

  const changeLocation = (location) => {
    setValues({ ...values, 'geolocacion': location });
  }

  const handleToggleAprobar = () => {
    setAprove(!aprove);
    setValues({ ...values, aprobar: !values.aprobar });
  }

  //Sectores
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [sectores, setSectores] = useState([])
  const { data: sectorData, isLoading: isLoadingSectores, error: errorSectores, setRefetch: setRefetchSectores } = useFetchGetBody('list/sectores', findParams);
  
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
    if(values.idSector && values.idSector.length > 0){
      setFindParamsCargos({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'sector',
          value: values.idSector
        })
      })
      setQueryCargos('list/cargos');
      setRefetchCargos(true)
    }
    else{
      setCargos([])
    }
    // eslint-disable-next-line
  }, [values.idSector, setValues, setRefetchCargos])
  


  //Editar Lista de Orgtypes en Formulario
  useEffect(() => {
    if(values.idSector && values.idSector.length > 0){
      setFindParamsOrgtypes({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'sector',
          value: values.idSector
        })
      })
      setQueryOrgtypes('list/tipoOrganizaciones');
      setRefetchOrgtypes(true)
    }
    else{
      setOrgtypes([])
    }
    // eslint-disable-next-line
  }, [values.idSector, setValues, setRefetchOrgtypes])


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
    if(values.idTipoOrganizacion && values.idTipoOrganizacion.length > 0){
      setFindParamsOrganizaciones({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'tipoOrganizacion',
          value: values.idTipoOrganizacion
        })
      })
      setQueryOrganizaciones('list/organizaciones');
      setRefetchOrganizaciones(true)
    }
    else{
      setOrganizaciones([])
    }
    // eslint-disable-next-line
  }, [values.idTipoOrganizacion, setValues, setRefetchOrganizaciones])


  //Departamento
  const findParamsDepto = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos, setRefetch: setRefetchDeptos } = useFetchGetBody('list/departamentos', findParamsDepto);
  
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

  //Caserios
  const [findParamsCaserios, setFindParamsCaserios] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [caserios, setCaserios] = useState([])
  const [queryCaserios, setQueryCaserios] = useState('')
  const { data: caseriosData, isLoading: isLoadingCaserios, error: errorCaserios, setRefetch: setRefetchCaserios } = useFetchGetBody(queryCaserios, findParamsCaserios);
  
  useEffect(() => {
    if(caseriosData && !isLoadingCaserios && values.idAldea){
      setCaserios(caseriosData)
      setUpdatingCaserios(false)
    } 
  }, [caseriosData, isLoadingCaserios, errorCaserios, values.idAldea])

  //Editar Lista de Caserios en Formulario
  useEffect(() => {
    if(values.idAldea && values.idAldea.length > 0){
      setFindParamsCaserios({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'aldea',
          value: values.idAldea
        })
      })
      setQueryCaserios('list/caserios')
      setRefetchCaserios(true)
    }
    else{
      setCaserios([])
    }
    // eslint-disable-next-line
  }, [values.idAldea, setRefetchCaserios])

  //Indicador actualizando con boton departamento
  const [updatingCaserios, setUpdatingCaserios] = useState(false);

  //Accion Update manual
  const handleUpdateCaserios = () => {
    setUpdatingCaserios(true);
    setRefetchCaserios(true);
  }

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
      <h4 className="my-1">Crear Beneficiario</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>

        <InputDNI setValues={setValues} search/>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre del Beneficiario:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={50} onChange={handleChange}/>
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
                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                <FormControlLabel value="F" control={<Radio />} label="Femenino" />
              </RadioGroup>
            </Form.Group>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Fecha de Nacimiento:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control type='date' id='fechaNacimiento' name='fechaNacimiento' value={values.fechaNacimiento} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono del Beneficiario:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='telefono' name='telefono' value={values.telefono} maxLength={20} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Card className="mb-4">
          <Card.Header>
            <h5>Organización</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Sector:
            </Form.Label>
            <Col sm="8">
              <InputGroup>
                <Form.Select id='idSector' name='idSector' value={values.idSector} onChange={handleChange}>
                  <option value="">Seleccionar Sector</option>
                  {
                    sectores &&
                    sectores.map((depto) => (
                      <option key={depto._id} value={depto._id}>{depto.nombre}</option>
                    ))
                  }
                </Form.Select>
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
            <Form.Label column sm="4">
              Tipo de Organización:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <InputGroup>
                <Form.Select id='idTipoOrganizacion' name='idTipoOrganizacion' value={values.idTipoOrganizacion} onChange={handleChange}>
                  <option value="">Seleccionar Tipo de Organización</option>
                  {
                    orgtypes &&
                    orgtypes.map((depto) => (
                      <option key={depto._id} value={depto._id}>{depto.nombre}</option>
                    ))
                  }
                </Form.Select>
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
            <Form.Label column sm="4">
              Organización:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <InputGroup>
                <Form.Select id='idOrganizacion' name='idOrganizacion' value={values.idOrganizacion} onChange={handleChange}>
                  <option value="">Seleccionar Organización</option>
                  {
                    organizaciones &&
                    organizaciones.map((depto) => (
                      <option key={depto._id} value={depto._id}>{depto.nombre}</option>
                    ))
                  }
                </Form.Select>
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

          <Form.Group as={Row} className="my-4">
            <Form.Label column sm="4">
              Cargo:
            </Form.Label>
            <Col sm="8" className="my-auto">
              <InputGroup>
                <Form.Select id='idCargo' name='idCargo' value={values.idCargo} onChange={handleChange}>
                  <option value="">Seleccionar Cargo</option>
                  {
                    cargos &&
                    cargos.map((depto) => (
                      <option key={depto._id} value={depto._id}>{depto.nombre}</option>
                    ))
                  }
                </Form.Select>
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
        
        <Card>
          <Card.Header>
            <h5>Ubicación</h5>
          </Card.Header>
          <Card.Body className='p-4'>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Departamento:
              </Form.Label>
              <Col sm="8" className="my-auto">
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
                Caserio:
              </Form.Label>
              <Col sm="8">
                <InputGroup>
                  <Form.Select id='idCaserio' name='idCaserio' value={values.idCaserio} onChange={handleChange}>
                    <option value="">Seleccionar Caserio</option>
                    {
                      caserios &&
                      caserios.map((caserio) => (
                        <option key={caserio._id} value={caserio._id}>{caserio.nombre}</option>
                      ))
                    }
                  </Form.Select>
                  {
                    !updatingCaserios ? 
                    <Button variant="light" onClick={handleUpdateCaserios}>
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

        <MapInput changeLocation={changeLocation}/>

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Beneficiarios']['Revisar']
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
