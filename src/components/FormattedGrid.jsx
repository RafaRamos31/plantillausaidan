import React, { useEffect, useState } from 'react'
import { TableToolbar } from './TableToolbar'
import { DataGrid } from '@mui/x-data-grid'
import { useFetchGet, useFetchGetPaged } from '../hooks/useFetch';
import { darken, lighten, styled } from '@mui/material';

export const FormattedGrid = ({
  model,
  columns, 
  hiddenColumns,
  populateRows, 
  pageSize=10, 
  pageSizeOptions=[],
  revision=false,
  deleteds=false,
  refetchData,
  setRefetchData,
}) => {

  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  //Filas y columnas para tabla
  const [rows, setRows] = useState([])

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize
  })

  //Peticion de datos a la API
  //Total Rows
  const [rowCount, setRowCount] = useState(0)
  const { data: dataCount, isLoading: isLoadingCount, setRefetch: setRefetchCount } = useFetchGet(`count/${model}/${!revision ? !deleteds ? '1' : '2' : '3'}`);

  useEffect(() => {
    if(!isLoadingCount && dataCount){
      setRowCount(dataCount.count)
    }

  }, [dataCount, isLoadingCount])

  //Rows Data
  const { data, isLoading, setRefetch } = useFetchGetPaged(`paged/${revision ? 'revisiones/' : ''}${model}/${!revision ? !deleteds ? '/1' : '/2' : ''}`, paginationModel);

  useEffect(() => {
    setRefetch(true);
    setRefetchCount(true);
  }, [paginationModel, deleteds, setRefetch, setRefetchCount])
  

  //Enviar datos a las filas
  useEffect(() => {
    if(!isLoading){
      if(data){
        setRows(
          populateRows(data, paginationModel.page, paginationModel.pageSize)
        );
      }
      setRefetchData(false);
    }
  // eslint-disable-next-line
  }, [data, isLoading, populateRows, setRefetchData])


  //Solicitud de refetch externo
  useEffect(() => {
    if(refetchData){
      setRefetchCount(true);
      setRefetch(true);
    }
  }, [refetchData, setRefetch, setRefetchCount])

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

        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        density='compact'
        autoHeight
        
        localeText={{
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
