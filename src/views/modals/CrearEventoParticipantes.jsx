import { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner, Form, Col, Row, InputGroup } from "react-bootstrap";
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchPostBody } from "../../hooks/useFetch.js";
import { InputParticipanteDNI } from "../../components/InputParticipanteDNI.jsx";
import { ParticipantesGrid } from "../../components/ParticipantesGrid.jsx";
import { useParams } from 'react-router-dom';
import useForm from "../../hooks/useForm.js";

export const CrearEventoParticipantes = () => {

  const { idEvento } = useParams();

  const { data: dataEvento, isLoading: isLoadingEvento, error: errorEvento } = useFetchGet(`evento/participantes/${idEvento}`);

  //Toast
  const { setShowToast, actualizarTitulo, setContent, setVariant } = useContext(ToastContext);

    //Formulario
  const { values, setValues } = useForm({
    idEvento: idEvento,
    nombre: '',
    participantesHombres: 0,
    participantesMujeres: 0,
    enlaceFormulario: "",
  });

  const [participantes, setParticipantes] = useState([])
  const [registrados, setRegistrados] = useState({
    hombres: 0,
    mujeres: 0
  })

  const removeParticipante = (id, sexo) => {
    setParticipantes(p => p.filter(x => x._id !== id))
    setRegistrados(r => {
      if(sexo === 'M'){
        r = {...r, hombres: r.hombres - 1}
      }
      else{
        r = {...r, mujeres: r.mujeres - 1}
      }
      return r;
    })
  }

  const editParticipante = (originalId, edited) => {
    setParticipantes(p => p.map(x => x._id !== originalId ? x : {...edited, _id: originalId}))
  }

  useEffect(() => {
    if(!isLoadingEvento && dataEvento && !errorEvento){
      setValues({
        idEvento: dataEvento._id,
        nombre: dataEvento.nombre,
        participantesHombres: dataEvento.participantesHombres,
        participantesMujeres: dataEvento.participantesMujeres,
        enlaceFormulario: dataEvento.enlaceFormulario,
      }) 
      setParticipantes(dataEvento.participantes || [])
      setRegistrados({
        hombres: dataEvento.registradosHombres || 0,
        mujeres: dataEvento.registradosMujeres || 0,
      })
    }
    // eslint-disable-next-line
  }, [dataEvento, isLoadingEvento, errorEvento])

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody(
    "eventos/digitalizar", {
      idEvento: idEvento,
      registradosHombres: registrados.hombres,
      registradosMujeres: registrados.mujeres,
      participantes: JSON.stringify({data: participantes.map(p => p._id)})
    });

  const handleCreate = (e) => {
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
        <h4 className="my-1">Agregar Participantes</h4>
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
            <Button className="mt-2 p-3" href={values.enlaceFormulario} target="_blank" style={{fontWeight: 'bold'}}>Formulario de Participantes <i className="bi bi-box-arrow-up-right"></i></Button>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Participantes Formulario</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Por Género</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Masculinos'}</InputGroup.Text>
                    <Form.Control id='participantesHombres' name='participantesHombres' disabled type={"number"} min={0} value={values.participantesHombres} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Femeninos'}</InputGroup.Text>
                    <Form.Control id='participantesMujeres' name='participantesMujeres' disabled type="number" min={0} value={values.participantesMujeres} />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
            <Card.Header>
              <h5>Participantes Registrados</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <h6>Por Género</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Masculinos'}</InputGroup.Text>
                    <Form.Control id='participantesHombres' name='participantesHombres' disabled type={"number"} min={0} value={registrados?.hombres} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Femeninos'}</InputGroup.Text>
                    <Form.Control id='participantesMujeres' name='participantesMujeres' disabled type="number" min={0} value={registrados?.mujeres} />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>
          </Col>
        </Row>
        
        <hr />
        
        <h5>Vincular participante</h5>
        <div style={{width: '30%'}}>
          <InputParticipanteDNI participantes={participantes} setParticipantes={setParticipantes} setRegistrados={setRegistrados} />
        </div>
        

        <h5>Participantes Registrados</h5>
        <ParticipantesGrid participantes={participantes} removeParticipante={removeParticipante} editParticipante={editParticipante}/>

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
    </Card>
  );
};
