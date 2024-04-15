import { useContext, useEffect, useState } from "react";
import { Spinner, Button, Modal } from "react-bootstrap";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { Layout } from "./Layout.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { InversionesNavBar } from "../components/navBars/InversionesNavBar.jsx";
import { CrearEventoPresupuestar } from "./modals/CrearEventoPresupuestar.jsx";

export const EventosPresupuesto = () => {
  const endpoint = 'evento'
  const { user } = useContext(UserContext);

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: '0.9rem',
    padding: '0.2rem 0.5rem'
  };

  ///Indicador solicitud de recarga de datos en la vista
  const [refetchData, setRefetchData] = useState(false);

  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true)
    setRefetchData(true)
  }

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

  //Efecto cuando termina el refetch
  useEffect(() => {
    if(!refetchData){
      setUpdating(false)
    }
  }, [refetchData, setUpdating])

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'nombre', headerName: 'Nombre', width: 400 },
    { field: 'fechaInicio', headerName: 'Fecha del evento', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'organizador', headerName: 'Organizador', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'fechaCreacion', headerName: 'Fecha de Creación', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)},
    { field: 'responsableCreacion', headerName: 'Creador del Evento', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'estadoPresupuesto', headerName: 'Estado Presupuesto', width: 150,  
      type: 'singleSelect',
      valueOptions: ['Pendiente', 'Finalizado'],
      renderCell: (params) => {
        return (
          <StatusBadge status={params.formattedValue} />
        );
      }
    },
    { field: 'fechaPresupuesto', headerName: 'Fecha de Presupuesto', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)},
    { field: 'responsablePresupuesto', headerName: 'Responsable Presupuesto', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
          {
            (user && user.userPermisos?.acciones['Eventos']['Presupuestar'] && params.row.estadoPresupuesto === 'Pendiente' ) &&
            <Button  className='py-1' style={buttonStyle} onClick={() => {
              setCurrentData({
                id: params.row.uuid,
                nombre: params.row.nombre,
              })
              handleShowEdit()
            }}>
              <i className="bi bi-pencil-fill"></i>
              {' '}
              Presupuestar
            </Button>
          }
          {
            (params.row.estadoPresupuesto !== 'Pendiente' ) &&
            <a href={`/reviews/eventos/presupuestar/${params.row.uuid}`} target="_blank" rel="noreferrer">
              <Button style={buttonStyle}>
                <i className="bi bi-eye-fill"></i>{' '}
                Revisar
              </Button>
            </a>
          }
          </>
        );
      },
    }
  ];

  const populateRows = (data, page, pageSize) => (
    data.map((departamento, index) => (
      { 
        id: (page * pageSize) + index + 1, 
        uuid: departamento._id, 
        original: departamento.original, 
        nombre: departamento.nombre,
        version: departamento.version,
        fechaInicio: departamento.fechaInicio ? departamento.fechaInicio : '',
        organizador: `${departamento.organizador?.nombre || ''}-${departamento.organizador?._id || ''}`,
        fechaCreacion: departamento.fechaCreacion ? departamento.fechaCreacion : '',
        responsableCreacion: `${departamento.responsableCreacion?.nombre || ''}-${departamento.responsableCreacion?._id || ''}`,
        estadoPresupuesto: departamento.estadoPresupuesto,
        fechaPresupuesto: departamento.fechaPresupuesto ? departamento.fechaPresupuesto : '',
        responsablePresupuesto: `${departamento.responsablePresupuesto?.nombre || ''}-${departamento.responsablePresupuesto?._id || ''}`,
      }
    ))
  )
  
  const hiddenColumns = {
    uuid: false,
    fechaCreacion: false,
    responsableCreacion: false,
    fechaRevisionDigitacion: false,
    revisorDigitacion: false,
    fechaPresupuesto: false,
    responsablePresupuesto: false,
    fechaConsolidado: false,
    responsableConsolidado: false,
  }

  return(
    <>
    <Layout pagina={`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={InversionesNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/inversiones', nombre: 'Inversiones'},
        {link: '/inversiones/presupuestar', nombre: 'Presupuestar Evento'},
    ]}>
      <div className="d-flex align-items-center">
        <h4><i className="bi bi-calendar2-plus"></i>{` Presupuestar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h4>
        {/*Boton Actualizar*/}
        {
          !updating ? 
          <Button className='my-2 mx-3' variant="light" onClick={handleUpdate}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          : <Button className='my-2 mx-3' variant="light">
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
      </div>

      {/*Table Container*/} 
      <FormattedGrid 
          model={`${endpoint}s`} 
          pageSize={10} 
          pageSizeOptions={[10, 15, 20, 30]}
          columns={columns} 
          hiddenColumns={hiddenColumns}
          populateRows={populateRows} 
          refetchData={refetchData}
          setRefetchData={setRefetchData} 
          eventComponente={''}
          eventPresupuestar
        />
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} autoFocus backdrop='static'>
      <CrearEventoPresupuestar handleClose={handleCloseEdit} setRefetch={setRefetchData} eventValues={currentData} initialValues={null}/>  
    </Modal>
    </>
  );
}
