import { useEffect, useState } from "react";
import { CrearUsuario } from "./modals/CrearUsuario.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useConsumeTicket } from "../hooks/useTickets.js";

export const Register = () => {

  const navigate = useNavigate();

  //General Data
  const [valid, setValid] = useState();
  const { idTicket } = useParams();
  const { data, isLoading, error, code } = useConsumeTicket(idTicket);

  useEffect(() => {
    if(!isLoading){
      setValid(data)
    }

  }, [data, isLoading, error])

  if(code !== 200){
    navigate('/login');
  }

  return(
    valid ?
    <div className='w-100 d-flex justify-content-center align-items-center' style={{backgroundColor: 'var(--main-green)', height: '100vh'}}>
      <div className='my-5'>
        <CrearUsuario />
      </div>
    </div>
    :
    <div></div>
  );
}
