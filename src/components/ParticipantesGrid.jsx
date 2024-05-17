import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter, getGridStringOperators } from '@mui/x-data-grid'
import { Button, Modal } from "react-bootstrap";
import { darken, lighten, styled} from '@mui/material';
import moment from 'moment';
import { EditBeneficiario } from '../views/modals/EditBeneficiario';
import { InfoLink } from './InfoLink';

export const ParticipantesGrid = ({participantes, removeParticipante, editParticipante}) => {

  //Estilos para filas
  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //Valor para Modal Modificar
  const [currentData, setCurrentData] = useState({});
  
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
    {
      field: " ",
      headerName: " ",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <>
            <Button  className='py-1' variant='success' onClick={() => {
              setCurrentData({
                id: params.row._id,
                nombre: params.row.nombre,
                dni: params.row.dni,
                sexo: params.row.sexo,
                fechaNacimiento: moment.utc(params.row.fechaNacimiento ).format("YYYY-MM-DD"),
                telefono: params.row.telefono,
                tipoBeneficiario: params.row.tipoBeneficiario,
                sectorId: params.row.sectorId.split('-')[1],
                tipoOrganizacionId: params.row.tipoOrganizacionId.split('-')[1],
                organizacionId: params.row.organizacionId.split('-')[1],
                cargoId: params.row.cargoId.split('-')[1],
                departamentoId: params.row.departamentoId.split('-')[1],
                municipioId: params.row.municipioId.split('-')[1],
                aldeaId: params.row.aldeaId.split('-')[1],
                caserioId: params.row.caserioId.split('-')[1],
              })
              handleShowEdit()
            }}>
              <i className="bi bi-pencil-fill"></i>{' '}
            </Button>
            <Button  className='py-1 mx-2' variant='danger' onClick={() => removeParticipante(params.row._id, params.row.sexo, params.row.tipoBeneficiario)}>
              <i className="bi bi-trash3-fill"></i>{' '}
            </Button>
          </>
        );
      },
    },
    { field: '_id', headerName: 'id', width: 50, filterable: false},
    { field: 'nombre', headerName: 'Nombre', width: 250,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      ),
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'beneficiarios'} 
            id={params.row._id}
            nombre={params.formattedValue}
          />
        );
      } 
    },
    { field: 'dni', headerName: 'DNI', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'sexo', headerName: 'Sexo', width: 100,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 170, filterable: false, 
      renderCell: (params) => {
        return (moment.utc(params.row.fechaNacimiento ).format("DD/MM/YYYY"))
      }},
    { field: 'telefono', headerName: 'Teléfono', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'tipoBeneficiario', headerName: 'Tipo de Beneficiario', width: 150,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains',
      )
    },
    { field: 'sectorId', headerName: 'Sector', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'sectores'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'tipoOrganizacionId', headerName: 'Tipo de Organización', width: 240, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'tipoOrganizaciones'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'organizacionId', headerName: 'Organización', width: 240, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'organizaciones'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'cargoId', headerName: 'Cargo', width: 240, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'cargos'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'departamentoId', headerName: 'Departamento', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'departamentos'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'municipioId', headerName: 'Municipio', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'municipios'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'aldeaId', headerName: 'Aldea', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'aldeas'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
    { field: 'caserioId', headerName: 'Caserio', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <InfoLink 
            type={'caserios'} 
            id={params.value.split('-')[1]}
            nombre={params.value.split('-')[0]}
          />
        );
      }
    },
  ];
  
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(participantes.map((participante, index) => ({
      id: index + 1,
      _id: participante.id,
      nombre: participante.nombre,
      dni: participante.dni,
      sexo: participante.sexo,
      fechaNacimiento: participante.fechaNacimiento,
      telefono: participante.telefono,
      tipoBeneficiario: participante.tipoBeneficiario,
      sectorId: `${participante.sector?.nombre || ''}-${participante.sector?.id || ''}`,
      tipoOrganizacionId: `${participante.tipoOrganizacion?.nombre || ''}-${participante.tipoOrganizacion?.id || ''}`,
      organizacionId: `${participante.organizacion?.nombre || ''}-${participante.organizacion?.id || ''}`,
      cargoId: `${participante.cargo?.nombre || ''}-${participante.cargo?.id || ''}`,
      departamentoId: `${participante.departamento?.nombre || ''}-${participante.departamento?.id || ''}`,
      municipioId: `${participante.municipio?.nombre || ''}-${participante.municipio?.id || ''}`,
      aldeaId: `${participante.aldea?.nombre || ''}-${participante.aldea?.id || ''}`,
      caserioId: `${participante.caserio?.nombre || ''}-${participante.caserio?.id || ''}`,
      indicadores: participante.indicadores,
    })))
  }, [participantes])
  

  const hiddenColumns = {
    _id: false,
    indicadores: false,
    sectorId: false,
    tipoOrganizacionId: false,
  }

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15
  })

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div className="d-flex w-100 p-1 justify-content-between">
          <div>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
          </div>
          
          <GridToolbarQuickFilter placeholder='Buscar' />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ width: '100%', margin: 0, padding: 0}}>
      <StyledDataGrid
        slots={{ toolbar: CustomToolbar }}
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
        pageSizeOptions={[15, 30, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}

        style={{ minHeight: "160px", maxHeight: '100%'}}

        getRowClassName={(params) => `super-app-theme--${params.row.estado}`}
      />
      <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <EditBeneficiario handleClose={handleCloseEdit} setRefetch={() => {}} beneficiario={currentData} editParticipante={editParticipante}/>
      </Modal>
    </div>
  )
}
