import { useState, useEffect } from "react";

export const useLogin = (email, password) => {
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Crear formulario
  const form = new FormData();

  form.append("email", email);
  form.append("password", password);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'login', {
          body: form,
          method: 'POST'
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404 || response.status === 500) {
            errorMessage = await response.json();
          }
          throw new Error(errorMessage.error);
        }
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
      finally{
        setSend(false)
      }
    };

    if(send===true){
      setError(null)
      fetchData();
    }
  // eslint-disable-next-line  
  }, [send]);

  return { setSend, send, data, isLoading, error };
};

export const useVerify = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user-token');

      const headers = {
        "Authorization": 'Bearer '+ token,
        "Content-Type": "application/json" // Puedes ajustar esto según tus necesidades
      };

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'verify', {
          method: 'GET',
          headers: headers
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404) {
            errorMessage = 'La página solicitada no se encontró (Error 404)';
          } else if (response.status === 500) {
            const errorJson = await response.json();
            errorMessage = errorJson.error;
          }
          throw new Error(errorMessage);
        }
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, []);

  return { data, isLoading, error };
};
