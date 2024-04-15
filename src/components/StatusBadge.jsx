import { Chip } from '@mui/material'
import React from 'react'

export const StatusBadge = ({status}) => {
  if(['Validado', 'Publicado', 'Aprobado', 'Finalizado'].some(e => e === status)) {
    return (
      <Chip label={status} color="success" />
    )
  }
  
  if(['En revisión', 'Pendiente', 'En Ejecución'].some(e => e === status)) {
    return (
      <Chip label={status} color="primary" />
    )
  }
  
  if(['Rechazado', 'Eliminado'].some(e => e === status)) {
    return (
      <Chip label={status} color="warning" />
    )
  }

  if(['En Curso'].some(e => e === status)) {
    return (
      <Chip label={status} color="secondary" />
    )
  }

  if(['Incompleto'].some(e => e === status)) {
    return (
      <Chip label={status} color="default" />
    )
  }

  return null
}
