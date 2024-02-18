
import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Clientes = () => {
  

  return(
    <>
    <Layout pagina={'Clientes'} SiteNavBar={ClientesNavBar} breadcrumbs={[{link: '/', nombre: 'Inicio'},{link: '/clientes', nombre: 'Clientes'}]}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-person-circle" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Clientes</h2>
      </div>
    </Layout>
    </>
  );
}
