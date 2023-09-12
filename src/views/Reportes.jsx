import { ReportesNavBar } from "../components/navBars/ReportesNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Reportes = () => {

  return(
    <>
    <Layout pagina={'Reportes'} SiteNavBar={ReportesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-search" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Reportes</h2>
      </div>
    </Layout>
    </>
  );
}
