import { useState, useEffect } from "react";

export const useLogin = (email, password) => {
  const [send, setSend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);

  //Crear formulario
  const form = new FormData();

  form.append("email", email);
  form.append("password", password);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'usuarios/login', {
          body: form,
          method: 'POST'
        });

        let jsonData = await response.json();

        setCode(response.status)
        if (response.status !== 200){
          setError(jsonData.error)
        }
        else{
          setData(jsonData)
        }
        setIsLoading(false);

      } catch (error) {
        setError('Se produjo un error: ' + error.message);
        setIsLoading(false);
      }

      finally{
        setSend(false)
      }
    };

    if(send===true){
      setIsLoading(true);
      setData(null);
      setCode(null);
      setError(null);

      fetchData();
    }
  // eslint-disable-next-line  
  }, [send]);

  return { setSend, send, isLoading, data, code, error };
};

export const useVerify = () => {
  const [refetch, setRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user-token');

      const headers = {
        "Authorization": 'Bearer '+ token,
        "Content-Type": "application/json"
      };

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'usuarios/verify', {
          method: 'GET',
          headers: headers
        });

        let jsonData = await response.json();

        setCode(response.status)
        if (response.status !== 200){
          setError(jsonData.error)
        }
        else{
          setData(jsonData)
        }
        setIsLoading(false);

        setData(jsonData);
        setIsLoading(false);

      } catch (error) {
        setError('Se produjo un error: ' + error.message);
        setIsLoading(false);
      }

      finally{
        setRefetch(false)
      }
    };

    if(refetch){
      setIsLoading(true);
      setData(null);
      setCode(null);
      setError(null);

      fetchData();
    }
    
  }, [refetch]);

  return { setRefetch, isLoading, data, code, error };
};


export const useRefreshAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);

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

        let jsonData = await response.json();
        setCode(response.status)
        if (response.status !== 200){
          setError(jsonData.error)
        }
        else{
          setData(jsonData)
        }
        setIsLoading(false);

        setData(jsonData);
        setIsLoading(false);

      }catch (error) {
        setError('Se produjo un error: ' + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, []);

  return { isLoading, data, code, error };
};