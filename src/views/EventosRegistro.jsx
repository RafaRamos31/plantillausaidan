import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Col, Row } from "react-bootstrap";
import { CreateButton } from "../components/CreateButton.jsx";
import { CrearEvento } from "./modals/CrearEvento.jsx";
import { useFetchGetBody } from "../hooks/useFetch.js";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { EventoCard } from "../components/EventoCard.jsx";
import { LoadingScreen } from "./LoadingScreen.jsx";

export const EventosTablero = () => {

  const { user } = useContext(UserContext)

  const [eventos, setEventos] = useState([])
  const [queryEventos, setQueryEventos] = useState('')
  const [findParams, setFindParams] = useState({
    sort: '{}',
    filter: '{}'
  })
  const { data, isLoading, setRefetch } = useFetchGetBody(queryEventos, findParams);

  useEffect(() => {
    if(user && user.userComponente){  
      setFindParams({
        sort: '{}',
        filter: JSON.stringify({
          operator: 'is',
          field: 'componenteEncargado',
          value: user.userComponente
        })
      }) 
      setQueryEventos('kanban/eventos')
    }
  }, [user])

  useEffect(() => {
    if(!isLoading && data){   
      setEventos(data)
    }
  }, [data, isLoading])

  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

  return(
    <Layout pagina={`Eventos - Tablero`} SiteNavBar={EventosNavBar} breadcrumbs={[
      {link: '/', nombre: 'Inicio'},
      {link: '/eventos', nombre: 'Eventos'},
      {link: '/eventos/tablero', nombre: 'Tablero'}
  ]}>
    {
      (user && user.userPermisos?.acciones['Eventos']['Crear'] ) &&
      <CreateButton title={'Evento'} ModalForm={CrearEvento} setRefetch={setRefetch} />
    }
      <DndProvider backend={HTML5Backend}>
        <Row>
          <Col xs={4}>
            <h3>Eventos Pendientes</h3>
            <hr />
            {
              eventos?.filter(e => e.estadoRealizacion === 'Pendiente').map((e, index) => (
                <EventoCard values={e} key={index} />
              ))
            }
          </Col>
          <Col xs={4}>
            <h3>Eventos en Ejecución</h3>
            <hr />
            {
              eventos?.filter(e => e.estadoRealizacion === 'En Ejecución').map((e, index) => (
                <EventoCard values={e} key={index} />
              ))
            }
          </Col>
          <Col xs={4}>
            <h3>Eventos Registrados</h3>
            <hr />
            {
              eventos?.filter(e => e.estadoRealizacion === 'Finalizado').map((e, index) => (
                <EventoCard values={e} key={index} />
              ))
            }
          </Col>
        </Row>
      </DndProvider>
  </Layout>
    
  );
}