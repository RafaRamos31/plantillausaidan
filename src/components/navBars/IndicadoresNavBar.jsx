import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const IndicadoresNavBar = () => {
  const { user } = useContext(UserContext);

  const [actual, setActual] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const dirs = window.location.href.split('/')[4]
    setActual(dirs)
  }, [])

  const handleReturn = () => {
    let dirs = window.location.href.split('/')
    // eslint-disable-next-line
    const _ = dirs.pop;
    const url = dirs.join('/')
    navigate(url);
  }

  const page = 'Indicadores';
  const [views] = useState([
    {
      name: 'Indicadores',
      url: '/indicadores/indicadores',
      dir: 'indicadores',
      icon: 'bi-graph-up-arrow'
    },
    {
      name: 'Áreas Temáticas',
      url: '/indicadores/areas',
      dir: 'areas',
      icon: 'bi-diagram-3-fill'
    },
    {
      name: 'Años Fiscales',
      url: '/indicadores/years',
      dir: 'years',
      icon: 'bi-calendar3'
    },
    {
      name: 'Trimestres',
      url: '/indicadores/quarters',
      dir: 'quarters',
      icon: 'bi-calendar2-week'
    },
    {
      name: 'Monitoreo',
      url: '/indicadores/monitoreo',
      dir: 'monitoreo',
      icon: 'bi-clipboard2-data-fill'
    }
  ])

  const [values, setValues] = useState([])

  useEffect(() => {
    const newValues = views.filter(view => user.userPermisos?.vistas[page][view.name])
    setValues(newValues)
  // eslint-disable-next-line
  }, [user, views])

  return (
    <>
    <Navbar expand="lg"  className="py-0">
      <Container fluid className='px-0'>
        <Nav className="py-0 d-flex flex-column">
          <div className={`text-start nav-link`} onClick={handleReturn} style={{cursor: 'pointer'}}>
            <Row className="d-flex align-items-center">
              <Col xs={2}>
                <i className={`my-0 bi bi-arrow-return-left`} style={{fontSize: '1.5rem', color: 'var(--main-green)'}}></i>{' '}
              </Col>
              <Col xs={1}>
                <p className="my-0 mb-1 separator" style={{fontSize: '2rem'}}>|</p>
              </Col>
              <Col>
                <p className="my-0" style={{fontSize: '1.2rem'}}>Volver</p>
              </Col>
            </Row>
          </div>
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
