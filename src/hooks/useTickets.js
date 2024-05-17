import { useState, useEffect } from "react";

export const useGetTicket = () => {
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'tickets', {
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

export const useFindTicket = (idTicket) => {
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(process.env.REACT_APP_API_URL + 'tickets/' + idTicket , {
          method: 'GET'
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


export const useConsumeTicket = (idTicket) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(200);

  const form = new FormData();
  form.append('code', idTicket);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `tickets`, {
          method: 'DELETE',
          body: form
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404) {
            errorMessage = 'La página solicitada no se encontró (Error 404)';
            setCode(404);
          } else if (response.status === 500) {
            const errorResponse = await response.json();
            errorMessage = 'Error interno del servidor (Error 500): ' + errorResponse.error;
            setCode(500);
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
    // eslint-disable-next-line
  }, [idTicket]);

  return { data, isLoading, error, code };
};