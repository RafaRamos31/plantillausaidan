import { PlanNavBar } from "../components/navBars/PlanNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const PlanMonitoreo = () => {

  return(
    <>
    <Layout pagina={'Planificación - Monitoreo'} SiteNavBar={PlanNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/planificacion', nombre: 'Planificación'},
        {link: '/planificacion/monitoreo', nombre: 'Monitoreo'}
    ]}>
      <h2 className="view-title"><i className="bi bi-clipboard2-data-fill"></i>{` Monitoreo de Planificación`}</h2>
      <ul>
        <li><h6>POA</h6></li>
        <li><h6>Cuadro de tareas planificadas</h6></li>
        <li><h6>Tareas planificadas vs Tareas realizadas</h6></li>
      </ul>
    </Layout>
    </>
  );
}