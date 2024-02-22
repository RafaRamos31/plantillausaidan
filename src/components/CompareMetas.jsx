import { Col, Form, InputGroup, Row } from "react-bootstrap"

const currencyFormat = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};

export const CompareMetas = ({year, medida, metas, original, compare=true, hidden=false}) => {
  return (
    <div className="mb-2">
      <p style={{fontWeight: 'bold'}}>{year}</p>
      <Form.Group as={Row} className="mb-3">
        {
          ['T1', 'T2', 'T3', 'T4', 'Total'].map((trimestre) => (
            <Col key={`${year}-${trimestre}-rev`} sm={6} className="my-2">
              <InputGroup>
                <InputGroup.Text>{trimestre}</InputGroup.Text>
                {
                  compare ?
                  <>
                  {
                    hidden ? 
                    <Form.Control type={medida === 'Monetario' ? 'text' : "number"} value={medida === 'Monetario' ? original[trimestre].toLocaleString('en-US', currencyFormat) : original[trimestre]} style={{color: metas[trimestre] !== original[trimestre] ? 'red' : 'limegreen'}} readOnly/>
                    :
                    <Form.Control type={medida === 'Monetario' ? 'text' : "number"} value={medida === 'Monetario' ? metas[trimestre].toLocaleString('en-US', currencyFormat) : metas[trimestre]} style={{color: metas[trimestre] !== original[trimestre] ? 'red' : 'limegreen'}} readOnly/>
                  }
                  </>
                  :
                  <>
                  {
                    hidden ? 
                    <Form.Control type={medida === 'Monetario' ? 'text' : "number"} value={medida === 'Monetario' ? original[trimestre].toLocaleString('en-US', currencyFormat) : original[trimestre]} readOnly/>
                    :
                    <Form.Control type={medida === 'Monetario' ? 'text' : "number"} value={medida === 'Monetario' ? metas[trimestre].toLocaleString('en-US', currencyFormat) : metas[trimestre]} readOnly/>  
                  }
                  </>
                  }
              </InputGroup>
            </Col>
          ))
        }
      </Form.Group>
    </div>
  )
}
