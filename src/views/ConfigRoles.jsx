import { DataGrid } from "@mui/x-data-grid";
import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { useFetchGet } from "../hooks/useFetch.js";
import { Layout } from "./Layout.jsx";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { EditRoles } from "./modals/EditRoles.jsx";
import { CrearRoles } from "./modals/CrearRoles.jsx";

export const ConfigRoles = () => {

  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('roles');
  const handleRefetch = () => {
    setRefetch(true)
  }

  //Update manual
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true)
    setRefetch(true)
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
  const [currentRol, setCurrentRol] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'name', headerName: 'Nombre del Rol', width: 450, description: 'Nombre para identificar el Rol.' },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentRol({
              id: params.row.uuid,
              nombre: params.row.name
            })
            handleShowEdit()
          }}>
            Editar
          </Button>
        );
      },
    }
  ];
  
  //Enviar datos a las filas
  useEffect(() => {
    if(data){
      setRows(
        data.map((rol, index) => (
          { 
            id: index + 1, 
            uuid: rol._id, 
            name: rol.nombre
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
    <Layout pagina={'Configuracion - Roles'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-wrench"></i> Roles</h2>
        {/*Boton Agregar*/}
        <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Rol
        </Button>
        {/*Boton Actualizar*/}
        {
          !update ? 
          <Button className='my-2 mx-2' variant="light" onClick={handleUpdate}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          : <Button className='my-2 mx-2' variant="light">
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
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            rowSelection={false}
            pageSizeOptions={[5, 10]}
            style={{ minHeight: "160px"}}
          />
        </div>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <EditRoles handleClose={handleCloseEdit} setRefetch={handleRefetch} rol={currentRol}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <CrearRoles handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
