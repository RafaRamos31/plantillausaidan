import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const InversionesNavBar = () => {
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

  const page = 'Inversiones';
  const [views] = useState([
    {
      name: 'Presupuestar Evento',
      url: '/inversiones/presupuestar',
      dir: 'presupuestar',
      icon: 'bi-calendar2-plus'
    },
    {
      name: 'Inversiones',
      url: '/inversiones/list',
      dir: 'list',
      icon: 'bi-cash-stack'
    },
    {
      name: 'Áreas Temáticas',
      url: '/inversiones/areas',
      dir: 'areas',
      icon: 'bi-bounding-box'
    },
    {
      name: 'Categorias',
      url: '/inversiones/categorias',
      dir: 'areas',
      icon: 'bi-collection-fill'
    },
    {
      name: 'Sub Categorias',
      url: '/inversiones/subcategorias',
      dir: 'areas',
      icon: 'bi-collection'
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
