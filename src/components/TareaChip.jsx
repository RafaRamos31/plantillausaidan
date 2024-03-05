import { Chip, Tooltip } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';

export const TareaChip = ({nombre}) => {

  const desc = 'Realizar visitas de supervisión a las organizaciones, considerando la frecuencia y duración de acuerdo al Plan de Fortalecimiento de Capacidades Locales.'
  return (
    <Tooltip title={desc} placement="top" arrow followCursor>
      <Chip icon={<ExtensionIcon />} className='m-2' label={nombre} variant="outlined" style={{cursor: 'help'}}/>
    </Tooltip>
  )
}
