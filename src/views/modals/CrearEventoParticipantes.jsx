import { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner, Form, Col, Row, InputGroup, Modal } from "react-bootstrap";
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchGet, useFetchPostBody } from "../../hooks/useFetch.js";
import { InputParticipanteDNI } from "../../components/InputParticipanteDNI.jsx";
import { ParticipantesGrid } from "../../components/ParticipantesGrid.jsx";
import { useParams } from 'react-router-dom';
import useForm from "../../hooks/useForm.js";
import { Chip, Button as MUIButton, Tooltip } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ReportModal } from "./ReportModal.jsx";
import { TareaChip } from "../../components/TareaChip.jsx";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const CrearEventoParticipantes = () => {

  const { idEvento } = useParams();

  const { data: dataEvento, isLoading: isLoadingEvento, error: errorEvento } = useFetchGet(`eventos/participantes/${idEvento}`);

  //Toast
  const { setShowToast, actualizarTitulo, setContent, setVariant } = useContext(ToastContext);

  //Modal Eliminar
  const [showEliminar, setShowEliminar] = useState(false);
  const handleCloseEliminar = () => setShowEliminar(false);
  const handleShowEliminar = () => setShowEliminar(true);

    //Formulario
  const { values, setValues } = useForm({
    idEvento: idEvento,
    nombre: '',
    numeroFormulario: '',
    totalDias: 0,
    totalHoras: 0,
    tarea: null,
    areaTematica: null,
    participantesHombres: 0,
    participantesMujeres: 0,
    participantesComunitarios: 0,
    participantesInstitucionales: 0,
    enlaceFormulario: "",
  });

  const [participantes, setParticipantes] = useState([])
  const [registrados, setRegistrados] = useState({
    hombres: 0,
    mujeres: 0,
    institucionales: 0,
    comunitarios: 0
  })

  const removeParticipante = (id, sexo, tipoBeneficiario) => {
    setParticipantes(p => p.filter(x => x.id !== id))
    setRegistrados(r => {
      if(sexo === 'M'){
        r = {...r, hombres: r.hombres - 1}
      }
      else{
        r = {...r, mujeres: r.mujeres - 1}
      }

      if(tipoBeneficiario === 'Comunitario'){
        r = {...r, comunitarios: r.comunitarios - 1}
      }
      else{
        r = {...r, institucionales: r.institucionales - 1}
      }
      return r;
    })
  }

  const editParticipante = (originalId, edited) => {
    setParticipantes(p => p.map(x => x.id !== originalId ? x : {...edited, id: originalId}))
  }

  useEffect(() => {
    if(!isLoadingEvento && dataEvento && !errorEvento){
      setValues({
        idEvento: dataEvento.id,
        nombre: dataEvento.nombre,
        numeroFormulario: dataEvento.numeroFormulario,
        participantesHombres: dataEvento.participantesHombres,
        participantesMujeres: dataEvento.participantesMujeres,
        participantesComunitarios: dataEvento.participantesComunitarios,
        participantesInstitucionales: dataEvento.participantesInstitucionales,
        enlaceFormulario: dataEvento.enlaceFormulario,
        totalDias: dataEvento.totalDias,
        totalHoras: dataEvento.totalHoras,
        tarea: dataEvento.tarea,
        areaTematica: dataEvento.areaTematica,
      }) 
      setParticipantes(dataEvento.participantes || [])
      setRegistrados({
        hombres: dataEvento.registradosHombres || 0,
        mujeres: dataEvento.registradosMujeres || 0,
        institucionales: dataEvento.registradosInstitucionales || 0,
        comunitarios: dataEvento.registradosComunitarios || 0,
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
      registradosComunitarios: registrados.comunitarios,
      registradosInstitucionales: registrados.institucionales,
      participantes: JSON.stringify({data: participantes.map(p => p.id)})
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

            <Form.Group as={Row} className="mb-3">
              <Col sm={4} >
                <h5 className="mb-0">N° Formulario</h5>
                <Form.Control
                  id="numeroFormulario"
                  name="numeroFormulario"
                  value={values.numeroFormulario}
                  autoComplete="off"
                  readOnly
                  disabled
                />
              </Col>
              <Col sm={4} >
                <h5 className="mb-0">Tarea</h5>
                {
                  values.tarea &&
                  <TareaChip tarea={values?.tarea}/>
                }
              </Col>
              <Col sm={4} >
                <h5 className="mb-2">Área Temática</h5>
                {
                  values.areaTematica &&
                  <Tooltip key={values.areaTematica.id} title={values.areaTematica.descripcion} placement="top" arrow followCursor>
                    <Chip key={values.areaTematica.id} className="mx-1" label={values.areaTematica.nombre} style={{cursor: 'help'}}/>
                  </Tooltip>
                }
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <h5>Duración del Evento</h5>
              <Col sm={6} className="my-2">
                <InputGroup>
                  <InputGroup.Text>{'Días'}</InputGroup.Text>
                  <Form.Control id='totalDias' name='totalDias' disabled type={"number"} min={0} value={values.totalDias} />
                </InputGroup>
              </Col>
              <Col sm={6} className="my-2">
                <InputGroup>
                  <InputGroup.Text>{'Horas'}</InputGroup.Text>
                  <Form.Control id='totalHoras' name='totalHoras' disabled type="number" min={0} value={values.totalHoras} />
                </InputGroup>
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="info" className="p-3" href={values.enlaceFormulario} style={{fontWeight: 'bold', marginRight: '1rem'}}>Formulario de Participantes <i className="bi bi-box-arrow-up-right"></i></Button>
              <MUIButton variant='contained' color='warning' onClick={handleShowEliminar}><WarningAmberIcon /> Solicitar Corrección</MUIButton>
            </div>
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
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Género'}</InputGroup.Text>
                  <Form.Control id='totalGenero' name='totalGenero' type="number" value={Number(values.participantesHombres) + Number(values.participantesMujeres)} readOnly/>
                </InputGroup>
              </Form.Group>

              <h6>Por Tipo de Beneficiario</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Comunitarios'}</InputGroup.Text>
                    <Form.Control id='participantesComunitarios' name='participantesComunitarios' disabled type={"number"} min={0} value={values.participantesComunitarios} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Institucionales'}</InputGroup.Text>
                    <Form.Control id='participantesInstitucionales' name='participantesInstitucionales' disabled type="number" min={0} value={values.participantesInstitucionales} />
                  </InputGroup>
                </Col>
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Tipo'}</InputGroup.Text>
                  <Form.Control id='totalTipo' name='totalTipo' type="number" value={Number(values.participantesComunitarios) + Number(values.participantesInstitucionales)} readOnly/>
                </InputGroup>
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
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Género'}</InputGroup.Text>
                  <Form.Control id='totalGenero' name='totalGenero' type="number" value={Number(registrados.hombres) + Number(registrados.mujeres)} readOnly/>
                </InputGroup>
              </Form.Group>

              <h6>Por Tipo de Beneficiario</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Comunitarios'}</InputGroup.Text>
                    <Form.Control id='participantesComunitarios' name='participantesComunitarios' disabled type={"number"} min={0} value={registrados.comunitarios} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Institucionales'}</InputGroup.Text>
                    <Form.Control id='participantesInstitucionales' name='participantesInstitucionales' disabled type="number" min={0} value={registrados.institucionales} />
                  </InputGroup>
                </Col>
                <InputGroup className="my-2">
                  <InputGroup.Text>{'Total por Tipo'}</InputGroup.Text>
                  <Form.Control id='totalTipo' name='totalTipo' type="number" value={Number(registrados.comunitarios) + Number(registrados.institucionales)} readOnly/>
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>
          </Col>
        </Row>
        
        <hr />
        
        <Form.Group as={Row}>
          <Col sm={8} className="my-2">
            <h5>Vincular participante</h5>
            <div style={{width: '30%'}}>
              <InputParticipanteDNI participantes={participantes} setParticipantes={setParticipantes} setRegistrados={setRegistrados} />
            </div>
          </Col>
          <Col sm={4} className="d-flex align-items-center justify-content-end">
            {!charging ? (
            <Button
              style={{
                borderRadius: "5px",
                padding: "1rem 2rem",
                width: "10rem",
                marginLeft: "1rem",
                fontSize: '1.2rem',
                fontWeight: 'bolder'
              }}
              variant="success"
              onClick={handleCreate}
            >
              {` Enviar `}
              <ExitToAppIcon className="mb-1" />
            </Button>
          ) : (
            <Button
              style={{
                borderRadius: "5px",
                padding: "1rem 2rem",
                width: "9rem",
                marginLeft: "1rem",
              }}
              variant="success"
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
          </Col>
        </Form.Group>


        <h5>Participantes Registrados</h5>
        <ParticipantesGrid participantes={participantes} removeParticipante={removeParticipante} editParticipante={editParticipante}/>

        <p style={{color: 'red'}}>{errorMessage}</p>
      </Card.Body>
      <Modal show={showEliminar} onHide={handleCloseEliminar}>
        <ReportModal handleClose={handleCloseEliminar} id={idEvento}/>
      </Modal>
    </Card>
  );
};
