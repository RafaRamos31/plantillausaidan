import { Button, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import useForm from "../hooks/useForm.js";
import { useFetchGet, useFetchGetBody, useFetchPutBody } from "../hooks/useFetch.js";
import { useContext, useEffect, useState } from "react";
import { FormControlLabel, Switch, Tooltip } from "@mui/material";
import { ToastContext } from "../contexts/ToastContext.js";
import HelpIcon from '@mui/icons-material/Help';
import { InputAutocomplete } from "../components/InputAutocomplete.jsx";

export const ConfigGenerales = () => {
  //Formulario
  const { values, setValues } = useForm({
    idCurrentYear: '',
    idCurrentQuarter: '',
    enableSubirPlanificacion: false,
  });

  const togglePlanificacion = () => {
    setValues({...values, enableSubirPlanificacion: !values.enableSubirPlanificacion})
  }
  
  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)
  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //General config
  const { data: dataConfig, isLoading: isLoadingConfig, error: errorConfig } = useFetchGet('config');
  
  useEffect(() => {
    if(dataConfig && !isLoadingConfig){
      setValues({
        ...values,
        idCurrentYear: dataConfig.find(el => el.attributeKey === 'idCurrentYear')?.attributeValue,
        idCurrentQuarter: dataConfig.find(el => el.attributeKey === 'idCurrentQuarter')?.attributeValue,
        enableSubirPlanificacion: Number(dataConfig.find(el => el.attributeKey === 'enableSubirPlanificacion')?.attributeValue),
      })
    } 
    // eslint-disable-next-line
  }, [dataConfig, isLoadingConfig, errorConfig])


  //Años
  const findParamsYears = {
    sort: '{}',
    filter: '{}'
  }
  const [years, setYears] = useState([])
  const { data: dataYears, isLoading: isLoadingYears, error: errorYears, setRefetch: setRefetchYears } = useFetchGetBody('years/list', findParamsYears);

  useEffect(() => {
    if(dataYears && !isLoadingYears){
      setYears(dataYears)
    } 
  }, [dataYears, isLoadingYears, errorYears])


  //Quarters
  const [findParamsQuarter, setFindParamsQuarter] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [quarters, setQuarters] = useState([])
  const [queryQuarters, setQueryQuarters] = useState('')
  const { data: dataQuarters, isLoading: isLoadingQuarters, error: errorQuarters, setRefetch: setRefetchQuarters } = useFetchGetBody(queryQuarters, findParamsQuarter);
  
  useEffect(() => {
    if(dataQuarters && !isLoadingQuarters && values.idCurrentYear){
      setQuarters(dataQuarters)
    } 
  }, [dataQuarters, isLoadingQuarters, errorQuarters, values.idCurrentYear])

  //Editar Lista de Municipios en Formulario
  useEffect(() => {
    if(values.idCurrentYear && values.idCurrentYear.length !== 0){
      setFindParamsQuarter({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'yearId',
          value: values.idCurrentYear
        })
      })
      setQueryQuarters('quarters/list');
      setRefetchQuarters(true)
    }
    else{
      setQuarters([])
    }
    // eslint-disable-next-line
  }, [values.idCurrentYear, setValues, setRefetchQuarters])


  //Envio asincrono de formulario de Modificar
  const [errorMessage, setErrorMessage] = useState('');

  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('config', {values: JSON.stringify(values)}) 

  const handleUpdate = () => {
    setUpdating(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const handleSuccessEdit = () => {
    setShowToast(true)
    actualizarTitulo('Configuración Guardada')
    setContent('Configuración guardada correctamente.')
    setVariant('success')
  }

  useEffect(() => {
    if(errorEdit){
      setUpdating(false)
      setErrorMessage(errorEdit)
    }
    if(dataEdit){
      handleSuccessEdit();
      setUpdating(false)
    }
  // eslint-disable-next-line
  }, [sendEdit, dataEdit, isLoadingEdit, errorEdit, codeEdit])

  return(
    <>
    <Layout pagina={'Configuración - Ajustes Generales'} SiteNavBar={ConfigNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/configuracion', nombre: 'Configuración'},
        {link: '/configuracion/generales', nombre: 'Ajustes Generales'}
    ]}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="view-title"><i className="bi bi-sliders"></i>{` Ajustes Generales`}</h2>
        <div className="mx-3">
          {
            updating ?
            <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', marginLeft: '1rem', width: '9rem'}} variant="success">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Cargando...</span>
            </Button>
            :
            <Button variant="success" onClick={handleUpdate}><i className="bi bi-arrow-repeat"></i>{' '}Guardar Cambios</Button>
          }
          
        </div>
      </div>
      <p style={{color: 'red'}}>{errorMessage}</p>
      <Row className="m-0">
        <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px', marginTop: '0.2rem', width: '100%'}}>
          <h4><i className="bi bi-list-task"></i>{' '}Planificación</h4>
          <Form.Group className="my-4 d-flex align-items-center">
            <Form.Label className="my-0" style={{marginRight: '1rem'}}>
              Año Fiscal Actual:
            </Form.Label>
            <InputGroup style={{maxWidth: '300px'}}>
              <InputAutocomplete 
                valueList={years} 
                value={values.idCurrentYear}
                name={'idCurrentYear'}
                setValues={setValues}
                setRefetch={setRefetchYears}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="my-4 d-flex align-items-center">
            <Form.Label className="my-0" style={{marginRight: '1rem'}}>
              Trimestre Actual:
            </Form.Label>
            <InputGroup style={{maxWidth: '300px'}}>
              <InputAutocomplete 
                valueList={quarters} 
                value={values.idCurrentQuarter}
                name={'idCurrentQuarter'}
                setValues={setValues}
                setRefetch={setRefetchQuarters}
              />
            </InputGroup>
          </Form.Group>
          
          <FormControlLabel 
            control={
              <Switch
              checked={values.enableSubirPlanificacion}
              onChange={togglePlanificacion}
              />} 
            label="Habilitar actualización de planificación" 
          />
          <Tooltip title={'Habilita esta opción para permitir la carga de Tareas para el Año Fiscal en curso.'} placement="top" arrow followCursor>
            <HelpIcon style={{cursor: 'help'}}/>
          </Tooltip>
        </Container>
      </Row>
    </Layout>
    </>
  );
}