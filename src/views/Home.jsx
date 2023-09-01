import { SiteNavBar } from "../components/navBars/SiteNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Home = () => {

  return(
    <>
    <Layout pagina={'Inicio'} SiteNavBar={SiteNavBar}>
      <h2>Home</h2>
    </Layout>
    </>
  );
}
