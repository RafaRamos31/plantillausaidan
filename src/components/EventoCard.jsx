import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { AvatarChip } from './AvatarChip'
import { StatusChip } from './StatusChip'
import { CalendarChip } from './CalendarChip'
import { HourChip } from './HourChip'
import { TareaChip } from './TareaChip'
import { ResponsablesChip } from './ResponsablesChip'

export const EventoCard = ({values}) => {

  const [ status, setStatus ] = useState(values.estadoRealizacion);

  const statusColors = {
    'Pendiente': 'yellow',
    'Retrasado': 'red',
    'Cancelado': 'lightgray',
    'En Ejecución': 'cyan',
    'Finalizado': 'lime',
  }

  return (
    <>
    <Card className='my-3' style={{borderWidth: '3px', borderColor: statusColors[status]}}>
      <Card.Title className='p-1 text-center' style={{backgroundColor: statusColors[status]}}></Card.Title>
      <Card.Body className='px-3 py-1'>
        <h5 className='text-center'>{values?.nombre}</h5>
        <StatusChip status={status}/>
        <AvatarChip  id={values.organizador?._id} name={values.organizador?.nombre} />
        <CalendarChip date={values.fechaInicio} status={status} setStatus={setStatus}/>
        <HourChip date={values.fechaInicio} dateFinal={values.fechaFinal} status={status} setStatus={setStatus}/>
        <TareaChip tarea={values.tarea}/>
        <ResponsablesChip colaboradores={values.colaboradores}/>
      </Card.Body>
    </Card>
    </>
  )
}
