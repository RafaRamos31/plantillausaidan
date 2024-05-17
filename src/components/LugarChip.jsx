import { Chip } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';

export const LugarChip = ({municipio}) => {
  return (
    <Chip icon={<PlaceIcon />} className='m-2' label={municipio.nombre} variant="outlined"/>
  )
}
