import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearSectores } from "./CrearSectores.jsx";
import { CrearOrgtype } from "./CrearOrgtype.jsx";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { CrearMunicipio } from "./CrearMunicipio.jsx";
import { CrearAldea } from "./CrearAldea.jsx";
import { CrearCaserio } from "./CrearCaserio.jsx";
import { CrearNivel } from "./CrearNivel.jsx";

export const CrearOrganizacion = ({handleClose, setRefetch, modalRefetch, modal=false}) => {
  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Formulario
  const { values, setValues, handleChange } = useForm({
    nombre: '',
    codigo: '',
    sectorId: '',
    tipoOrganizacionId: '',
    nivel: '',
    departamentoId: '',
    municipioId: '',
    aldeaId: '',
    caserioId: '',
    telefono: '',
    nombreContacto: '',
    telefonoContacto: '',
    correoContacto: '',
    aprobar: modal ? true : aprove
  });

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


  //Niveles
  const findParamsNiveles = {
    sort: '{}',
    filter: '{}'
  }
  const [niveles, setNiveles] = useState([])
  const { data: nivelesData, isLoading: isLoadingNiveles, error: errorNiveles, setRefetch: setRefetchNiveles } = useFetchGetBody('niveles/list', findParamsNiveles);
  
  //Indicador actualizando con boton
  const [updatingNiveles, setUpdatingNiveles] = useState(false);

  //Accion Update manual sectores
  const handleUpdateNiveles = () => {
    setUpdatingNiveles(true);
    setRefetchNiveles(true);
  }
  
  useEffect(() => {
    if(nivelesData && !isLoadingNiveles){
      setNiveles(nivelesData)
      setUpdatingNiveles(false)
    } 
  }, [nivelesData, isLoadingNiveles, errorNiveles])


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

  //Caserios
  const [findParamsCaserios, setFindParamsCaserios] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [caserios, setCaserios] = useState([])
  const [queryCaserios, setQueryCaserios] = useState('')
  const { data: caseriosData, isLoading: isLoadingCaserios, error: errorCaserios, setRefetch: setRefetchCaserios } = useFetchGetBody(queryCaserios, findParamsCaserios);
  
  useEffect(() => {
    if(caseriosData && !isLoadingCaserios && values.aldeaId){
      setCaserios(caseriosData)
      setUpdatingCaserios(false)
    } 
  }, [caseriosData, isLoadingCaserios, errorCaserios, values.aldeaId])

  //Editar Lista de Caserios en Formulario
  useEffect(() => {
    if(values.aldeaId && values.aldeaId.length !== 0){
      setFindParamsCaserios({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'aldeaId',
          value: values.aldeaId
        })
      })
      setQueryCaserios('caserios/list')
      setRefetchCaserios(true)
    }
    else{
      setCaserios([])
    }
    // eslint-disable-next-line
  }, [values.aldeaId, setRefetchCaserios])

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
    if(modal){
      modalRefetch(true)
    }
    else{
      setRefetch()
    }
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
    <>
    <Card style={{border: 'none'}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
      <h4 className="my-1">Crear Organización</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre de la Organización:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={70} autoComplete='off' onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Código de la Organización:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='codigo' name='codigo' value={values.codigo}  maxLength={30} onChange={handleChange}/>
          </Col>
        </Form.Group>

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
          <Form.Label column sm="4">
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
                insert={user.userPermisos?.acciones['Tipos de Organizaciones']['Crear']}
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
          <Form.Label column sm="4">
            Nivel:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <InputGroup>
              <InputAutocomplete 
                valueList={niveles} 
                value={values.nivelId}
                name={'nivelId'}
                setValues={setValues}
                setRefetch={setRefetchNiveles}
                ModalCreate={CrearNivel}
              />
              {
                !updatingNiveles ? 
                <Button variant="light" onClick={handleUpdateNiveles}>
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
            Teléfono de la Organización:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='telefono' name='telefono' value={values.telefono} autoComplete="none"  maxLength={20} onChange={handleChange}/>
          </Col>
        </Form.Group>
        
        <Card>
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
              <Form.Label column sm="4" className="my-auto">
                Caserio:
              </Form.Label>
              <Col sm="8">
                <InputGroup>
                    <InputAutocomplete 
                      valueList={caserios} 
                      value={values.caserioId}
                      name={'caserioId'}
                      setValues={setValues}
                      setRefetch={setRefetchCaserios}
                      ModalCreate={CrearCaserio}
                    />
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

        <Card className='my-4'>
        <Card.Header>
          <h5>Contacto</h5>
        </Card.Header>
        <Card.Body className='p-4'>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre de Contacto:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='nombreContacto' name='nombreContacto' value={values.nombreContacto} maxLength={50} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Teléfono de Contacto:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control id='telefonoContacto' name='telefonoContacto' value={values.telefonoContacto} maxLength={20} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Correo de Contacto:
          </Form.Label>
          <Col sm="8" className="my-auto">
            <Form.Control type='email' id='correoContacto' name='correoContacto' value={values.correoContacto} maxLength={40} onChange={handleChange}/>
          </Col>
        </Form.Group>

          </Card.Body>
        </Card>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
    {
        (!modal && user.userPermisos?.acciones['Organizaciones']['Revisar'])
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
  </>
  )
}
