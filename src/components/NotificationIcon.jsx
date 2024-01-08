
export const NotificationIcon = () => {
  return (
    <div className="my-1 py-0 d-flex flex-column align-items-center" style={{cursor: 'pointer'}}>
      <div className='py-0 d-flex align-items-center justify-content-center' 
      style={{borderRadius: '10px', height: '2.5rem', width: '3rem'}}>
        <i className={`bi bi-bell-fill`} style={{fontSize: '1.5rem', color: 'var(--main-green)'}}></i>
        3
      </div>
    </div>
  )
}
