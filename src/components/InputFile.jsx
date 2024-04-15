import { Input, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useFetchPutBody } from '../hooks/useFetch'

export const InputFile = ({label, idEvento, prefix, setValues, edit=false, enlace=''}) => {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')

  const [editValue, setEditValue] = useState(edit);

  //Envio asincrono de formulario de Modificar
  const { setSend, send, data, isLoading, error, code } = useFetchPutBody('files', {
    key: `${prefix}-${idEvento}.${file?.name.split('.')[1]}`,
    file: file
  }) 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUrl(null);
  };

  const handleFileDelete = () => {
    setUrl(null);
  };

  const handleFileUpload = () => {
    setSend(true);
  };

  useEffect(() => {
    if(data && !isLoading){
      setUrl(data.url)
      setValues(data.url)
    }
  // eslint-disable-next-line
  }, [send, data, isLoading, error, code])
  
  
  return (
    <>
    <InputLabel className='my-2'>{label}</InputLabel>
    {
      editValue ?
      <>
        <Button className="mt-2 p-2" href={enlace} target="_blank" style={{fontWeight: 'bold'}}>{prefix + ' '}<i className="bi bi-box-arrow-up-right"></i></Button>
        <Button className='mt-2 mx-1 p-2' variant='danger' onClick={() => setEditValue(false)}><i className="bi bi-trash3"></i></Button>
      </> 
      :
      <div className="d-flex">
      <Input 
        type='file'
        onChange={handleFileChange}
      />
      {
        file &&
        <>
        {
          url ?
          <>
          <Button className='mx-1' variant='success' disabled><i className="bi bi-cloud-check"></i></Button>
          <Button className='mx-1' variant='danger' onClick={handleFileDelete}><i className="bi bi-trash3"></i></Button>
          </>
          :
          <>
          {
            send ?
            <Button variant="light">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Cargando...</span>
            </Button>
            :
            <Button className='mx-1' variant='primary' onClick={handleFileUpload}><i className="bi bi-cloud-upload"></i></Button>
          }
          </>
        }
        </>
      }
    </div>
    }
    </>
  )
}
