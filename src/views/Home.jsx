import { SiteNavBar } from "../components/navBars/SiteNavBar.jsx";
import { Layout } from "./Layout.jsx";
import bg from "../assets/images/fondo.png";

export const Home = () => {

  return(
    <>
    <Layout pagina={'SIMONS - Inicio'} SiteNavBar={SiteNavBar} breadcrumbs={[{link: '/', nombre: 'Inicio'}]}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <img src={bg} alt="" style={{position: 'absolute' ,zIndex: -1, height: '90%', maxWidth: '100%'} } />
      </div>
    </Layout>
    </>
  );
}
