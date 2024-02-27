import { Tooltip } from "@mui/material";

export const CompareTooltip = ({title, value, valueTooltip, original, originalTooltip, compare=true, hidden=false}) => {
  return (
    <div className="mb-2">
      <p style={{fontWeight: 'bold'}}>{title}</p>
      {
        compare ?
        <Tooltip title={!hidden ? valueTooltip : originalTooltip} placement="top" arrow followCursor>
          <p style={{color: value !== original ? 'red' : 'limegreen', cursor: 'help'}}>{!hidden ? value : original}</p>
        </Tooltip>
        
        :
        <Tooltip title={!hidden ? valueTooltip : originalTooltip} placement="top" arrow followCursor>
          <p style={{cursor: 'help'}}>{!hidden ? value : original}</p>
        </Tooltip>
      }
      
    </div>
  )
}