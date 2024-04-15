import React from 'react'
import { FormContextProvider } from '../contexts/FormContext'
import { Modal } from 'react-bootstrap'

export const ModalGroup = ({MainModal, showCreate, handleCloseCreate}) => {
  return (
    <FormContextProvider>
      <Modal show={showCreate} onHide={handleCloseCreate} autoFocus backdrop="static">
        <MainModal />
      </Modal>
    </FormContextProvider>
  )
}
