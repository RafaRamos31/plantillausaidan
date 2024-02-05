import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const SiteNavBar = () => {
  const [actual, setActual] = useState('');

  const { user } = useContext(UserContext)

  useEffect(() => {
    const dirs = window.location.href.split('/')[3]
    setActual(dirs)
  }, [])

  const [values, setValues] = useState([
    {
      name: 'Inicio',
      url: '/',
      dir: '',
      icon: 'bi-house-fill'
    }
  ])

  useEffect(() => {
    let newValues = [{
      name: 'Inicio',
      url: '/',
      dir: '',
      icon: 'bi-house-fill'
    }]

    if(user.userPermisos?.vistas['Clientes'] && Object.values(user.userPermisos?.vistas['Clientes']).some(valor => valor === true)){
      newValues = newValues.concat({
        name: 'Clientes',
        url: '/clientes',
        dir: 'clientes',
        icon: 'bi-person-circle'
      })
    }
  
    if(user.userPermisos?.vistas['Inversiones'] && Object.values(user.userPermisos?.vistas['Inversiones']).some(valor => valor === true)){
      newValues = newValues.concat({
        name: 'Inversiones',
        url: '/inversiones',
        dir: 'inversiones',
        icon: 'bi-cash-stack'
      })
    }
  
    if(user.userPermisos?.vistas['Planificación'] && Object.values(user.userPermisos?.vistas['Planificación']).some(valor => valor === true)){
      newValues = newValues.concat({
        name: 'Planificación',
        url: '/planificacion',
        dir: 'planificacion',
        icon: 'bi-list-task'
      })
    }
  
    if(user.userPermisos?.vistas['Indicadores'] && Object.values(user.userPermisos?.vistas['Indicadores']).some(valor => valor === true)){
      newValues = newValues.concat({
        name: 'Indicadores',
        url: '/indicadores',
        dir: 'indicadores',
        icon: 'bi-bell-fill'
      })
    }
  
    if(user.userPermisos?.vistas['Reportes'] && Object.values(user.userPermisos?.vistas['Reportes']).some(valor => valor === true)){
      newValues = newValues.concat({
        name: 'Reportes',
        url: '/reportes',
        dir: 'reportes',
        icon: 'bi-search'
      })
    }
  
    if(user.userPermisos?.vistas['Configuración'] && Object.values(user.userPermisos.vistas['Configuración']).some(valor => valor === true)){
      newValues = newValues.concat({
        name: 'Configuración',
        url: '/configuracion',
        dir: 'configuracion',
        icon: 'bi-gear-fill'
      })
    }

    setValues(newValues)
  }, [user])
  

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
