import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { InfoLink } from "../components/InfoLink.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { CrearRoles } from "./modals/CrearRoles.jsx";
import { EditRoles } from "./modals/EditRoles.jsx";
import { useFetchGet } from "../hooks/useFetch.js";

export const ConfigRoles = () => {
  const endpoint = 'rol'
  const {user} = useContext(UserContext)

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px',
  };

  //Indicador solicitud de recarga de datos en la vista
  const [refetchData, setRefetchData] = useState(false);

  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Indicador mostrar eliminados
  const [deleteds, setDeleteds] = useState(false);

  const handleToggleDeleteds = () => {
    setDeleteds(!deleteds);
  }

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

  //Modal crear
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);

  //Valor para Modal Modificar
  const [currentId, setCurrentId] = useState(0);
  const [currentData, setCurrentData] = useState(null);

  const { data: dataRevision, isLoading: isLoadingRevision, setRefetch } = useFetchGet(`roles/id/${currentId}`);

  useEffect(() => {
    if(!isLoadingRevision && dataRevision && !dataRevision.error){
      setCurrentData(dataRevision) 
    }
  }, [dataRevision, isLoadingRevision])

  useEffect(() => {
    if(currentData){
      setShowEdit(true)
    }
  }, [currentData])
  
  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false},
    { field: 'uuid', headerName: 'uuid', width: 80, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'nombre', headerName: 'Nombre', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'roles'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'version', headerName: 'Versión', width: 100, filterable: false },
    { field: 'fechaEdicion', headerName: 'Fecha de Edición', width: 170, filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'fechaRevision', headerName: 'Fecha de Revisión', width: 170, filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'fechaEliminacion', headerName: 'Fecha de Eliminación', width: 170, filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'estado', headerName: 'Estado', width: 140, filterable: false,
      renderCell: (params) => {
        return (
          <StatusBadge status={params.formattedValue} />
        );
      }
    },
    {
      field: " ",
      headerName: " ",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <>
            <OverlayTrigger overlay={<Tooltip>{'Ver'}</Tooltip>}>
              <a href={`/reviews/${endpoint}es/${params.row.uuid}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
            </OverlayTrigger>
            {
              user.userPermisos?.acciones['Roles']['Modificar'] 
              &&
              <>
              {
                params.row.editing ?
                <OverlayTrigger overlay={<Tooltip>{'En revisión'}</Tooltip>}>
                  <div>
                    <Button className='py-1 mx-1' style={{...buttonStyle, backgroundColor: 'gray'}} disabled>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                  </div>
                </OverlayTrigger>
                :
                <OverlayTrigger overlay={<Tooltip>{'Editar'}</Tooltip>}>
                  <Button  className='py-1 mx-1' style={buttonStyle} onClick={() => {
                    setCurrentId(params.row.uuid)
                    setRefetch(true)
                  }}>
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </OverlayTrigger>
              }
              </>
            }
          </>
        );
      },
    }
  ];
  

  const populateRows = (data, page, pageSize) => (
    data.map((item, index) => (
      { 
        id: (page * pageSize) + index + 1, 
        uuid: item.id, 
        version: item.version,
        fechaEdicion: item.fechaEdicion,
        fechaRevision: item.fechaRevision,
        fechaEliminacion: item.fechaEliminacion ? item.fechaEliminacion : '',
        estado: item.estado,
        nombre: item.nombre,
        permisos: JSON.stringify(item.permisos)
      }
    ))
  )

  const hiddenColumns = {
    uuid: false,
    version: false,
    fechaEdicion: false,
    fechaRevision: false,
    fechaEliminacion: false,
    estado: false,
    permisos: false
  }

  return(
    <>
    <Layout pagina={`Configuración - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}es`} SiteNavBar={ConfigNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/configuracion', nombre: 'Configuración'},
        {link: '/configuracion/roles', nombre: 'Roles'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
        <h2 className="view-title"><i className="bi bi-wrench"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}es`}</h2>
        {/*Boton Actualizar*/}
        {
          !updating ? 
          <Button className='my-2' variant="light" onClick={handleUpdate} style={{height: '3rem'}}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          : <Button className='my-2' variant="light" style={{height: '3rem'}}>
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

      {/*Boton Agregar*/}
      {
        user.userPermisos?.acciones['Roles']['Crear']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          {`Agregar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}
        </Button>
      }

      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Roles']['Ver Eliminados'] 
        &&
        <>
        {
          !deleteds ?
          <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleToggleDeleteds}>
            <i className="bi bi-eye"></i>{' '}
            Mostrar Eliminados
          </Button>
          :
          <Button style={{...buttonStyle, marginRight:'0.4rem', backgroundColor: 'var(--hover-main-green)'}} className='my-2' onClick={handleToggleDeleteds}>
            <i className="bi bi-eye-slash"></i>{' '}
            Ocultar Eliminados
          </Button>
        }
        </>
      }
      
      {/*Table Container*/}
      <FormattedGrid 
        model={`${endpoint}es`} 
        pageSize={10} 
        pageSizeOptions={[10,20]}
        columns={columns} 
        hiddenColumns={hiddenColumns}
        populateRows={populateRows} 
        refetchData={refetchData}
        setRefetchData={setRefetchData} 
        deleteds={deleteds}
      />

    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} size="xl" backdrop="static">
      <EditRoles handleClose={handleCloseEdit} setRefetchData={setRefetchData} rol={currentData}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} size="xl" backdrop="static">
      <CrearRoles handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
