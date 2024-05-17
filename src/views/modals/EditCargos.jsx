import { useContext, useEffect, useState } from "react";
import { useFetchGetBody, useFetchPutBody } from "../../hooks/useFetch.js";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearSectores } from "./CrearSectores.jsx";

export const EditCargo = ({handleClose, setRefetchData, cargo, fixing=false}) => {
  const { user } = useContext(UserContext);
  const { aprove } = useContext(AproveContext)

  //Departamento
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [sectores, setSectores] = useState([])
  const { data: sectoresData, isLoading: isLoadingSectores, error: errorSectores, setRefetch: setRefetchSectores } = useFetchGetBody('sectores/list', findParams);

  useEffect(() => {
    if(sectoresData && !isLoadingSectores){
      setSectores(sectoresData)
      setUpdating(false);
    } 
  }, [sectoresData, isLoadingSectores, errorSectores])

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)
  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleReload = () => {
    setUpdating(true);
    setRefetchSectores(true);
  }

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idCargo: cargo.id,
    nombre: cargo.nombre,
    sectorId: cargo.sectorId,
    aprobar: aprove
  });


  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState('');

  //Accion No Encontrado
  const handleNotFound = () => {
    handleClose()
    setShowToast(true)
    actualizarTitulo('Cargo No Encontrado')
    setContent('El Cargo que deseas modificar ya no existe.')
    setVariant('warning')
  }

  //Accion por defecto envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate();
  }

  //Boton de carga Modificar
  const [chargingEdit, setChargingEdit] = useState(false);
  
  //Envio asincrono de formulario de Modificar
  const { setSend: setSendEdit, send: sendEdit, data: dataEdit, isLoading: isLoadingEdit, error: errorEdit, code: codeEdit } = useFetchPutBody('cargos', values) 

  const handleUpdate = () => {
    setChargingEdit(true)
    setSendEdit(true)
  }

  //Accion al completar correctamente Modificacion

  const navigate = useNavigate();

  const handleSuccessEdit = () => {
    if(fixing){
      navigate('/reviews/cargos/'+dataEdit._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      handleClose()
      setShowToast(true)
      actualizarTitulo('Cargo Modificado')
      setContent('Cargo guardado correctamente.')
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
      <h4 className="my-1">Modificar Cargo</h4>
      <CloseButton onClick={handleClose}/>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Nombre:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' value={values.nombre} maxLength={50} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Sector:
          </Form.Label>
          <Col sm="8">
          <InputGroup>
              <InputAutocomplete 
                valueList={sectores} 
                value={values.sectorId}
                name={'sectorId'}
                setValues={setValues}
                setRefetch={setRefetchSectores}
                ModalCreate={CrearSectores}
                insert={user.userPermisos?.acciones['Sectores']['Crear']}
              />
              {
                !updating ? 
                <Button variant="light" onClick={handleReload}>
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
        <div></div>
      }
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
