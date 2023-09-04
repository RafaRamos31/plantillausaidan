import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearMunicipio } from "./modals/CrearMunicipio.jsx";
import { EditMunicipio } from "./modals/EditMunicipio.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ConfigMunicipios = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('municipios');
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
  const [currentMunicipio, setCurrentMunicipio] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'name', headerName: 'Nombre del Municipio', width: 250, description: 'Nombre del Municipio.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'municipio'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'departamento', headerName: 'Departamento', width: 250, description: 'Departamento al que pertenece el Municipio.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(municipio => municipio.departamento?.nombre === params.row.departamento).departamento._id || ''}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'geocode', headerName: 'Geocode', width: 120, description: 'Codigo Unico del Municipio.' },
    {
      field: " ",
      headerName: " ",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentMunicipio({
              id: params.row.uuid,
              nombre: params.row.name,
              idDepartamento: params.row.departamento ? data.find(municipio => municipio.departamento?.nombre === params.row.departamento).departamento._id : '',
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
        data.map((municipio, index) => (
          { 
            id: index + 1, 
            uuid: municipio._id, 
            name: municipio.nombre,
            departamento: municipio.departamento?.nombre || '',
            geocode: municipio.geocode
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
    <Layout pagina={'Configuracion - Municipios'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Municipios</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Municipio
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
      <EditMunicipio handleClose={handleCloseEdit} setRefetch={handleRefetch} municipio={currentMunicipio}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <CrearMunicipio handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
