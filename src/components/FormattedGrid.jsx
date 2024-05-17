import React, { useEffect, useState } from 'react'
import { TableToolbar } from './TableToolbar'
import { DataGrid } from '@mui/x-data-grid'
import { useFetchGetPaged } from '../hooks/useFetch';
import { darken, lighten, styled } from '@mui/material';

export const FormattedGrid = ({
  model,
  columns, 
  hiddenColumns,
  populateRows, 
  pageSize=10, 
  pageSizeOptions=[],
  reviews=false,
  deleteds=false,
  componenteId='',
  eventCrear=false, 
  eventCrearMEL=false, 
  eventTerminar=false, 
  eventDigitar=false, 
  eventPresupuestar=false, 
  eventConsolidar=false,
  refetchData,
  setRefetchData,
}) => {

  //Estilos para filas
  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  //Formulario de modificacion de tabla
  const [tableState, setTableState] = useState({
    page: 0,
    pageSize: pageSize,
    filter: '{}',
    sort: '{}',
    reviews: reviews,
    deleteds: deleteds,
    componenteId: componenteId,
    eventCrear: eventCrear, 
    eventCrearMEL: eventCrearMEL, 
    eventTerminar: eventTerminar, 
    eventDigitar: eventDigitar, 
    eventPresupuestar: eventPresupuestar, 
    eventConsolidar: eventConsolidar
  })


  //Cambio en deleteds
  useEffect(() => {
    setTableState((state) => ({
      ...state, 
      deleteds: deleteds,
    }))
  }, [deleteds, setTableState])

  //Modelo de paginacion
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize
  })

  useEffect(() => {
    setTableState((state) => ({
      ...state, 
      page: paginationModel.page,
      pageSize: paginationModel.pageSize < pageSizeOptions[0] ? pageSizeOptions[0] : paginationModel.pageSize
    }))
  }, [paginationModel, pageSizeOptions, setTableState])


  //Definir filtro para tabla
  const [filterModel, setFilterModel] = useState({
    items: [],
    logicOperator: 'and',
    quickFilterLogicOperator : 'and',
    quickFilterValues: []
  })

  useEffect(() => {
    setPaginationModel((model) => ({...model, page: 0}))
      setTableState((state) => ({...state, filter: JSON.stringify({
        field: filterModel.items[0]?.field,
        operator: filterModel.items[0]?.operator,
        value: filterModel.items[0]?.value
      })}))
  }, [filterModel])


  //Definir ordenamiento para tabla
  const [sortingModel, setSortingModel] = useState([])

  useEffect(() => {
    setPaginationModel((model) => ({...model, page: 0}))
    setTableState((state) => ({...state, sort: JSON.stringify({
      field: sortingModel[0]?.field,
      sort: sortingModel[0]?.sort
    })}))
  }, [sortingModel])
  

  //Filas y columnas para tabla
  
  //Peticion de datos a la API
  //Rows Data
  const [rows, setRows] = useState([])
  const [rowCount, setRowCount] = useState(0)

  let append = ''
  if(eventDigitar){
    append = '/digitar'
  }

  if(eventConsolidar){
    append = '/consolidar'
  }

  const { data, isLoading, setRefetch } = useFetchGetPaged(`${model}/paged`+append, tableState);

  useEffect(() => {
    setRefetch(true);
  }, [paginationModel, deleteds, setRefetch])
  

  //Enviar datos a las filas
  useEffect(() => {
    if(!isLoading){
      if(data){
        setRows(
          populateRows(data?.rows, paginationModel.page, paginationModel.pageSize)
        );
        setRowCount(data?.count)
      }
      setRefetchData(false);
    }
  // eslint-disable-next-line
  }, [data, isLoading, populateRows, setRefetchData])


  //Solicitud de refetch externo
  useEffect(() => {
    if(refetchData){
      setRefetch(true);
    }
  }, [refetchData, setRefetch])
  
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

  return (
    <div style={{ width: '100%', margin: 0, padding: 0}}>
      <StyledDataGrid
        slots={{
          toolbar: TableToolbar,
        }}

        disableColumnMenu
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        density='compact'
        autoHeight
        
        localeText={{
          toolbarFilters: 'Filtrar',
          toolbarColumns: 'Columnas',
          toolbarDensity: 'Vista',
          toolbarExport: 'Imprimir'
        }}

        rows={rows}
        columns={columns}

        initialState={{
          columns: {
            columnVisibilityModel: hiddenColumns
          },
        }}

        onFilterModelChange={setFilterModel}
        filterModel={filterModel}
        filterMode='server'
        filterDebounceMs={1000}

        onSortModelChange={setSortingModel}
        sortingMode='server'
        sortModel={sortingModel}

        rowCount={rowCount}

        loading={isLoading}
      
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        paginationMode='server'
        onPaginationModelChange={setPaginationModel}

        style={{ minHeight: "160px", maxHeight: '100%'}}

        getRowClassName={(params) => `super-app-theme--${params.row.estado}`}
      />
    </div>
  )
}
