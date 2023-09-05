import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const CaserioPill = ({data}) => {
  return (
    <Link className='pill' to={`/info/caserio/${data._id}`} style={{textDecoration: 'none'}}>
      <Card style={{ width: '15rem', margin: '0.5rem' }}>
        <Card.Body className='pill-body d-flex justify-content-center align-items-center m-0 p-0'>
          <i className="bi bi-geo-alt-fill" style={{color: 'var(--main-green', fontSize: '5rem'}}></i>
        </Card.Body>
        <Card.Footer className='d-flex flex-column justify-content-center align-items-center'>
          <Card.Title style={{textAlign: 'center', textDecoration: 'none'}}>{data.nombre}</Card.Title>
          <h6>{data.geocode}</h6>
        </Card.Footer>
      </Card>
    </Link>
  )
}
