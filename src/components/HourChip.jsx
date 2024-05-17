import { Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment/moment';

export const HourChip = ({date, dateFinal, status}) => {
  const dateEvento = moment.utc(date);
  const dateFinalEvento = moment.utc(dateFinal);
  const dateToday = moment().startOf('day');

  return (
    <Chip icon={<AccessTimeIcon />} className='m-2' label={`${dateEvento.format('hh:mm A')} - ${dateFinalEvento.format('hh:mm A')}`} variant="outlined"
    style={{color: (dateEvento < dateToday && status === 'Retrasado') ? 'red' : 'black'}}/>
  )
}
