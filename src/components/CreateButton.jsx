import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const CreateButton = ({title, ModalForm, modalSize='md', setRefetch}) => {
  const [show, setShow] = useState(false);

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px',
  };

  return (
    <>
      <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={() => setShow(true)}>
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