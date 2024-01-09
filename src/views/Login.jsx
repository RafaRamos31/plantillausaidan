import { AccessModal } from "./modals/AccessModal.jsx";

export const Login = () => {

  return(
    <div className='w-100 d-flex justify-content-center align-items-center' style={{backgroundColor: 'var(--main-green)', height: '100vh'}}>
      <div style={{ width: '40vw'}}>
        <AccessModal />
      </div>
    </div>
  );
}
