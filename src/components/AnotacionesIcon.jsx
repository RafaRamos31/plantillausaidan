import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Tooltip } from '@mui/material';

export const AnotacionesIcon = ({status, tooltip}) => {

  if(status === 'Valid'){
    return (
      <Tooltip title={tooltip} placement="top" arrow followCursor>
        <CheckCircleRoundedIcon style={{color: 'green', fontSize: '2rem'}}/>
      </Tooltip>
    )
  }

  if(status === 'Warning'){
    return (
      <Tooltip title={tooltip} placement="top" arrow followCursor>
        <ErrorRoundedIcon style={{color: 'orange', fontSize: '2rem', cursor: 'help'}}/>
      </Tooltip>
    )
  }

  return null;
}
