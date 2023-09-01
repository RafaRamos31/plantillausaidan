import { Spinner } from "react-bootstrap";

export const LoadingScreen = () => {
  return (
    <div className='w-100 d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: 'var(--mp-azul-6)', height: '100vh'}}>
      <Spinner className="mb-2" style={{ height: '10rem', width: '10rem', fontSize: '5rem', color: 'var(--mp-rojo-1)' }}/>
      <h1>Cargando...</h1>
    </div>
  );
}
