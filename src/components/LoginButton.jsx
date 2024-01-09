import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { AccessModal } from "../views/modals/AccessModal";

export const LoginButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="py-1 m-2" 
      style={{height: '2.5rem', borderColor: 'black', backgroundColor: 'var(--main-green)', size: '2rem'}}
      onClick={handleShow}>Acceder</Button>

      <Modal show={show} onHide={handleClose}>
        <AccessModal />
      </Modal>
    </>
    
  )
}
