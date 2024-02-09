import { useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { Layout } from "../Layout.jsx";
import { ConfigNavBar } from "../../components/navBars/ConfigNavBar.jsx";
import { StatusBadge } from "../../components/StatusBadge.jsx";
import { AvatarChip } from "../../components/AvatarChip.jsx";
import { FormattedGrid } from "../../components/FormattedGrid.jsx";
import { InfoLink } from "../../components/InfoLink.jsx";

export const ReviewsMunicipios = () => {
  const endpoint = 'municipio'

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: '0.9rem',
    padding: '0.2rem 0.5rem'
  };

  ///Indicador solicitud de recarga de datos en la vista
  const [refetchData, setRefetchData] = useState(false);

  //Indicador actualizando con boton
  const [updating, setUpdating] = useState(false);

  //Accion Update manual
  const handleUpdate = () => {
    setUpdating(true)
    setRefetchData(true)
  }

  //Efecto cuando termina el refetch
  useEffect(() => {
    if(!refetchData){
      setUpdating(false)
    }
  }, [refetchData, setUpdating])

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'original', headerName: 'Original', width: 250,
      renderCell: (params) => {
        return (
          <InfoLink
            type={'municipios'}
            id={params.formattedValue}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'nombre', headerName: 'Nombre', width: 250 },
    { field: 'version', headerName: 'Versión', width: 100 },
    { field: 'fechaEdicion', headerName: 'Fecha de Edición', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'editor', headerName: 'Editado por', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'fechaRevision', headerName: 'Fecha de Revisión', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)},
    { field: 'revisor', headerName: 'Revisado por', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'estado', headerName: 'Estado', width: 150,  
      type: 'singleSelect',
      valueOptions: ['En revisión', 'Validado', 'Rechazado'],
      renderCell: (params) => {
        return (
          <StatusBadge status={params.formattedValue} />
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
          <a href={`/reviews/${endpoint}s/${params.row.uuid}`} target="_blank" rel="noreferrer">
            <Button style={buttonStyle}>
              <i className="bi bi-eye-fill"></i>{' '}
              Revisar
            </Button>
          </a>
        );
      },
    }
  ];

  const populateRows = (data, page, pageSize) => (
    data.map((municipio, index) => (
      { 
        id: (page * pageSize) + index + 1, 
        uuid: municipio._id, 
        original: municipio.original, 
        nombre: municipio.nombre,
        version: municipio.version,
        fechaEdicion: municipio.fechaEdicion,
        editor: `${municipio.editor.nombre}-${municipio.editor._id}`,
        fechaRevision: municipio.fechaRevision ? municipio.fechaRevision : '',
        revisor: `${municipio.revisor?.nombre || ''}-${municipio.revisor?._id || ''}`,
        estado: municipio.estado
      }
    ))
  )
  
  const hiddenColumns = {
    uuid: false,
    original: false,
    fechaRevision: false,
    revisor: false
  }

  return(
    <>
    <Layout pagina={`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={ConfigNavBar}>
      <div className="d-flex align-items-center">
        <h4><i className="bi bi-geo-alt-fill"></i>{`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h4>
        {/*Boton Actualizar*/}
        {
          !updating ? 
          <Button className='my-2 mx-3' variant="light" onClick={handleUpdate}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          : <Button className='my-2 mx-3' variant="light">
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
      </div>

      {/*Table Container*/}
      <FormattedGrid 
        model={`${endpoint}s`} 
        pageSize={10}
        pageSizeOptions={[10, 15, 20, 30]}
        columns={columns} 
        hiddenColumns={hiddenColumns}
        populateRows={populateRows} 
        refetchData={refetchData}
        setRefetchData={setRefetchData} 
        reviews
      />

    </Layout>
    </>
  );
}
