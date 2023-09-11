import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const ClientBeneficiarios = () => {
  return(
    <>
    <Layout pagina={'Clientes - Beneficiarios'} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-people-fill"></i> Beneficiarios</h2>
    </Layout>
    </>
  );
}
