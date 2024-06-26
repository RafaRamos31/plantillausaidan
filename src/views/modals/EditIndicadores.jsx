import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { Button, Card, CloseButton, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from "../../contexts/ToastContext.js";
import { useFetchPutBody } from "../../hooks/useFetch.js";
import { AproveContext } from "../../contexts/AproveContext.js";
import { useNavigate } from "react-router-dom";

export const EditIndicadores = ({handleClose, setRefetchData, indicador, fixing=false}) => {

  const { aprove } = useContext(AproveContext);

  const currencyFormat = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  //Toast
  const {setShowToast, actualizarTitulo, setContent, setVariant} = useContext(ToastContext)

  //Formulario
  const { values, handleChange, setValues } = useForm({
    idIndicador: indicador.id,
    nombre: indicador.nombre,
    descripcion: indicador.descripcion,
    tipoIndicador: indicador.tipoIndicador,
    frecuencia: indicador.frecuencia,
    medida: indicador.medida,
    metas: {
      'AF24': {
        'T1': indicador.metas['AF24']['T1'],
        'T2': indicador.metas['AF24']['T2'],
        'T3': indicador.metas['AF24']['T3'],
        'T4': indicador.metas['AF24']['T4'],
        'Total': indicador.metas['AF24']['Total'],
      },
      'AF25': {
        'T1': indicador.metas['AF25']['T1'],
        'T2': indicador.metas['AF25']['T2'],
        'T3': indicador.metas['AF25']['T3'],
        'T4': indicador.metas['AF25']['T4'],
        'Total': indicador.metas['AF25']['Total'],
      },
      'AF26': {
        'T1': indicador.metas['AF26']['T1'],
        'T2': indicador.metas['AF26']['T2'],
        'T3': indicador.metas['AF26']['T3'],
        'T4': indicador.metas['AF26']['T4'],
        'Total': indicador.metas['AF26']['Total'],
      },
      'AF27': {
        'T1': indicador.metas['AF27']['T1'],
        'T2': indicador.metas['AF27']['T2'],
        'T3': indicador.metas['AF27']['T3'],
        'T4': indicador.metas['AF27']['T4'],
        'Total': indicador.metas['AF27']['Total'],
      },
      'AF28': {
        'T1': indicador.metas['AF28']['T1'],
        'T2': indicador.metas['AF28']['T2'],
        'T3': indicador.metas['AF28']['T3'],
        'T4': indicador.metas['AF28']['T4'],
        'Total': indicador.metas['AF28']['Total'],
      },
      'LOP': {
        'T1': indicador.metas['LOP']['T1'],
        'T2': indicador.metas['LOP']['T2'],
        'T3': indicador.metas['LOP']['T3'],
        'T4': indicador.metas['LOP']['T4'],
        'Total': indicador.metas['LOP']['Total'],
      },
    },
    aprobar: aprove
  });

  const handleToggleMetas = (year, trimestre, stringValue) => {
    let value = 0
    if(stringValue.length !== 0){
      value = Number.parseInt(stringValue);
    }
    
    const newMetas = {
      ...values.metas
    }
    newMetas[year]['Total'] = newMetas[year]['Total'] - newMetas[year][trimestre] + value;

    newMetas['LOP']['Total'] = newMetas['LOP']['Total'] - newMetas[year][trimestre] + value;
    newMetas['LOP']['T1'] = newMetas['LOP']['Total']
    newMetas['LOP']['T2'] = newMetas['LOP']['Total']
    newMetas['LOP']['T3'] = newMetas['LOP']['Total']
    newMetas['LOP']['T4'] = newMetas['LOP']['Total']

    newMetas[year][trimestre] = value;
    setValues({...values, metas: newMetas})
  }

  //Envio asincrono de formulario
  const { setSend, send, data, isLoading, error } = useFetchPutBody('indicadores', {
    ...values,
    metas: JSON.stringify(values.metas)
  }) 

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
      navigate('/reviews/indicadores/'+data._id)
      navigate(0)
    }
    else{
      setRefetchData(true)
      handleClose()
      setShowToast(true)
      actualizarTitulo('Indicador Modificado')
      setContent('Indicador guardado correctamente.')
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
      <h4 className="my-1">Modificar Indicador</h4>
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
            <Form.Control id='descripcion' name='descripcion' value={values.descripcion} as={'textarea'} rows={5} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Tipo de Indicador:
          </Form.Label>
          <Col sm="8" className="my-auto">
          <Form.Select id='tipoIndicador' name='tipoIndicador' value={values.tipoIndicador} onChange={handleChange}>
            <option value="">Seleccionar Tipo</option>
            <option value="Proceso">Proceso</option>
            <option value="Resultado">Resultado</option>
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Frecuencia:
          </Form.Label>
          <Col sm="8" className="my-auto">
          <Form.Select id='frecuencia' name='frecuencia' value={values.frecuencia} onChange={handleChange}>
            <option value="">Seleccionar Frecuencia</option>
            <option value="Mensual">Mensual</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Semestral">Semestral</option>
            <option value="Anual">Anual</option>
          </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Unidad de Medida:
          </Form.Label>
          <Col sm="8" className="my-auto">
          <Form.Select id='medida' name='medida' value={values.medida} onChange={handleChange}>
            <option value="">Seleccionar Unidad</option>
            <option value="Personas">Personas</option>
            <option value="Monetario">Monetario</option>
            <option value="Organizaciones">Organizaciones</option>
            <option value="Porcentaje">Porcentaje</option>
          </Form.Select>
          </Col>
        </Form.Group>

        <h6>Metas:</h6>
        <Card className="p-3 my-1">
          <h6>AF24</h6>
          <Form.Group as={Row} className="mb-3">
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T1'}</InputGroup.Text>
                <Form.Control id='AF24-T1' name='AF24-T1' type={"number"} value={values?.metas['AF24']['T1']} onChange={(e) => handleToggleMetas('AF24', 'T1', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T2'}</InputGroup.Text>
                <Form.Control id='AF24-T2' name='AF24-T2' type="number" value={values?.metas['AF24']['T2']} onChange={(e) => handleToggleMetas('AF24', 'T2', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T3'}</InputGroup.Text>
                <Form.Control id='AF24-T3' name='AF24-T3' type="number" value={values?.metas['AF24']['T3']} onChange={(e) => handleToggleMetas('AF24', 'T3', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T4'}</InputGroup.Text>
                <Form.Control id='AF24-T4' name='AF24-T4' type="number" value={values?.metas['AF24']['T4']} onChange={(e) => handleToggleMetas('AF24', 'T4', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="my-2">
                <InputGroup.Text>{'Total'}</InputGroup.Text>
                <Form.Control id='AF24' name='AF24' type={values.medida === 'Monetario' ? 'text' : "number"} value={values.medida === 'Monetario' ? values?.metas['AF24']['Total'].toLocaleString('en-US', currencyFormat) : values?.metas['AF24']['Total']} readOnly/>
              </InputGroup>
            </Col>
          </Form.Group>
        </Card>

        <Card className="p-3 my-1">
          <h6>AF25</h6>
          <Form.Group as={Row} className="mb-3">
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T1'}</InputGroup.Text>
                <Form.Control id='AF25-T1' name='AF25-T1' type="number" value={values?.metas['AF25']['T1']} onChange={(e) => handleToggleMetas('AF25', 'T1', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T2'}</InputGroup.Text>
                <Form.Control id='AF25-T2' name='AF25-T2' type="number" value={values?.metas['AF25']['T2']} onChange={(e) => handleToggleMetas('AF25', 'T2', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T3'}</InputGroup.Text>
                <Form.Control id='AF25-T3' name='AF25-T3' type="number" value={values?.metas['AF25']['T3']} onChange={(e) => handleToggleMetas('AF25', 'T3', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T4'}</InputGroup.Text>
                <Form.Control id='AF25-T4' name='AF25-T4' type="number" value={values?.metas['AF25']['T4']} onChange={(e) => handleToggleMetas('AF25', 'T4', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="my-2">
                <InputGroup.Text>{'Total'}</InputGroup.Text>
                <Form.Control id='AF25' name='AF25' type={values.medida === 'Monetario' ? 'text' : "number"} value={values.medida === 'Monetario' ? values?.metas['AF25']['Total'].toLocaleString('en-US', currencyFormat) : values?.metas['AF25']['Total']} readOnly/>
              </InputGroup>
            </Col>
          </Form.Group>
        </Card>

        <Card className="p-3 my-1">
          <h6>AF26</h6>
          <Form.Group as={Row} className="mb-3">
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T1'}</InputGroup.Text>
                <Form.Control id='AF26-T1' name='AF26-T1' type="number" value={values?.metas['AF26']['T1']} onChange={(e) => handleToggleMetas('AF26', 'T1', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T2'}</InputGroup.Text>
                <Form.Control id='AF26-T2' name='AF26-T2' type="number" value={values?.metas['AF26']['T2']} onChange={(e) => handleToggleMetas('AF26', 'T2', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T3'}</InputGroup.Text>
                <Form.Control id='AF26-T3' name='AF26-T3' type="number" value={values?.metas['AF26']['T3']} onChange={(e) => handleToggleMetas('AF26', 'T3', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T4'}</InputGroup.Text>
                <Form.Control id='AF26-T4' name='AF26-T4' type="number" value={values?.metas['AF26']['T4']} onChange={(e) => handleToggleMetas('AF26', 'T4', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="my-2">
                <InputGroup.Text>{'Total'}</InputGroup.Text>
                <Form.Control id='AF26' name='AF26' type={values.medida === 'Monetario' ? 'text' : "number"} value={values.medida === 'Monetario' ? values?.metas['AF26']['Total'].toLocaleString('en-US', currencyFormat) : values?.metas['AF26']['Total']} readOnly/>
              </InputGroup>
            </Col>
          </Form.Group>
        </Card>

        <Card className="p-3 my-1">
          <h6>AF27</h6>
          <Form.Group as={Row} className="mb-3">
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T1'}</InputGroup.Text>
                <Form.Control id='AF27-T1' name='AF27-T1' type="number" value={values?.metas['AF27']['T1']} onChange={(e) => handleToggleMetas('AF27', 'T1', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T2'}</InputGroup.Text>
                <Form.Control id='AF27-T2' name='AF27-T2' type="number" value={values?.metas['AF27']['T2']} onChange={(e) => handleToggleMetas('AF27', 'T2', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T3'}</InputGroup.Text>
                <Form.Control id='AF27-T3' name='AF27-T3' type="number" value={values?.metas['AF27']['T3']} onChange={(e) => handleToggleMetas('AF27', 'T3', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T4'}</InputGroup.Text>
                <Form.Control id='AF27-T4' name='AF27-T4' type="number" value={values?.metas['AF27']['T4']} onChange={(e) => handleToggleMetas('AF27', 'T4', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="my-2">
                <InputGroup.Text>{'Total'}</InputGroup.Text>
                <Form.Control id='AF27' name='AF27' type={values.medida === 'Monetario' ? 'text' : "number"} value={values.medida === 'Monetario' ? values?.metas['AF27']['Total'].toLocaleString('en-US', currencyFormat) : values?.metas['AF27']['Total']} readOnly/>
              </InputGroup>
            </Col>
          </Form.Group>
        </Card>

        <Card className="p-3 my-1">
          <h6>AF28</h6>
          <Form.Group as={Row} className="mb-3">
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T1'}</InputGroup.Text>
                <Form.Control id='AF28-T1' name='AF28-T1' type="number" value={values?.metas['AF28']['T1']} onChange={(e) => handleToggleMetas('AF28', 'T1', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T2'}</InputGroup.Text>
                <Form.Control id='AF28-T2' name='AF28-T2' type="number" value={values?.metas['AF28']['T2']} onChange={(e) => handleToggleMetas('AF28', 'T2', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T3'}</InputGroup.Text>
                <Form.Control id='AF28-T3' name='AF28-T3' type="number" value={values?.metas['AF28']['T3']} onChange={(e) => handleToggleMetas('AF28', 'T3', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{'T4'}</InputGroup.Text>
                <Form.Control id='AF28-T4' name='AF28-T4' type="number" value={values?.metas['AF28']['T4']} onChange={(e) => handleToggleMetas('AF28', 'T4', e.target.value)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="my-2">
                <InputGroup.Text>{'Total'}</InputGroup.Text>
                <Form.Control id='AF28' name='AF28' type={values.medida === 'Monetario' ? 'text' : "number"} value={values.medida === 'Monetario' ? values?.metas['AF28']['Total'].toLocaleString('en-US', currencyFormat) : values?.metas['AF28']['Total']} readOnly/>
              </InputGroup>
            </Col>
          </Form.Group>
        </Card>

        <Card className="p-3 my-1">
          <Col>
            <InputGroup className="my-2">
              <InputGroup.Text>{'LOP'}</InputGroup.Text>
              <Form.Control id='LOP' name='LOP' type={values.medida === 'Monetario' ? 'text' : "number"} value={values.medida === 'Monetario' ? values?.metas['LOP']['Total'].toLocaleString('en-US', currencyFormat) : values?.metas['LOP']['Total']} readOnly/>
            </InputGroup>
          </Col>
        </Card>

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
