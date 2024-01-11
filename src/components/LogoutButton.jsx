import { Button } from "react-bootstrap"

export const LogoutButton = () => {

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    window.location.reload();
  }

  return (
    <div className='d-grid'>
      <Button className="py-1 m-2" 
      variant='danger'
      style={{height: '2.5rem', borderColor: 'black', size: '2rem'}}
      onClick={handleLogout}>Cerrar Sesión</Button>
    </div>
    
  )
}
