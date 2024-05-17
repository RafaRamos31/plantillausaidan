import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { FormControl, ListItemText, MenuItem, Select } from "@mui/material";

export const CrearQuarter = ({handleClose, setRefetch}) => {

  const { aprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    yearId: '',
    fechaInicio: null,
    fechaFinal: null,
    timezone: '',
    aprobar: aprove
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

  //Años fiscales
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [years, setYears] = useState([])
  const { data: yearsData, isLoading: isLoadingYears} = useFetchGetBody('years/list', findParams);

  useEffect(() => {
    if(yearsData && !isLoadingYears){
      setYears(yearsData)
    } 
  }, [yearsData, isLoadingYears])

   //Editar Departamento en Formulario
  const [codigo, setCodigo] = useState('AF00-T')

  useEffect(() => {
    if(values.yearId && values.yearId.length !== 0){
      const year = years.find(year => year.id === values.yearId);
      setCodigo(`${year?.nombre}-T`);
      setMinDate(moment(year?.fechaInicio).add(6, 'h'));
      setMaxDate(moment.utc(year?.fechaFinal));
    }
    else{
      setCodigo('AF00-T')
    }
    
  }, [values, years])

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('quarters', {...values,
    nombre: `${codigo}${values.nombre}`,
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
    actualizarTitulo('Trimestre Creado')
    setContent('Trimestre guardado correctamente.')
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
      <h4 className="my-1">Crear Trimestre</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
      <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Año Fiscal:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="yearId"
                  name="yearId"
                  onChange={handleChange}
                  value={values.yearId}
                >
                  {years && years.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
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
            Nombre:
          </Form.Label>
          <Col sm="4">
            <InputGroup>
              <InputGroup.Text placeholder="AF">{codigo}</InputGroup.Text>
              <Form.Control id='nombre' name='nombre' type="number" value={values.nombre} autoComplete="off" maxLength={2} min={1} onChange={handleChange}/>
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
              value={moment.utc(values.fechaInicio)}
              minDate={minDate}
              maxDate={maxDate}
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
              minDate={minDate}
              maxDate={maxDate}
              value={moment.utc(values.fechaFinal)}
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
