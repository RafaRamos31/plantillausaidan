import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGetBody } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm.js";
import { getElementNivelesOrganizacion } from "../services/staticCollections.js";
import { CrearOrganizacion } from "./modals/CrearOrganizacion.jsx";
import { EditOrganizacion } from "./modals/EditOrganizacion.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const ClientOrganizaciones = () => {

  const {values} = useForm({
    tipoOrganizacion: '',
    nivelOrganizacion: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: ''
  })

  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGetBody('getorganizaciones', values);

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
  const [currentOrganizacion, setCurrentOrganizacion] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'ultimaEdicion', headerName: 'Última Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 200 },
    { field: 'name', headerName: 'Nombre de la Organización', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'organizacion'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'codigoOrganizacion', headerName: 'Código de la Organización', width: 250 },
    { field: 'tipoOrganizacion', headerName: 'Tipo de Organización', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'orgtype'} 
            id={data.find(organizacion => organizacion.tipoOrganizacion?.nombre === params.row.tipoOrganizacion).tipoOrganizacion._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'nivelOrganizacion', headerName: 'Nivel de Organización', width: 250 },
    { field: 'departamento', headerName: 'Departamento', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(organizacion => organizacion.departamento?.nombre === params.row.departamento).departamento._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'municipio', headerName: 'Municipio', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'municipio'} 
            id={data.find(organizacion => organizacion.municipio?.nombre === params.row.municipio).municipio._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'aldea', headerName: 'Aldea', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'aldea'} 
            id={data.find(organizacion => organizacion.aldea?.nombre === params.row.aldea).aldea._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'caserio', headerName: 'Caserio', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'caserio'} 
            id={data.find(organizacion => organizacion.caserio?.nombre === params.row.caserio).caserio._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'telefonoOrganizacion', headerName: 'Teléfono de Organización', width: 250 },
    { field: 'nombreContacto', headerName: 'Nombre de Contacto', width: 250 },
    { field: 'telefonoContacto', headerName: 'Telefono de Contacto', width: 250 },
    { field: 'correoContacto', headerName: 'Correo de Contacto', width: 250 },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentOrganizacion({
              id: params.row.uuid,
              nombre: params.row.name,
              codigoOrganizacion: params.row.codigoOrganizacion,
              tipoOrganizacion: params.row.tipoOrganizacion ? data.find(organizacion => organizacion.tipoOrganizacion?.nombre === params.row.tipoOrganizacion).tipoOrganizacion._id : '',
              nivelOrganizacion: params.row.nivelOrganizacion,
              departamento: params.row.departamento ? data.find(organizacion => organizacion.departamento?.nombre === params.row.departamento).departamento._id : '',
              municipio: params.row.municipio ? data.find(organizacion => organizacion.municipio?.nombre === params.row.municipio).municipio._id : '',
              aldea: params.row.aldea ? data.find(organizacion => organizacion.aldea?.nombre === params.row.aldea).aldea._id : '',
              caserio: params.row.caserio ? data.find(organizacion => organizacion.caserio?.nombre === params.row.caserio).caserio._id : '',
              telefonoOrganizacion: params.row.telefonoOrganizacion,
              nombreContacto: params.row.nombreContacto,
              telefonoContacto: params.row.telefonoContacto,
              correoContacto: params.row.correoContacto,
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
        data.map((organizacion, index) => (
          { 
            id: index + 1, 
            uuid: organizacion._id, 
            ultimaEdicion: new Date(organizacion.ultimaEdicion).toLocaleString(),
            editor: 'Rafael Ramos',
            name: organizacion.nombre,
            codigoOrganizacion: organizacion.codigoOrganizacion,
            tipoOrganizacion: organizacion.tipoOrganizacion?.nombre || '',
            nivelOrganizacion: getElementNivelesOrganizacion(organizacion.nivelOrganizacion),
            departamento: organizacion.departamento?.nombre || '',
            municipio: organizacion.municipio?.nombre || '',
            aldea: organizacion.aldea?.nombre || '',
            caserio: organizacion.caserio?.nombre || '',
            telefonoOrganizacion: organizacion.telefonoOrganizacion,
            nombreContacto: organizacion.nombreContacto,
            telefonoContacto: organizacion.telefonoContacto,
            correoContacto: organizacion.correoContacto,
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
    <Layout pagina={'Clientes - Organizaciones'} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-bank2"></i> Organizaciones</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        Agregar Organización
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
      <EditOrganizacion handleClose={handleCloseEdit} setRefetch={handleRefetch} organizacion={currentOrganizacion}/>
    </Modal>
    <Modal size="md" show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearOrganizacion handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}