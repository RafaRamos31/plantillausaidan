import React from 'react'
import { Col, Form, Popover, Row } from 'react-bootstrap'

export const PopOverSector = () => {
  return (
    <>
      <Popover.Header style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
        Crear Sector
      </Popover.Header>
      <Popover.Body>
      <Form >
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            Nombre:
          </Form.Label>
          <Col sm="8">
            <Form.Control id='nombre' name='nombre' />
          </Col>
        </Form.Group>
      </Form>
      <p style={{color: 'red'}}>{'algo'}</p>
      </Popover.Body>
    </>
  )
}
