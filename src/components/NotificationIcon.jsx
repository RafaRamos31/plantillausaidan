import { Badge, Popper } from "@mui/material"
import { useState } from "react";

export const NotificationIcon = () => {

  const notificationStyle = {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.3s ease-in-out'
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <>
      <div className="mx-2" style={{cursor: 'pointer', marginTop: '0.3rem'}} onClick={handleClick}>
        <Badge 
          color="warning" 
          badgeContent={10} max={9} 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }
        }>
          <i className={`bi bi-bell-fill`} style={{fontSize: '1.5rem', color: 'var(--main-green)'}}></i>
        </Badge>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
          <div style={notificationStyle}>No tienes nuevas notificaciones</div>
        </Popper>
      </div>
    </>
  )
}
