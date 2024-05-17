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
import { CrearBeneficiario } from "./modals/CrearBeneficiario.jsx";
import { EditBeneficiario } from "./modals/EditBeneficiario.jsx";
import moment from "moment";
import { CreateButton } from "../components/CreateButton.jsx";

export const ClientBeneficiarios = () => {
  const endpoint = 'beneficiario'
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

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});

  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false },
    { field: '_id', headerName: 'uuid', width: 100, description: 'Identificador unico del registro en la Base de Datos.', 
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      )},
    { field: 'nombre', headerName: 'Nombre', width: 250,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      ),
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'beneficiarios'} 
            id={params.row._id}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'dni', headerName: 'DNI', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'sexo', headerName: 'Sexo', width: 100,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 170, filterable: false, 
      renderCell: (params) => {
        return (moment.utc(params.row.fechaNacimiento ).format("DD/MM/YYYY"))
      }},
    { field: 'telefono', headerName: 'Teléfono', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'tipoBeneficiario', headerName: 'Tipo de Beneficiario', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'sectorId', headerName: 'Sector', width: 200, filterable: false,
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
    { field: 'tipoOrganizacionId', headerName: 'Tipo de Organización', width: 240, filterable: false,
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
    { field: 'organizacionId', headerName: 'Organización', width: 240, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'organizaciones'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'cargoId', headerName: 'Cargo', width: 240, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'cargos'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'departamentoId', headerName: 'Departamento', width: 200, filterable: false,
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
    { field: 'municipioId', headerName: 'Municipio', width: 200, filterable: false,
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
    { field: 'aldeaId', headerName: 'Aldea', width: 200, filterable: false,
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
    { field: 'caserioId', headerName: 'Caserio', width: 200, filterable: false,
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
              user.userPermisos?.acciones['Beneficiarios']['Modificar'] 
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
                      sexo: params.row.sexo,
                      fechaNacimiento: moment.utc(params.row.fechaNacimiento ).format("YYYY-MM-DD"),
                      telefono: params.row.telefono,
                      tipoBeneficiario: params.row.tipoBeneficiario,
                      sectorId: params.row.sectorId.split('-')[1],
                      tipoOrganizacionId: params.row.tipoOrganizacionId.split('-')[1],
                      organizacionId: params.row.organizacionId.split('-')[1],
                      cargoId: params.row.cargoId.split('-')[1],
                      departamentoId: params.row.departamentoId.split('-')[1],
                      municipioId: params.row.municipioId.split('-')[1],
                      aldeaId: params.row.aldeaId.split('-')[1],
                      caserioId: params.row.caserioId.split('-')[1],
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
              user.userPermisos?.acciones['Beneficiarios']['Ver Historial'] 
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
        dni: item.dni,
        sexo: item.sexo,
        fechaNacimiento: item.fechaNacimiento,
        telefono: item.telefono,
        tipoBeneficiario: item.tipoBeneficiario,
        sectorId: `${item.sector?.nombre || ''}-${item.sector?.id || ''}`,
        tipoOrganizacionId: `${item.tipoOrganizacion?.nombre || ''}-${item.tipoOrganizacion?.id || ''}`,
        organizacionId: `${item.organizacion?.nombre || ''}-${item.organizacion?.id || ''}`,
        cargoId: `${item.cargo?.nombre || ''}-${item.cargo?.id || ''}`,
        departamentoId: `${item.departamento?.nombre || ''}-${item.departamento?.id || ''}`,
        municipioId: `${item.municipio?.nombre || ''}-${item.municipio?.id || ''}`,
        aldeaId: `${item.aldea?.nombre || ''}-${item.aldea?.id || ''}`,
        caserioId: `${item.caserio?.nombre || ''}-${item.caserio?.id || ''}`,
      }
    ))
  )

  const hiddenColumns = {
    _id: false,
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
    <Layout pagina={`Clientes - ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={ClientesNavBar}
      breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/clientes', nombre: 'Clientes'},
        {link: '/clientes/beneficiarios', nombre: 'Beneficiarios'}
    ]}>
      <div className="d-flex gap-2 align-items-center">
        <h2 className="view-title"><i className="bi bi-people-fill"></i>{` ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h2>
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
        user.userPermisos?.acciones['Beneficiarios']['Crear']
        &&
        <CreateButton title={'Beneficiario'} ModalForm={CrearBeneficiario} setRefetch={handleUpdate}/>
      }

      {/*Boton Cambios*/}
      {
        user.userPermisos?.acciones['Beneficiarios']['Revisar']
        &&
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleReview}>
          <i className="bi bi-pencil-square"></i>{' '}
          Gestión de Cambios
        </Button>
      }
      
      {/*Boton Deleteds*/}
      {
        user.userPermisos?.acciones['Beneficiarios']['Ver Eliminados'] 
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
        pageSizeOptions={[10,30,50]}
        columns={columns} 
        hiddenColumns={hiddenColumns}
        populateRows={populateRows} 
        refetchData={refetchData}
        setRefetchData={setRefetchData} 
        deleteds={deleteds}
      />

    </Layout>

    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditBeneficiario handleClose={handleCloseEdit} setRefetch={setRefetchData} beneficiario={currentData}/>
    </Modal>
    </>
  );
}
