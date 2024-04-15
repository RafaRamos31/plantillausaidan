import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export const IndicadorIcon = ({status}) => {

  if(status === 'Valid'){
    return (<CheckCircleRoundedIcon style={{color: 'green', fontSize: '2rem'}}/>)
  }

  if(status === 'Warning'){
    return (<ErrorRoundedIcon style={{color: 'orange', fontSize: '2rem'}}/>)
  }

  return null;
}
