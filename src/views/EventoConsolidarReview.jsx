import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { ReviewEventoConsolidado } from "./modals/ReviewEventoConsolidado.jsx";

export const EventosConsolidarReview = () => {
  const endpoint = 'evento'

  return(
    <>
    <Layout pagina={`Revisión de Consolidado de ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/consolidado', nombre: 'Consolidar Evento'}
    ]}>
      <ReviewEventoConsolidado />
    </Layout>
    </>
  );
}
