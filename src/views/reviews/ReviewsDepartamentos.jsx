import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchGet } from "../../hooks/useFetch";
import { Layout } from "../Layout.jsx";
import { ConfigNavBar } from "../../components/navBars/ConfigNavBar.jsx";
import { StatusBadge } from "../../components/StatusBadge.jsx";
import { AvatarChip } from "../../components/AvatarChip.jsx";

export const ReviewsDepartamentos = () => {
  //Peticio de datos a la API
  const { data, isLoading } = useFetchGet('departamentos/revisiones');

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'uuid', headerName: 'uuid', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'original', headerName: 'Original', width: 250, description: 'Identificador unico del registro en la Base de Datos.' },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'version', headerName: 'Versión', width: 100 },
    { field: 'fechaEdicion', headerName: 'Fecha de Edición', width: 200 },
    { field: 'editor', headerName: 'Editado por', width: 200,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[0]}
            name={params.formattedValue.split('-')[1]} 
          />
        );
      } 
    },
    { field: 'fechaRevision', headerName: 'Fecha de Revisión', width: 200 },
    { field: 'revisor', headerName: 'Revisado por', width: 200,
      renderCell: (params) => {
        return (
          <AvatarChip
            id={params.formattedValue.split('-')[0]}
            name={params.formattedValue.split('-')[1]} 
          />
        );
      } 
    },
    { field: 'estado', headerName: 'Estado', width: 150, 
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
          <a href={`/reviews/departamentos/${params.row.uuid}`} target="_blank" rel="noreferrer">
            <Button style={buttonStyle}>
              <i className="bi bi-eye"></i>{' '}
              Revisar
            </Button>
          </a>
        );
      },
    }
  ];
  
  //Enviar datos a las filas
  useEffect(() => {
    if(data){
      setRows(
        data.map((departamento, index) => (
          { 
            id: index + 1, 
            uuid: departamento._id, 
            original: departamento.original, 
            nombre: departamento.nombre,
            version: departamento.version,
            fechaEdicion: new Date(departamento.fechaEdicion).toLocaleString(),
            editor: `${departamento.editor._id}-${departamento.editor.nombre}`,
            fechaRevision: departamento.fechaRevision ? new Date(departamento.fechaRevision).toLocaleString() : '',
            revisor: `${departamento.revisor?._id || ''}-${departamento.revisor?.nombre || ''}`,
            estado: departamento.estado
          }
        ))
      );
    }
  }, [data, isLoading])
  
  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: '1px solid black',
    borderRadius: '3px'
  };

  return(
    <>
    <Layout pagina={'Configuracion - Departamentos'} SiteNavBar={ConfigNavBar}>
      <h2 className="view-title"><i className="bi bi-geo-alt-fill"></i> Departamentos</h2>
        <div style={{ height: '60%', width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            columns: {
              columnVisibilityModel: {
                uuid: false,
                original: false,
                fechaRevision: false,
                revisor: false
              },
            },
          }}
          rowSelection={false}
          pageSizeOptions={[10, 20]}
          style={{ minHeight: "160px"}}
        />
        </div>
    </Layout>
    </>
  );
}
