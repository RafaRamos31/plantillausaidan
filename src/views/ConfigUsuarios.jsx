import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const ConfigUsuarios = () => {

  return(
    <>
    <Layout pagina={'Configuracion - Usuarios'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-people-fill"></i> Usuarios</h2>
    </Layout>
    </>
  );
}
