import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { DeleteModal } from '../views/modals/DeleteModal';
import { RestoreModal } from '../views/modals/RestoreModal';

export const DeleteButton = ({dataDept}) => {

  //Modal Eliminar
  const [showEliminar, setShowEliminar] = useState(false);
  const handleCloseEliminar = () => setShowEliminar(false);
  const handleShowEliminar = () => setShowEliminar(true);

  if(dataDept && dataDept.estado === 'Eliminado'){
    return (
      <>
        <div className="d-grid w-100">
          <Button variant="primary" onClick={handleShowEliminar}><i className="bi bi-eye-fill"></i>{' '}Restaurar</Button>
        </div>
        <Modal show={showEliminar} onHide={handleCloseEliminar}>
          <RestoreModal handleClose={handleCloseEliminar} id={dataDept._id} type={'departamentos'}/>
        </Modal>
      </>
    )
  }

  if(dataDept && dataDept.estado === 'Publicado'){
    return (
      <>
        <div className="d-grid w-100">
          <Button variant="danger" onClick={handleShowEliminar}><i className="bi bi-eye-slash-fill"></i>{' '}Eliminar</Button>
        </div>
        <Modal show={showEliminar} onHide={handleCloseEliminar}>
          <DeleteModal handleClose={handleCloseEliminar} id={dataDept._id} type={'departamentos'}/>
        </Modal>
      </>
    )
  }

  return null;
}
