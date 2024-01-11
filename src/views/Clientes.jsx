import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { useRefreshAuth } from "../hooks/useAuth.js";
import { Layout } from "./Layout.jsx";

export const Clientes = () => {

  useRefreshAuth()
  
  return(
    <>
    <Layout pagina={'Clientes'} SiteNavBar={ClientesNavBar}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-person-circle" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Clientes</h2>
      </div>
    </Layout>
    </>
  );
}
