import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useFetchGetBody } from '../hooks/useFetch';

export const InputRol = ({setValues, disabled}) => {

  const [value, setValue] = useState('');

  //Roles
  const findParams = {
    sort: '{}',
    filter: '{}'
  }
  const [roles, setRoles] = useState([])
  const { data, isLoading, error, setRefetch } = useFetchGetBody('list/roles', findParams);
  
  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true);
    setRefetch(true);
  }
  
  useEffect(() => {
    if(data && !isLoading){
      setRoles(data)
      setUpdating(false)
    } 
  }, [data, isLoading, error])

  const handleChange = (e) => {
    setValue(e.target.value)
    setValues((values) => ({...values, idRol: e.target.value}))
  }

  return (
    <Form.Group as={Row} className="mb-3">
      <Col sm="12">
        <InputGroup>
          <Form.Select id='idRol' name='idRol' value={value} onChange={handleChange} disabled={disabled}>
            <option value="">Seleccionar Rol</option>
            {
              roles &&
              roles.map((rol) => (
                <option key={rol._id} value={rol._id}>{rol.nombre}</option>
              ))
            }
          </Form.Select>
          {
            !updating ? 
            <Button variant="light" onClick={handleUpdate} disabled={disabled}>
              <i className="bi bi-arrow-clockwise"></i>
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
      </Col>
    </Form.Group>
  );
};
