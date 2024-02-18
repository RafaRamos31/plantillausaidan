import { PlanNavBar } from "../components/navBars/PlanNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Planificacion = () => {

  return(
    <>
    <Layout pagina={'Planificación'} SiteNavBar={PlanNavBar} breadcrumbs={[{link: '/', nombre: 'Inicio'},{link: '/planificacion', nombre: 'Planificación'}]}>
    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <i className="bi bi-list-task" style={{fontSize: '8rem', color: 'var(--main-green)'}}></i>
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>Planificación</h2>
      </div>
    </Layout>
    </>
  );
}
