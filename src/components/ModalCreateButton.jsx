import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalCreateButton = ({ModalForm, setRefetch}) => {
  const [show, setShow] = useState(false);

  const renderBackdrop = () => <div style={{position: 'fixed',
    zIndex: 4000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 1}}/>;

  return (
    <>
      <Button variant="light" onClick={() => setShow(true)}>
        <i className="bi bi-file-earmark-plus"></i>
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        centered
      >
        <>
          <ModalForm handleClose={() => setShow(false)} setRefetch={setRefetch} />
        </>
      </Modal>
    </>
  );
}