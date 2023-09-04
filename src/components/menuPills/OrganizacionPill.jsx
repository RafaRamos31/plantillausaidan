import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const OrganizacionPill = () => {
  return (
    <Link to={`/info/organizacion/64e4ee12d6ec07a3be94ccae`} style={{textDecoration: 'none'}}>
      <Card style={{ width: '15rem', margin: '0.5rem' }}>
        <Card.Body className='d-flex justify-content-center align-items-center m-0 p-0'>
          <i className="bi bi-bank2" style={{color: 'var(--main-green', fontSize: '5rem'}}></i>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-center align-items-center'>
          <Card.Title style={{textAlign: 'center'}}>Organizacion</Card.Title>
        </Card.Footer>
      </Card>
    </Link>
  )
}
