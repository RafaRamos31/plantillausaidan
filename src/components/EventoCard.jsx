import React, { useState } from 'react'
import { AvatarChip } from './AvatarChip'
import { StatusChip } from './StatusChip'
import { CalendarChip } from './CalendarChip'
import { TareaChip } from './TareaChip'
import { ResponsablesChip } from './ResponsablesChip'
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Modal } from 'react-bootstrap'
import { EditEvento } from '../views/modals/EditEvento'
import { HourChip } from './HourChip'
import { LugarChip } from './LugarChip'

export const EventoCard = ({values, setRefetch}) => {

  const [ status, setStatus ] = useState(values.estadoRealizacion);

  const statusColors = {
    'Pendiente': '#FFFF80',
    'Retrasado': 'red',
    'Cancelado': 'lightgray',
    'En Ejecución': '#89CFF0',
    'Finalizado': '#80FF00',
  }

  //Modal modificar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const warningRedirect = () => {
    window.open('/reviews/eventos/finalizar/'+values.id)
  }

  return (
    <>
    <Accordion style={{borderRadius: '10px'}}>
      <AccordionSummary
        style={{borderRadius: '10px', backgroundColor: statusColors[status]}}
      >
        {
          values.estadoRevisionFinalizacion === 'Rechazado' &&
          <Button variant='contained' style={{marginRight: '1rem'}} color='warning' onClick={warningRedirect}><WarningAmberIcon /></Button>
        }
        {
          values.estadoRevisionFinalizacion === 'Pendiente' &&
          <Button variant='contained' style={{marginRight: '1rem'}} color='primary' onClick={warningRedirect}><AccessTimeIcon /></Button>
        }
        {
          values.estadoRevisionFinalizacion === 'Validado' &&
          <Button variant='contained' style={{marginRight: '1rem'}} color='success' onClick={warningRedirect}><TaskAltIcon /></Button>
        }
        <Typography className='my-auto' style={{fontWeight: 'bold'}}>{values?.nombre}</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <StatusChip status={status}/>
        <AvatarChip  id={values.organizador?.id} name={values.organizador?.nombre} />
        <CalendarChip date={values.fechaInicio} status={status} setStatus={setStatus}/>
        <HourChip date={values.fechaInicio} dateFinal={values.fechaFinal} status={status}/>
        <LugarChip municipio={values.municipio}/>
        <TareaChip tarea={values.tarea}/>
        <ResponsablesChip colaboradores={values.colaboradores}/>
        <Button variant="outlined" onClick={() => console.log(values)}>Ver Detalles</Button>
        {
          status !== 'Finalizado' &&
          <Button variant="outlined" className='mx-2' onClick={handleShowEdit}>Editar</Button>
        }
        
      </AccordionDetails>
    </Accordion>
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
      <EditEvento handleClose={handleCloseEdit} setRefetch={() => setRefetch()} evento={values}/>
    </Modal>
    </>
  )
}
