import { IndicadoresNavBar } from "../components/navBars/IndicadoresNavBar.jsx";
import { Layout } from "./Layout.jsx";

export const Indicadores = () => {

  return(
    <>
    <Layout pagina={'Indicadores'} SiteNavBar={IndicadoresNavBar}>
      <h2>Indicadores</h2>
    </Layout>
    </>
  );
}
