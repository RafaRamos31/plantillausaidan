import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Configuracion = () => {

  return(
    <>
    <Layout pagina={'Configuracion'} SiteNavBar={ConfigNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-gear-fill" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Configuración</h2>
      </div>
    </Layout>
    </>
  );
}
