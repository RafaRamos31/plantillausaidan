import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { useFetchGet } from '../hooks/useFetch';
import { CrearBeneficiario } from '../views/modals/CrearBeneficiario';

export const InputParticipanteDNI = ({participantes, setParticipantes, setRegistrados}) => {
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');

  const [show, setShow] = useState(false);

  //Buscar Existente
  const [queryOriginal, setQueryOriginal] = useState('')
  const { data: originalData, isLoading: isLoadingOriginal, error: errorOriginal, setRefetch: setRefetchOriginal } = useFetchGet(queryOriginal);

  const [searching, setSearching] = useState(false)
  const [existent, setExistent] = useState(false)

  //Accion buscar manual
  const handleSearch = () => {
    if(participantes.some(p => p.dni === numeroIdentificacion)){
      setExistent(true)
    }
    else{
      setQueryOriginal('beneficiarios/dni/'+ numeroIdentificacion)
      setSearching(true);
      setRefetchOriginal(true);
      setExistent(false)
    }
  }
  
  useEffect(() => {
    if(originalData && !isLoadingOriginal){
      if(!originalData.error){
        setParticipantes(p => p.concat(originalData))
        setRegistrados(r => {
          if(originalData?.sexo === 'Masculino'){
            r = {...r, hombres: r.hombres + 1}
          }
          else{
            r = {...r, mujeres: r.mujeres + 1}
          }

          if(originalData?.tipoBeneficiario === 'Comunitario'){
            r = {...r, comunitarios: r.comunitarios + 1}
          }
          else{
            r = {...r, institucionales: r.institucionales + 1}
          }
          return r;
        })
        setNumeroIdentificacion('');
      }
      else{
        setShow(true)
      }
      setSearching(false);
    } 
    // eslint-disable-next-line
  }, [originalData, isLoadingOriginal, errorOriginal, setParticipantes])

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ''); // Eliminar no números
    setNumeroIdentificacion(inputValue);
  };

  const formatNumeroIdentificacion = () => {
    let formattedValue = numeroIdentificacion;

    if (formattedValue.length > 4) {
      formattedValue = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4);
    }
    if (formattedValue.length > 9) {
      formattedValue = formattedValue.slice(0, 9) + '-' + formattedValue.slice(9);
    }

    return formattedValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
    <Form.Group as={Row} className="mb-3">
      <InputGroup>
          <Form.Control id='dni' name='dni' 
            value={formatNumeroIdentificacion()}
            onChange={handleInputChange}
            placeholder='0000-0000-00000'
            maxLength={15} 
            autoComplete={'off'}
            />
          {
            !searching ? 
            <Button variant="light" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </Button>
            : <Button variant="light">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Cargando...</span>
            </Button>
          }
        </InputGroup>
        {
          existent &&
          <p style={{color: 'red'}}>Perfil ya registrado</p>
        }
    </Form.Group>
    </Form>
    <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="modal-label"
      >
      <>
        <CrearBeneficiario handleClose={() => setShow(false)} initialDNI={numeroIdentificacion} setParticipantes={setParticipantes} setRegistrados={setRegistrados} refreshDNI={() => setNumeroIdentificacion('') } modal/>
      </>
    </Modal>
    </>
  );
};
