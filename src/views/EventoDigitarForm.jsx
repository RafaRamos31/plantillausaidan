import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { CrearEventoParticipantes } from "./modals/CrearEventoParticipantes.jsx";

export const EventosDigitarForm = () => {
  const endpoint = 'evento'

  return(
    <>
    <Layout pagina={`Digitación ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/digitar', nombre: 'Digitación'}
    ]}>
      <CrearEventoParticipantes />
    </Layout>
    </>
  );
}
