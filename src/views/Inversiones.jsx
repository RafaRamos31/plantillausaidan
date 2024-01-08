import { InversionesNavBar } from "../components/navBars/InversionesNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Inversiones = () => {

  return(
    <>
    <Layout pagina={'Inversiones'} SiteNavBar={InversionesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-cash-stack" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Inversiones</h2>
      </div>
    </Layout>
    </>
  );
}
