import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const ConfigNavBar = () => {
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
      name: 'Usuarios',
      url: '/configuracion/usuarios',
      dir: 'usuarios',
      icon: 'bi-people-fill'
    },
    {
      name: 'Roles',
      url: '/configuracion/roles',
      dir: 'roles',
      icon: 'bi-wrench'
    },
    {
      name: 'Componentes',
      url: '/configuracion/componentes',
      dir: 'componentes',
      icon: 'bi-person-fill-up'
    },
    {
      name: 'Departamentos',
      url: '/configuracion/departamentos',
      dir: 'departamentos',
      icon: 'bi-geo-alt-fill'
    },
    {
      name: 'Municipios',
      url: '/configuracion/municipios',
      dir: 'municipios',
      icon: 'bi-geo-alt-fill'
    },
    {
      name: 'Aldeas',
      url: '/configuracion/aldeas',
      dir: 'aldeas',
      icon: 'bi-geo-alt-fill'
    },
    {
      name: 'Caserios',
      url: '/configuracion/caserios',
      dir: 'caserios',
      icon: 'bi-geo-alt-fill'
    },
    {
      name: 'Áreas Temáticas',
      url: '/configuracion/areas',
      dir: 'areas',
      icon: 'bi-collection-fill'
    },
    {
      name: 'Sub Áreas Temáticas',
      url: '/configuracion/subareas',
      dir: 'subareas',
      icon: 'bi-collection'
    }
  ]

  return (
    <>
    <Navbar expand="lg"  className="py-0">
      <Container fluid className='px-0'>
        <Nav className="py-0 d-flex flex-column">
          {
            values.map((link, index) => (
              <Link key={index} to={link.url}  style={{paddingTop: '0.2rem'}} className={`text-start nav-link ${actual === link.dir ? 'active' : ''}`}>
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
