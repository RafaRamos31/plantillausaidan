import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearAldea } from "./modals/CrearAldea.jsx";
import { EditAldea } from "./modals/EditAldea.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ConfigAldeas = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('aldeas');
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
  const [currentAldea, setCurrentAldea] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 80 },
    { field: 'uuid', headerName: 'uuid', width: 220, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'name', headerName: 'Nombre de la Aldea', width: 200, description: 'Nombre de la Aldea.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'aldea'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'municipio', headerName: 'Municipio', width: 200, description: 'Municipio al que pertenece la Aldea.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'municipio'} 
            id={data.find(aldea => aldea.municipio?.nombre === params.row.municipio).municipio._id || ''}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'departamento', headerName: 'Departamento', width: 200, description: 'Departamento al que pertenece la Aldea.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(aldea => aldea.municipio?.departamento?.nombre === params.row.departamento).municipio?.departamento?._id || ''}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'geocode', headerName: 'Geocode', width: 100, description: 'Codigo Unico de la Aldea.' },
    {
      field: " ",
      headerName: " ",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentAldea({
              id: params.row.uuid,
              nombre: params.row.name,
              idMunicipio: params.row.municipio ? data.find(aldea => aldea.municipio?.nombre === params.row.municipio).municipio._id : '',
              idDepartamento: params.row.departamento ? data.find(aldea => aldea.municipio?.departamento?.nombre === params.row.departamento).municipio.departamento._id : '',
              geocode: params.row.geocode
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
        data.map((aldea, index) => (
          { 
            id: index + 1, 
            uuid: aldea._id, 
            name: aldea.nombre,
            municipio: aldea.municipio?.nombre || '',
            departamento: aldea.municipio?.departamento?.nombre || '',
            geocode: aldea.geocode
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
    <Layout pagina={'Configuracion - Aldeas'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Aldeas</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Aldea
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
      <EditAldea handleClose={handleCloseEdit} setRefetch={handleRefetch} aldea={currentAldea}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <CrearAldea handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
