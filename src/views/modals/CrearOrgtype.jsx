import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGetBody, useFetchPostBody } from "../../hooks/useFetch.js";
import { UserContext } from "../../contexts/UserContext.js";

export const CrearOrgtype = ({handleClose, setRefetch}) => {
  const { user } = useContext(UserContext);
  
  //Sectores
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [sectores, setSectores] = useState([])
  const { data: sectorData, isLoading: isLoadingSectores, error: errorSectores, setRefetch: setRefetchSectores } = useFetchGetBody('list/sectores', findParams);
  
  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true);
    setRefetchSectores(true);
  }
  
  useEffect(() => {
    if(sectorData && !isLoadingSectores){
      setSectores(sectorData)
      setUpdating(false)
    } 
  }, [sectorData, isLoadingSectores, errorSectores])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    nombre: '',
    idSector: '',
    aprobar: false
  });

  const handleToggleAprobar = () => {
    setValues({ ...values, aprobar: !values.aprobar });
  }

  
  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody('tipoOrganizaciones', values) 

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
    actualizarTitulo('Tipo de Organización Creado')
    setContent('Tipo de Organización guardado correctamente.')
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
      <h4 className="my-1">Crear Tipo de Organización</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Sector:
          </Form.Label>
          <Col sm="8">
            <InputGroup>
              <Form.Select id='idSector' name='idSector' value={values.idSecto} onChange={handleChange}>
                <option value="">Seleccionar Sector</option>
                {
                  sectores &&
                  sectores.map((depto) => (
                    <option key={depto._id} value={depto._id}>{depto.nombre}</option>
                  ))
                }
              </Form.Select>
              {
                !updating ? 
                <Button variant="light" onClick={handleUpdate}>
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

      </Form>
      <p style={{color: 'red'}}>{errorMessage}</p>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {
        user.userPermisos?.acciones['Cargos']['Revisar']
        ?
        <Form.Group>
          <Form.Check type="checkbox" label="Aprobar al enviar" id='aprobar' name='aprobar' onChange={handleToggleAprobar}/>
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
