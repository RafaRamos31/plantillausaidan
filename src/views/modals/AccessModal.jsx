import { Card, Tabs, Tab } from "react-bootstrap";
import { LoginForm } from "../../components/LoginForm";
import { TicketForm } from "../../components/TicketForm";

export const AccessModal = ({page=false}) => {

  return (
    <Card>
      <Card.Body>
      <Tabs
        defaultActiveKey="login"
        justify
      >
        <Tab eventKey="login" title="Iniciar Sesión">
          <LoginForm />
        </Tab>
        <Tab eventKey="register" title="Registrarse">
          <TicketForm />
        </Tab>
      </Tabs>
      </Card.Body>
    </Card>
  )
}
