import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";

import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

export const EventosPlanificacion = () => {

  const [view, setView] = useState(ViewMode.Day)
  const [columnWidth, setColumnWidth] = useState(350)

  useEffect(() => {
    if (view === ViewMode.Year) {
      setColumnWidth(350);
    } else if (view === ViewMode.Month) {
      setColumnWidth(300);
    } else if (view === ViewMode.Week) {
      setColumnWidth(250);
    }
  }, [view])
  
  

  let tasks = [
    {
      start: new Date(2024, 2, 1),
      end: new Date(2024, 2, 31),
      name: 'Talleres de AIN-C',
      id: 'AINC',
      type:'project',
      project: 'Talleres de AIN-C',
      progress: 20,
      isDisabled: false,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      hideChildren: true
    },
    {
      start: new Date(2024, 2, 3),
      end: new Date(2024, 2, 3),
      name: 'Taller en Gracias Lempira',
      id: 'Task 0',
      type:'task',
      progress: 100,
      isDisabled: false,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      project: 'Talleres de AIN-C',
    },
  ];
  
  return(
    <Layout pagina={`Eventos - Tablero`} SiteNavBar={EventosNavBar} breadcrumbs={[
      {link: '/', nombre: 'Inicio'},
      {link: '/eventos', nombre: 'Eventos'},
      {link: '/eventos/planificacion', nombre: 'Planificación'}
  ]}>
      <div className="d-flex justify-content-end">
        <ButtonGroup variant="outlined">
          <Button color="success" variant={view === ViewMode.Day ? 'contained' : 'outlined'} onClick={() => setView(ViewMode.Day)}>Día</Button>
          <Button color="success" variant={view === ViewMode.Week ? 'contained' : 'outlined'} onClick={() => setView(ViewMode.Week)}>Semana</Button>
          <Button color="success" variant={view === ViewMode.Month ? 'contained' : 'outlined'} onClick={() => setView(ViewMode.Month)}>Mes</Button>
          <Button color="success" variant={view === ViewMode.Year ? 'contained' : 'outlined'} onClick={() => setView(ViewMode.Year)}>Año</Button>
        </ButtonGroup>
      </div>
      
      <div className="d-grid">
        <Gantt
          tasks={tasks}
          viewMode={view}
          viewDate={new Date()}
          locale="spa"
          columnWidth={columnWidth}
        />
      </div>
  </Layout>
    
  );
}