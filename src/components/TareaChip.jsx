import { Chip, Tooltip } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';

export const TareaChip = ({tarea}) => {

  return (
    <Tooltip title={tarea.titulo} placement="top" arrow followCursor>
      <Chip icon={<ExtensionIcon />} className='m-2' label={tarea.nombre} variant="outlined" style={{cursor: 'help'}}/>
    </Tooltip>
  )
}
