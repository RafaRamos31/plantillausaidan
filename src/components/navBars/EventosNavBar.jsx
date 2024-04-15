import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const EventosNavBar = () => {
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

  const page = 'Eventos';
  const [views] = useState([
    {
      name: 'Planificación',
      url: '/eventos/planificacion',
      dir: 'planificacion',
      icon: 'bi-bar-chart-steps'
    },
    {
      name: 'Tablero',
      url: '/eventos/tablero',
      dir: 'tablero',
      icon: 'bi-kanban'
    },
    {
      name: 'Aprobación',
      url: '/eventos/aprobacion',
      dir: 'aprobacion',
      icon: 'bi-calendar2-check'
    },
    {
      name: 'Finalización',
      url: '/eventos/terminar',
      dir: 'terminar',
      icon: 'bi-flag-fill'
    },
    {
      name: 'Digitación',
      url: '/eventos/digitar',
      dir: 'digitar',
      icon: 'bi-pencil-square'
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
