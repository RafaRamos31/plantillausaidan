import { Layout } from "./Layout.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGetBody } from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm.js";
import { InfoLink } from "../components/InfoLink.jsx";
import { InversionesNavBar } from "../components/navBars/InversionesNavBar.jsx";
import { CrearInversion } from "./modals/CrearInversion.jsx";
import { getElementSectores, getIndexSectores } from "../services/staticCollections.js";
import { EditInversion } from "./modals/EditInversion.jsx";

export const InversionesList = () => {

  const {values} = useForm({
    idArea: '',
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: ''
  })

  //Peticio de datos a la API
  const { data, isLoading, setRefetch } = useFetchGetBody('getinversiones', values);

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
  const [currentInversion, setCurrentInversion] = useState({});

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'ultimaEdicion', headerName: 'Última Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 200 },
    { field: 'name', headerName: 'Inversión', width: 250,
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
    { field: 'sector', headerName: 'Sector', width: 200 },
    { field: 'area', headerName: 'Área Temática', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(inversion => inversion.areaTematica?.nombre === params.row.area).areaTematica._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'departamento', headerName: 'Departamento', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamento'} 
            id={data.find(inversion => inversion.departamento?.nombre === params.row.departamento).departamento._id || ''}
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
            id={data.find(inversion => inversion.municipio?.nombre === params.row.municipio).municipio._id || ''}
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
            id={data.find(inversion => inversion.aldea?.nombre === params.row.aldea).aldea._id || ''}
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
            id={data.find(inversion => inversion.caserio?.nombre === params.row.caserio).caserio._id || ''}
            nombre={params.formattedValue}
          />
        );
      }
    },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'monto', headerName: 'Monto', width: 150 },
    {
      field: " ",
      headerName: " ",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={buttonStyle} onClick={() => {
            setCurrentInversion({
              id: params.row.uuid,
              nombre: params.row.name,
              sector: getIndexSectores(params.row.sector),
              area: params.row.area ? data.find(inversion => inversion.areaTematica?.nombre === params.row.area).areaTematica._id : '',
              departamento: params.row.departamento ? data.find(inversion => inversion.departamento?.nombre === params.row.departamento).departamento._id : '',
              municipio: params.row.municipio ? data.find(inversion => inversion.municipio?.nombre === params.row.municipio).municipio._id : '',
              aldea: params.row.aldea ? data.find(inversion => inversion.aldea?.nombre === params.row.aldea).aldea._id : '',
              caserio: params.row.caserio ? data.find(inversion => inversion.caserio?.nombre === params.row.caserio).caserio._id : '',
              fecha: params.row.fecha,
              monto: params.row.monto
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
        data.map((inversion, index) => (
          { 
            id: index + 1, 
            uuid: inversion._id, 
            ultimaEdicion: new Date(inversion.ultimaEdicion).toLocaleString(),
            editor: 'Rafael Ramos',
            name: inversion.nombre,
            sector: getElementSectores(inversion.sector),
            area: inversion.areaTematica?.nombre || '',
            departamento: inversion.departamento?.nombre || '',
            municipio: inversion.municipio?.nombre || '',
            aldea: inversion.aldea?.nombre || '',
            caserio: inversion.caserio?.nombre || '',
            fecha: inversion.fecha,
            monto: 'L. ' + inversion.monto
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
    <Layout pagina={'Inversiones - Lista de Inversiones'} SiteNavBar={InversionesNavBar}>
      <h2 className="view-title"><i className="bi bi-cash-stack"></i> Inversiones</h2>
    {/*Boton Agregar*/}
    <Button style={buttonStyle} className='my-2' onClick={handleShowCreate}>
        <i className="bi bi-file-earmark-plus"></i>{' '}
        Agregar Inversión
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
              editor: false
            },
          },
        }}
        rowSelection={false}
        pageSizeOptions={[10, 20]}
        style={{ minHeight: "160px"}}
        
      />

    </Layout>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditInversion handleClose={handleCloseEdit} setRefetch={handleRefetch} inversion={currentInversion}/>
    </Modal>
    <Modal size="md" show={showCreate} onHide={handleCloseCreate} backdrop="static">
      <CrearInversion handleClose={handleCloseCreate} setRefetch={handleRefetch}/>
    </Modal>
    </>
  );
}
