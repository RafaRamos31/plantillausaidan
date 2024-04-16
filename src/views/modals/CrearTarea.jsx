import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { FormControl, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearTipoEvento } from "./CrearTipoEvento.jsx";


export const CrearTarea = ({handleClose, setRefetch}) => {

  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idComponente: '',
    idSubActividad: '',
    nombre: '',
    titulo: '',
    descripcion: '',
    idYear: '',
    idQuarter: '',
    lugar: '',
    unidadMedida: '',
    gastosEstimados: 0,
    cantidadProgramada: 0,
    aprobar: aprove
  });

  const handleToggleAprobar = () => {
    setAprove(!aprove)
    setValues({ ...values, aprobar: !values.aprobar });
  }

  //Years
  const findParamsYears = {
    sort: '{}',
    filter: '{}'
  }
  const [years, setYears] = useState([])
  const { data: yearsData, isLoading: isLoadingYears, error: errorYears} = useFetchGetBody('list/years', findParamsYears);

  useEffect(() => {
    if(yearsData && !isLoadingYears){
      setYears(yearsData)
    } 
  }, [yearsData, isLoadingYears, errorYears])


  //Tipos Eventos
  const findParamsTipos = {
    sort: '{}',
    filter: '{}'
  }
  const [tiposEventos, setTiposEventos] = useState([])
  const { data: tiposEventosData, isLoading: isLoadingTiposEventos, error: errorTiposEventos, setRefetch: setRefetchTiposEventos } = useFetchGetBody('list/tiposEventos', findParamsTipos);

  useEffect(() => {
    if(tiposEventosData && !isLoadingTiposEventos){
      setTiposEventos(tiposEventosData)
      setUpdatingTipoEvento(false)
    } 
  }, [tiposEventosData, isLoadingTiposEventos, errorTiposEventos])

  //Indicador actualizando con boton departamento
  const [updatingTipoEvento, setUpdatingTipoEvento] = useState(false);

  //Accion Update manual
  const handleUpdateTipoEvento = () => {
    setUpdatingTipoEvento(true);
    setRefetchTiposEventos(true);
  }

  //Trimestres
  const [findParamsQuarters, setFindParamsQuarters] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [quarters, setQuarters] = useState([])
  const [queryQuarters, setQueryQuarters] = useState('')
  const { data: quartersData, isLoading: isLoadingQuarters, setRefetch: setRefetchQuarters } = useFetchGetBody(queryQuarters, findParamsQuarters);

  //Accion Update manual
  useEffect(() => {
    if(quartersData && !isLoadingQuarters && values.idYear){
      setQuarters(quartersData)
    } 
  }, [quartersData, isLoadingQuarters, values.idYear])

  //Editar Lista de Municipios en Formulario
  useEffect(() => {
    if(values.idYear && values.idYear.length > 0){
      setFindParamsQuarters({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'year',
          value: values.idYear
        })
      })
      setQueryQuarters('list/quarters');
      setRefetchQuarters(true);
      setValues({ ...values });
    }
    else{
      setQuarters([])
    }
    // eslint-disable-next-line
  }, [values.idYear, setValues, setRefetchQuarters])


  //General config
  const { data: dataConfig, isLoading: isLoadingConfig, error: errorConfig } = useFetchGet('config');

  //Sub actividades
  const [findParamsSubActividades, setFindParamsSubActividades] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [subActividades, setSubActividades] = useState([])
  const [querySubActividades, setQuerySubActividades] = useState('')
  const { data: subActividadesData, isLoading: isLoadingSubActividades, setRefetch: setRefetchSubActividades } = useFetchGetBody(querySubActividades, findParamsSubActividades);

  useEffect(() => {
    if(user && user.userComponente && dataConfig && !isLoadingConfig){
      setFindParamsSubActividades({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'componentes',
          value: user.userComponente
        })
      })
      setQuerySubActividades('list/subactividades');
      setRefetchSubActividades(true);
      setValues({...values, idComponente: user.userComponente, idYear: dataConfig.currentYear})
    }
  // eslint-disable-next-line
  }, [dataConfig, isLoadingConfig, errorConfig, setRefetchSubActividades, user])
  

   //Editar Codigo en Formulario
  const [codigo, setCodigo] = useState('--.--.-- x')

  useEffect(() => {

    if(values.idSubActividad && values.idSubActividad.length > 0){
      setCodigo(`${subActividades.find(actividad => actividad._id === values.idSubActividad)?.nombre || '--.--.-- X'} `)
    }
    else{
      setCodigo('--.--.-- X')
    }
    
  }, [values, subActividades])

  //Accion Update manual
  useEffect(() => {
    if(subActividadesData && !isLoadingSubActividades){
      setSubActividades(subActividadesData)
    } 
  }, [subActividadesData, isLoadingSubActividades])
  

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('tareas', {...values, nombre: `${codigo} ${values.nombre}`}) 

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
      <h4 className="my-1">Crear Tarea</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>

      <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Sub Actividad:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="idSubActividad"
                  name="idSubActividad"
                  onChange={handleChange}
                  value={values.idSubActividad}
                >
                  {subActividades && subActividades.map((item) => (
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Código:
          </Form.Label>
          <Col sm="4">
            <InputGroup>
              <InputGroup.Text placeholder="--.--.-- X">{codigo}</InputGroup.Text>
              <Form.Control id='nombre' name='nombre' value={values.nombre} type="number"  autoComplete='off' onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre de la Tarea:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='titulo' name='titulo'  as="textarea" rows={2} maxLength={200} value={values.titulo} autoComplete='off' onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Descripción de la Tarea:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='descripcion' name='descripcion' as="textarea" rows={5} maxLength={500} value={values.descripcion} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Año Fiscal:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="idYear"
                  name="idYear"
                  onChange={handleChange}
                  value={values.idYear}
                  disabled
                >
                  {years && years.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <ListItemText primary={item.nombre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Trimestre:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="idQuarter"
                  name="idQuarter"
                  onChange={handleChange}
                  value={values.idQuarter}
                >
                  {quarters && quarters.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <ListItemText primary={item.nombre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Lugar:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='lugar' name='lugar'  as="textarea" rows={2} maxLength={200} value={values.lugar} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4" className="my-auto">
            Tipo de Evento:
          </Form.Label>
          <Col sm="8" className="my-auto">
              <InputGroup>
                <InputAutocomplete 
                  valueList={tiposEventos} 
                  value={values.unidadMedida}
                  name={'unidadMedida'}
                  setValues={setValues}
                  setRefetch={setRefetchTiposEventos}
                  ModalCreate={CrearTipoEvento}
                />
              {
                !updatingTipoEvento ? 
                <Button variant="light" onClick={handleUpdateTipoEvento}>
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
            Eventos Estimados:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='cantidadProgramada' name='cantidadProgramada' type="number" min={0} value={values.cantidadProgramada} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Gastos Estimados:
          </Form.Label>
          <Col sm="8">
            <InputGroup className="mb-3">
              <InputGroup.Text>US $</InputGroup.Text>
              <Form.Control id='gastosEstimados' name='gastosEstimados' type="number" min={0} value={values.gastosEstimados} onChange={handleChange}/>
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Tareas']['Revisar']
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
