import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Col, Row } from "react-bootstrap";
import { EventStack } from "../components/EventStack.jsx";
import { useState } from "react";

export const EventosRegistro = () => {


const eventos = [
  {_id: '1212', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Pendiente', date: '01/02/2024'},
  {_id: '1212', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Pendiente', date: '01/02/2024'},
  {_id: '456', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Cancelado', date: '10/02/2024'},
  {_id: '456', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Cancelado', date: '10/02/2024'},
  {_id: '456', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'En proceso', date: '10/02/2024'},
  {_id: '456', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'En proceso', date: '10/02/2024'},
  {_id: '456', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'En proceso', date: '10/02/2024'},
  {_id: '4564', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Pendiente', date: new Date()},
  {_id: '345', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Finalizado', date: '11/02/2024'},
  {_id: '345', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Finalizado', date: '11/02/2024'},
  {_id: '345', nombre: 'Taller de Fortalecimiento de Capacidades', estado: 'Finalizado', date: '11/02/2024'},
];

const [pendientes, setPendientes] = useState(eventos.filter(e => e.estado === 'Pendiente' || e.estado === 'Cancelado'))
const [procesos, setProcesos] = useState(eventos.filter(e => e.estado === 'En proceso'))
const [finalizados, setFinalizados] = useState(eventos.filter(e => e.estado === 'Finalizado'))

  return(
    <Layout pagina={`Eventos - Registro`} SiteNavBar={EventosNavBar} breadcrumbs={[
      {link: '/', nombre: 'Inicio'},
      {link: '/eventos', nombre: 'Eventos'},
      {link: '/eventos/registro', nombre: 'Registro'}
  ]}>
      <DndProvider backend={HTML5Backend}>
        <Row>
          <Col xs={4}>
            <h3>Tareas Pendientes</h3>
            <hr />
            <EventStack events={pendientes}/>
          </Col>
          <Col xs={4}>
            <h3>Tareas en Ejecución</h3>
            <hr />
            <EventStack events={procesos}/>
          </Col>
          <Col xs={4}>
            <h3>Tareas Procesadas</h3>
            <hr />
            <EventStack events={finalizados}/>
          </Col>
        </Row>
      </DndProvider>
  </Layout>
    
  );
}