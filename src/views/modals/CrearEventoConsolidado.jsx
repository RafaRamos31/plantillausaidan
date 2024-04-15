import { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner, Form, Col, Row, InputGroup, Modal, CloseButton } from "react-bootstrap";
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchPostBody } from "../../hooks/useFetch.js";
import { useParams } from 'react-router-dom';
import useForm from "../../hooks/useForm.js";
import { ParticipantesGridIndicadores } from "../../components/ParticipantesGridIndicadores.jsx";
import { ListItemText, Tooltip, Select, MenuItem, Alert } from "@mui/material";

export const CrearEventoConsolidado = () => {

  const { idEvento } = useParams();

  const [evento, setEvento] = useState({})
  const { data: dataEvento, isLoading: isLoadingEvento, error: errorEvento } = useFetchGet(`evento/participantes/${idEvento}`);

  const [indPersonas, setIndPersonas] = useState([])

  //Toast
  const { setShowToast, actualizarTitulo, setContent, setVariant } = useContext(ToastContext);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idEvento: idEvento,
    nombre: '',
    totalPresupuesto: 0,
    enlacePresupuesto: "",
    idIndicadorPresupuesto: ''
  });

  const [participantes, setParticipantes] = useState([])

  const handleChangeIndicador = (id, idIndicador) => {
    setParticipantes(prev => prev.map(p => p._id === id ? {
      ...p,
      valueIndicador: idIndicador,
      estadoIndicador: p.indicadores['AF24']?.includes(idIndicador) ? 'Warning' : 'Valid'
    } : p))
  }

  useEffect(() => {
    if(!isLoadingEvento && dataEvento && !errorEvento){
      setValues({
        idEvento: dataEvento._id,
        nombre: dataEvento.nombre,
        totalPresupuesto: dataEvento.totalPresupuesto,
        enlacePresupuesto: dataEvento.enlacePresupuesto,
      }) 

      setEvento(dataEvento)
      setIndPersonas(dataEvento.areaTematica?.indicadores.filter(i => i.medida === 'Personas'))
    }
    // eslint-disable-next-line
  }, [dataEvento, isLoadingEvento, errorEvento])

  useEffect(() => {
    if(indPersonas.length > 0){
      setParticipantes(dataEvento.participantes.map(p => ({
        ...p,
        valueIndicador: indPersonas[0]?._id,
        estadoIndicador: p.indicadores['AF24']?.includes(indPersonas[0]?._id) ? 'Warning' : 'Valid'
      })))
    }
  // eslint-disable-next-line
  }, [indPersonas])
  


  const [conteo, setConteo] = useState({})
  useEffect(() => {
    const conteoPorUuid = {};

    // Recorremos el arreglo y actualizamos el conteo por uuid
    participantes.forEach(objeto => {
        const uuid = objeto.valueIndicador;
        const estado = objeto.estadoIndicador;
        
        if (!conteoPorUuid[uuid]) {
            // Si el uuid no existe en el objeto, lo inicializamos con 0 Valid y 0 Warning
            conteoPorUuid[uuid] = { Valid: 0, Warning: 0 };
        }

        // Incrementamos el conteo según el estado
        conteoPorUuid[uuid][estado]++;
    });
    setConteo(conteoPorUuid)
  }, [participantes])


  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody(
    "eventos/consolidar", {
      idEvento: values.idEvento,
      nombre: values.nombre,
      conteo: JSON.stringify(conteo),
      presupuesto: values.totalPresupuesto,
      indPresupuesto: values.idIndicadorPresupuesto,
      indParticipantes: JSON.stringify({data: participantes.map(p => ({_id: p._id, valueIndicador: p.valueIndicador, estadoIndicador: p.estadoIndicador}))}),
      idTrimestre: dataEvento?.tarea.trimestre._id,
      nameTrimestre: dataEvento?.tarea.trimestre.nombre,
    });


  const handleCreate = (e) => {
    e.preventDefault();
    if(Number(values.totalPresupuesto > 0) && !values.idIndicadorPresupuesto){
      setErrorMessage('Indicador Monetario requerido')
    }
    else{
      handleShowEdit()
    }
    
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setSend(true);
    setCharging(true);
  };

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    setCharging(false)
    setShowToast(true);
    actualizarTitulo("Participantes Digitalizados");
    setContent("Participantes Digitalizados correctamente.");
    setVariant("success");
  };

  //Efecto al enviar el formulario
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setCharging(false);
    }
    if (data) {
      handleSuccess();
    }
    // eslint-disable-next-line
  }, [send, data, isLoading, error]);

  return (
    <Card style={{ border: "none" }}>
      <Card.Header
        className="d-flex justify-content-between align-items-center">
        <h4 className="my-1">Consolidar Evento</h4>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
            <h5>Nombre del Evento</h5>
            <Col sm="12">
              <Form.Control
                id="nombre"
                name="nombre"
                as="textarea"
                rows={2}
                maxLength={200}
                value={values.nombre}
                autoComplete="off"
                readOnly
                disabled
              />
            </Col>
            </Form.Group>
            <Form.Group className="mb-3">
            <h5>Área Temática</h5>
            <Col sm="12">
              <Tooltip title={dataEvento?.areaTematica.descripcion} placement="right" arrow followCursor>
                <ListItemText primary={dataEvento?.areaTematica.nombre} />
              </Tooltip>
            </Col>
            </Form.Group>
            <Form.Group className="mb-3">
            <h5>Indicadores</h5>
            <Col sm="12">
              {
                dataEvento?.areaTematica.indicadores.map((ind, index) => (
                  <Tooltip  key={index} title={ind.descripcion} placement="right" arrow followCursor>
                    <ListItemText primary={ind.nombre} />
                  </Tooltip>
                ))
              }
            </Col>
            </Form.Group>
            <Form.Group className="mb-3">
            <h5>Trimestre</h5>
            <ListItemText primary={dataEvento?.tarea.trimestre.nombre} />
            </Form.Group>
            </Col>
          
          <Col md={4}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Consolidar Participantes</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Válidos</h6>
              {
                evento.areaTematica?.indicadores.filter(i => i.medida === 'Personas').map((ind, index) => (
                  <InputGroup key={index} className="my-2 p-2">
                    <InputGroup.Text>{ind.nombre}</InputGroup.Text>
                    <Form.Control id={ind.nombre} name={ind.nombre} type={"number"} value={conteo[ind._id]?.Valid || 0} min={0} readOnly disabled />
                  </InputGroup>
                ))
              }
              <h6>Nulos</h6>
              {
                evento.areaTematica?.indicadores.filter(i => i.medida === 'Personas').map((ind, index) => (
                  <InputGroup key={index} className="my-2 p-2">
                    <InputGroup.Text>{ind.nombre}</InputGroup.Text>
                    <Form.Control id={ind.nombre} name={ind.nombre} type={"number"} value={conteo[ind._id]?.Warning || 0} min={0} readOnly disabled />
                  </InputGroup>
                ))
              }
            </Card.Body> 
          </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Consolidar Presupuesto</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Monto Presupuestado</h6>
              <Form.Group as={Row} className="mb-1">
                <Col sm={12} className="my-2">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="number" id="totalPresupuesto" name="totalPresupuesto" min={0} value={values.totalPresupuesto} disabled readOnly/>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
              {
                values.totalPresupuesto > 0 &&
                <>
                <h6>Cargar Presupuesto a Indicador</h6>
                <Select
                  name="idIndicadorPresupuesto"
                  id="idIndicadorPresupuesto"
                  style={{width:'150px', height: '45px'}}
                  value={values.idIndicadorPresupuesto}
                  onChange={handleChange}
                >
                  {
                    evento?.areaTematica?.indicadores.filter(i => i.medida === 'Monetario').map((ind, index) => (
                      <MenuItem key={index} value={ind._id}>{ind.nombre}</MenuItem>
                    ))
                  }
                </Select>
                <div className="d-grid w-100 mt-4">
                <Button className="p-2" href={values.enlacePresupuesto} target="_blank" style={{fontWeight: 'bold'}}>{'Hoja de Presupuesto  '}<i className="bi bi-box-arrow-up-right"></i></Button>
                </div>
                </>
              }
            </Card.Body>
          </Card>
          </Col>
        </Row>
        
        <hr />

        <h5>Participantes Registrados</h5>
        <ParticipantesGridIndicadores participantes={participantes} indicadores={evento.areaTematica?.indicadores.filter(i => i.medida === 'Personas')} handleChangeIndicador={handleChangeIndicador}/>

        <p style={{color: 'red'}}>{errorMessage}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        {
          <div></div>
        }
        {!charging ? (
          <Button
            style={{
              borderRadius: "5px",
              padding: "0.5rem 2rem",
              width: "9rem",
              marginLeft: "1rem",
            }}
            variant="secondary"
            onClick={handleCreate}
          >
            Enviar
          </Button>
        ) : (
          <Button
            style={{
              borderRadius: "5px",
              padding: "0.5rem 2rem",
              width: "9rem",
              marginLeft: "1rem",
            }}
            variant="secondary"
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Cargando...</span>
          </Button>
        )}
      </Card.Footer>
      <Modal show={showEdit} onHide={handleCloseEdit} autoFocus>
        <Card>
          <Card.Header
            className="d-flex justify-content-between align-items-center">
            <h4 className="my-1">Confirmar Datos de Indicadores</h4>
            <CloseButton onClick={handleCloseEdit}/>
          </Card.Header>
          <Card.Body>
            <Alert severity="warning">
              Los datos ingresados serán sumados a sus respectivos indicadores. 
              <b> Esta acción no puede revertirse o modificarse.</b><br />
              Presione el botón de <i>Confirmar</i> para finalizar el consolidado del evento.
            </Alert>
            <Form.Group className="mb-3">
              <InputGroup className="my-2 p-2">
                <InputGroup.Text>{'Trimestre'}</InputGroup.Text>
                <Form.Control value={dataEvento?.tarea.trimestre.nombre} readOnly disabled />
              </InputGroup>
            </Form.Group>
            <Card className="mb-4">
              <Card.Header>
                <h5>Participantes</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <h6>Válidos</h6>
                {
                  evento.areaTematica?.indicadores.filter(i => i.medida === 'Personas').map((ind, index) => (
                    <InputGroup key={index} className="my-2 p-2">
                      <InputGroup.Text>{ind.nombre}</InputGroup.Text>
                      <Form.Control id={ind.nombre} name={ind.nombre} type={"number"} value={conteo[ind._id]?.Valid || 0} min={0} readOnly disabled />
                    </InputGroup>
                  ))
                }
                <h6>Nulos</h6>
                {
                  evento.areaTematica?.indicadores.filter(i => i.medida === 'Personas').map((ind, index) => (
                    <InputGroup key={index} className="my-2 p-2">
                      <InputGroup.Text>{ind.nombre}</InputGroup.Text>
                      <Form.Control id={ind.nombre} name={ind.nombre} type={"number"} value={conteo[ind._id]?.Warning || 0} min={0} readOnly disabled />
                    </InputGroup>
                  ))
                }
              </Card.Body> 
            </Card>
            <Card className="mb-4">
            <Card.Header>
              <h5>Presupuesto</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Monto Presupuestado</h6>
              <Form.Group as={Row} className="mb-1">
                <Col sm={12} className="my-2">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="number" id="totalPresupuesto" name="totalPresupuesto" min={0} value={values.totalPresupuesto} disabled readOnly/>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
              {
                values.totalPresupuesto > 0 &&
                <>
                <h6>Cargar Presupuesto a Indicador</h6>
                <Select
                  name="idIndicadorPresupuesto"
                  id="idIndicadorPresupuesto"
                  style={{width:'150px', height: '45px'}}
                  value={values.idIndicadorPresupuesto}
                  disabled
                >
                  {
                    evento?.areaTematica?.indicadores.filter(i => i.medida === 'Monetario').map((ind, index) => (
                      <MenuItem key={index} value={ind._id}>{ind.nombre}</MenuItem>
                    ))
                  }
                </Select>
                </>
              }
            </Card.Body>
          </Card>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center">
          {
            <div></div>
          }
          {
            !charging ?
            <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginLeft: '1rem'}} variant="success" onClick={handleConfirm}>
              Confirmar
            </Button>
            :
            <Button style={{borderRadius: '5px', padding: '0.5rem 2rem', width: '9rem', marginLeft: '1rem'}} variant="success">
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
      </Modal>
    </Card>
  );
};
