import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Clientes = () => {

  return(
    <>
    <Layout pagina={'Clientes'} SiteNavBar={ClientesNavBar}>
      <h2>Clientes</h2>
    </Layout>
    </>
  );
}
