import { useContext, useEffect, useState } from "react";
import { Spinner, Button, Modal } from "react-bootstrap";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { Layout } from "./Layout.jsx";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { CrearEventoTerminar } from "./modals/CrearEventoTerminar.jsx";

export const EventosTerminar = () => {
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

  const [componente, setComponente] = useState(null)

  useEffect(() => {
    if(user && user.userComponente){
      setComponente(user.userComponente)
    }
  // eslint-disable-next-line
  }, [setComponente, user])


  ///Indicador solicitud de recarga de datos en la vista
  const [refetchData, setRefetchData] = useState(false);

  const setRefetch = () => setRefetchData(true)

  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true)
    setRefetchData(true)
  }

  //Efecto cuando termina el refetch
  useEffect(() => {
    if(!refetchData){
      setUpdating(false)
    }
  }, [refetchData, setUpdating])

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

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
    { field: 'estadoRealizacion', headerName: 'Estado Evento', width: 150,  
      type: 'singleSelect',
      valueOptions: ['En Ejecución', 'Finalizado'],
      renderCell: (params) => {
        return (
          <StatusBadge status={params.formattedValue} />
        );
      }
    },
    { field: 'fechaFinalizacionEvento', headerName: 'Fecha de Finalización', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)},
    { field: 'responsableFinalizacion', headerName: 'Resp. Finalización', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'estadoRevisionFinalizacion', headerName: 'Revisión', width: 150,  
      type: 'singleSelect',
      valueOptions: ['Pendiente', 'Rechazado', 'Aprobado'],
      renderCell: (params) => {
        return (
          <StatusBadge status={params.formattedValue} />
        );
      }
    },
    { field: 'fechaRevisionFinalizacion', headerName: 'Fecha de Revisión', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)},
    { field: 'revisorFinalizacion', headerName: 'Revisor', width: 170,
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
            (user && user.userPermisos?.acciones['Eventos']['Finalizar'] && params.row.estadoRealizacion !== 'Finalizado' ) &&
            <Button  className='py-1' style={buttonStyle} onClick={() => {
              setCurrentData({
                id: params.row.uuid,
                nombre: params.row.nombre,
              })
              handleShowEdit()
            }}>
              <i className="bi bi-pencil-fill"></i>
              {' '}
              Finalizar
            </Button>
          }
          {
            (params.row.estadoRevisionFinalizacion?.length > 0 ) &&
            <a href={`/reviews/eventos/finalizar/${params.row.uuid}`} target="_blank" rel="noreferrer">
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
        estadoRealizacion: departamento.estadoRealizacion,
        fechaFinalizacionEvento: departamento.fechaFinalizacionEvento ? departamento.fechaFinalizacionEvento : '',
        responsableFinalizacion: `${departamento.responsableFinalizacion?.nombre || ''}-${departamento.responsableFinalizacion?._id || ''}`,
        estadoRevisionFinalizacion: departamento.estadoRevisionFinalizacion,
        fechaRevisionFinalizacion: departamento.fechaRevisionFinalizacion ? departamento.fechaRevisionFinalizacion : '',
        revisorFinalizacion: `${departamento.revisorFinalizacion?.nombre || ''}-${departamento.revisorFinalizacion?._id || ''}`,
      }
    ))
  )
  
  const hiddenColumns = {
    uuid: false,
    fechaFinalizacionEvento: false,
    responsableFinalizacion: false,
    fechaRevisionFinalizacion: false,
    revisorFinalizacion: false
  }

  return(
    <>
    <Layout pagina={`Finalización de ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/terminar', nombre: 'Finalización'},
    ]}>
      <div className="d-flex align-items-center">
        <h4><i className="bi-flag-fill"></i>{` Finalización de ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h4>
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
      {
        componente &&
        <FormattedGrid 
          model={`${endpoint}s`} 
          pageSize={10} 
          pageSizeOptions={[10, 15, 20, 30]}
          columns={columns} 
          hiddenColumns={hiddenColumns}
          populateRows={populateRows} 
          refetchData={refetchData}
          setRefetchData={setRefetchData} 
          eventComponente={componente}
          eventTerminar
        />
      }
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} autoFocus backdrop='static'>
      <CrearEventoTerminar handleClose={handleCloseEdit} setRefetch={setRefetch} eventValues={currentData}/>  
    </Modal>
    </>
  );
}
