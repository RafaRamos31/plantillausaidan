import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { EditOrgtype } from "./modals/EditOrgtype.jsx";
import { CrearOrgtype } from "./modals/CrearOrgtype.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ClientOrgtypes = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('orgtypes');
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
  const [currentOrgtype, setCurrentOrgtype] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'name', headerName: 'Tipo de Organización', width: 450,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'orgtype'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      }
    },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentOrgtype({
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
        data.map((orgtype, index) => (
          { 
            id: index + 1, 
            uuid: orgtype._id, 
            name: orgtype.nombre
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
    <Layout pagina={'Clientes - Tipos de Organizaciones'} SiteNavBar={ClientesNavBar}>
    <h2 className="view-title"><i className="bi bi-bank"></i> Tipos de Organizaciones</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        Agregar Tipo de Organización
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

      <DataGrid
        autoHeight
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

    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <EditOrgtype handleClose={handleCloseEdit} setRefetch={handleRefetch} orgtype={currentOrgtype}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <CrearOrgtype handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
