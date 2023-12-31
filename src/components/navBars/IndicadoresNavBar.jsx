import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const IndicadoresNavBar = () => {
  const [actual, setActual] = useState('');

  useEffect(() => {
    const dirs = window.location.href.split('/')[4]
    setActual(dirs)
  }, [])

  const values = [
    {
      name: 'Volver',
      url: '/',
      dir: ' ',
      icon: 'bi-arrow-return-left'
    },
    {
      name: 'Indicadores',
      url: '/indicadores/indicadores',
      dir: 'indicadores',
      icon: 'bi-graph-up-arrow'
    },
    {
      name: 'Registro',
      url: '/indicadores/registro',
      dir: 'registro',
      icon: 'bi bi-pencil-square'
    },
    {
      name: 'Monitoreo',
      url: '/indicadores/monitoreo',
      dir: 'monitoreo',
      icon: 'bi-file-earmark-text'
    },
    {
      name: 'Reportes',
      url: '/indicadores/reportes',
      dir: 'reportes',
      icon: 'bi-clipboard2-data-fill'
    }
  ]

  return (
    <>
    <Navbar expand="lg"  className="py-0">
      <Container fluid className='px-0'>
        <Nav className="py-0 d-flex flex-column">
          {
            values.map((link, index) => (
              <Link key={index} to={link.url} className={`text-start nav-link ${actual === link.dir ? 'active' : ''}`}>
                <Row className="d-flex align-items-center">
                  <Col xs={2}>
                    <i className={`my-0 bi ${link.icon}`} style={{fontSize: '1.5rem', color: 'var(--main-green)'}}></i>{' '}
                  </Col>
                  <Col xs={1}>
                    <p className="my-0 mb-1 separator" style={{fontSize: '2rem'}}>|</p>
                  </Col>
                  <Col>
                    <p className="my-0" style={{fontSize: '1.2rem'}}>{link.name}</p>
                  </Col>
                </Row>
              </Link>
            ))
          }
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};
