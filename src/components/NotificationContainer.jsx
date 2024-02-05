import { Container } from "react-bootstrap";
import { Notification } from "./Notification";

export const NotificationContainer = () => {

  const notificationStyle = {
    border: '1px solid black',
    backgroundColor: 'white',
    padding: '0',
    width: '20rem',
    borderRadius: '5px',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.3s ease-in-out'
  }

  return (
    <Container style={notificationStyle}>
      <Notification text={'Se han enviado nuevas revisiones.'}/>
      <Notification text={'Se han aprobado tus cambios en: Departamento: Olancho.'}/>
      <Notification text={'Se han rechazado tus cambios en: Departamento: Atlántida.'}/>
    </Container>
  )
}
