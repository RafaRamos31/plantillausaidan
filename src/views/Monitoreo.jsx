import { MELNavBar } from "../components/navBars/MELNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Monitoreo = () => {

  return(
    <>
    <Layout pagina={'Monitoreo'} SiteNavBar={MELNavBar} breadcrumbs={[{link: '/', nombre: 'Inicio'},{link: '/monitoreo', nombre: 'Monitoreo'}]}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-clipboard-data-fill" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Monitoreo</h2>
      </div>
    </Layout>
    </>
  );
}
