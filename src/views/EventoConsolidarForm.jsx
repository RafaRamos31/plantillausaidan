import { Layout } from "./Layout.jsx";
import { CrearEventoConsolidado } from "./modals/CrearEventoConsolidado.jsx";
import { MELNavBar } from "../components/navBars/MELNavBar.jsx";

export const EventosConsolidarForm = () => {
  const endpoint = 'evento'

  return(
    <>
    <Layout pagina={`Consolidado de ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={MELNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/monitoreo', nombre: 'Monitoreo'},
        {link: '/monitoreo/consolidado', nombre: 'Consolidar Evento'}
    ]}>
      <CrearEventoConsolidado />
    </Layout>
    </>
  );
}
