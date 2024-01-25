import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearDepartamento } from "./modals/CrearDepartamento.jsx";
import { EditDepartamento } from "./modals/EditDepartamento.jsx";
import { InfoLink } from "../components/InfoLink.jsx";
import { useNavigate } from "react-router-dom";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { UserContext } from "../contexts/UserContext.js";

export const ConfigDepartamentos = () => {

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
    navigate('/reviews/departamentos')
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
  const [currentDepartamento, setCurrentDepartamento] = useState({});

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'version', headerName: 'Versión', width: 100 },
    { field: 'fechaEdicion', headerName: 'Fecha de Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 250,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[0]}
            name={params.formattedValue.split('-')[1]} 
          />
        );
      } 
    },
    { field: 'fechaRevision', headerName: 'Fecha de Revisión', width: 200 },
    { field: 'revisor', headerName: 'Revisado por', width: 250,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[0]}
            name={params.formattedValue.split('-')[1]} 
          />
        );
      } 
    },
    { field: 'fechaEliminacion', headerName: 'Fecha de Eliminación', width: 200 },
    { field: 'eliminador', headerName: 'Eliminado por', width: 250,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[0]}
            name={params.formattedValue.split('-')[1]} 
          />
        );
      } 
    },
    { field: 'editing', headerName: 'Editando', width: 100,
      renderCell: (params) => {
        return (
          params.formattedValue ? <i className="bi bi-check-lg"></i> : ''
        );
      } 
    },
    { field: 'estado', headerName: 'Estado', width: 100 },
    { field: 'name', headerName: 'Nombre del Departamento', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'geocode', headerName: 'Geocode', width: 120, description: 'Codigo Unico del Departamento.' },
    {
      field: " ",
      headerName: " ",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        if(params.row.editing){
          return (
            <>
              <a href={`/reviews/departamentos/${params.row.uuid}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
              <Button className='py-1 mx-1' style={{...buttonStyle, backgroundColor: 'darkgreen'}} disabled>
                <i className="bi bi-pencil-fill"></i>{' '}
                En Revisión
              </Button>
            </>
          );
        }
        else{
          return (
            <>
              <a href={`/reviews/departamentos/${params.row.uuid}`} target="_blank" rel="noreferrer">
                <Button  className='py-1' style={buttonStyle}>
                  <i className="bi bi-eye-fill"></i>{' '}
                </Button>
              </a>
              <Button  className='py-1 mx-1' style={buttonStyle} onClick={() => {
              setCurrentDepartamento({
                id: params.row.uuid,
                nombre: params.row.name,
                geocode: params.row.geocode
              })
              handleShowEdit()
            }}>
              <i className="bi bi-pencil-fill"></i>{' '}
              Editar
            </Button>
            </>
          );
        }
      },
    }
  ];
  

  const populateRows = (data, page, pageSize) => (
    data.map((departamento, index) => (
      { 
        id: (page * pageSize) + index + 1, 
        uuid: departamento._id, 
        version: departamento.version,
        fechaEdicion: new Date(departamento.fechaEdicion).toLocaleString(),
        editor: `${departamento.editor._id}-${departamento.editor.nombre}`,
        fechaRevision: new Date(departamento.fechaRevision).toLocaleString(),
        revisor: `${departamento.revisor._id}-${departamento.revisor.nombre}`,
        fechaEliminacion: departamento.fechaEliminacion ? new Date(departamento.fechaEliminacion).toLocaleString() : '',
        eliminador: `${departamento.eliminador?._id || ''}-${departamento.eliminador?.nombre || ''}`,
        editing: departamento.pendientes.includes(user.userId),
        estado: departamento.estado,
        name: departamento.nombre,
        geocode: departamento.geocode
      }
    ))
  )

  const hiddenColumns = {
    uuid: false,
    version: false,
    fechaEdicion: false,
    editor: false,
    fechaRevision: false,
    revisor: false,
    fechaEliminacion: false,
    eliminador: false,
    editing: false,
    estado: false
  }

  return(
    <>
    <Layout pagina={'Configuracion - Departamentos'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Departamentos</h2>
      {/*Boton Agregar*/}
      <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Departamento
        </Button>
        {/*Boton Cambios*/}
        <Button style={{...buttonStyle, marginRight:'0.4rem'}} className='my-2' onClick={handleReview}>
          <i className="bi bi-pencil-square"></i>{' '}
          Gestión de Cambios
        </Button>
        {/*Boton Deleteds*/}
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
        
        {/*Boton Actualizar*/}
        {
          !updating ? 
          <Button className='my-2' variant="light" onClick={handleUpdate}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          : <Button className='my-2' variant="light">
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

        {/*Table Container*/}
      <FormattedGrid 
        model={'departamentos'} 
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
      <EditDepartamento handleClose={handleCloseEdit} setRefetchData={setRefetchData} departamento={currentDepartamento}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearDepartamento handleClose={handleCloseCreate} setRefetch={handleUpdate}/>
    </Modal>
    </>
  );
}
