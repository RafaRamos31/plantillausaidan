import { Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment/moment';

export const CalendarChip = ({date, status, setStatus}) => {
  const dateEvento = moment(date);
  const dateToday = moment().startOf('day');

  return (
    <Chip icon={<CalendarMonthIcon />} className='m-2' label={dateEvento.format('DD/MM/YYYY')} variant="outlined"
    style={{color: (dateEvento < dateToday && status === 'Retrasado') ? 'red' : 'black'}}/>
  )
}
