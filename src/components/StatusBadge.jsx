import { Chip } from '@mui/material'
import React from 'react'

export const StatusBadge = ({status}) => {
  if(status === 'Validado') {
    return (
      <Chip label={status} color="success" />
    )
  }
  
  if(status === 'En revisión') {
    return (
      <Chip label={status} color="primary" />
    )
  }

  if(status === 'Rechazado') {
    return (
      <Chip label={status} color="warning" />
    )
  }

  if(status === 'Publicado') {
    return (
      <Chip label={status} color="success" />
    )
  }

  if(status === 'Eliminado') {
    return (
      <Chip label={status} color="warning" />
    )
  }

  return null
}
