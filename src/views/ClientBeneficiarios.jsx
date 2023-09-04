import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const ClientBeneficiarios = () => {

  return(
    <>
    <Layout pagina={'Clientes - Beneficiarios'} SiteNavBar={ClientesNavBar}>
      <h2>Beneficiarios</h2>
    </Layout>
    </>
  );
}
