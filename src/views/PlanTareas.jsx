import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { EditMunicipio } from "./modals/EditMunicipio.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { getGridStringOperators } from "@mui/x-data-grid";
import { PlanNavBar } from "../components/navBars/PlanNavBar.jsx";
import { CrearTarea } from "./modals/CrearTarea.jsx";
import { useFetchGet } from "../hooks/useFetch.js";
import { Tooltip as MuiTooltip } from "@mui/material";
import { InfoLink } from "../components/InfoLink.jsx";

export const PlanTareas = () => {
  const endpoint = 'tarea'
  const {user} = useContext(UserContext)

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px',
  };

  const currencyFormat = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  //General config
  const { data: dataConfig } = useFetchGet('config');

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

  //Modal crear
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false },
    { field: '_id', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.', 
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
      { field: 'nombre', headerName: 'Código', width: 100,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      ),
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'tareas'} 
            id={params.row._id}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'titulo', headerName: 'Título', width: 300},
    { field: 'descripcion', headerName: 'Descripción', width: 500,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'subactividad', headerName: 'Sub Actividad', width: 150, filterable: false,
    renderCell: (params) => {
      const subactividad = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={subactividad.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{subactividad.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'actividad', headerName: 'Actividad', width: 150, filterable: false,
    renderCell: (params) => {
      const actividad = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={actividad.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{actividad.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'subresultado', headerName: 'Sub Resultado', width: 150, filterable: false,
    renderCell: (params) => {
      const subresultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={subresultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{subresultado.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'resultado', headerName: 'Resultado', width: 150, filterable: false,
    renderCell: (params) => {
      const resultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={resultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{resultado.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'year', headerName: 'Año Fiscal', width: 150, filterable: false },
    { field: 'quarter', headerName: 'Trimestre', width: 150, filterable: false },
    { field: 'lugar', headerName: 'Lugar', width: 300, filterable: false },
    { field: 'unidadMedida', headerName: 'Unidad de Medida', width: 180, filterable: false },
    { field: 'cantidadProgramada', headerName: 'Eventos Programados', width: 180, filterable: false },
    { field: 'cantidadRealizada', headerName: 'Eventos Realizados', width: 150, filterable: false },
    { field: 'version', headerName: 'Versión', width: 100, filterable: false },
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
              user.userPermisos?.acciones['Tareas']['Modificar'] 
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
                      idDepartamento: params.row.departamento,
                      geocode: params.row.geocode
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
              user.userPermisos?.acciones['Tareas']['Ver Historial'] 
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
        titulo: item.titulo,
        descripcion: item.descripcion,
        subactividad: JSON.stringify(item.subactividad),
        actividad: JSON.stringify(item.actividad),
        subresultado: JSON.stringify(item.subresultado),
        resultado: JSON.stringify(item.resultado),
        year: item.year?.nombre,
        quarter: item.trimestre?.nombre,
        lugar: item.lugar,
        unidadMedida: item.unidadMedida,
        cantidadProgramada: item.cantidadProgramada,
        cantidadRealizada: item.cantidadRealizada,
        gastosEstimados: item.gastosEstimados.toLocaleString('en-US', currencyFormat)
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
    descripcion: false,
    year: false,
    actividad: false,
    subresultado: false,
    resultado: false,
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
    <Layout pagina={`Planificación - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={PlanNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/planificacion', nombre: 'Planificación'},
        {link: '/planificacion/tareas', nombre: 'Tareas'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
        <h2 className="view-title"><i className="bi bi-list-check"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h2>
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
        user.userPermisos?.acciones['Tareas']['Crear']
        &&
        <MuiTooltip title={dataConfig?.enableSubirPlanificacion ?  '' : 'La opción de modificar la planificación esta actualmente deshabilidada' } placement="top" arrow followCursor>
          <div style={{display: 'inline'}}>
            <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate} disabled={!dataConfig?.enableSubirPlanificacion}>
              <i className="bi bi-file-earmark-plus"></i>{' '}
              {`Agregar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}
            </Button>
          </div>
        </MuiTooltip>
      }

      {/*Boton Cambios*/}
      {
        user.userPermisos?.acciones['Tareas']['Revisar']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleReview}>
          <i className="bi bi-pencil-square"></i>{' '}
          Gestión de Cambios
        </Button>
      }
      
      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Tareas']['Ver Eliminados'] 
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
      <EditMunicipio handleClose={handleCloseEdit} setRefetchData={setRefetchData} municipio={currentData}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearTarea handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
