import { Button, Form, Spinner, Card, CloseButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGetTicket } from "../../hooks/useTickets";

export const TicketGenerator = ({ handleClose }) => {
  const [charging, setCharging] = useState(false);
  const [error, setError] = useState(false);

  const [ticket, setTicket] = useState('');
  const { setSend, send, data, isLoading, error: errorTicket } = useGetTicket();
  
  const requestClip = () => {
    navigator.permissions
      .query({ name: "persistent-storage" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          sendCommand();
        }
      });
  };

  const sendCommand = () => {
    navigator.clipboard.writeText(ticket);
  };

  useEffect(() => {
    if(!isLoading){
      setError(errorTicket);
      setTicket(data?._id)
      setCharging(false)
    }
  }, [send, data, isLoading, errorTicket])

  const handleGetTicket = (e) => {
    e.preventDefault();
    setCharging(true);
    setSend(true);
  }

  return (
    <Card style={{border: 'none'}}>
      <Card.Header className="d-flex justify-content-between align-items-center" style={{backgroundColor: 'var(--main-green)', color: 'white'}}>
        <h4 className="my-1">Crear Ticket de Registro</h4>
        <CloseButton onClick={handleClose}/>
      </Card.Header>
      <Card.Body>
      <Form onSubmit={handleGetTicket}>
          <Form.Group className="my-4 d-flex">
            <Form.Control placeholder="000000000000000000000000" value={ticket} readOnly style={{fontSize: '26px', textAlign: 'center', backgroundColor: 'lightGray'}}/>
            <Button className='my-2 mx-2' variant="light" onClick={requestClip}>
              <i className="bi bi-clipboard" style={{fontSize: '30px'}}></i>
            </Button>
          </Form.Group>
          <div className="d-grid gap-2">
            {
              !error ? 
                !charging ? 
                <Button as="input" style={{backgroundColor: 'var(--main-green)'}} type="submit" value="Generar" />
                : <Button style={{backgroundColor: 'var(--main-green)'}}> 
                  <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Cargando...</span>
                </Button>
              :
              <Button as="input" variant="danger" type="submit" value="Error" />
              }
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
