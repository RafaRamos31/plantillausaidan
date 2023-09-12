import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGetBody } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm.js";
import { InfoLink } from "../components/InfoLink.jsx";
import { CrearBeneficiario } from "./modals/CrearBeneficiario.jsx";
import { EditBeneficiario } from "./modals/EditBeneficiario.jsx";

export const ClientBeneficiarios = () => {

  const {values} = useForm({
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: '',
    idOrganizacion: '',
    idCargo: ''
  })

  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGetBody('getbeneficiarios', values);

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
  const [currentBeneficiario, setCurrentBeneficiario] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'ultimaEdicion', headerName: 'Última Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 200 },
    { field: 'name', headerName: 'Nombre del Beneficiario', width: 250,
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
    { field: 'dni', headerName: 'DNI', width: 200 },
    { field: 'sexo', headerName: 'Sexo', width: 100 },
    { field: 'fechaNacimiento', headerName: 'Fecha de nacimiento', width: 200 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'departamento', headerName: 'Departamento', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(beneficiario => beneficiario.departamento?.nombre === params.row.departamento).departamento._id || ''}
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
            id={data.find(beneficiario => beneficiario.municipio?.nombre === params.row.municipio).municipio._id || ''}
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
            id={data.find(beneficiario => beneficiario.aldea?.nombre === params.row.aldea).aldea._id || ''}
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
            id={data.find(beneficiario => beneficiario.caserio?.nombre === params.row.caserio).caserio._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'geolocacion', headerName: 'Geo Coordenadas', width: 320 },
    { field: 'organizacion', headerName: 'Organización', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'organizacion'} 
            id={data.find(beneficiario => beneficiario.organizacion?.nombre === params.row.organizacion).organizacion._id || ''}
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
            id={data.find(beneficiario => beneficiario.cargo?.nombre === params.row.cargo).cargo._id || ''}
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
            setCurrentBeneficiario({
              id: params.row.uuid,
              nombre: params.row.name,
              dni: params.row.dni,
              sexo: params.row.sexo === 'M' ? 1 : 2,
              fechaNacimiento: params.row.fechaNacimiento,
              telefono: params.row.telefono,
              departamento: params.row.departamento ? data.find(beneficiario => beneficiario.departamento?.nombre === params.row.departamento).departamento._id : '',
              municipio: params.row.municipio ? data.find(beneficiario => beneficiario.municipio?.nombre === params.row.municipio).municipio._id : '',
              aldea: params.row.aldea ? data.find(beneficiario => beneficiario.aldea?.nombre === params.row.aldea).aldea._id : '',
              caserio: params.row.caserio ? data.find(beneficiario => beneficiario.caserio?.nombre === params.row.caserio).caserio._id : '',
              organizacion: params.row.organizacion ? data.find(beneficiario => beneficiario.organizacion?.nombre === params.row.organizacion).organizacion._id : '',
              cargo: params.row.cargo ? data.find(beneficiario => beneficiario.cargo?.nombre === params.row.cargo).cargo._id : '',
              geolocacion: params.row.geolocacion
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
        data.map((beneficiario, index) => (
          { 
            id: index + 1, 
            uuid: beneficiario._id, 
            ultimaEdicion: new Date(beneficiario.ultimaEdicion).toLocaleString(),
            editor: 'Rafael Ramos',
            name: beneficiario.nombre,
            dni: beneficiario.dni,
            sexo: beneficiario.sexo === 1 ? 'M' : 'F',
            fechaNacimiento: beneficiario.fechaNacimiento,
            telefono: beneficiario.telefono,
            departamento: beneficiario.departamento?.nombre || '',
            municipio: beneficiario.municipio?.nombre || '',
            aldea: beneficiario.aldea?.nombre || '',
            caserio: beneficiario.caserio?.nombre || '',
            organizacion: beneficiario.organizacion?.nombre || '',
            cargo: beneficiario.cargo?.nombre || '',
            geolocacion: beneficiario.geolocacion
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
    <Layout pagina={'Clientes - Beneficiarios'} SiteNavBar={ClientesNavBar}>
      <h2 className="view-title"><i className="bi bi-people-fill"></i> Beneficiarios</h2>
    {/*Boton Agregar*/}
    <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        Agregar Beneficiario
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
      <EditBeneficiario handleClose={handleCloseEdit} setRefetch={handleRefetch} beneficiario={currentBeneficiario}/>
    </Modal>
    <Modal size="md" show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearBeneficiario handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
