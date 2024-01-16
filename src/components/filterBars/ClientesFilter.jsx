import { useEffect, useState } from "react";
import { Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { useFetchGet } from "../../hooks/useFetch";

export const ClientesFilter = ({values, handleChange, setRefetch}) => {

  useEffect(() => {
    setRefetch(true)
  }, [values, setRefetch])
  

  //Departamento
  const [deptos, setDeptos] = useState([])
  const { data: deptoData, isLoading: isLoadingDeptos, error: errorDeptos } = useFetchGet('departamentos');
  
  useEffect(() => {
    if(deptoData && !isLoadingDeptos){
      setDeptos(deptoData)
    } 
  }, [deptoData, isLoadingDeptos, errorDeptos])

  //Municipios
  const [municipios, setMunicipios] = useState([])
  const [queryMunicipios, setQueryMunicipios] = useState('')
  const { data: municipiosData, isLoading: isLoadingMunicipios, error: errorMunicipios, setRefetch: setRefetchMunicipios } = useFetchGet(queryMunicipios);
  
  useEffect(() => {
    if(municipiosData && !isLoadingMunicipios){
      setMunicipios(municipiosData)
    } 
  }, [municipiosData, isLoadingMunicipios, errorMunicipios])

  //Aldeas
  const [aldeas, setAldeas] = useState([])
  const [queryAldeas, setQueryAldeas] = useState('')
  const { data: aldeasData, isLoading: isLoadingAldeas, error: errorAldeas, setRefetch: setRefetchAldeas } = useFetchGet(queryAldeas);
  
  useEffect(() => {
    if(aldeasData && !isLoadingAldeas){
      setAldeas(aldeasData)
    } 
  }, [aldeasData, isLoadingAldeas, errorAldeas])

  //Caserios
  const [caserios, setCaserios] = useState([])
  const [queryCaserios, setQueryCaserios] = useState('')
  const { data: caseriosData, isLoading: isLoadingCaserios, error: errorCaserios, setRefetch: setRefetchCaserios } = useFetchGet(queryCaserios);
  
  useEffect(() => {
    if(caseriosData && !isLoadingCaserios){
      setCaserios(caseriosData)
    } 
  }, [caseriosData, isLoadingCaserios, errorCaserios])

  //Editar Municipio en Formulario
  useEffect(() => {
    if(values.idDepartamento && values.idDepartamento.length > 0){
      setQueryMunicipios('municipios/'+values.idDepartamento)
      setRefetchMunicipios(true)
    }
    else{
      setMunicipios([])
    }
    
  }, [values, deptos, setRefetchMunicipios])

  //Editar Aldea en Formulario
  useEffect(() => {
    if(values.idMunicipio && values.idMunicipio.length > 0){
      setQueryAldeas('aldeas/'+values.idMunicipio)
      setRefetchAldeas(true)
    }
    else{
      setMunicipios([])
    }
    
  }, [values, deptos, setRefetchAldeas])

  //Editar Caserio en Formulario
  useEffect(() => {
    if(values.idAldea && values.idAldea.length > 0){
      setQueryCaserios('caserios/'+values.idAldea)
      setRefetchCaserios(true)
    }
    else{
      setCaserios([])
    }
    
  }, [values, deptos, setRefetchCaserios])


  //Organizacion
  const [organizaciones, setOrganizaciones] = useState([])
  const { data: organizacionesData, isLoading: isLoadingOrganizaciones, error: errorOrganizaciones } = useFetchGet('organizacioneslist');
  
  useEffect(() => {
    if(organizacionesData && !isLoadingOrganizaciones){
      setOrganizaciones(organizacionesData)
    } 
  }, [organizacionesData, isLoadingOrganizaciones, errorOrganizaciones])

  //Cargos
  const [cargos, setCargos] = useState([])
  const [queryCargos, setQueryCargos] = useState('')
  const { data: cargosData, isLoading: isLoadingCargos, error: errorCargos, setRefetch: setRefetchCargos } = useFetchGet(queryCargos);
  
  useEffect(() => {
    if(cargosData && !isLoadingCargos){
      setCargos(cargosData)
    } 
  }, [cargosData, isLoadingCargos, errorCargos])

  //Editar Cargo en Formulario
  useEffect(() => {
    if(values.idOrganizacion && values.idOrganizacion.length > 0){
      setQueryCargos('cargos/'+values.idOrganizacion)
      setRefetchCargos(true)
    }
    else{
      setCargos([])
    }
    
  }, [values, organizaciones, setRefetchCargos])

  return (
    <Form>
      <Row>
        <Col md={2}>
          <FloatingLabel label='Departamento' style={{fontSize: '0.8rem'}}>
            <Form.Select id='idDepartamento' name='idDepartamento' style={{fontSize: '0.8rem'}} value={values.idDepartamento} onChange={handleChange}>
              <option value=""></option>
              {
                deptos &&
                deptos.map((departamento) => (
                  <option key={departamento._id} value={departamento._id}>{departamento.nombre}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Col>
      
        <Col md={2}>
          <FloatingLabel label='Municipio' style={{fontSize: '0.8rem'}}>
            <Form.Select id='idMunicipio' name='idMunicipio' style={{fontSize: '0.8rem'}} value={values.idMunicipio} onChange={handleChange}>
              <option value=""></option>
              {
                municipios &&
                municipios.map((municipio) => (
                  <option key={municipio._id} value={municipio._id}>{municipio.nombre}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md={2}>
          <FloatingLabel label='Aldea' style={{fontSize: '0.8rem'}}>
            <Form.Select id='idAldea' name='idAldea' style={{fontSize: '0.8rem'}} value={values.idAldea} onChange={handleChange}>
              <option value=""></option>
              {
                aldeas &&
                aldeas.map((aldea) => (
                  <option key={aldea._id} value={aldea._id}>{aldea.nombre}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md={2}>
          <FloatingLabel label='Caserio' style={{fontSize: '0.8rem'}}>
            <Form.Select id='idCaserio' name='idCaserio' style={{fontSize: '0.8rem'}} value={values.idCaserio} onChange={handleChange}>
              <option value=""></option>
              {
                caserios &&
                caserios.map((caserio) => (
                  <option key={caserio._id} value={caserio._id}>{caserio.nombre}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md={2}>
          <FloatingLabel label='Organización' style={{fontSize: '0.8rem'}}>
            <Form.Select id='idOrganizacion' name='idOrganizacion' style={{fontSize: '0.8rem'}} value={values.idOrganizacion} onChange={handleChange}>
              <option value=""></option>
              {
                organizaciones &&
                organizaciones.map((organizacion) => (
                  <option key={organizacion._id} value={organizacion._id}>{organizacion.nombre}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md={2}>
          <FloatingLabel label='Cargo' style={{fontSize: '0.8rem'}}>
            <Form.Select id='idCargo' name='idCargo' style={{fontSize: '0.8rem'}} value={values.idCargo} onChange={handleChange}>
              <option value=""></option>
              {
                cargos &&
                cargos.map((cargo) => (
                  <option key={cargo._id} value={cargo._id}>{cargo.nombre}</option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
    </Form>
  )
}
