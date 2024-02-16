import React, { useState } from "react";
import TermsAndCons from "../../../../../SubComponents/TermsAndConditions";
import { Form, Button, Row, Col, Dropdown, InputGroup } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage6({setForm, setCarbonPrint, carbonPrint, carbonPrintWeight, setCarbonPrintWeight, carbonPrintUnit, setCarbonPrintUnit}) {
  const [showCarbonPrint, setShowCarbonPrint] = useState(false);

  const handleYesClick = () => {
    setCarbonPrint(true);
    setShowCarbonPrint(true);
  };

  const handleNoClick = () => {
    setCarbonPrint(false);
    setForm(7);
  };

  const handleNextClick = () => {
    // Handle form submission or any other logic here
    setForm(7);
  };
  return (
    <>
      <Form>
      Do you know the carbon foot print of your meal?
      <Form.Group>
      <Row>
            <Col>
              <Form.Check
                // required
                type="radio"
                name="register"
                id="register"
                label="Yes"
                onClick={handleYesClick}

              />
            </Col>
            <Col>
              <Form.Check
                // required
                type="radio"
                name="register"
                id="register"
                label="No"
                onClick={handleNoClick}

              />
            </Col>
          </Row>

          {showCarbonPrint && (
          <Form.Group>
            <Form.Label>Enter Carbon Print Weight:</Form.Label>
            <Form.Control
            className="signup-input-qty"
            id="waste"
            type="number"
            min="0"
            step="1"
            onChange={(e) => setCarbonPrintWeight(e.target.value)}
            value={carbonPrintWeight}
          />
            <Dropdown onSelect={(e) => setCarbonPrintUnit(e)}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {carbonPrintUnit}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Kg">Kg</Dropdown.Item>
              <Dropdown.Item eventKey="g">g</Dropdown.Item>
              <Dropdown.Item eventKey="lbs">lbs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
           
          </Form.Group>
        )}

          <Button 
            type="submit" 
            className="blue-btn shadow-none"
            onClick={() => {
              setForm(7);
            }}
          >
            Next
          </Button>

      </Form.Group>
    </Form>
    </>  );
}
