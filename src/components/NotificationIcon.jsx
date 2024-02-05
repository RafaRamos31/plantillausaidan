import { Badge, Popper } from "@mui/material"
import { useState } from "react";
import { NotificationContainer } from "./NotificationContainer";

export const NotificationIcon = () => {

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
          <NotificationContainer />
        </Popper>
      </div>
    </>
  )
}
