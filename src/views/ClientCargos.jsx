import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearCargo } from "./modals/CrearCargo.jsx";
import { EditCargo } from "./modals/EditCargo.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ClientCargos = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('cargos');
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
  const [currentCargo, setCurrentCargo] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'ultimaEdicion', headerName: 'Última Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 200 },
    { field: 'name', headerName: 'Cargo', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'cargo'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'organizacion', headerName: 'Organización', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'organizacion'} 
            id={data.find(cargo => cargo.organizacion?.nombre === params.row.organizacion).organizacion._id || ''}
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
            setCurrentCargo({
              id: params.row.uuid,
              nombre: params.row.name,
              idOrganizacion: params.row.organizacion ? data.find(cargo => cargo.organizacion?.nombre === params.row.organizacion).organizacion._id : ''
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
      console.log(data)
      setRows(
        data.map((cargo, index) => (
          { 
            id: index + 1, 
            uuid: cargo._id, 
            ultimaEdicion: new Date(cargo.ultimaEdicion).toLocaleString(),
            editor: 'Rafael Ramos',
            name: cargo.nombre,
            organizacion: cargo.organizacion?.nombre || ''
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
    <Layout pagina={'Clientes - Cargos'} SiteNavBar={ClientesNavBar}>
    <h2 className="view-title"><i className="bi bi-person-badge"></i> Cargos</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        Agregar Cargo
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
          columns: {
            columnVisibilityModel: {
              uuid: false,
              ultimaEdicion: false,
              editor: false
            },
          },
        }}
        rowSelection={false}
        pageSizeOptions={[5, 10]}
        style={{ minHeight: "160px"}}
      />

    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditCargo handleClose={handleCloseEdit} setRefetch={handleRefetch} cargo={currentCargo}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearCargo handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
