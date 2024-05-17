import { Layout } from "./Layout.jsx";
import { CrearEventoConsolidado } from "./modals/CrearEventoConsolidado.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";

export const EventosConsolidarForm = () => {
  const endpoint = 'evento'

  return(
    <>
    <Layout pagina={`Consolidado de ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/consolidado', nombre: 'Consolidar Evento'}
    ]}>
      <CrearEventoConsolidado />
    </Layout>
    </>
  );
}
