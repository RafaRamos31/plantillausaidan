import { useState, useEffect } from 'react';

//Peticion Get con Refetch asincrono
export const useFetchGet = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint);
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404) {
            errorMessage = 'La página solicitada no se encontró (Error 404)';
          } else if (response.status === 500) {
            errorMessage = 'Error interno del servidor (Error 500)';
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

    if(refetch && endpoint.length > 0){
      fetchData();
      setRefetch(false)
    }
    
  }, [endpoint, refetch]);

  return { data, isLoading, error, setRefetch };
};

//Peticion Get By Id
export const useFetchGetById = (endpoint, id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(200);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `${endpoint}/${id}`);
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
  }, [endpoint, id]);

  return { data, isLoading, error, code };
};

//Peticion para solicitar datos pero con body para filtros
export const useFetchGetBody = (endpoint, args) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(true);

  //Extraer variables para formulario
  const form = new FormData();
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      const value = args[key];
      form.append(key, value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
          body: form,
          method: 'POST'
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 500) {
            errorMessage = 'Error interno del servidor (Error 500): ' + await response.json();;
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

    if(refetch && endpoint.length > 0){
      fetchData();
      setRefetch(false)
    }

  // eslint-disable-next-line  
  }, [endpoint, args, refetch]);

  return { data, isLoading, error, setRefetch };
};


export const useFetchPostBody = (endpoint, args) => {
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Extraer variables para formulario
  const form = new FormData();
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      const value = args[key];
      form.append(key, value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
          body: form,
          method: 'POST'
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
      finally{
        setSend(false)
      }
    };

    if(send===true){
      fetchData();
    }
  // eslint-disable-next-line  
  }, [endpoint, args, send]);

  return { setSend, send, data, isLoading, error };
};

//Peticion Put Asincrona
export const useFetchPutBody = (endpoint, args) => {
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);

  //Extraer variables para formulario
  const form = new FormData();
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      const value = args[key];
      form.append(key, value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
          body: form,
          method: 'PUT'
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
          setCode(200);
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404) {
            errorMessage = 'La página solicitada no se encontró (Error 404)';
            setCode(404);
          } else if (response.status === 500) {
            const errorJson = await response.json();
            errorMessage = errorJson.error;
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
      finally{
        setSend(false)
      }
    };

    if(send===true){
      fetchData();
    }
  // eslint-disable-next-line  
  }, [endpoint, args, send]);

  return { setSend, send, data, isLoading, error, code };
};


//Peticion Delete Asincrona
export const useFetchDeleteBody = (endpoint, args) => {
  const [send, setSend] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);

  //Extraer variables para formulario
  const form = new FormData();
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      const value = args[key];
      form.append(key, value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
          body: form,
          method: 'DELETE'
        });
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
          setCode(200);
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404) {
            errorMessage = 'La página solicitada no se encontró (Error 404)';
            setCode(404);
          } else if (response.status === 500) {
            const errorJson = await response.json();
            errorMessage = errorJson.error;
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
      finally{
        setSend(false)
      }
    };

    if(send===true){
      fetchData();
    }
  // eslint-disable-next-line  
  }, [endpoint, args, send]);

  return { setSend, send, data, isLoading, error, code };
};