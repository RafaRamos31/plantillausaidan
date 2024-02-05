import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Notification = ({text}) => {

  return (
    <>
      <Link className='pill' to={`/info/caserio/`} style={{textDecoration: 'none'}}>
        <Card className="w-100">
          <Card.Body className='pill-body d-flex align-items-center m-0 p-2'>
            <i className="bi bi-pencil-fill" style={{color: 'var(--main-green', fontSize: '1.5rem'}}></i>
            <div style={{marginLeft: '0.6rem'}}>{text}</div>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}
