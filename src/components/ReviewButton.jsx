import { Button, Spinner } from "react-bootstrap";

export const ReviewButton = ({handleSubmit, charging, dataRevision}) => {

  //Estilo de boton
  const buttonStyle = {
    backgroundColor: "var(--main-green)", 
    border: 'none',
    borderRadius: '3px'
  };

  if(dataRevision && dataRevision.estado === 'En revisión'){
    return (
      <div className="d-grid w-100">
        {/**Boton para guardar revision */}
        {
          !charging ?
          <Button style={buttonStyle} onClick={handleSubmit}><i className="bi bi-check2-square"></i>{' '}Guardar revisión</Button>
          :
          <Button style={buttonStyle}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Cargando...</span>
          </Button>
        }
      </div>
    )
  }

  return null;
}
