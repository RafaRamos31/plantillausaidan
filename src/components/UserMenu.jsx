import { useContext, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { LogoutButton } from "./LogoutButton";

export const UserIcon = () => {

  const {user} = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="mx-1 my-1 py-0 d-flex flex-column align-items-center" style={{cursor: 'pointer'}} onClick={handleShow}>
        <div className='py-0 d-flex align-items-center justify-content-center' 
        style={{borderRadius: '10px', backgroundColor: 'var(--low-green)', height: '2.5rem', width: '3.5rem'}}>
          <i className={`bi bi-person-fill`} style={{fontSize: '2.6rem', color: 'var(--main-green)'}}></i>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement={'end'} scroll>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.userName}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LogoutButton />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
