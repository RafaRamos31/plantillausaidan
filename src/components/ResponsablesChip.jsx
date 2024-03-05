import { Avatar, AvatarGroup, Tooltip } from '@mui/material';

export const ResponsablesChip = ({nombre}) => {

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

  const responsables = [
    {
      id: 1,
      nombre: 'Rafael Ramos'
    },
    {
      id: 1,
      nombre: 'Manuel Palma'
    },
    {
      id: 1,
      nombre: 'Juan Perez'
    },
    {
      id: 1,
      nombre: 'Juan Perez'
    },
    {
      id: 1,
      nombre: 'Juan Perez'
    },

  ]
  
  return (
    <AvatarGroup max={4} style={{cursor: 'pointer'}}>
      {
        responsables.map(responsable => (
          <Tooltip title={responsable.nombre} placement="top" arrow>
            <Avatar {...stringAvatar(responsable.nombre)} />
          </Tooltip>
        ))
      }
    </AvatarGroup>
  )
}
