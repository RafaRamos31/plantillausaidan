import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { InfoLink } from "../components/InfoLink.jsx";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { getGridStringOperators } from "@mui/x-data-grid";
import { IndicadoresNavBar } from "../components/navBars/IndicadoresNavBar.jsx";
import { CrearIndicadores } from "./modals/CrearIndicadores.jsx";
import { EditIndicadores } from "./modals/EditIndicadores.jsx";

export const IndIndicadores = () => {
  const endpoint = 'indicador'
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
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false},
    { field: '_id', headerName: 'uuid', width: 80, description: 'Identificador unico del registro en la Base de Datos.',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'nombre', headerName: 'Código', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      ),
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'indicadores'} 
            id={params.row._id}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'descripcion', headerName: 'Descripción', width: 400, filterable: false},
    { field: 'tipoIndicador', headerName: 'Tipo de Indicador', width: 150, filterable: false},
    { field: 'medida', headerName: 'Unidad de Medida', width: 150, filterable: false},
    { field: 'frecuencia', headerName: 'Frecuencia', width: 150, filterable: false},
    { field: 'metaLOP', headerName: 'Meta LOP', width: 150, filterable: false},
    { field: 'metas', headerName: 'Metas Info', width: 150, filterable: false},
    { field: 'version', headerName: 'Versión', width: 100, filterable: false},
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
              <a href={`/reviews/${endpoint}es/${params.row._id}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
            </OverlayTrigger>
            {
              user.userPermisos?.acciones['Indicadores']['Modificar'] 
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
                      tipoIndicador: params.row.tipoIndicador,
                      frecuencia: params.row.frecuencia,
                      medida: params.row.medida,
                      metas: JSON.parse(params.row.metas),
                    })
                    handleShowEdit()
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
        descripcion: item.descripcion,
        medida: item.medida,
        tipoIndicador: item.tipoIndicador,
        frecuencia: item.frecuencia,
        metaLOP: item.medida === 'Monetario' ? item.metas['LOP']['Total'].toLocaleString('en-US', currencyFormat) : item.metas['LOP']['Total'],
        metas: JSON.stringify(item.metas)
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
    metas: false,
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
    <Layout pagina={`Clientes - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}es`} SiteNavBar={IndicadoresNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/indicadores', nombre: 'Indicadores'},
        {link: '/indicadores/indicadores', nombre: 'Indicadores'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
      <h2 className="view-title"><i className="bi bi-graph-up-arrow"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}es`}</h2>
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
        user.userPermisos?.acciones['Indicadores']['Crear']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          {`Agregar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`}
        </Button>
      }
      
      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Indicadores']['Ver Eliminados'] 
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
      <EditIndicadores handleClose={handleCloseEdit} setRefetchData={setRefetchData} indicador={currentData}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearIndicadores handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
