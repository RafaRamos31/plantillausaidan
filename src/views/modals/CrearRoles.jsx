import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchPostBody } from "../../hooks/useFetch.js";
import { Accordion, AccordionDetails, AccordionSummary, FormLabel } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { TreeBranch } from "../../components/TreeBranch.jsx";
import { permisos } from "../../services/permisos-service.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";

export const CrearRoles = ({handleClose, setRefetch}) => {
  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);
  
  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  const [ vistasValues, setVistasValues ] = useState(permisos.vistas)
  const [ accionesValues, setAccionesValues ] = useState(permisos.acciones)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    aprobar: aprove,
    permisos: {
      vistas: {},
      acciones: {} 
    }
  });

  useEffect(() => {
    setValues((prevValues) => ({...prevValues, permisos: {vistas: vistasValues, acciones: accionesValues}}))
  }, [vistasValues, accionesValues, setValues])
  

  const handleToggleAprobar = () => {
    setAprove(!aprove)
    setValues({ ...values, aprobar: !values.aprobar });
  }

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('roles', {...values, permisos: JSON.stringify(values.permisos)}) 

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
    actualizarTitulo('Rol Creado')
    setContent('Rol guardado correctamente.')
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
      <h4 className="my-1">Crear Rol</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
    <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            <FormLabel style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'black'}}>Nombre del rol:</FormLabel>
          </Form.Label>
          <Col sm="4">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={40} onChange={handleChange}/>
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
      {
        user.userPermisos?.acciones['Roles']['Revisar']
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
