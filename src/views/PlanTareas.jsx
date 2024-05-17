import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
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
import { EditTarea } from "./modals/EditTarea.jsx";

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

  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    if(dataConfig){
      setEnableEdit(Number(dataConfig.find(el => el.attributeKey === 'enableSubirPlanificacion')?.attributeValue))
    }
  }, [dataConfig])
  

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
  //const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData] = useState({});

  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false },
    { field: '_id', headerName: 'uuid', width: 80, description: 'Identificador unico del registro en la Base de Datos.', 
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
    { field: 'componenteId', headerName: 'Componente', width: 120, filterable: false,
    renderCell: (params) => {
      const actividad = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={actividad.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{actividad.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'subactividadId', headerName: 'Sub Actividad', width: 150, filterable: false,
    renderCell: (params) => {
      const subactividad = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={subactividad.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{subactividad.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'actividadId', headerName: 'Actividad', width: 150, filterable: false,
    renderCell: (params) => {
      const actividad = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={actividad.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{actividad.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'subresultadoId', headerName: 'Sub Resultado', width: 150, filterable: false,
    renderCell: (params) => {
      const subresultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={subresultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{subresultado.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'resultadoId', headerName: 'Resultado', width: 150, filterable: false,
    renderCell: (params) => {
      const resultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={resultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{resultado.nombre}</p>
        </MuiTooltip>
      );
    }},
    { field: 'yearId', headerName: 'Año Fiscal', width: 100, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'years'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'quarterId', headerName: 'Trimestre', width: 100, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'quarters'} 
            id={params.value.split('*')[1]}
            nombre={params.value.split('*')[0]}
          />
        );
      }
    },
    { field: 'lugar', headerName: 'Lugar', width: 300, filterable: false },
    { field: 'tipoEventoId', headerName: 'Unidad de Medida', width: 180, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'tiposeventos'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'gastosEstimados', headerName: 'Gastos Estimados', width: 180, filterable: false },
    { field: 'gastosRealizados', headerName: 'Gastos Realizados', width: 180, filterable: false },
    { field: 'eventosEstimados', headerName: 'Eventos Estimados', width: 150, filterable: false },
    { field: 'eventosRealizados', headerName: 'Eventos Realizados', width: 150, filterable: false },
    { field: 'version', headerName: 'Versión', width: 100, filterable: false },
    { field: 'fechaEdicion', headerName: 'Fecha de Edición', width: 170, filterable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'editorId', headerName: 'Editado por', width: 170, filterable: false,
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
    { field: 'revisorId', headerName: 'Revisado por', width: 170, filterable: false,
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
    { field: 'eliminadorId', headerName: 'Eliminado por', width: 170, filterable: false,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
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
              /*user.userPermisos?.acciones['Tareas']['Modificar'] 
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
                      componenteId: JSON.parse(params.row.componenteId)?.id,
                      subactividadId: JSON.parse(params.row.subactividadId)?.id,
                      nombre: params.row.nombre,
                      titulo: params.row.titulo,
                      descripcion: params.row.titulo,
                      yearId: params.row.yearId.split('-')[1],
                      quarterId: params.row.quarterId.split('*')[1],
                      lugar: params.row.lugar,
                      tipoEventoId: params.row.tipoEventoId.split('-')[1],
                      gastosEstimados: Number(params.row.gastosEstimados.slice(1, -2)),
                      eventosEstimados: params.row.eventosEstimados,
                    })
                    handleShowEdit()
                  }}>
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </OverlayTrigger>
              }
              </>*/
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
        _id: item.id, 
        version: item.version,
        fechaEdicion: item.fechaEdicion,
        editorId: `${item.editor?.nombre || ''}-${item.editor?.id || ''}`,
        fechaRevision: item.fechaRevision,
        revisorId: `${item.revisor?.nombre || ''}-${item.revisor?.id || ''}`,
        fechaEliminacion: item.fechaEliminacion ? item.fechaEliminacion : '',
        eliminadorId: `${item.eliminador?.nombre || ''}-${item.eliminador?.id || ''}`,
        estado: item.estado,
        nombre: item.nombre,
        titulo: item.titulo,
        descripcion: item.descripcion,
        componenteId: JSON.stringify(item.componente),
        subactividadId: JSON.stringify(item.subactividad),
        actividadId: JSON.stringify(item.actividad),
        subresultadoId: JSON.stringify(item.subresultado),
        resultadoId: JSON.stringify(item.resultado),
        yearId: `${item.year?.nombre || ''}-${item.year?.id || ''}`,
        quarterId: `${item.quarter?.nombre || ''}*${item.quarter?.id || ''}`,
        lugar: item.lugar,
        tipoEventoId: `${item.tipoEvento?.nombre || ''}-${item.tipoEvento?.id || ''}`,
        gastosEstimados: item.gastosEstimados.toLocaleString('en-US', currencyFormat),
        gastosRealizados: item.gastosRealizados.toLocaleString('en-US', currencyFormat),
        eventosEstimados: item.eventosEstimados,
        eventosRealizados: item.eventosRealizados,
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
    descripcion: false,
    componenteId: false,
    yearId: false,
    actividadId: false,
    subresultadoId: false,
    resultadoId: false,
    version: false,
    fechaEdicion: false,
    editorId: false,
    fechaRevision: false,
    revisorId: false,
    fechaEliminacion: false,
    eliminadorId: false,
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
        <MuiTooltip title={enableEdit ?  '' : 'La opción de modificar la planificación esta actualmente deshabilidada' } placement="top" arrow followCursor>
          <div style={{display: 'inline'}}>
            <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate} disabled={!enableEdit}>
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
        componenteId={user.userComponente.id}
      />

    </Layout>

    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditTarea handleClose={handleCloseEdit} setRefetchData={setRefetchData} tarea={currentData}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearTarea handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
