
export const CompareValue = ({title, value, original, compare=true, hidden=false}) => {
  return (
    <div className="mb-2">
      <p style={{fontWeight: 'bold'}}>{title}</p>
      {
        compare ?
        <p style={{color: value !== original ? 'red' : 'limegreen'}}>{!hidden ? value : original}</p>
        :
        <p>{!hidden ? value : original}</p>
      }
      
    </div>
  )
}
