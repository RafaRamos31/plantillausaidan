import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { FormControl, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EditActividad = ({handleClose, setRefetchData, actividad, fixing=false}) => {

  const { aprove } = useContext(AproveContext);

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idActividad: actividad.id,
    nombre: actividad.nombre.split('.')[2],
    descripcion: actividad.descripcion,
    resultadoId: actividad.resultadoId,
    subresultadoId: actividad.subresultadoId,
    aprobar: aprove
  });

  //Resultados
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [resultados, setResultados] = useState([])
  const { data: resultadosData, isLoading: isLoadingResultados} = useFetchGetBody('resultados/list', findParams);

  useEffect(() => {
    if(resultadosData && !isLoadingResultados){
      setResultados(resultadosData)
    } 
  }, [resultadosData, isLoadingResultados])

  //Sub resultados
  const [findParamsSubResultados, setfindParamsSubResultados] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [subresultados, setSubresultados] = useState([])
  const [querySubresultados, setquerySubresultados] = useState('')
  const { data: subresultadosData, isLoading: isLoadingSubResultados, setRefetch: setRefetchSubResultados } = useFetchGetBody(querySubresultados, findParamsSubResultados);

  //Accion Update manual
  useEffect(() => {
    if(subresultadosData && !isLoadingSubResultados && values.resultadoId){
      setSubresultados(subresultadosData)
    } 
  }, [subresultadosData, isLoadingSubResultados, values.resultadoId])

  //Editar Lista de Municipios en Formulario
  useEffect(() => {
    if(values.resultadoId && values.resultadoId.length !== 0){
      setfindParamsSubResultados({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'resultadoId',
          value: values.resultadoId
        })
      })
      setquerySubresultados('subresultados/list');
      setRefetchSubResultados(true);
      setValues({ ...values});
    }
    else{
      setSubresultados([])
    }
    // eslint-disable-next-line
  }, [values.resultadoId, setValues, setRefetchSubResultados])

   //Editar Codigo en Formulario
  const [codigo, setCodigo] = useState('--.--.')

  useEffect(() => {

    if(values.subresultadoId && values.subresultadoId.length !== 0){
      setCodigo(`${subresultados.find(subresultado => subresultado.id === values.subresultadoId)?.nombre.split(' ')[2] || '--.--'}.`)
    }
    else{
      setCodigo('--.--.')
    }
    
  }, [values, subresultados])

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('actividades', {...values, nombre: `${codigo}${values.nombre}`}) 

  const handleCreate = (e) => {
    e.preventDefault();
    setSend(true)
    setCharging(true)
  }

  //Boton de carga
  const [charging, setCharging] = useState(false);

  const navigate = useNavigate();

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose()
    if(fixing){
      navigate('/reviews/actividades/'+data._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      setShowToast(true)
      actualizarTitulo('Actividad Modificada')
      setContent('Actividad guardada correctamente.')
      setVariant('success')
    }
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
      <h4 className="my-1">Modificar Actividad</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>

      <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Resultado:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="resultadoId"
                  name="resultadoId"
                  onChange={handleChange}
                  value={values.resultadoId}
                >
                  {resultados && resultados.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
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
            Sub Resultado:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="subresultadoId"
                  name="subresultadoId"
                  onChange={handleChange}
                  value={values.subresultadoId}
                >
                  {subresultados && subresultados.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
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
              <InputGroup.Text placeholder="--.--.">{codigo}</InputGroup.Text>
              <Form.Control id='nombre' name='nombre' type="number" value={values.nombre} maxLength={6} min={1} onChange={handleChange}/>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Descripcion:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='descripcion' name='descripcion'  as="textarea" rows={4} maxLength={500} value={values.descripcion} onChange={handleChange}/>
          </Col>
        </Form.Group>

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
