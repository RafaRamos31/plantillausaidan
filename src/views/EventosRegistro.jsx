import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { DndContext, DragOverlay, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Col, Container, Form, InputGroup, Modal, Row, Spinner, Button } from "react-bootstrap";
import { CreateButton } from "../components/CreateButton.jsx";
import { CrearEvento } from "./modals/CrearEvento.jsx";
import { useFetchGet, useFetchGetBody, useFetchPostBody } from "../hooks/useFetch.js";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { EventoCard } from "../components/EventoCard.jsx";
import { LoadingScreen } from "./LoadingScreen.jsx";
import { Droppable } from "../components/Droppable.jsx";
import { Draggable } from "../components/Draggable.jsx";
import { EventColumn } from "../components/EventColumn.jsx";
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CrearEventoTerminar } from "./modals/CrearEventoTerminar.jsx";
import { InputAutocomplete } from "../components/InputAutocomplete.jsx";
import useForm from "../hooks/useForm.js";
import { RefetchContext } from "../contexts/RefetchContext.js";

export const EventosTablero = () => {

  const { user } = useContext(UserContext)
  const { refetch: refetchGlobal, setRefetch: setRefetchGlobal } = useContext(RefetchContext)

  const handleRefetchGlobal = () => {
    setRefetchGlobal(true)
  }

  useEffect(() => {
    if(refetchGlobal){
      console.log('refetch global')
      setRefetchGlobal(false)
    }
  }, [refetchGlobal, setRefetchGlobal])
  

  //Formulario
  const { values, setValues } = useForm({
    componenteId: '',
    yearId: '',
    quarterId: ''
  });

  //Componentes
  const findParamsComponentes = {
    sort: '{}',
    filter: '{}'
  }
  const [componentes, setComponentes] = useState([])
  const { data: dataComponentes, isLoading: isLoadingComponentes, error: errorComponentes } = useFetchGetBody('componentes/list', findParamsComponentes);

  useEffect(() => {
    if(dataComponentes && !isLoadingComponentes){
      setComponentes(dataComponentes)
    } 
  }, [dataComponentes, isLoadingComponentes, errorComponentes])

  //Años
  const findParamsYears = {
    sort: '{}',
    filter: '{}'
  }
  const [years, setYears] = useState([])
  const { data: dataYears, isLoading: isLoadingYears, error: errorYears, setRefetch: setRefetchYears } = useFetchGetBody('years/list', findParamsYears);

  useEffect(() => {
    if(dataYears && !isLoadingYears){
      setYears(dataYears)
    } 
  }, [dataYears, isLoadingYears, errorYears])

  //Quarters
  const [findParamsQuarter, setFindParamsQuarter] = useState({
    sort: '{}',
    filter: '{}'
  })
  const [quarters, setQuarters] = useState([])
  const [queryQuarters, setQueryQuarters] = useState('')
  const { data: dataQuarters, isLoading: isLoadingQuarters, error: errorQuarters, setRefetch: setRefetchQuarters } = useFetchGetBody(queryQuarters, findParamsQuarter);
  
  useEffect(() => {
    if(dataQuarters && !isLoadingQuarters && values.yearId){
      setQuarters(dataQuarters)
    } 
  }, [dataQuarters, isLoadingQuarters, errorQuarters, values.yearId])

  //Editar Lista de Municipios en Formulario
  useEffect(() => {
    if(values.yearId && values.yearId.length !== 0){
      setFindParamsQuarter({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'yearId',
          value: values.yearId
        })
      })
      setQueryQuarters('quarters/list');
      setRefetchQuarters(true)
    }
    else{
      setQuarters([])
    }
    // eslint-disable-next-line
  }, [values.yearId, setValues, setRefetchQuarters])

  //General config
  const { data: dataConfig } = useFetchGet('config');

  //Eventos
  const [eventos, setEventos] = useState([])
  const [queryEventos, setQueryEventos] = useState('')
  const { data, isLoading, setRefetch } = useFetchGetBody(queryEventos, values);

  useEffect(() => {
    if(dataConfig && user && user.userComponente){  
      setValues({
        componenteId: user.userComponente.id,
        yearId: dataConfig.find(el => el.attributeKey === 'idCurrentYear')?.attributeValue,
        quarterId: dataConfig.find(el => el.attributeKey === 'idCurrentQuarter')?.attributeValue
      }) 
      setQueryEventos('eventos/tablero')
      setRefetch(true)
    }
  }, [user, dataConfig, setRefetch, setValues])

  //Refetch inicial
  useEffect(() => {
    if(values.quarterId && values.componenteId){
      setRefetch(true)
    }
  }, [values, setRefetch])
  

  //Cargar eventos
  useEffect(() => {
    if(!isLoading && data){   
      setEventos(data)
      setRefetch(false)
    }
  }, [data, isLoading, setRefetch])


  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseEdit = ({id, success=false}) => {
    if(!success){
      const evento = eventos?.find(e => e.id === id)
      evento.estadoRealizacion = 'En Ejecución'
    }
    setShowEdit(false);
  }


  //Cambio asincrono de estados de
  const [toggleValues, setToggleValues] = useState({})
  const { setSend } = useFetchPostBody('eventos/tablero/toggle', toggleValues) 

  function handleDragEnd(event) {
    const {active, over} = event;

    setEventos(eventos.map(e => {
      if(over?.id === 'Finalizado'){
        const evento = eventos?.find(e => e.id === active.id)
        setCurrentData({
          id: evento.id,
          nombre: evento.nombre,
        })
        handleShowEdit()
      }

      if(over?.id === 'En Ejecución' || over?.id === 'Pendiente'){
        setToggleValues({
          idEvento: active.id,
          estado: over?.id
        })
        setSend(true)
      }

      if(e.id === active?.id){
        e.estadoRealizacion = over?.id || e.estadoRealizacion
        return e;
      }
      else{
        return e;
      }
    }))
  }

  //DnD
  const [activeId, setActiveId] = useState(null);
  function handleDragStart(event) {
    const {active} = event;
    setActiveId(active.id);
  }

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      delay: 150,
      distance: 10,
      tolerance: 5,
    },
  });

  const sensors = useSensors(
    mouseSensor
  );


  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

  return(
    <Layout pagina={`Eventos - Tablero`} footer={false} SiteNavBar={EventosNavBar} breadcrumbs={[
      {link: '/', nombre: 'Inicio'},
      {link: '/eventos', nombre: 'Eventos'},
      {link: '/eventos/tablero', nombre: 'Tablero'}
  ]}>
    <div className="d-flex align-items-center">
      <h2 className="view-title"><i className="bi bi-kanban"></i>{` Tablero de Eventos`}</h2>
      {/*Boton Actualizar*/}
      {
        !isLoading ? 
        <Button className='mx-2' variant="light" onClick={handleRefetchGlobal}>
          <i className="bi bi-arrow-clockwise"></i>
        </Button>
        : <Button className='my-2 mx-3' variant="light">
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
    </div>
    <Row className="m-0">
        <Container style={{border: '1px solid lightgray', borderRadius: '10px', marginTop: '0.2rem', marginBottom: '2rem', width: '100%'}}>
          <Row>
            <Col sm={4}>
              <Form.Group className="my-4 d-flex align-items-center">
                <Form.Label className="my-0" style={{marginRight: '1rem'}}>
                  Año Fiscal:
                </Form.Label>
                <InputGroup style={{maxWidth: '300px'}}>
                  <InputAutocomplete 
                    valueList={years} 
                    value={values.yearId}
                    name={'yearId'}
                    setValues={setValues}
                    setRefetch={setRefetchYears}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group className="my-4 d-flex align-items-center">
                <Form.Label className="my-0" style={{marginRight: '1rem'}}>
                  Trimestre:
                </Form.Label>
                <InputGroup style={{maxWidth: '300px'}}>
                  <InputAutocomplete 
                    valueList={quarters} 
                    value={values.quarterId}
                    name={'quarterId'}
                    setValues={setValues}
                    setRefetch={setRefetchQuarters}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group className="my-4 d-flex align-items-center">
                <Form.Label className="my-0" style={{marginRight: '1rem'}}>
                  Componente:
                </Form.Label>
                <InputGroup style={{maxWidth: '300px'}}>
                  <InputAutocomplete 
                    valueList={componentes} 
                    value={values.componenteId}
                    name={'componenteId'}
                    setValues={setValues}
                    setRefetch={setRefetchQuarters}
                    disabled={user && !user.userPermisos?.acciones['Eventos']['Ver Global']}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Row>

      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
        <Row>
          <Col xs={4}>
            <h3>Eventos Pendientes</h3>
            <hr />
            <Droppable key={'Pendiente'} id={'Pendiente'} Element={EventColumn}>
              {
                (user && user.userPermisos?.acciones['Eventos']['Crear'] && user.userComponente.id === values.componenteId ) &&
                <CreateButton 
                  title={'Evento'} 
                  ModalForm={CrearEvento} 
                  setRefetch={() => setRefetch(true)} 
                  customStyle={{width: '100%', borderRadius: '10px', marginBottom: '10px', minHeight: '55px', fontWeight: 'bold', backgroundColor: 'var(--main-green)', border: '0px solid black'}}  
                />
              }
              <SortableContext 
                items={eventos?.filter(e => e.estadoRealizacion === 'Pendiente')}
                strategy={verticalListSortingStrategy}
              >
                {eventos?.filter(e => e.estadoRealizacion === 'Pendiente').map((e) => (
                  <Draggable key={e.id} id={e.id}>
                    <EventoCard values={e} key={e.id} setRefetch={() => setRefetch(true)} edit={user && user.userComponente.id === values.componenteId}/>
                  </Draggable>
                ))}
              </SortableContext>
            </Droppable>
          </Col>
          <Col xs={4}>
            <h3 >Eventos en Ejecución</h3>
            <hr />
            <Droppable key={'En Ejecución'} id={'En Ejecución'} Element={EventColumn}>
              {eventos?.filter(e => e.estadoRealizacion === 'En Ejecución').map((e) => (
                <Draggable key={e.id} id={e.id}>
                  <EventoCard values={e} key={e.id} setRefetch={() => setRefetch(true)}/>
                </Draggable>
              ))}
            </Droppable>
          </Col>
          <Col xs={4}>
            <h3>Eventos Registrados</h3>
            <hr />
            <Droppable key={'Finalizado'} id={'Finalizado'} Element={EventColumn}>
              {eventos?.filter(e => e.estadoRealizacion === 'Finalizado').map((e) => (
                <Draggable key={e.id} id={e.id} finalizado>
                  <EventoCard values={e} key={e.id} setRefetch={() => setRefetch(true)}  />
                </Draggable>
              ))}
            </Droppable>
          </Col>
        </Row>
        <DragOverlay>
          {activeId ? <EventoCard values={eventos.find(e => e.id === activeId)} key={activeId} /> : null}
        </DragOverlay>
      </DndContext>
      <Modal show={showEdit} onHide={handleCloseEdit} autoFocus backdrop='static'>
        <CrearEventoTerminar handleClose={handleCloseEdit} setRefetch={setRefetch} eventValues={currentData}/>  
      </Modal>
  </Layout>
    
  );
}