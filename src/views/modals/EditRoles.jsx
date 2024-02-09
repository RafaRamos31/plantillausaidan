import { useContext, useEffect, useState } from "react";
import { useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { TreeBranch } from "../../components/TreeBranch.jsx";
import { Accordion, AccordionDetails, AccordionSummary, FormLabel } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { getPermisosActuales } from "../../services/permisos-service.js";

export const EditRoles = ({handleClose, setRefetchData, rol, fixing=false}) => {

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  const [ vistasValues, setVistasValues ] = useState(getPermisosActuales('vistas', rol.permisos?.vistas))
  const [ accionesValues, setAccionesValues ] = useState(getPermisosActuales('acciones', rol.permisos?.acciones))

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idRol: rol.id,
    nombre: rol.nombre,
    aprobar: false,
    permisos: {
      vistas: vistasValues,
      acciones: accionesValues, 
    }
  });

  useEffect(() => {
    setValues((prevValues) => ({...prevValues, permisos: {vistas: vistasValues, acciones: accionesValues}}))
  }, [vistasValues, accionesValues, setValues])


  const handleToggleAprobar = () => {
    setValues({ ...values, aprobar: !values.aprobar });
  }

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Rol No Encontrado')
    setContent('El Rol que deseas modificar ya no existe.')
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
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('roles', {...values, permisos: JSON.stringify(values.permisos)}) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const navigate = useNavigate();

  const handleSuccessEdit = () => {
    handleClose()
    if(fixing){
      navigate('/reviews/roles/'+dataEdit._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      setShowToast(true)
      actualizarTitulo('Rol Modificado')
      setContent('Rol guardado correctamente.')
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
      <h4 className="my-1">Modificar Rol</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            <FormLabel style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'black'}}>Nombre del rol:</FormLabel>
          </Form.Label>
          <Col sm="4">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            id="panel1-header"
          >
            <h5 style={{fontWeight: 'bold'}}>Permisos Vistas</h5>
          </AccordionSummary>
          <AccordionDetails>
            <TreeBranch values={vistasValues} setValues={setVistasValues} edit/>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            id="panel1-header"
          >
            <h5 style={{fontWeight: 'bold'}}>Permisos Acciones</h5>
          </AccordionSummary>
          <AccordionDetails>
            <TreeBranch values={accionesValues} setValues={setAccionesValues} edit/>
          </AccordionDetails>
        </Accordion>

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <Form.Group>
        <Form.Check type="checkbox" label="Aprobar al enviar" id='aprobar' name='aprobar' onChange={handleToggleAprobar}/>
      </Form.Group>
      
      {/*Boton Guardar*/}
      {
        !chargingEdit ? 
        <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', marginLeft: '1rem', width: '9rem'}} variant="secondary" onClick={handleUpdate}>
          Enviar
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
