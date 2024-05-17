import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useFetchGet } from '../hooks/useFetch';

export const InputDNI = ({value='', setValues, disabled=false, search=false}) => {
  const [numeroIdentificacion, setNumeroIdentificacion] = useState(value);

  //Buscar Existente
  const [queryOriginal, setQueryOriginal] = useState('')
  const { data: originalData, isLoading: isLoadingOriginal, error: errorOriginal, setRefetch: setRefetchOriginal } = useFetchGet(queryOriginal);

  const [searching, setSearching] = useState(false)
  const [existent, setExistent] = useState(false)
  const [free, setFree] = useState(false)

  //Accion buscar manual
  const handleSearch = () => {
    setQueryOriginal('beneficiarios/dni/'+numeroIdentificacion)
    setSearching(true);
    setRefetchOriginal(true);
  }
  
  useEffect(() => {
    if(originalData && !isLoadingOriginal){
      if(!originalData.error){
        setExistent(true)
        setFree(false)
        setValues((values) => ({...values, 
          nombre: originalData.nombre,
          sexo: originalData.sexo,
          fechaNacimiento: originalData.fechaNacimiento,
          telefono: originalData.telefono,
          tipoBeneficiario: originalData.tipoBeneficiario,
          sectorId: originalData.sector?.id,
          tipoOrganizacionId: originalData.tipoOrganizacion?.id,
          organizacionId: originalData.organizacion?.id,
          cargoId: originalData.cargo?.id,
          departamentoId: originalData.departamento?.id,
          municipioId: originalData.municipio?.id,
          aldeaId: originalData.aldea?.id,
          caserioId: originalData.caserio?.id,
        }))
      }
      else{
        setExistent(false)
        setFree(true)
        setValues((values) => ({...values, 
          nombre: '',
          sexo: '',
          fechaNacimiento: '',
          telefono: '',
          tipoBeneficiario: '',
          sectorId: '',
          tipoOrganizacionId: '',
          organizacionId: '',
          cargoId: '',
          departamentoId: '',
          municipioId: '',
          aldeaId: '',
          caserioId: '',
        }))
      }
    } 
    setSearching(false);
  }, [originalData, isLoadingOriginal, errorOriginal, setValues])

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ''); // Eliminar no números
    setNumeroIdentificacion(inputValue);
    setValues((values) => ({...values, dni: inputValue}))
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

  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="4">
        DNI:
      </Form.Label>
      <Col sm="8">
        <InputGroup>
          <Form.Control id='dni' name='dni' 
            value={formatNumeroIdentificacion()}
            onChange={handleInputChange}
            placeholder='0000-0000-00000'
            maxLength={15} 
            autoComplete={'off'}
            disabled={disabled}
            />
          {
            search
            &&
            <>
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
            </>
          }
        </InputGroup>
        {
          existent &&
          <p style={{color: 'red'}}>DNI ya registrado</p>
        }
        {
          free &&
          <p style={{color: 'green'}}>DNI sin registrar</p>
        }
      </Col>
    </Form.Group>
  );
};
