import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Form,
  Row,
  Spinner,
  InputGroup
} from "react-bootstrap";
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchPostBody } from "../../hooks/useFetch.js";
import { InputFile } from "../../components/InputFile.jsx";

export const CrearEventoPresupuestar = ({ handleClose, setRefetch, eventValues, initialValues=null }) => {

  //Toast
  const { setShowToast, actualizarTitulo, setContent, setVariant } =
    useContext(ToastContext);

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idEvento: eventValues.id,
    nombre: eventValues.nombre,
    totalPresupuesto: initialValues ? initialValues.totalPresupuesto : 0,
    enlacePresupuesto: initialValues ? initialValues.enlacePresupuesto : '',
    aprobar: false
  });


  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPostBody("eventos/presupuestar", values);

  const handleCreate = (e) => {
    e.preventDefault();
    if(Number(values.totalPresupuesto) > 0 && values.enlacePresupuesto.length === 0){
      setErrorMessage('Medios de verificación incompletos.')
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
    handleClose();
    setRefetch(true);
    setShowToast(true);
    actualizarTitulo("Evento Presupuestado");
    setContent("Evento Presupuestado correctamente.");
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
        <h4 className="my-1">Presupuestar Evento</h4>
        <CloseButton onClick={handleClose} />
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
                <h5>Cantidad Presupuestada</h5>
              </Card.Header>
              <Card.Body className="p-4">
                <h6>Suma (en USD) invertida  en el evento</h6>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control type="number" id="totalPresupuesto" name="totalPresupuesto" min={0} value={values.totalPresupuesto} onChange={handleChange} />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </Card.Body>
            </Card>

            {
              values.totalPresupuesto > 0 &&
              <Card className="mb-4">
                <Card.Header>
                  <h5>Medios de Verificación</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <InputFile label={'Hoja de presupuesto (un solo archivo xls o pdf)'} idEvento={values.idEvento} prefix={'Presupuesto'} setValues={(url) => setValues({...values, enlacePresupuesto: url})} edit={initialValues} enlace={initialValues?.enlacePresupuesto}/>
                </Card.Body>
              </Card>
            }
          <p style={{color: 'red'}}>{errorMessage}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <div></div>
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
