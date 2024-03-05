import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { AvatarChip } from './AvatarChip'
import { StatusChip } from './StatusChip'
import { CalendarChip } from './CalendarChip'
import { useDrag, useDrop } from 'react-dnd'
import { HourChip } from './HourChip'
import { TareaChip } from './TareaChip'
import { ResponsablesChip } from './ResponsablesChip'

export const EventoCard = ({id, index, moveCard, values}) => {

  const [ status, setStatus ] = useState(values.estado);

  const statusColors = {
    'Pendiente': 'yellow',
    'Retrasado': 'red',
    'Cancelado': 'lightgray',
    'En proceso': 'cyan',
    'Finalizado': 'lime',
  }

  const ItemType = 'CARD';

  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Card ref={(node) => ref(drop(node))} className='my-3' style={{borderWidth: '3px', borderColor: statusColors[status]}}>
      <Card.Title className='p-1 text-center' style={{backgroundColor: statusColors[status]}}></Card.Title>
      <Card.Body className='px-3 py-1'>
        <h5 className='text-center'>{values.nombre}</h5>
        <StatusChip status={status}/>
        <AvatarChip  id='1' name={'Kenia López'} />
        <CalendarChip date={values.date} status={status} setStatus={setStatus}/>
        <HourChip date={values.date} status={status} setStatus={setStatus}/>
        <TareaChip nombre={'1.3.4 a - 4'}/>
        <ResponsablesChip nombre={'1.1.1 c - 2'}/>
      </Card.Body>
    </Card>
  )
}
