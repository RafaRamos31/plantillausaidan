import { SiteNavBar } from "../components/navBars/SiteNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Home = () => {

  return(
    <>
    <Layout pagina={'Sistema de Gestión USAID-AN'} SiteNavBar={SiteNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-house-fill" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Inicio</h2>
      </div>
    </Layout>
    </>
  );
}
