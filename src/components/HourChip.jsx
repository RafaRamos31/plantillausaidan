import { Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment/moment';

export const HourChip = ({date, status, setStatus}) => {
  const dateEvento = moment(date);
  const dateToday = moment().startOf('day');

  if(status === 'Pendiente' && dateEvento < dateToday){
    setStatus('Retrasado')
  }
  return (
    <Chip icon={<AccessTimeIcon />} className='m-2' label={`${dateEvento.format('HH:mm A')} - ${dateEvento.format('HH:mm A')}`} variant="outlined"
    style={{color: (dateEvento < dateToday && status === 'Retrasado') ? 'red' : 'black'}}/>
  )
}
