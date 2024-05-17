import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const CreateButton = ({title, ModalForm, modalSize='md', setRefetch, customStyle=null}) => {
  const [show, setShow] = useState(false);

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px',
  };

  return (
    <>
      <Button style={customStyle || {...buttonStyle, marginRight:'0.4rem'}} className={!customStyle ? 'my-2' : null} onClick={() => setShow(true)}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        {`Agregar ${title}`}
      </Button>

      <Modal
        size={modalSize}
        show={show}
        onHide={() => setShow(false)}
        backdrop='static'
        aria-labelledby="modal-label"
      >
        <>
          <ModalForm handleClose={() => setShow(false)} setRefetch={setRefetch} />
        </>
      </Modal>
    </>
  );
}