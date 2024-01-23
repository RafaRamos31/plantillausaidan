import { Avatar, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const AvatarChip = ({id=null, name=null, src=null}) => {
  if(!id || !name){
    return null
  }

  if(src){
    return (
      <Link to={`/info/usuario/${id}`} target='_blank'>
        <Chip
          avatar={<Avatar {...stringAvatar(name)} alt={name} src={src} />}
          label={name}
          variant="outlined"
        />
      </Link>
    )
  }

  return (
    <Link to={`/info/usuario/${id}`} target='_blank'>
      <Chip avatar={<Avatar {...stringAvatar(name)} />} label={name} variant="outlined"/>
    </Link>
  )
}
