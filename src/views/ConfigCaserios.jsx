import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { CrearCaserio } from "./modals/CrearCaserio.jsx";
import { EditCaserio } from "./modals/EditCaserio.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ConfigCaserios = () => {
  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGet('caserios');
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
  const [currentCaserio, setCurrentCaserio] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'uuid', headerName: 'uuid', width: 220, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'name', headerName: 'Nombre del Caserio', width: 200, description: 'Nombre del Caserio.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'caserio'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'aldea', headerName: 'Aldea', width: 200, description: 'Aldea a la que pertenece el Caserio.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'aldea'} 
            id={data.find(caserio => caserio.aldea?.nombre === params.row.aldea).aldea._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'municipio', headerName: 'Municipio', width: 200, description: 'Municipio al que pertenece el Caserio.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'municipio'} 
            id={data.find(caserio => caserio.aldea?.municipio?.nombre === params.row.municipio).aldea.municipio._id || ''}
            nombre={params.formattedValue}
          />
        );
      }  
    },
    { field: 'departamento', headerName: 'Departamento', width: 150, description: 'Departamento al que pertenece el Caserio.',
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(caserio => caserio.aldea?.municipio?.departamento?.nombre === params.row.departamento).aldea.municipio.departamento._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'geocode', headerName: 'Geocode', width: 100, description: 'Codigo Unico del Caserio.' },
    {
      field: " ",
      headerName: " ",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentCaserio({
              id: params.row.uuid,
              nombre: params.row.name,
              idAldea: params.row.aldea ? data.find(caserio => caserio.aldea?.nombre === params.row.aldea).aldea._id : '',
              idMunicipio: params.row.municipio ? data.find(caserio => caserio.aldea?.municipio?.nombre === params.row.municipio).aldea?.municipio._id : '',
              idDepartamento: params.row.departamento ? data.find(caserio => caserio.aldea?.municipio?.departamento?.nombre === params.row.departamento).aldea.municipio.departamento._id : '',
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
        data.map((caserio, index) => (
          { 
            id: index + 1, 
            uuid: caserio._id, 
            name: caserio.nombre,
            aldea: caserio.aldea?.nombre || '',
            municipio: caserio.aldea?.municipio?.nombre || '',
            departamento: caserio.aldea?.municipio?.departamento?.nombre || '',
            geocode: caserio.geocode
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
    <Layout pagina={'Configuracion - Caserios'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Caserios</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
          <i className="bi bi-file-earmark-plus"></i>{' '}
          Agregar Caserio
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
      <EditCaserio handleClose={handleCloseEdit} setRefetch={handleRefetch} caserio={currentCaserio}/>
    </Modal>
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <CrearCaserio handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
