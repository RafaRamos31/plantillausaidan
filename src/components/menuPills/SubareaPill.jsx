import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const SubareaPill = ({data}) => {
  return (
    <Link to={`/info/subarea/${data._id}`} style={{textDecoration: 'none'}}>
      <Card style={{ width: '15rem', margin: '0.5rem' }}>
        <Card.Body className='d-flex justify-content-center align-items-center m-0 p-0'>
          <i className="bi bi-collection" style={{color: 'var(--main-green', fontSize: '5rem'}}></i>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-center align-items-center'>
          <Card.Title style={{textAlign: 'center', textDecoration: 'none'}}>{data.nombre}</Card.Title>
        </Card.Footer>
      </Card>
    </Link>
  )
}
