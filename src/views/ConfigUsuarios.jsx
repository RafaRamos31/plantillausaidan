import { ConfigNavBar } from "../components/navBars/ConfigNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGetBody } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm.js";
import { InfoLink } from "../components/InfoLink.jsx";
import { EditBeneficiario } from "./modals/EditBeneficiario.jsx";
import { TicketGenerator } from "./modals/TicketGenerator.jsx";
import { CrearUsuario } from "./modals/CrearUsuario.jsx";

export const ConfigUsuarios = () => {

  const {values} = useForm({
    idOrganizacion: '',
    idCargo: '',
    idComponente: '',
    idRol: ''
  })

  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGetBody('getusuarios', values);

  const handleRefetch = () => {
    setRefetch(true)
  }

  //Update manual
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true)
    setRefetch(true)
  }

  //Modal ticket
  const [showTicket, setShowTicket] = useState(false);
  const handleCloseTicket = () => setShowTicket(false);
  const handleShowTicket = () => setShowTicket(true);

  //Modal crear
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentUsuario, setCurrentUsuario] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'ultimaEdicion', headerName: 'Última Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 200 },
    { field: 'name', headerName: 'Nombre del Usuario', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'beneficiario'} 
            id={params.row.uuid}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'rol', headerName: 'Rol', width: 150,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'beneficiario'} 
            id={data.find(usuario => usuario.rol?.nombre === params.row.rol)?.rol?._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'componente', headerName: 'Componente', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'beneficiario'} 
            id={data.find(usuario => usuario.componente?.nombre === params.row.componente).componente._id || ''}
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
            id={data.find(usuario => usuario.organizacion?.nombre === params.row.organizacion).organizacion._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'cargo', headerName: 'Cargo', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'cargo'} 
            id={data.find(usuario => usuario.cargo?.nombre === params.row.cargo).cargo._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'telefono', headerName: 'Teléfono', width: 120 },
    { field: 'correo', headerName: 'Correo Electrónico', width: 250 },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentUsuario({
              id: params.row.uuid,
              nombre: params.row.name,
              rol: params.row.rol ? data.find(usuario => usuario.rol?.nombre === params.row.rol).rol._id : '',
              componente: params.row.componente ? data.find(usuario => usuario.componente?.nombre === params.row.componente).componente._id : '',
              organizacion: params.row.organizacion ? data.find(usuario => usuario.organizacion?.nombre === params.row.organizacion).organizacion._id : '',
              cargo: params.row.cargo ? data.find(usuario => usuario.cargo?.nombre === params.row.cargo).cargo._id : '',
              telefono: params.row.telefono,
              correo: params.row.correo
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
        data.map((usuario, index) => (
          { 
            id: index + 1, 
            uuid: usuario._id, 
            ultimaEdicion: new Date(usuario.ultimaEdicion).toLocaleString(),
            editor: 'Rafael Ramos',
            name: usuario.nombre,
            rol: usuario.rol?.nombre || '',
            componente: usuario.componente?.nombre || '',
            organizacion: usuario.organizacion?.nombre || '',
            cargo: usuario.cargo?.nombre || '',
            telefono: usuario.telefono,
            correo: usuario.correo
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
    <Layout pagina={'Configuración - Usuarios'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-people-fill"></i> Usuarios</h2>
      {/*Boton Agregar*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        Registrar Usuario
      </Button>
      {/*Boton Token*/}
      <Button style={buttonStyle} className='my-2 mx-2' onClick={handleShowTicket}>
        <i className="bi bi-ticket-detailed-fill"></i>{' '}
        Generar Ticket
      </Button>
      {/*Boton Cambios*/}
      <Button style={buttonStyle} className='my-2' onClick={handleShowTicket}>
        <i className="bi bi-pencil-square"></i>{' '}
        Gestión de Cambios
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
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              uuid: false,
              ultimaEdicion: false,
              editor: false,
              geolocacion: false
            },
          },
        }}
        rowSelection={false}
        pageSizeOptions={[10, 20]}
        style={{ minHeight: "160px"}}
        
      />

    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditBeneficiario handleClose={handleCloseEdit} setRefetch={handleRefetch} beneficiario={currentUsuario}/>
    </Modal>
    <Modal size="md" show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearUsuario handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    <Modal show={showTicket} onHide={handleCloseTicket} backdrop="static">
      <TicketGenerator handleClose={handleCloseTicket}/>
    </Modal>
    </>
  );
}
