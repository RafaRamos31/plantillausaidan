import { PlanNavBar } from "../components/navBars/PlanNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { InfoLink } from "../components/InfoLink.jsx";
import { useNavigate } from "react-router-dom";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { getGridStringOperators } from "@mui/x-data-grid";
import { Chip, Tooltip as MuiTooltip } from "@mui/material";
import { CrearSubActividad } from "./modals/CrearSubActividad.jsx";
import { EditSubActividad } from "./modals/EditSubActividad.jsx";

export const PlanSubActividades = () => {
  const endpoint = 'subactividad'
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
    navigate(`/reviews/${endpoint}es`)
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
    { field: 'id', headerName: '#', width: 50, filterable: false},
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
            type={'subactividades'} 
            id={params.row._id}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'descripcion', headerName: 'Descripción', width: 600, 
      filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === 'contains',
      )},
    { field: 'resultado', headerName: 'Resultado', width: 100, filterable: false,
    renderCell: (params) => {
      const resultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={resultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{resultado.nombre}</p>
        </MuiTooltip>
      );
    } 
    },
    { field: 'subresultado', headerName: 'Sub Resultado', width: 120, filterable: false,
    renderCell: (params) => {
      const resultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={resultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{resultado.nombre}</p>
        </MuiTooltip>
      );
    } 
    },
    { field: 'actividad', headerName: 'Actividad', width: 100, filterable: false,
    renderCell: (params) => {
      const resultado = JSON.parse(params.formattedValue)
      return (
        <MuiTooltip title={resultado.descripcion} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{resultado.nombre}</p>
        </MuiTooltip>
      );
    } 
    },
    { field: 'componentes', headerName: 'Componentes', width: 200, filterable: false,
      renderCell: (params) => (
        JSON.parse(params.formattedValue).map(componente => (
          <MuiTooltip key={componente._id} title={componente.descripcion} placement="top" arrow followCursor>
            <Chip key={componente._id} className="mx-1" label={componente.nombre} style={{cursor: 'help'}}/>
          </MuiTooltip>
        ))
    )},
    { field: 'areasTematicas', headerName: 'Áreas Temáticas', width: 400, filterable: false,
      renderCell: (params) => (
        JSON.parse(params.formattedValue).map(area => (
          <MuiTooltip key={area._id} title={area.descripcion} placement="top" arrow followCursor>
            <Chip key={area._id} className="mx-1" label={area.nombre} style={{cursor: 'help'}}/>
          </MuiTooltip>
        ))
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
              <a href={`/reviews/${endpoint}es/${params.row._id}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
            </OverlayTrigger>
            {
              user.userPermisos?.acciones['Sub Actividades']['Modificar'] 
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
                      descripcion: params.row.descripcion,
                      idResultado: JSON.parse(params.row.resultado)?._id,
                      idSubresultado: JSON.parse(params.row.subresultado)?._id,
                      idActividad: JSON.parse(params.row.actividad)?._id,
                      componentes: JSON.parse(params.row.componentes),
                      areasTematicas: JSON.parse(params.row.areasTematicas),
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
              user.userPermisos?.acciones['Sub Actividades']['Ver Historial'] 
              &&
              <OverlayTrigger overlay={<Tooltip>{'Historial de Cambios'}</Tooltip>}>
                <a href={`/historial/${endpoint}es/${params.row._id}`} target="_blank" rel="noreferrer">
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
        descripcion: item.descripcion,
        resultado: JSON.stringify(item.resultado),
        subresultado: JSON.stringify(item.subresultado),
        actividad: JSON.stringify(item.actividad),
        componentes: JSON.stringify(item.componentes),
        areasTematicas: JSON.stringify(item.areasTematicas),
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
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
    <Layout pagina={`Planificación - Sub Actividades`} SiteNavBar={PlanNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/planificacion', nombre: 'Planificación'},
        {link: '/planificacion/subactividades', nombre: 'Sub Actividades'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
      <h2 className="view-title"><i className="bi bi-layers"></i>{` Sub Actividades`}</h2>
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
        user.userPermisos?.acciones['Sub Actividades']['Crear']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          {`Agregar Sub Actividad`}
        </Button>
      }

      {/*Boton Cambios*/}
      {
        user.userPermisos?.acciones['Sub Actividades']['Revisar']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleReview}>
          <i className="bi bi-pencil-square"></i>{' '}
          Gestión de Cambios
        </Button>
      }
      
      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Sub Actividades']['Ver Eliminados'] 
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
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditSubActividad handleClose={handleCloseEdit} setRefetchData={setRefetchData} subactividad={currentData}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearSubActividad handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
