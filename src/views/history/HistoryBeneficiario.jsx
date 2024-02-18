import React, { useState, useEffect } from 'react'
import { Layout } from '../Layout'
import { ConfigNavBar } from '../../components/navBars/ConfigNavBar'
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Accordion, Alert } from 'react-bootstrap';
import { useFetchGet } from '../../hooks/useFetch';
import { Loading } from '../Loading';
import { AvatarChip } from '../../components/AvatarChip';
import { StatusBadge } from '../../components/StatusBadge';
import { CompareValue } from '../../components/CompareValue';

export const HistoryBeneficiario = () => {
  const { id } = useParams();
  const endpoint = 'beneficiario'

  //Peticio de datos a la API
  const { data, isLoading } = useFetchGet(`revisiones/${endpoint}/${id}`);

  //Original
  const [original, setOriginal] = useState(null)
  const { data: originalData, isLoading: isLoadingOriginal, error: errorOriginal } = useFetchGet(`${endpoint}/${id}`);
  
  useEffect(() => {
    if(originalData && !isLoadingOriginal){
      setOriginal(originalData)
    } 
  }, [originalData, isLoadingOriginal, errorOriginal])

  if(isLoading || isLoadingOriginal){
    return <Loading />
  }

  return (
    <Layout pagina={`Historial - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`} SiteNavBar={ConfigNavBar} breadcrumbs={[
      {link: '/', nombre: 'Inicio'},
      {link: '/clientes', nombre: 'Clientes'},
      {link: '/clientes/beneficiarios', nombre: 'Beneficiarios'},
      {link: `/historial/beneficiarios/${id}`, nombre: `Historial: ${original?.nombre || 'Beneficiario'}`}
  ]}>
      <Row className='mx-0 my-0'>
        <Col md={8}>
          <h2 className='mb-4'><i className="bi bi-clock-history"></i>{` Historial: ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}</h2>
          <Accordion>
            {
              ( original && original.version.split('.')[0] > data[0].version.split('.')[0]) &&
              <Alert className='my-0' key={ original.version } variant='success'>
                <p style={{fontSize: '1.4rem', marginRight: '0.3rem', fontWeight: 'bold'}}>{`Versión ${original.version}`}</p>
              </Alert>
            }
            {
              data && data.map((rev) => (
                <div key={rev._id}>
                <Accordion.Item id={rev._id} key={rev._id} eventKey={rev._id}>
                  <Accordion.Header>
                    <p style={{fontSize: '1.5rem', marginRight: '0.3rem'}}>v.{rev.version}</p>
                    <StatusBadge status={rev.estado}/>
                    <p style={{fontSize: '1.5rem', marginLeft: '0.3rem'}}>{rev.nombre}</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px'}}>
                      <Row className='d-flex align-items-center'>
                        <Col>
                          <div className='d-flex align-items-center'>
                            <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Edición:</p>
                            <p>{new Date(rev.fechaEdicion).toLocaleString()}</p>
                          </div>
                        </Col>
                        <Col>
                          <div className='d-flex align-items-center'>
                            <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Editado por:</p>
                            <AvatarChip name={rev.editor.nombre} id={rev.editor._id}/>
                          </div>
                        </Col>
                      </Row>

                      <Row className='mt-3 d-flex align-items-center'>
                        <Col>
                          <div className='d-flex align-items-center'>
                            <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Revisión:</p>
                            {
                              rev.fechaRevision ?
                              <p>{new Date(rev.fechaRevision).toLocaleString()}</p>
                              :
                              <p>--</p>
                            }
                          </div>
                        </Col>
                        <Col>
                          <div className='d-flex align-items-center'>
                          <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                            {
                              rev.revisor ?
                              <AvatarChip name={rev.revisor.nombre} id={rev.revisor._id}/>
                              :
                              <p>--</p>
                            }
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    <div className='mt-3 d-flex align-items-center'>
                      <h5>Información del Registro</h5>
                    </div>
                    <Container style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px', marginTop: '0.2rem'}}>
                      <Row>
                        <Col md={6}>
                          <CompareValue  title={'Nombre:'} value={rev.nombre} original={original?.nombre} compare={false}/>
                          <CompareValue  title={'DNI:'} value={rev.dni} original={original?.dni} compare={false}/>
                          <CompareValue  title={'Sexo:'} value={rev.sexo} original={original?.sexo} compare={false}/>
                          <CompareValue  title={'Fecha de Nacimiento:'} value={new Date(rev.fechaNacimiento).toLocaleDateString('es', {timeZone: 'UTC'})} original={new Date(original?.fechaNacimiento).toLocaleDateString('es', {timeZone: 'UTC'})} compare={false}/>
                          <CompareValue  title={'Teléfono:'} value={rev.telefono} original={original?.telefono} compare={false}/>
                          <hr />
                          <CompareValue  title={'Sector:'} value={rev.sector.nombre} original={original?.sector.nombre} compare={false}/>
                          <CompareValue  title={'Tipo de Organización:'} value={rev.tipoOrganizacion.nombre} original={original?.tipoOrganizacion.nombre} compare={false}/>
                          <CompareValue  title={'Organización:'} value={rev.organizacion.nombre} original={original?.organizacion.nombre} compare={false}/>
                          <CompareValue  title={'Cargo:'} value={rev.cargo.nombre} original={original?.cargo.nombre} compare={false}/>
                          <hr />
                          <CompareValue  title={'Departamento:'} value={rev.departamento.nombre} original={original?.departamento.nombre} compare={false}/>
                          <CompareValue  title={'Municipio:'} value={rev.municipio.nombre} original={original?.municipio.nombre} compare={false}/>
                          <CompareValue  title={'Aldea:'} value={rev.aldea.nombre} original={original?.aldea.nombre} compare={false}/>
                          <CompareValue  title={'Caserio:'} value={rev.caserio.nombre} original={original?.caserio.nombre} compare={false}/>
                          <CompareValue  title={'Geolocacion:'} value={rev.geolocacion} original={original?.geolocacion} compare={false}/>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Body>
                </Accordion.Item>
                {
                  (rev.version.split('.')[1] === '1' && rev.version.split('.')[0] !== '0') &&
                  <Alert className='my-0' key={ rev.version.split('.')[0] } variant='success'>
                    <p style={{fontSize: '1.4rem', marginRight: '0.3rem', fontWeight: 'bold'}}>{`Versión ${rev.version.split('.')[0]}.0`}</p>
                  </Alert>
                }
                </div>
              ))
            }
          </Accordion>
        </Col>
          
        <Col md={4}>
          <h2 className='m3-4'>Versión Actual</h2>
          {
            original &&
            <Container className='px-0 py-0' style={{border: '1px solid lightgray', padding: '1.5rem', borderRadius: '10px', marginTop: '0.2rem'}}>
              <Accordion className='mx-0 my-0' defaultActiveKey={['status']} alwaysOpen>
                <Accordion.Item eventKey='status'>
                  <Accordion.Header>
                    <div className='d-flex align-items-center'>
                      <h5 style={{marginRight: '1rem', marginBottom: '0', fontWeight: 'bold'}}>Versión: {original.version}</h5>
                      <h5 style={{marginRight: '1rem', marginBottom: '0'}}>Estado: </h5>
                      <StatusBadge status={original?.estado}/>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <div>
                        <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Edición:</p>
                        <p>{new Date(original.fechaEdicion).toLocaleString()}</p>
                      </div>

                      <div className='my-2'>
                        <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Editado por:</p>
                        <AvatarChip name={original.editor.nombre} id={original.editor._id}/>
                      </div>

                      <div>
                        <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Revisión:</p>
                        {
                          original.fechaRevision ?
                          <p>{new Date(original.fechaRevision).toLocaleString()}</p>
                          :
                          <p>--</p>
                        }
                      </div>

                      <div className='my-2'>
                        <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Revisado por:</p>
                        {
                          original.revisor ?
                          <AvatarChip name={original.revisor.nombre} id={original.revisor._id}/>
                          :
                          <p>--</p>
                        }
                      </div>

                      {
                        original.estado === 'Eliminado' &&
                        <>
                          <div>
                            <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Fecha de Eliminación:</p>
                            {
                              original.fechaEliminacion ?
                              <p>{new Date(original.fechaEliminacion).toLocaleString()}</p>
                              :
                              <p>--</p>
                            }
                          </div>
                          <div className='my-2'>
                          <p style={{fontWeight: 'bold', marginRight: '0.6rem'}}>Eliminado por:</p>
                            {
                              original.eliminador ?
                              <AvatarChip name={original.eliminador.nombre} id={original.eliminador._id}/>
                              :
                              <p>--</p>
                            }
                          </div>
                        </>
                      }
                    </Container>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='info'>
                  <Accordion.Header>
                    <h5 style={{marginBottom: '0', fontWeight: 'bold'}}>Información del Registro</h5>
                  </Accordion.Header>
                  <Accordion.Body className='px-0 py-0'>
                    <Container  className='mx-0 my-0' style={{padding: '1.5rem'}}>
                      <CompareValue  title={'Nombre:'} value={original.nombre} original={original?.nombre} compare={false}/>
                      <CompareValue  title={'DNI:'} value={original.dni} original={original?.dni} compare={false}/>
                      <CompareValue  title={'Sexo:'} value={original.sexo} original={original?.sexo} compare={false}/>
                      <CompareValue  title={'Fecha de Nacimiento:'} value={new Date(original.fechaNacimiento).toLocaleDateString('es', {timeZone: 'UTC'})} original={new Date(original?.fechaNacimiento).toLocaleDateString('es', {timeZone: 'UTC'})} compare={false}/>
                      <CompareValue  title={'Teléfono:'} value={original.telefono} original={original?.telefono} compare={false}/>
                      <hr />
                      <CompareValue  title={'Sector:'} value={original.sector.nombre} original={original?.sector.nombre} compare={false}/>
                      <CompareValue  title={'Tipo de Organización:'} value={original.tipoOrganizacion.nombre} original={original?.tipoOrganizacion.nombre} compare={false}/>
                      <CompareValue  title={'Organización:'} value={original.organizacion.nombre} original={original?.organizacion.nombre} compare={false}/>
                      <CompareValue  title={'Cargo:'} value={original.cargo.nombre} original={original?.cargo.nombre} compare={false}/>
                      <hr />
                      <CompareValue  title={'Departamento:'} value={original.departamento.nombre} original={original?.departamento.nombre} compare={false}/>
                      <CompareValue  title={'Municipio:'} value={original.municipio.nombre} original={original?.municipio.nombre} compare={false}/>
                      <CompareValue  title={'Aldea:'} value={original.aldea.nombre} original={original?.aldea.nombre} compare={false}/>
                      <CompareValue  title={'Caserio:'} value={original.caserio.nombre} original={original?.caserio.nombre} compare={false}/>
                      <CompareValue  title={'Geolocacion:'} value={original.geolocacion} original={original?.geolocacion} compare={false}/>
                    </Container>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Container>
          }
        </Col>
      </Row>
    </Layout>
  )
}
