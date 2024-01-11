import { useContext, useState } from "react";
import { Container, Offcanvas, Row, Navbar, Col, Nav } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { LogoutButton } from "./LogoutButton";
import { Link } from "react-router-dom";

export const UserIcon = () => {

  const {user} = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const values = [
    {
      name: 'Mi Perfil',
      url: '/',
      dir: ' ',
      icon: 'bi-person'
    },
    {
      name: 'Notificaciones',
      url: '/',
      dir: '',
      icon: 'bi-bell'
    },
    {
      name: 'Tareas Pendientes',
      url: '/',
      dir: '',
      icon: 'bi-files'
    },
    {
      name: 'Calendario',
      url: '/',
      dir: '',
      icon: 'bi-calendar3'
    },
    {
      name: 'Configuración',
      url: '/',
      dir: '',
      icon: 'bi-gear'
    },
    {
      name: 'Soporte',
      url: '/',
      dir: '',
      icon: 'bi-question-circle'
    },
    {
      name: 'Documentación',
      url: '/',
      dir: '',
      icon: 'bi-book'
    }
  ]

  return (
    <>
      <div className="mx-1 my-1 py-0 d-flex flex-column align-items-center" style={{cursor: 'pointer'}} onClick={handleShow}>
        <div className='py-0 d-flex align-items-center justify-content-center' 
        style={{borderRadius: '10px', backgroundColor: 'var(--low-green)', height: '2.5rem', width: '3.5rem'}}>
          <i className={`bi bi-person-fill`} style={{fontSize: '2.6rem', color: 'var(--main-green)'}}></i>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement={'end'} scroll>
        <Offcanvas.Header className='m-0 pt-1 pb-0'  closeButton>
          <div className='d-flex'>
          <div className="my-1 py-0 d-flex flex-column align-items-center" style={{marginRight: '1rem'}}>
            <div className='py-0 d-flex align-items-center justify-content-center' 
            style={{borderRadius: '10px', backgroundColor: 'var(--low-green)', height: '3rem', width: '3.5rem'}}>
              <i className={`bi bi-person-fill`} style={{fontSize: '2.6rem', color: 'var(--main-green)'}}></i>
            </div>
          </div>
          <div>
            <h4 className="my-0">{user.userName}</h4>
            <h6 className="my-0">{'correo@gmail.com'}</h6>
          </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="my-0 py-0">
          <hr className='mb-0'/>
            <Navbar className="py-0">
              <Container fluid className='px-0 w-100'>
                <Nav className="py-0 d-flex flex-column w-100">
                  {
                    values.map((link, index) => (
                      <Link key={index} to={link.url} className={`text-start nav-link w-100`}>
                        <Row className="d-flex align-items-center">
                          <Col className='d-flex align-items-center'>
                            <i className={`my-0 bi ${link.icon}`} style={{fontSize: '1.5rem', color: 'var(--main-green)'}}></i>{' '}
                            <p className="my-0" style={{fontSize: '1.2rem', marginLeft: '1rem'}}>{link.name}</p>
                          </Col>
                        </Row>
                      </Link>
                    ))
                  }
                </Nav>
              </Container>
            </Navbar>
          <hr />
          <LogoutButton />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
