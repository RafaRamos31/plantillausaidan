import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AvatarGroup, Box, Chip, FormControl, ListItemText, ListSubheader, MenuItem, Select, Tooltip } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearDepartamento } from "./CrearDepartamento.jsx";
import { CrearMunicipio } from "./CrearMunicipio.jsx";
import { CrearAldea } from "./CrearAldea.jsx";
import { CrearCaserio } from "./CrearCaserio.jsx";
import { AvatarChip } from "../../components/AvatarChip.jsx";
import { AvatarIcon } from "../../components/AvatarIcon.jsx";


export const CrearEvento = ({handleClose, setRefetch}) => {

  const { user } = useContext(UserContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idTarea: '',
    nombre: '',
    idAreaTematica: '',
    fechaInicio: '',
    fechaFinal: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: '',
    organizador: {},
    componentes: [user.userComponente],
    colaboradores: [],
    aprobarComponente: false
  });

  const handleToggleDate = (value, param) => {
    const timezone = moment(values.fechaInicio).format('Z');
    if(param === 'fechaInicio'){
      setValues({ ...values, fechaInicio: value, timezone });
    }
    if(param === 'fechaFinal'){
      setValues({ ...values, fechaFinal: value, timezone });
    }
  }

  const handleToggleAprobarComponente = () => {
    setValues({ ...values, aprobarComponente: !values.aprobarComponente });
  }

  //Componentes
  const findParamsComponentes = {
    sort: '{}',
    filter: '{}'
  }
  const [componentes, setComponentes] = useState([])
  const { data: componentesData, isLoading: isLoadingComponentes, error: errorComponentes} = useFetchGetBody('list/componentes', findParamsComponentes);

  useEffect(() => {
    if(componentesData && !isLoadingComponentes){
      setComponentes(componentesData)
    } 
  }, [componentesData, isLoadingComponentes, errorComponentes])


  //Usuarios
  const findParamsUsuarios = {
    sort: '{}',
    filter: '{}'
  }
  const [usuarios, setUsuarios] = useState([])
  const { data: usuariosData, isLoading: isLoadingUsuarios, error: errorUsuarios} = useFetchGetBody('list/usuarioscomp', findParamsUsuarios);

  useEffect(() => {
    if(usuariosData && !isLoadingUsuarios){
      setUsuarios(usuariosData)
    } 
  }, [usuariosData, isLoadingUsuarios, errorUsuarios])


  //Tareas
  const [findParamsTareas, setFindParamsTareas] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [tareas, setTareas] = useState([])
  const [queryTareas, setQueryTareas] = useState('')
  const { data: tareasData, isLoading: isLoadingTareas, setRefetch: setRefetchTareas } = useFetchGetBody(queryTareas, findParamsTareas);

  useEffect(() => {
    if(user && user.userComponente){
      setFindParamsTareas({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'componente',
          value: user.userComponente
        })
      })
      setQueryTareas('list/tareas');
      setRefetchTareas(true);
    }
  // eslint-disable-next-line
  }, [setRefetchTareas, user])
  
  //SubActividad y Areas Tematicas
  const [areas, setAreas] = useState([])
  const [queryTarea, setQueryTarea] = useState('')
  const { data: dataTarea, isLoading: isLoadingTarea, error: errorTarea, setRefetch: setRefetchTarea } = useFetchGet(queryTarea);

  const [querySubactividad, setQuerySubactividad] = useState('')
  const { data: dataSubactividad, isLoading: isLoadingSubactividad, error: errorSubActividad, setRefetch: setRefetchSubactividad } = useFetchGet(querySubactividad);

  useEffect(() => {
    if(dataTarea && !isLoadingTarea && values.idTarea){
      setQuerySubactividad(`subactividad/${dataTarea?.subactividad?._id}`)
      setRefetchSubactividad(true)
    } 
  }, [dataTarea, isLoadingTarea, errorTarea, setRefetchSubactividad, values.idTarea])

  useEffect(() => {
    if(dataSubactividad && !isLoadingSubactividad && values.idTarea){
      setAreas(dataSubactividad?.areasTematicas)
    } 
  }, [dataSubactividad, isLoadingSubactividad, errorSubActividad, values.idTarea])

   //Editar Lista de Areas Tematicas en Formulario
  useEffect(() => {
    if(values.idTarea && values.idTarea.length > 0){
      setQueryTarea(`tarea/${values.idTarea}`);
      setRefetchTarea(true);
    }
    else{
      setAreas([])
    }
    // eslint-disable-next-line
  }, [values.idTarea, setValues, setRefetchSubactividad])

  //Accion Update manual
  useEffect(() => {
    if(tareasData && !isLoadingTareas){
      setTareas(tareasData)
    } 
  }, [tareasData, isLoadingTareas])
  

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



  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('eventos/crear', {...values,
    fechaInicio: moment(values.fechaInicio).format('YYYY-MM-DD HH:mm'),
    fechaFinal: moment(values.fechaFinal).format('YYYY-MM-DD HH:mm'),
    idOrganizador: values.organizador?._id,
    componentes: JSON.stringify({data: values.componentes}),
    colaboradores: JSON.stringify({data: values.colaboradores.map(colaborador => colaborador._id)}),
  }) 

  const handleCreate = (e) => {
    e.preventDefault();
    setSend(true)
    setCharging(true)
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose()
    setRefetch()
    setShowToast(true)
    actualizarTitulo('Tarea Creada')
    setContent('Tarea guardada correctamente.')
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
      <h4 className="my-1">Crear Evento</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>

      <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Tarea:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="idTarea"
                  name="idTarea"
                  onChange={handleChange}
                  value={values.idTarea}
                >
                  {tareas && tareas.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Tooltip title={item.titulo} placement="right" arrow followCursor>
                        <ListItemText primary={item.nombre} />
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4" className="my-auto">
            Título:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre'  as="textarea" rows={2} maxLength={200} value={values.nombre} autoComplete='off' onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Área Temática:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="idAreaTematica"
                  name="idAreaTematica"
                  onChange={handleChange}
                  value={values.idAreaTematica}
                >
                  {areas && areas.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Tooltip title={item.descripcion} placement="right" arrow followCursor>
                        <ListItemText primary={item.nombre} />
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

        <LocalizationProvider dateAdapter={AdapterMoment}>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" className="my-auto">
              Fecha de Inicio:
            </Form.Label>
            <Col sm="8">
              <DateTimePicker 
              format="DD/MM/YYYY - hh:mm a"
              id='fechaInicio'
              name='fechaInicio'
              value={moment(values.fechaInicio)}
              onChange={(value) => handleToggleDate(value, 'fechaInicio')}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" className="my-auto">
              Fecha Finalización:
            </Form.Label>
            <Col sm="8">
              <DateTimePicker 
              format="DD/MM/YYYY - hh:mm a"
              id='fechaFinal'
              name='fechaFinal'
              value={moment(values.fechaFinal)}
              onChange={(value) => handleToggleDate(value, 'fechaFinal')}
              />
            </Col>
          </Form.Group>

        </LocalizationProvider>

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
              <Form.Label column sm="4" className="my-auto">
                Caserio:
              </Form.Label>
              <Col sm="8">
                <InputGroup>
                    <InputAutocomplete 
                      valueList={caserios} 
                      value={values.idCaserio}
                      name={'idCaserio'}
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
          <h5>Coordinación</h5>
        </Card.Header>
        <Card.Body className='p-4'>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Organizador:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="organizador"
                  name="organizador"
                  onChange={handleChange}
                  value={values.organizador}
                  renderValue={(value) => (
                    <AvatarChip id={value?._id} name={value?.nombre} link={false}/>
                  )}
                >
                  {usuarios && usuarios.filter(componente => componente._id === user.userComponente).map((componente, index) => (
                    [
                      <ListSubheader key={index}>{componentes.find(c => c._id === componente._id)?.nombre}</ListSubheader>,
                      ...componente.usuarios?.map(usuario => (
                        <MenuItem key={usuario._id} value={usuario}>
                          <AvatarChip id={usuario._id} name={usuario.nombre} link={false}/>
                        </MenuItem>
                      ))
                    ]
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Componentes:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="componentes"
                  name="componentes"
                  multiple
                  onChange={handleChange}
                  value={values.componentes}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={componentes.find(componente => componente._id === value)?.nombre} />
                      ))}
                    </Box>
                  )}
                >
                  {componentes && componentes.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Tooltip title={item.descripcion} placement="right" arrow followCursor>
                        <ListItemText primary={item.nombre} />
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Colaboradores:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="colaboradores"
                  name="colaboradores"
                  onChange={handleChange}
                  multiple
                  value={values.colaboradores}
                  renderValue={(selected) => (
                    <AvatarGroup max={6} style={{flexDirection: 'row-reverse', justifyContent: 'left'}}>
                      {
                        selected.map((usuario) => (
                          <AvatarIcon id={usuario._id} name={usuario.nombre}/>
                        ))
                      }
                    </AvatarGroup>
                  )}
                >
                  {usuarios && usuarios.filter(componente => values.componentes.includes(componente._id)).map((componente, index) => (
                    [
                      <ListSubheader key={index}>{componentes.find(c => c._id === componente._id)?.nombre}</ListSubheader>,
                      ...componente.usuarios?.map(usuario => (
                        <MenuItem key={usuario._id} value={usuario}>
                          <AvatarChip id={usuario._id} name={usuario.nombre} link={false}/>
                        </MenuItem>
                      ))
                    ]
                  ))}
                  
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

          </Card.Body>
        </Card>

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Eventos']['Aprobar Crear']
        ?
        <Form.Group>
          <Form.Check type="checkbox" label="Aprobar evento (Componente)" id='aprobarComponente' name='aprobarComponente' checked={values.aprobarComponente} onChange={handleToggleAprobarComponente}/>
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
