import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { Box, Chip, FormControl, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EditAreaTematica = ({handleClose, setRefetchData, areatematica, fixing=false}) => {

  const { user } = useContext(UserContext);
  const { aprove, setAprove } = useContext(AproveContext);

  //Departamento
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos} = useFetchGetBody('list/indicadores', findParams);

  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idAreaTematica: areatematica.id,
    nombre: areatematica.nombre,
    descripcion: areatematica.descripcion,
    indicadores: areatematica.indicadores.map((indicador => (indicador._id))),
    aprobar: aprove
  });

  const handleToggleAprobar = () => {
    setAprove(!aprove);
    setValues({ ...values, aprobar: !values.aprobar });
  }

  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('areastematicas', {...values, indicadores: JSON.stringify({data: values.indicadores})}) 

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
    if(fixing){
      navigate('/reviews/areastematicas/'+data._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      handleClose()
      setShowToast(true)
      actualizarTitulo('Área Temática Modificada')
      setContent('Área Temática guardada correctamente.')
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
      <h4 className="my-1">Modificar Área Temática</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Código:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={40} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Descripción:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='descripcion' name='descripcion' value={values.descripcion} as={'textarea'} rows={3} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 my-auto">
          <Form.Label className="my-auto" column sm="4">
            Indicadores:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <FormControl className="w-100">
                <Select
                  id="indicadores"
                  name="indicadores"
                  multiple
                  onChange={handleChange}
                  value={values.indicadores}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={deptos.find(depto => depto._id === value)?.nombre} />
                      ))}
                    </Box>
                  )}
                >
                  {deptos && deptos.map((depto) => (
                    <MenuItem key={depto._id} value={depto._id}>
                      <Tooltip title={depto.descripcion} placement="right" arrow followCursor>
                        <ListItemText primary={depto.nombre} />
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputGroup>
          </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Áreas Temáticas']['Revisar']
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
