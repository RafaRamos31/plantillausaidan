import { SiteNavBar } from "../components/navBars/SiteNavBar.jsx";
import { Layout } from "./Layout.jsx";
import bg from "../assets/images/simons-bg.png";

export const Home = () => {

  return(
    <>
    <Layout pagina={'SIMONS - Inicio'} SiteNavBar={SiteNavBar} breadcrumbs={[{link: '/', nombre: 'Inicio'}]}>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
        <img src={bg} alt="" style={{position: 'absolute' ,zIndex: -1, height: '80%', maxWidth: '100%'} } />
        <h2 style={{fontWeight: 'bold', fontSize: '4rem'}}>S.I.M.O.N.S.</h2>
      </div>
    </Layout>
    </>
  );
}
