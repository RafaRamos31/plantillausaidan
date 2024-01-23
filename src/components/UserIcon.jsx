import { useContext, useState } from "react";
import { Container, Offcanvas, Row, Navbar, Col, Nav } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { LogoutButton } from "./LogoutButton";
import { Link } from "react-router-dom";
import { Avatar, Badge } from "@mui/material";

export const UserIcon = () => {

  const {user} = useContext(UserContext);

  function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    variant: "rounded",
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const values = [
    {
      name: 'Mi Perfil',
      url: '/',
      dir: ' ',
      icon: 'bi-person',
      new: 0
    },
    {
      name: 'Notificaciones',
      url: '/',
      dir: '',
      icon: 'bi-bell',
      new: 1
    },
    {
      name: 'Tareas Pendientes',
      url: '/',
      dir: '',
      icon: 'bi-files',
      new: 1
    },
    {
      name: 'Calendario',
      url: '/',
      dir: '',
      icon: 'bi-calendar3',
      new: 1
    },
    {
      name: 'Configuración',
      url: '/',
      dir: '',
      icon: 'bi-gear',
      new: 0
    },
    {
      name: 'Soporte',
      url: '/',
      dir: '',
      icon: 'bi-question-circle',
      new: 0
    },
    {
      name: 'Documentación',
      url: '/',
      dir: '',
      icon: 'bi-book',
      new: 0
    }
  ]

  return (
    <>
      <div className="mx-1 my-1 py-0 d-flex flex-column align-items-center" style={{cursor: 'pointer'}} onClick={handleShow}>
        <Avatar {...stringAvatar(user.userName)} />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement={'end'} scroll>
        <Offcanvas.Header className='m-0 pt-1 pb-0'  closeButton>
          <div className='d-flex'>
          <div className="my-1 py-0 d-flex flex-column align-items-center" style={{marginRight: '1rem'}}>
            <Avatar {...stringAvatar(user.userName)} style={{height: '3rem', width: '3.5rem'}} />
          </div>
          <div>
            <h4 className="my-0">{user.userName}</h4>
            <h6 className="my-0">{user.userEmail}</h6>
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
                            <Badge variant="dot" color="warning" badgeContent={link.new} anchorOrigin={{vertical: 'top', horizontal: 'right'}} style={{marginTop: '0.4rem'}}>
                              <i className={`my-0 bi ${link.icon}`} style={{fontSize: '1.5rem', color: 'var(--main-green)'}}></i>{' '}
                            </Badge>
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
