import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const PlanNavBar = () => {
  const [actual, setActual] = useState('');

  useEffect(() => {
    const dirs = window.location.href.split('/')[4]
    setActual(dirs)
  }, [])

  const values = [
    {
      name: 'Volver',
      url: '/',
      dir: '',
      icon: 'bi-arrow-return-left'
    },
    {
      name: 'Resultados',
      url: '/planificacion/resultados',
      dir: 'resultados',
      icon: 'bi-bar-chart-fill'
    },
    {
      name: 'Indicadores',
      url: '/planificacion/indicadores',
      dir: 'indicadores',
      icon: 'bi-graph-up-arrow'
    },
    {
      name: 'Estrategias',
      url: '/planificacion/estrategias',
      dir: 'estrategias',
      icon: 'bi-file-earmark-text'
    },
    {
      name: 'Actividades',
      url: '/planificacion/actividades',
      dir: 'actividades',
      icon: 'bi-file-earmark-plus'
    },
    {
      name: 'Tareas',
      url: '/planificacion/tareas',
      dir: 'tareas',
      icon: 'bi-bell-fill'
    },
    {
      name: 'Monitoreo',
      url: '/planificacion/monitoreo',
      dir: 'monitoreo',
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
