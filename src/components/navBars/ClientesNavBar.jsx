import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const ClientesNavBar = () => {
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
    /*{
      name: 'Beneficiarios',
      url: '/clientes/beneficiarios',
      dir: 'beneficiarios',
      icon: 'bi-people-fill'
    },*/
    {
      name: 'Organizaciones',
      url: '/clientes/organizaciones',
      dir: 'organizaciones',
      icon: 'bi-bank2'
    },
    {
      name: 'Tipos de Organizaciones',
      url: '/clientes/orgtypes',
      dir: 'orgtypes',
      icon: 'bi-bank'
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
