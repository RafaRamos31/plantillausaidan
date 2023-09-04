import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearSubarea } from "./modals/CrearSubarea.jsx";
import { EditSubarea } from "./modals/EditSubarea.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ConfigSubAreas = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('subareas');
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
  const [currentSubarea, setCurrentSubarea] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'name', headerName: 'Sub Área Temática', width: 250, description: 'Nombre de la Sub Área Temática.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'subarea'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'area', headerName: 'Área Temática', width: 250, description: 'Área Temática a la que pertenece el Sub Área.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'area'} 
            id={data.find(subarea => subarea.area?.nombre === params.row.area).area._id || ''}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    {
      field: " ",
      headerName: " ",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentSubarea({
              id: params.row.uuid,
              nombre: params.row.name,
              idArea: params.row.area ? data.find(subarea => subarea.area?.nombre === params.row.area).area._id : '',
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
        data.map((subarea, index) => (
          { 
            id: index + 1, 
            uuid: subarea._id, 
            name: subarea.nombre,
            area: subarea.area?.nombre || '',
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
    <Layout pagina={'Configuracion - Sub Áreas Temáticas'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-collection"></i> Sub Áreas Temáticas</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Sub Áreas Temática
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
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            rowSelection={false}
            pageSizeOptions={[10, 20]}
            style={{ minHeight: "160px"}}
          />
        </div>
    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <EditSubarea handleClose={handleCloseEdit} setRefetch={handleRefetch} subarea={currentSubarea}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <CrearSubarea handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
