import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Eventos = () => {

  return(
    <>
    <Layout pagina={'Eventos'} SiteNavBar={EventosNavBar} breadcrumbs={[{link: '/', nombre: 'Inicio'},{link: '/eventos', nombre: 'Eventos'}]}>
    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-calendar-check" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Eventos</h2>
      </div>
    </Layout>
    </>
  );
}
