import { useContext, useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { Layout } from "../Layout.jsx";
import { StatusBadge } from "../../components/StatusBadge.jsx";
import { AvatarChip } from "../../components/AvatarChip.jsx";
import { FormattedGrid } from "../../components/FormattedGrid.jsx";
import { InfoLink } from "../../components/InfoLink.jsx";
import { PlanNavBar } from "../../components/navBars/PlanNavBar.jsx";
import { UserContext } from "../../contexts/UserContext.js";

export const ReviewsTareas = () => {
  const endpoint = 'tarea'

  const { user } = useContext(UserContext);

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
            type={'departamentos'}
            id={params.formattedValue}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'nombre', headerName: 'Código', width: 100 },
    { field: 'titulo', headerName: 'Nombre de la Tarea', width: 400 },
    { field: 'componente', headerName: 'Componente', width: 250 },
    { field: 'quarterId', headerName: 'Trimestre', width: 100, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'quarters'} 
            id={params.value.split('*')[1]}
            nombre={params.value.split('*')[0]}
          />
        );
      }
    },
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
    data.map((departamento, index) => (
      { 
        id: (page * pageSize) + index + 1, 
        uuid: departamento.id, 
        original: departamento.original, 
        nombre: departamento.nombre,
        titulo: departamento.titulo,
        componente: departamento.componente?.descripcion,
        quarterId: `${departamento.quarter?.nombre || ''}*${departamento.quarter?.id || ''}`,
        version: departamento.version,
        fechaEdicion: departamento.fechaEdicion ? departamento.fechaEdicion : '',
        editor: `${departamento.editor?.nombre || ''}-${departamento.editor?.id || ''}`,
        fechaRevision: departamento.fechaRevision ? departamento.fechaRevision : '',
        revisor: `${departamento.revisor?.nombre || ''}-${departamento.revisor?.id || ''}`,
        estado: departamento.estado
      }
    ))
  )
  
  const hiddenColumns = {
    uuid: false,
    version: false,
    original: false,
    fechaEdicion: false,
    fechaRevision: false,
    revisor: false
  }

  return(
    <>
    <Layout pagina={`Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={PlanNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/planificacion', nombre: 'Planificación'},
        {link: '/planificacion/tareas', nombre: 'Tareas'},
        {link: '/reviews/tareas', nombre: 'Revisiones'}
    ]}>
      <div className="d-flex align-items-center">
        <h4><i className="bi bi-list-check"></i>{` Revisión ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h4>
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
        componenteId={user.userComponente.id}
      />

    </Layout>
    </>
  );
}
