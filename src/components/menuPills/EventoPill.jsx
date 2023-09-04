import React from 'react'
import { Card } from 'react-bootstrap'

export const EventoPill = () => {
  return (
    <Card style={{ width: '15rem', margin: '0.5rem' }}>
      <Card.Body className='d-flex justify-content-center align-items-center m-0 p-0'>
        <i className="bi bi-bell-fill" style={{color: 'var(--main-green', fontSize: '5rem'}}></i>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center align-items-center'>
        <Card.Title style={{textAlign: 'center', textDecoration: 'none'}}>Evento</Card.Title>
      </Card.Footer>
    </Card>
  )
}
