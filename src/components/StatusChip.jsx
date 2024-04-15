import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TonalityIcon from '@mui/icons-material/Tonality';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';

export const StatusChip = ({status}) => {

  const statusColors = {
    'Pendiente': 'gold',
    'Retrasado': 'red',
    'Cancelado': 'lightgray',
    'En Ejecución': 'cyan',
    'Finalizado': 'lime',
  }

  const iconsColors = {
    'Pendiente': 'orange',
    'Retrasado': 'brown',
    'Cancelado': 'gray',
    'En Ejecución': 'mediumblue',
    'Finalizado': 'green',
  }

  if(status === 'Finalizado'){
    return (
      <Chip icon={<CheckCircleIcon style={{color: iconsColors[status]}}/>} className='m-2' label={status} variant="outlined" style={{ borderWidth: '2px', borderColor: statusColors[status]}}/>
    )
  }

  if(status === 'Pendiente'){
    return (
      <Chip icon={<HistoryToggleOffOutlinedIcon style={{color: iconsColors[status]}}/>} className='m-2' label={status} variant="outlined" style={{ borderWidth: '2px', borderColor: statusColors[status]}}/>
    )
  }

  if(status === 'Retrasado'){
    return (
      <Chip icon={<ErrorOutlineIcon style={{color: iconsColors[status]}}/>} className='m-2' label={status} variant="outlined" style={{ borderWidth: '2px', borderColor: statusColors[status]}}/>
    )
  }

  if(status === 'Cancelado'){
    return (
      <Chip icon={<CancelOutlinedIcon style={{color: iconsColors[status]}}/>} className='m-2' label={status} variant="outlined" style={{ borderWidth: '2px', borderColor: statusColors[status]}}/>
    )
  }

  if(status === 'En Ejecución'){
    return (
      <Chip icon={<TonalityIcon style={{color: iconsColors[status]}}/>} className='m-2' label={status} variant="outlined" style={{ borderWidth: '2px', borderColor: statusColors[status]}}/>
    )
  }

  return null;
}
