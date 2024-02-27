import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const PlanNavBar = () => {
  const { user } = useContext(UserContext)

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

  const page = 'Planificación';
  const [views] = useState([
    {
      name: 'Resultados',
      url: '/planificacion/resultados',
      dir: 'resultados',
      icon: 'bi-bar-chart-fill'
    },
    {
      name: 'Sub Resultados',
      url: '/planificacion/subresultados',
      dir: 'subresultados',
      icon: 'bi-bar-chart-line'
    },
    {
      name: 'Actividades',
      url: '/planificacion/actividades',
      dir: 'actividades',
      icon: 'bi-stack'
    },
    {
      name: 'Sub Actividades',
      url: '/planificacion/subactividades',
      dir: 'subactividades',
      icon: 'bi-layers'
    },
    {
      name: 'Tareas',
      url: '/planificacion/tareas',
      dir: 'tareas',
      icon: 'bi-list-check'
    },
    {
      name: 'Años Fiscales',
      url: '/planificacion/years',
      dir: 'years',
      icon: 'bi-calendar3'
    },
    {
      name: 'Trimestres',
      url: '/planificacion/quarters',
      dir: 'quarters',
      icon: 'bi-calendar2-week'
    },
    {
      name: 'Monitoreo',
      url: '/planificacion/monitoreo',
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
