import { Layout } from "./Layout.jsx";
import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { InfoLink } from "../components/InfoLink.jsx";
import { useNavigate } from "react-router-dom";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { getGridStringOperators } from "@mui/x-data-grid";
import { TicketGenerator } from "./modals/TicketGenerator.jsx";
import { EditUsuario } from "./modals/EditUsuario.jsx";

export const ConfigUsuarios = () => {
  const endpoint = 'usuario'
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
  

  //Boton Cambios
  const navigate = useNavigate();
  const handleReview = () => {
    navigate(`/reviews/${endpoint}s`)
  }

  //Modal ticket
  const [showTicket, setShowTicket] = useState(false);
  const handleCloseTicket = () => setShowTicket(false);
  const handleShowTicket = () => setShowTicket(true);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false},
    { field: '_id', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'nombre', headerName: 'Nombre', width: 200,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      ),
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'usuarios'} 
            id={params.row._id}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'dni', headerName: 'DNI', width: 150, 
      filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === 'contains',
      )},
      { field: 'componente', headerName: 'uuid Componente', width: 250, 
      filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === 'equals',
      )},
    { field: 'componenteName', headerName: 'Componente', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'componentes'} 
            id={params.formattedValue.split('-')[1]}
            nombre={params.formattedValue.split('-')[0]} 
          />
        );
      }},
    { field: 'rol', headerName: 'uuid Rol', width: 250, 
      filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === 'equals',
      )},
    { field: 'rolName', headerName: 'Rol', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'roles'} 
            id={params.formattedValue.split('-')[1]}
            nombre={params.formattedValue.split('-')[0]} 
          />
        );
      }},
    { field: 'telefono', headerName: 'Teléfono', width: 150, 
      filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === 'contains',
      )},
    { field: 'correo', headerName: 'Correo electrónico', width: 250, 
      filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === 'contains',
      )},
    { field: 'version', headerName: 'Versión', width: 100, filterable: false},
    { field: 'fechaEdicion', headerName: 'Fecha de Edición', width: 170, filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'editor', headerName: 'uuid Editor', width: 250, 
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'editorName', headerName: 'Editado por', width: 170, filterable: false,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'fechaRevision', headerName: 'Fecha de Revisión', width: 170,  filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'revisor', headerName: 'uuid Revisor', width: 250, 
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'revisorName', headerName: 'Revisado por', width: 170, filterable: false,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'fechaEliminacion', headerName: 'Fecha de Eliminación', width: 170, filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'eliminador', headerName: 'uuid Eliminador', width: 250, 
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'eliminadorName', headerName: 'Eliminado por', width: 170, filterable: false,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'editing', headerName: 'Editando', width: 100, filterable: false,
      renderCell: (params) => {
        return (
          params.formattedValue ? <i className="bi bi-check-lg"></i> : ''
        );
      } 
    },
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
              <a href={`/reviews/${endpoint}s/${params.row._id}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
            </OverlayTrigger>
            {
              user.userPermisos?.acciones['Departamentos']['Modificar'] 
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
                    setCurrentData({
                      id: params.row._id,
                      nombre: params.row.nombre,
                      dni: params.row.dni,
                      telefono: params.row.telefono,
                      idComponente: params.row.componente,
                      idRol: params.row.rol
                    })
                    handleShowEdit()
                  }}>
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </OverlayTrigger>
              }
              </>
            }
            {
              user.userPermisos?.acciones['Departamentos']['Ver Historial'] 
              &&
              <OverlayTrigger overlay={<Tooltip>{'Historial de Cambios'}</Tooltip>}>
                <a href={`/historial/${endpoint}s/${params.row._id}`} target="_blank" rel="noreferrer">
                  <Button  className='py-1' style={buttonStyle}>
                    <i className="bi bi-clock-history"></i>{' '}
                  </Button>
                </a>
              </OverlayTrigger>
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
        _id: item._id, 
        version: item.version,
        fechaEdicion: item.fechaEdicion,
        editor: item.editor?._id || '',
        editorName: `${item.editor?.nombre || ''}-${item.editor?._id || ''}`,
        fechaRevision: item.fechaRevision,
        revisor: item.revisor?._id || '',
        revisorName: `${item.revisor?.nombre || ''}-${item.revisor?._id || ''}`,
        fechaEliminacion: item.fechaEliminacion ? item.fechaEliminacion : '',
        eliminador: item.eliminador?._id || '',
        eliminadorName: `${item.eliminador?.nombre || ''}-${item.eliminador?._id || ''}`,
        editing: item.pendientes.includes(user.userId),
        estado: item.estado,
        nombre: item.nombre,
        dni: item.dni,
        telefono: item.telefono,
        correo: item.correo,
        componente: item.componente?._id || '',
        componenteName: `${item.componente?.descripcion || ''}-${item.componente?._id || ''}`,
        rol: item.rol?._id || '',
        rolName: `${item.rol?.nombre || ''}-${item.rol?._id || ''}`,
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
    componente: false,
    rol: false,
    version: false,
    fechaEdicion: false,
    editor: false,
    editorName: false,
    fechaRevision: false,
    revisor: false,
    revisorName: false,
    fechaEliminacion: false,
    eliminador: false,
    eliminadorName: false,
    editing: false,
    estado: false
  }

  return(
    <>
    <Layout pagina={`Configuración - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={ConfigNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/configuracion', nombre: 'Configuración'},
        {link: '/configuracion/usuarios', nombre: 'Usuarios'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
      <h2 className="view-title"><i className="bi bi-people-fill"></i>{`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h2>
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
      
      {/*Boton Ticket*/}
      {
        user.userPermisos?.acciones['Usuarios']['Crear']
        &&
        <Button style={buttonStyle} className='my-2' onClick={handleShowTicket}>
          <i className="bi bi-ticket-detailed-fill"></i>{' '}
          Generar Ticket
        </Button>
      }

      {/*Boton Cambios*/}
      {
        user.userPermisos?.acciones['Departamentos']['Revisar']
        &&
        <Button style={{...buttonStyle}} className='my-2 mx-2' onClick={handleReview}>
          <i className="bi bi-pencil-square"></i>{' '}
          Gestión de Cambios
        </Button>
      }
      
      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Departamentos']['Ver Eliminados'] 
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
        model={`${endpoint}s`} 
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
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditUsuario handleClose={handleCloseEdit} setRefetchData={setRefetchData} usuario={currentData}/>
    </Modal>
    <Modal show={showTicket} onHide={handleCloseTicket} backdrop="static">
      <TicketGenerator handleClose={handleCloseTicket}/>
    </Modal>
    </>
  );
}
