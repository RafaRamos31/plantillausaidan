import { useEffect, useState } from "react";
import { Button, Card, Form, Col, Row, InputGroup } from "react-bootstrap";
import { useFetchGet } from "../../hooks/useFetch.js";
import { useParams } from 'react-router-dom';
import useForm from "../../hooks/useForm.js";
import { ParticipantesGridIndicadores } from "../../components/ParticipantesGridIndicadores.jsx";
import { ListItemText, Tooltip, Select, MenuItem } from "@mui/material";

export const ReviewEventoConsolidado = () => {

  const { idRevision } = useParams();

  const [evento, setEvento] = useState({})
  const { data: dataEvento, isLoading: isLoadingEvento, error: errorEvento } = useFetchGet(`eventos/consolidar/${idRevision}`);

  const [indPersonas, setIndPersonas] = useState([])

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idRevision: idRevision,
    nombre: '',
    totalPresupuesto: 0,
    enlacePresupuesto: "",
    idIndicadorPresupuesto: ''
  });

  const [participantes, setParticipantes] = useState([])

  const handleChangeIndicador = (id, idIndicador) => {
    setParticipantes(prev => prev.map(p => p.id === id ? {
      ...p,
      valueIndicador: idIndicador,
      estadoIndicador: (p.indicadores[dataEvento.quarter.yearId] && p.indicadores[dataEvento.quarter.yearId].includes(idIndicador)) ? 'Warning' : 'Valid'
    } : p))
  }

  useEffect(() => {
    if(!isLoadingEvento && dataEvento && !errorEvento){
      setValues({
        idRevision: dataEvento.id,
        nombre: dataEvento.nombre,
        totalPresupuesto: dataEvento.totalPresupuesto,
        enlacePresupuesto: dataEvento.enlacePresupuesto,
      }) 

      setEvento(dataEvento)
      setIndPersonas(dataEvento.indicadores.filter(i => i.medida === 'Personas'))
    }
    // eslint-disable-next-line
  }, [dataEvento, isLoadingEvento, errorEvento])

  useEffect(() => {
    if(indPersonas.length !== 0){
      setParticipantes(dataEvento.participantes.map(p => ({
        ...p,
        valueIndicador: p.indicadorSeleccionadoId,
        estadoIndicador: p.estadoIndicador
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


  return (
    <Card style={{ border: "none" }}>
      <Card.Header
        className="d-flex justify-content-between align-items-center">
        <h4 className="my-1">Revisión Consolidado de Evento</h4>
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
                dataEvento?.indicadores.map((ind, index) => (
                  <Tooltip  key={index} title={ind.descripcion} placement="right" arrow followCursor>
                    <ListItemText primary={ind.nombre} />
                  </Tooltip>
                ))
              }
            </Col>
            </Form.Group>
            <Form.Group className="mb-3">
            <h5>Trimestre</h5>
            <ListItemText primary={dataEvento?.quarter.nombre} />
            </Form.Group>
            </Col>
          
          <Col md={4}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Consolidado de Participantes</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Válidos</h6>
              {
                evento.indicadores?.filter(i => i.medida === 'Personas').map((ind, index) => (
                  <InputGroup key={index} className="my-2 p-2">
                    <InputGroup.Text>{ind.nombre}</InputGroup.Text>
                    <Form.Control id={ind.nombre} name={ind.nombre} type={"number"} value={conteo[ind.id]?.Valid || 0} min={0} readOnly disabled />
                  </InputGroup>
                ))
              }
              <h6>Nulos</h6>
              {
                evento.indicadores?.filter(i => i.medida === 'Personas').map((ind, index) => (
                  <InputGroup key={index} className="my-2 p-2">
                    <InputGroup.Text>{ind.nombre}</InputGroup.Text>
                    <Form.Control id={ind.nombre} name={ind.nombre} type={"number"} value={conteo[ind.id]?.Warning || 0} min={0} readOnly disabled />
                  </InputGroup>
                ))
              }
            </Card.Body> 
          </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Consolidado de Presupuesto</h5>
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
                      <MenuItem key={index} value={ind.id}>{ind.nombre}</MenuItem>
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
        <ParticipantesGridIndicadores review participantes={participantes} indicadores={evento.indicadores?.filter(i => i.medida === 'Personas')} handleChangeIndicador={handleChangeIndicador}/>
        
      </Card.Body>
    </Card>
  );
};
