import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { ToastContext } from "../../contexts/ToastContext.js";
import {
  useFetchGetBody,
  useFetchPostBody,
} from "../../hooks/useFetch.js";
import { InputFile } from "../../components/InputFile.jsx";
import { Box, Chip, FormControl, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import { UserContext } from "../../contexts/UserContext.js";
import { InputAutocomplete } from "../../components/InputAutocomplete.jsx";
import { CrearTipoEvento } from "./CrearTipoEvento.jsx";

export const CrearEventoTerminar = ({ handleClose, setRefetch, eventValues, initialValues=null }) => {

  const { user } = useContext(UserContext)

  //Toast
  const { setShowToast, actualizarTitulo, setContent, setVariant } =
    useContext(ToastContext);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idEvento: eventValues.id,
    nombre: eventValues.nombre,
    numeroFormulario: initialValues ? initialValues.numeroFormulario : '',
    tipoEventoId: initialValues ? initialValues.tipoEvento[0]?.id : '',
    totalDias: initialValues ? initialValues.totalDias : 0,
    totalHoras: initialValues ? initialValues.totalHoras : 0,
    sectores: initialValues ? initialValues.sectores.map(s => s.id) : [],
    niveles: initialValues ? initialValues.niveles.map(s => s.id) : [],
    logros: initialValues ? initialValues.logros : "",
    compromisos: initialValues ? initialValues.compromisos : "",
    participantesHombres: initialValues ? initialValues.participantesHombres : 0,
    participantesMujeres: initialValues ? initialValues.participantesMujeres : 0,
    participantesComunitarios: initialValues ? initialValues.participantesComunitarios : 0,
    participantesInstitucionales: initialValues ? initialValues.participantesInstitucionales : 0,
    enlaceFormulario: initialValues ? initialValues.enlaceFormulario : '',
    enlaceFotografias: initialValues ? initialValues.enlaceFotografias : '',
    aprobar: false
  });

  //Tipos Eventos
  const findParamsTipos = {
    sort: '{}',
    filter: '{}'
  }
  const [tiposEventos, setTiposEventos] = useState([])
  const { data: tiposEventosData, isLoading: isLoadingTiposEventos, error: errorTiposEventos, setRefetch: setRefetchTiposEventos } = useFetchGetBody('tiposEventos/list', findParamsTipos);

  useEffect(() => {
    if(tiposEventosData && !isLoadingTiposEventos){
      setTiposEventos(tiposEventosData)
      setUpdatingTipoEvento(false)
    } 
  }, [tiposEventosData, isLoadingTiposEventos, errorTiposEventos])

  //Indicador actualizando con boton departamento
  const [updatingTipoEvento, setUpdatingTipoEvento] = useState(false);

  //Accion Update manual
  const handleUpdateTipoEvento = () => {
    setUpdatingTipoEvento(true);
    setRefetchTiposEventos(true);
  }


  //Sectores
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [sectores, setSectores] = useState([])
  const { data: sectoresData, isLoading: isLoadingSectores, error: errorSectores } = useFetchGetBody('sectores/list', findParams);

  useEffect(() => {
    if(sectoresData && !isLoadingSectores){
      setSectores(sectoresData)
    } 
  }, [sectoresData, isLoadingSectores, errorSectores])


  //Niveles
  const findParamsNiveles = {
    sort: '{}',
    filter: '{}'
  }
  const [niveles, setNiveles] = useState([])
  const { data: nivelesData, isLoading: isLoadingNiveles, error: errorNiveles } = useFetchGetBody('niveles/list', findParamsNiveles);

  useEffect(() => {
    if(nivelesData && !isLoadingNiveles){
      setNiveles(nivelesData)
    } 
  }, [nivelesData, isLoadingNiveles, errorNiveles])


  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody(
    "eventos/finalizar",
    {
      ...values,
      sectores: JSON.stringify({data: values.sectores}),
      niveles: JSON.stringify({data: values.niveles})
    }
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if(values.enlaceFormulario.length === 0){
      setErrorMessage('Enlace de formulario requerido.')
    }
    else if((Number(values.participantesHombres) + Number(values.participantesMujeres))  !==  (Number(values.participantesComunitarios) + Number(values.participantesInstitucionales))){
      setErrorMessage('No coincide el total de participantes.')
    }
    else{
      setSend(true);
      setCharging(true);
    }
  };

  //Boton de carga
  const [charging, setCharging] = useState(false);

  //Accion al completar correctamente
  const handleSuccess = () => {
    handleClose({id: 0, success: true});
    setRefetch(true);
    setShowToast(true);
    actualizarTitulo("Evento Finalizado");
    setContent("Evento Finalizado correctamente.");
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
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "var(--main-green)", color: "white" }}
      >
        <h4 className="my-1">Finalizar Evento</h4>
        <CloseButton onClick={() => handleClose({id: eventValues.id})} />
      </Card.Header>
      <Card.Body>
            <Form onSubmit={handleCreate}>
              <Form.Group as={Row} className="mb-3">
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
            </Form>
            <Card className="mb-4">
              <Card.Header>
                <h5>Resumen</h5>
              </Card.Header>
              <Card.Body className="p-4">

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4" className="my-auto">
                  N° de Formulario:
                </Form.Label>
                <Col sm="8" className="my-auto">
                  <Form.Control
                    id="numeroFormulario"
                    name="numeroFormulario"
                    placeholder="00000000"
                    minLength={8}
                    maxLength={8}
                    value={values.numeroFormulario}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <h6>Duración</h6>
              <Form.Group as={Row} className="mb-3">
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Días'}</InputGroup.Text>
                    <Form.Control id='totalDias' name='totalDias' type={"number"} value={values.totalDias} onChange={handleChange} />
                  </InputGroup>
                </Col>
                <Col sm={6} className="my-2">
                  <InputGroup>
                    <InputGroup.Text>{'Horas'}</InputGroup.Text>
                    <Form.Control id='totalHoras' name='totalHoras' type="number" value={values.totalHoras} onChange={handleChange} />
                  </InputGroup>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4" className="my-auto">
                  Tipo de Evento:
                </Form.Label>
                <Col sm="8" className="my-auto">
                    <InputGroup>
                      <InputAutocomplete 
                        valueList={tiposEventos} 
                        value={values.tipoEventoId}
                        name={'tipoEventoId'}
                        setValues={setValues}
                        setRefetch={setRefetchTiposEventos}
                        ModalCreate={CrearTipoEvento}
                        insert={user.userPermisos?.acciones['Tipos de Eventos']['Crear']}
                      />
                    {
                      !updatingTipoEvento ? 
                      <Button variant="light" onClick={handleUpdateTipoEvento}>
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

              <Form.Group as={Row} className="mb-3 my-auto">
                <Form.Label className="my-auto" column sm="4">
                  Sectores:
                </Form.Label>
                <Col sm="8">
                  <InputGroup>
                    <FormControl className="w-100">
                      <Select
                        id="sectores"
                        name="sectores"
                        multiple
                        onChange={handleChange}
                        value={values.sectores}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={sectores.find(sector => sector.id === value)?.nombre} />
                            ))}
                          </Box>
                        )}
                      >
                        {sectores && sectores.map((item) => (
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
                  Niveles:
                </Form.Label>
                <Col sm="8">
                  <InputGroup>
                    <FormControl className="w-100">
                      <Select
                        id="niveles"
                        name="niveles"
                        multiple
                        onChange={handleChange}
                        value={values.niveles}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={niveles.find(nivel => nivel.id === value)?.nombre} />
                            ))}
                          </Box>
                        )}
                      >
                        {niveles && niveles.map((item) => (
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
                <Form.Label column sm="12" className="my-auto">
                  Logros:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    id="logros"
                    name="logros"
                    as="textarea"
                    rows={2}
                    maxLength={400}
                    value={values.logros}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="12" className="my-auto">
                  Compromisos:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    id="compromisos"
                    name="compromisos"
                    as="textarea"
                    rows={3}
                    maxLength={400}
                    value={values.compromisos}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Participantes</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <h6>Desagregado por Género</h6>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={6} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Masculinos'}</InputGroup.Text>
                      <Form.Control id='participantesHombres' name='participantesHombres' type={"number"} min={0} value={values.participantesHombres} onChange={handleChange} />
                    </InputGroup>
                  </Col>
                  <Col sm={6} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Femeninos'}</InputGroup.Text>
                      <Form.Control id='participantesMujeres' name='participantesMujeres' type="number" min={0} value={values.participantesMujeres} onChange={handleChange}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="my-2">
                      <InputGroup.Text>{'Total por Género'}</InputGroup.Text>
                      <Form.Control id='totalGenero' name='totalGenero' type="number" value={Number(values.participantesMujeres) + Number(values.participantesHombres)} readOnly/>
                    </InputGroup>
                  </Col>
                </Form.Group>

                <h6>Desagregado por Tipo de Beneficiario</h6>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={6} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Comunitarios'}</InputGroup.Text>
                      <Form.Control id='participantesComunitarios' name='participantesComunitarios' type={"number"} min={0} value={values.participantesComunitarios} onChange={handleChange} />
                    </InputGroup>
                  </Col>
                  <Col sm={6} className="my-2">
                    <InputGroup>
                      <InputGroup.Text>{'Institucionales'}</InputGroup.Text>
                      <Form.Control id='participantesInstitucionales' name='participantesInstitucionales' type={"number"} min={0} value={values.participantesInstitucionales} onChange={handleChange}  />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="my-2">
                      <InputGroup.Text>{'Total por Sector'}</InputGroup.Text>
                      <Form.Control id='totalSector' name='totalSector' type="number" value={Number(values.participantesComunitarios) + Number(values.participantesInstitucionales)} readOnly/>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Medios de Verificación</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <InputFile label={'Formulario de participantes (un solo archivo jpg o pdf)'} idEvento={values.idEvento} prefix={'Formulario'} setValues={(url) => setValues({...values, enlaceFormulario: url})} edit={initialValues} enlace={initialValues?.enlaceFormulario}/>
                <div className="my-5"></div>
                <InputFile label={'Evidencias fotográficas (un solo archivo jpg, rar o pdf)'} idEvento={values.idEvento} prefix={'Fotografias'} setValues={(url) => setValues({...values, enlaceFotografias: url})} edit={initialValues} enlace={initialValues?.enlaceFotografias}/>
              </Card.Body>
            </Card>
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
