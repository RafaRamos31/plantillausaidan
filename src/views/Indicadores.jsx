import { IndicadoresNavBar } from "../components/navBars/IndicadoresNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Indicadores = () => {

  return(
    <>
    <Layout pagina={'Indicadores'} SiteNavBar={IndicadoresNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-bell-fill" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Indicadores</h2>
      </div>
    </Layout>
    </>
  );
}
