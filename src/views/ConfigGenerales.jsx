import { Button, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import useForm from "../hooks/useForm.js";
import { useFetchGet, useFetchGetBody, useFetchPutBody } from "../hooks/useFetch.js";
import { useContext, useEffect, useState } from "react";
import { FormControlLabel, Switch, Tooltip } from "@mui/material";
import { ToastContext } from "../contexts/ToastContext.js";
import HelpIcon from '@mui/icons-material/Help';

export const ConfigGenerales = () => {
  //Formulario
  const { values, handleChange, setValues } = useForm({
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
        idCurrentYear: dataConfig.currentYear,
        enableSubirPlanificacion: dataConfig.enableSubirPlanificacion,
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
  const { data: dataYears, isLoading: isLoadingYears, error: errorYears } = useFetchGetBody('list/years', findParamsYears);

  useEffect(() => {
    if(dataYears && !isLoadingYears){
      setYears(dataYears)
    } 
  }, [dataYears, isLoadingYears, errorYears])

  //Envio asincrono de formulario de Modificar
  const [errorMessage, setErrorMessage] = useState('');

  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('config', values) 

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
              <Form.Select id='idCurrentYear' name='idCurrentYear' value={values.idCurrentYear} onChange={handleChange}>
                <option value="">Seleccionar Año</option>
                {
                  years &&
                  years.map((year) => (
                    <option key={year._id} value={year._id}>{year.nombre}</option>
                  ))
                }
              </Form.Select>
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