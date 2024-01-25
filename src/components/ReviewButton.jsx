import { Button, Modal, Spinner } from "react-bootstrap";
import { EditDepartamento } from "../views/modals/EditDepartamento";
import { useState } from "react";

export const ReviewButton = ({handleSubmit, charging, dataDept, original}) => {

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: 'none',
    borderRadius: '3px'
  };

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  if(dataDept && dataDept.estado === 'Rechazado'){
    return (
      <div className="d-grid w-100">
        <>
          <Button variant="primary" onClick={handleShowEdit}><i className="bi bi-tools"></i>{' '}Corregir</Button>
          <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
            <EditDepartamento handleClose={handleCloseEdit} setRefetchData={()=>{}} departamento={{...dataDept, id: original?._id}} fixing/>
          </Modal>
        </>
      </div>
    )
  }

  if(dataDept && dataDept.estado === 'En revisión'){
    return (
      <div className="d-grid w-100">
        {/**Boton para guardar revision */}
        {
          !charging ?
          <Button style={buttonStyle} onClick={handleSubmit}><i className="bi bi-check2-square"></i>{' '}Guardar revisión</Button>
          :
          <Button style={buttonStyle}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Cargando...</span>
          </Button>
        }
      </div>
    )
  }

  return null;
}
