
export const Header = () => {
  return (
    <header className="w-100 d-flex justify-content-end header-profile">
      <div className="mx-2 my-1 py-0 d-flex flex-column align-items-center" style={{cursor: 'pointer'}}>
        <div className='py-0 d-flex align-items-center justify-content-center' 
        style={{borderRadius: '10px', backgroundColor: 'var(--low-green)', height: '2.5rem', width: '4rem'}}>
          <i className={`bi bi-person-fill`} style={{fontSize: '2.6rem', color: 'var(--main-green)'}}></i>
        </div>
        <p className="m-0">Rafael Ramos</p>
      </div>
    </header>
  )
}
