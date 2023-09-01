import { Col, Row } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import useTitle from "../hooks/useTitle";

export const Layout = ({pagina, SiteNavBar, children}) => {
  useTitle(pagina);
  return (
    <>
      <Row>
        <Col md={3} className='px-0'>
          <SiteNavBar />
        </Col>
        <Col className='px-0'>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Col>
      </Row>
    </>
  );
}
