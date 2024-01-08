import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const SiteNavBar = () => {
  const [actual, setActual] = useState('');

  useEffect(() => {
    const dirs = window.location.href.split('/')[3]
    setActual(dirs)
  }, [])

  const values = [
    {
      name: 'Inicio',
      url: '/',
      dir: '',
      icon: 'bi-house-fill'
    },
    {
      name: 'Clientes',
      url: '/clientes',
      dir: 'clientes',
      icon: 'bi-person-circle'
    },
    {
      name: 'Inversiones',
      url: '/inversiones',
      dir: 'inversiones',
      icon: 'bi-cash-stack'
    },
    {
      name: 'Planificación',
      url: '/planificacion',
      dir: 'planificacion',
      icon: 'bi-list-task'
    },
    {
      name: 'Indicadores',
      url: '/indicadores',
      dir: 'indicadores',
      icon: 'bi-bell-fill'
    },
    {
      name: 'Reportes',
      url: '/reportes',
      dir: 'reportes',
      icon: 'bi-search'
    },
    {
      name: 'Configuración',
      url: '/configuracion',
      dir: 'configuracion',
      icon: 'bi-gear-fill'
    },
  ]

  return (
    <>
    <Navbar expand="sm"  className="py-0 bg-body-light">
      <Container fluid className='px-0'>
          <Nav className="py-0 d-flex flex-column">
            {
              values.map((link, index) => (
                <Link key={index} to={link.url} className={`mt-1 text-start nav-link ${actual === link.dir ? 'active' : ''}`}>
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
