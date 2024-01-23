import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearDepartamento } from "./modals/CrearDepartamento.jsx";
import { EditDepartamento } from "./modals/EditDepartamento.jsx";
import { InfoLink } from "../components/InfoLink.jsx";
import { useNavigate } from "react-router-dom";
import { AvatarChip } from "../components/AvatarChip.jsx";

export const ConfigDepartamentos = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('departamentos');
  const handleRefetch = () => {
    setRefetch(true)
  }

  //Update manual
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true)
    setRefetch(true)
  }

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

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

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
    { field: 'editing', headerName: 'Editando', width: 100 },
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
      width: 150,
      sortable: false,
      renderCell: (params) => {
        if(params.row.editing){
          return (
            <Button style={{...buttonStyle, backgroundColor: 'gray'}} onClick={() => {
              setCurrentDepartamento({ 
                id: params.row.uuid,
                nombre: params.row.name,
                geocode: params.row.geocode
              })
              handleShowEdit()
            }}>
              En Revisión
            </Button>
          );
        }
        else{
          return (
            <Button style={buttonStyle} onClick={() => {
              setCurrentDepartamento({
                id: params.row.uuid,
                nombre: params.row.name,
                geocode: params.row.geocode
              })
              handleShowEdit()
            }}>
              Editar
            </Button>
          );
        }
      },
    }
  ];
  
  //Enviar datos a las filas
  useEffect(() => {
    if(data){
      setRows(
        data.map((departamento, index) => (
          { 
            id: index + 1, 
            uuid: departamento._id, 
            version: departamento.version,
            fechaEdicion: new Date(departamento.fechaEdicion).toLocaleString(),
            editor: `${departamento.editor._id}-${departamento.editor.nombre}`,
            fechaRevision: new Date(departamento.fechaRevision).toLocaleString(),
            revisor: `${departamento.revisor._id}-${departamento.revisor.nombre}`,
            editing: departamento.pendientes.includes(departamento.editor._id),
            name: departamento.nombre,
            geocode: departamento.geocode
          }
        ))
      );
    }
    setUpdate(false);
  }, [data, isLoading])
  
  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px'
  };

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
        {/*Boton Actualizar*/}
        {
          !update ? 
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

        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                uuid: false,
                version: false,
                fechaEdicion: false,
                editor: false,
                fechaRevision: false,
                revisor: false,
                editing: false
              },
            },
          }}
          rowSelection={false}
          pageSizeOptions={[5, 10]}
          style={{ minHeight: "160px"}}
        />

    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditDepartamento handleClose={handleCloseEdit} setRefetch={handleRefetch} departamento={currentDepartamento}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearDepartamento handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
