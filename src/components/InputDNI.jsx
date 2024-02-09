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

  //Accion buscar manual
  const handleSearch = () => {
    setQueryOriginal('beneficiarioDNI/'+numeroIdentificacion)
    setSearching(true);
    setRefetchOriginal(true);
  }
  
  useEffect(() => {
    if(originalData && !isLoadingOriginal){
      if(originalData.length > 0){
        setExistent(true)
        setValues((values) => ({...values, 
          nombre: originalData[0].nombre,
          sexo: originalData[0].sexo,
          telefono: originalData[0].telefono,
          idSector: originalData[0]?.sector?._id,
          idTipoOrganizacion: originalData[0]?.tipoOrganizacion?._id,
          idOrganizacion: originalData[0].organizacion?._id,
          idCargo: originalData[0].cargo?._id,
          idDepartamento: originalData[0].departamento?._id,
          idMunicipio: originalData[0].municipio?._id,
          idAldea: originalData[0].aldea?._id,
          idCaserio: originalData[0].caserio?._id,
          geolocacion: originalData[0].geolocacion,
        }))
      }
      else{
        setExistent(false)
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
          <p style={{color: 'red'}}>Datos existentes</p>
        }
      </Col>
    </Form.Group>
  );
};
