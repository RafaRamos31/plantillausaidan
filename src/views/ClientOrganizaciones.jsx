import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { InfoLink } from "../components/InfoLink.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { getGridStringOperators } from "@mui/x-data-grid";
import { CrearOrganizacion } from "./modals/CrearOrganizacion.jsx";
import { EditOrganizacion } from "./modals/EditOrganizacion.jsx";

export const ClientOrganizaciones = () => {
  const endpoint = 'organizacion'
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
    { field: 'id', headerName: '#', width: 50, filterable: false },
    { field: '_id', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.', 
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'nombre', headerName: 'Nombre', width: 250,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      ),
    },
    { field: 'codigoOrganizacion', headerName: 'Código', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'sector', headerName: 'uuid Sector', width: 150},
    { field: 'sectorName', headerName: 'Sector', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'sectores'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'tipoOrganizacion', headerName: 'uuid Tipo Organización', width: 250},
    { field: 'tipoOrganizacionName', headerName: 'Tipo de Organización', width: 240, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'tipoOrganizaciones'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'nivelOrganizacion', headerName: 'Nivel', width: 150, filterable: false },
    { field: 'departamento', headerName: 'uuid Departamento', width: 250},
    { field: 'departamentoName', headerName: 'Departamento', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamentos'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'municipio', headerName: 'uuid Municipio', width: 250},
    { field: 'municipioName', headerName: 'Municipio', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'municipios'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'aldea', headerName: 'uuid Aldea', width: 250},
    { field: 'aldeaName', headerName: 'Aldea', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'aldeas'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'caserio', headerName: 'uuid Caserio', width: 250},
    { field: 'caserioName', headerName: 'Caserio', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'caserios'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'geolocacion', headerName: 'Geolocacion', width: 300},
    { field: 'telefonoOrganizacion', headerName: 'Teléfono', width: 150, filterable: false },
    { field: 'nombreContacto', headerName: 'Nombre Contacto', width: 200, filterable: false },
    { field: 'telefonoContacto', headerName: 'Teléfono Contacto', width: 150, filterable: false },
    { field: 'correoContacto', headerName: 'Correo Contacto', width: 250, filterable: false },
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
              <a href={`/reviews/${endpoint}es/${params.row._id}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
            </OverlayTrigger>
            {
              user.userPermisos?.acciones['Organizaciones']['Modificar'] 
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
                      codigoOrganizacion: params.row.codigoOrganizacion,
                      idSector: params.row.sector,
                      idTipoOrganizacion: params.row.tipoOrganizacion,
                      nivelOrganizacion: params.row.nivelOrganizacion,
                      idDepartamento: params.row.departamento,
                      idMunicipio: params.row.municipio,
                      idAldea: params.row.aldea,
                      idCaserio: params.row.caserio,
                      geolocacion: params.row.geolocacion,
                      telefonoOrganizacion: params.row.telefonoOrganizacion,
                      nombreContacto: params.row.nombreContacto,
                      telefonoContacto: params.row.telefonoContacto,
                      correoContacto: params.row.correoContacto,
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
              user.userPermisos?.acciones['Organizaciones']['Ver Historial'] 
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
        codigoOrganizacion: item.codigoOrganizacion,
        nivelOrganizacion: item.nivelOrganizacion,
        sector: item.sector._id,
        sectorName: `${item.sector.nombre}-${item.sector._id}`,
        tipoOrganizacion: item.tipoOrganizacion._id,
        tipoOrganizacionName: `${item.tipoOrganizacion.nombre}-${item.tipoOrganizacion._id}`,
        departamento: item.departamento._id,
        departamentoName: `${item.departamento.nombre}-${item.departamento._id}`,
        municipio: item.municipio._id,
        municipioName: `${item.municipio.nombre}-${item.municipio._id}`,
        aldea: item.aldea._id,
        aldeaName: `${item.aldea.nombre}-${item.aldea._id}`,
        caserio: item.caserio._id,
        caserioName: `${item.caserio.nombre}-${item.caserio._id}`,
        geolocacion: item.geolocacion,
        telefonoOrganizacion: item.telefonoOrganizacion,
        nombreContacto: item.nombreContacto,
        telefonoContacto: item.telefonoContacto,
        correoContacto: item.correoContacto,
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
    sector: false,
    tipoOrganizacion: false,
    departamento: false,
    municipio: false,
    aldea: false,
    caserio: false,
    geolocacion: false,
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
    <Layout pagina={`Clientes - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}es`} SiteNavBar={ClientesNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/clientes', nombre: 'Clientes'},
        {link: '/clientes/organizaciones', nombre: 'Organizaciones'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
        <h2 className="view-title"><i className="bi bi-bank2"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}es`}</h2>
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
        user.userPermisos?.acciones['Organizaciones']['Crear']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          {`Agregar Organización`}
        </Button>
      }

      {/*Boton Cambios*/}
      {
        user.userPermisos?.acciones['Organizaciones']['Revisar']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleReview}>
          <i className="bi bi-pencil-square"></i>{' '}
          Gestión de Cambios
        </Button>
      }
      
      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Organizaciones']['Ver Eliminados'] 
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
      <EditOrganizacion handleClose={handleCloseEdit} setRefetchData={setRefetchData} organizacion={currentData}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearOrganizacion handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
