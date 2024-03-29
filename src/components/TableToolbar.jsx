import { GridPrintExportMenuItem, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExportContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import React from 'react'

const PrintIcon = () => {
  return <i className="bi bi-printer-fill" style={{fontSize: '1rem'}}></i>
}

export const TableToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExportContainer startIcon={<PrintIcon/>}>
          <GridPrintExportMenuItem options={{hideToolbar: true}}></GridPrintExportMenuItem>
        </GridToolbarExportContainer>
      </GridToolbarContainer>
    );
}
