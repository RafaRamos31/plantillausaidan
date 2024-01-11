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
  const [refetch, setRefetch] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user-token');

      const headers = {
        "Authorization": 'Bearer '+ token,
        "Content-Type": "application/json"
      };

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'verify', {
          method: 'GET',
          headers: headers
        });
        setRefetch(false)
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        };

        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if(refetch){
      setIsLoading(true)
      setError(null)
      fetchData();
    }
    
  }, [refetch]);

  return { data, isLoading, error, setRefetch };
};


export const useRefreshAuth = () => {

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user-token');

      const headers = {
        "Authorization": 'Bearer '+ token,
        "Content-Type": "application/json"
      };

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'refresh', {
          method: 'GET',
          headers: headers
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
          localStorage.setItem('user-token', jsonData.token);
        }
      }catch (error) {
        
      }
    };

    fetchData();
    
  }, []);
};