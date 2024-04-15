import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { darken, lighten, styled} from '@mui/material';
import moment from 'moment';

export const ParticipantesGridReview = ({participantes}) => {

  //Estilos para filas
  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  //Dibujar tabla estilizada
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .super-app-theme--Eliminado': {
      backgroundColor: getBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
    },
  }));

  const columns = [
    { field: 'id', headerName: '#', width: 50, filterable: false},
    { field: 'uuid', headerName: 'uuid', width: 50, filterable: false},
    { field: 'nombre', headerName: 'Nombre', width: 300},
    { field: 'sexo', headerName: 'Sexo', width: 70},
    { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 150},
    { field: 'fechaNacimientoForm', headerName: 'Fecha de Nacimiento Form', width: 150},
    { field: 'dni', headerName: 'DNI', width: 150},
    { field: 'sector', headerName: 'ID Sector', width: 250},
    { field: 'tipoOrganizacion', headerName: 'ID Tipo de Organización', width: 250},
    { field: 'organizacion', headerName: 'ID Organización', width: 250},
    { field: 'organizacionNombre', headerName: 'Organización', width: 250},
    { field: 'cargo', headerName: 'ID Cargo', width: 200},
    { field: 'cargoNombre', headerName: 'Cargo', width: 200},
    { field: 'telefono', headerName: 'Teléfono', width: 120},
    { field: 'departamento', headerName: 'ID Departamento', width: 200},
    { field: 'departamentoNombre', headerName: 'Departamento', width: 200},
    { field: 'municipio', headerName: 'ID Municipio', width: 200},
    { field: 'municipioNombre', headerName: 'Municipio', width: 200},
    { field: 'aldea', headerName: 'ID Aldea', width: 200},
    { field: 'aldeaNombre', headerName: 'Aldea', width: 200},
    { field: 'caserio', headerName: 'ID Caserio', width: 200},
    { field: 'caserioNombre', headerName: 'Caserio', width: 200},
    { field: 'indicadores', headerName: 'Indicadores', width: 200},
  ];
  
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(participantes.map((participante, index) => ({
      id: index + 1,
      uuid: participante._id,
      nombre: participante.nombre,
      sexo: participante.sexo,
      fechaNacimiento: moment.utc(participante.fechaNacimiento ).format("DD/MM/YYYY"),
      fechaNacimientoForm: moment.utc(participante.fechaNacimiento ).format("YYYY-MM-DD"),
      dni: participante.dni,
      sector: participante.sector?._id,
      tipoOrganizacion: participante.tipoOrganizacion?._id,
      organizacion: participante.organizacion?._id,
      organizacionNombre: participante.organizacion?.nombre,
      cargo: participante.cargo?._id,
      cargoNombre: participante.cargo?.nombre,
      telefono: participante.telefono,
      departamento: participante.departamento?._id,
      departamentoNombre: participante.departamento?.nombre,
      municipio: participante.municipio?._id,
      municipioNombre: participante.municipio?.nombre,
      aldea: participante.aldea?._id,
      aldeaNombre: participante.aldea?.nombre,
      caserio: participante.caserio?._id,
      caserioNombre: participante.caserio?.nombre,
      indicadores: participante.indicadores,
    })))
  }, [participantes])
  

  const hiddenColumns = {
    uuid: false,
    fechaNacimientoForm: false,
    indicadores: false,
    sector: false,
    tipoOrganizacion: false,
    organizacion: false,
    cargo: false,
    departamento: false,
    municipio: false,
    aldea: false,
    caserio: false,
  }

  return (
    <div style={{ width: '100%', margin: 0, padding: 0}}>
      <StyledDataGrid
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        autoHeight

        rows={rows}
        columns={columns}

        initialState={{
          columns: {
            columnVisibilityModel: hiddenColumns
          },
        }}

        style={{ minHeight: "160px", maxHeight: '100%'}}

        getRowClassName={(params) => `super-app-theme--${params.row.estado}`}
      />
    </div>
  )
}
