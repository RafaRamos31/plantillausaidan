import { SiteNavBar } from "../components/navBars/SiteNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Home = () => {

  return(
    <>
    <Layout pagina={'Sistema de Gestión USAID-AN'} SiteNavBar={SiteNavBar}>
      <h2>Home</h2>
    </Layout>
    </>
  );
}
