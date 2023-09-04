import { Link } from 'react-router-dom'

export const InfoLink = ({type, id, nombre}) => {
  return (
    <Link to={`/info/${type}/${id}`} target='_blank' className='info-link'>
      {nombre}{' '}
      <i className="bi bi-box-arrow-up-right info-link-icon"></i>
    </Link>
  )
}
