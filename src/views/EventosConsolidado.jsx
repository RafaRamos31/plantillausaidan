import { useContext, useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { AvatarChip } from "../components/AvatarChip.jsx";
import { FormattedGrid } from "../components/FormattedGrid.jsx";
import { Layout } from "./Layout.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { EventosNavBar } from "../components/navBars/EventosNavBar.jsx";
import { InfoLink } from "../components/InfoLink.jsx";

export const EventosConsolidado = () => {
  const endpoint = 'evento'
  const { user } = useContext(UserContext)

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
    { field: 'uuid', headerName: 'uuid', width: 80, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'nombre', headerName: 'Nombre', width: 400 },
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
    { field: 'fechaInicio', headerName: 'Fecha del evento', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value) },
    { field: 'organizadorId', headerName: 'Organizador', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
          />
        );
      } 
    },
    { field: 'estadoConsolidado', headerName: 'Estado Consolidado', width: 150,  
      type: 'singleSelect',
      valueOptions: ['Pendiente', 'Finalizado', 'Rechazado'],
      renderCell: (params) => {
        return (
          <StatusBadge status={params.formattedValue} />
        );
      }
    },
    { field: 'fechaConsolidado', headerName: 'Fecha de Consolidado', width: 170, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)},
    { field: 'responsableConsolidadoId', headerName: 'Resp. Consolidado', width: 170,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[1]}
            name={params.formattedValue.split('-')[0]} 
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
          <>
          {
            (user && user.userPermisos?.acciones['Eventos']['Consolidar'] && params.row.estadoConsolidado !== 'Finalizado' ) &&
            <a href={`/eventos/consolidado/${params.row.uuid}`} target="_blank" rel="noreferrer">
            <Button style={buttonStyle}>
              <i className="bi bi-pencil-fill"></i>{' '}
              Consolidar
            </Button>
            </a>
          }
          {
            (params.row.estadoConsolidado === 'Finalizado' ) &&
            <a href={`/reviews/eventos/consolidar/${params.row.uuid}`} target="_blank" rel="noreferrer">
              <Button style={buttonStyle}>
                <i className="bi bi-eye-fill"></i>{' '}
                Revisar
              </Button>
            </a>
          }
          </>
          
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
        version: departamento.version,
        fechaInicio: departamento.fechaInicio ? departamento.fechaInicio : '',
        organizadorId: `${departamento.organizador?.nombre || ''}-${departamento.organizador?.id || ''}`,
        quarterId: `${departamento.quarter?.nombre || ''}*${departamento.quarter?.id || ''}`,
        estadoConsolidado: departamento.estadoConsolidado,
        fechaConsolidado: departamento.fechaConsolidado ? departamento.fechaConsolidado : '',
        responsableConsolidadoId: `${departamento.responsableConsolidado?.nombre || ''}-${departamento.responsableConsolidado?.id || ''}`,
      }
    ))
  )
  
  const hiddenColumns = {
    uuid: false,
    fechaConsolidado: false,
    responsableConsolidadoId: false,
  }

  return(
    <>
    <Layout pagina={`Consolidar ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`} SiteNavBar={EventosNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/eventos', nombre: 'Eventos'},
        {link: '/eventos/consolidar', nombre: 'Consolidar Eventos'},
    ]}>
      <div className="d-flex align-items-center">
        <h4><i className="bi bi-graph-up-arrow"></i>{` Consolidado de ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}s`}</h4>
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
          eventComponente={''}
          eventConsolidar
        />
    </Layout>
    </>
  );
}
