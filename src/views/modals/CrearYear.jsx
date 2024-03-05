import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

export const CrearYear = ({handleClose, setRefetch}) => {

  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    fechaInicio: moment(),
    fechaFinal: moment(),
    timezone: '',
    aprobar: aprove
  });

  const handleToggleAprobar = () => {
    setAprove(!aprove)
    setValues({ ...values, aprobar: !values.aprobar });
  }

  const handleToggleDate = (value, param) => {
    const timezone = moment(values.fechaInicio).format('Z');
    if(param === 'fechaInicio'){
      setValues({ ...values, fechaInicio: value, timezone });
    }
    if(param === 'fechaFinal'){
      setValues({ ...values, fechaFinal: value, timezone });
    }
  }

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('years', {...values,
    nombre: `AF${values.nombre}`,
    fechaInicio: moment(values.fechaInicio).format('YYYY-MM-DD'),
    fechaFinal: moment(values.fechaFinal).format('YYYY-MM-DD'),
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
    actualizarTitulo('Año Fiscal Creado')
    setContent('Año Fiscal guardado correctamente.')
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
      <h4 className="my-1">Crear Año Fiscal</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre:
          </Form.Label>
          <Col sm="4">
            <InputGroup>
              <InputGroup.Text placeholder="AF">{'AF'}</InputGroup.Text>
              <Form.Control id='nombre' name='nombre' type="number" value={values.nombre} maxLength={2} min={1} onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>

        <LocalizationProvider dateAdapter={AdapterMoment}>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" className="my-auto">
              Fecha de Inicio:
            </Form.Label>
            <Col sm="8">
              <DatePicker 
              format="DD/MM/YYYY"
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
              <DatePicker 
              format="DD/MM/YYYY"
              id='fechaFinal'
              name='fechaFinal'
              value={moment(values.fechaFinal)}
              onChange={(value) => handleToggleDate(value, 'fechaFinal')}
              />
            </Col>
          </Form.Group>

        </LocalizationProvider>

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Años Fiscales']['Revisar']
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
