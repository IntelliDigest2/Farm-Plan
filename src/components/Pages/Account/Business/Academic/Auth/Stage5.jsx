import React, { useState } from "react";
import { TickList } from "../../../../../SubComponents/TickList";
import { Form, Button, Row, Col, Dropdown, InputGroup } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage5({ setForm, foodWaste, setFoodWaste, foodWasteWeight, setFoodWasteWeight, foodWasteUnit, setFoodWasteUnit }) {
  const [showFoodWasteForm, setShowFoodWasteForm] = useState(false);


  const handleYesClick = () => {
    setFoodWaste(true);
    setShowFoodWasteForm(true);
  };

  const handleNoClick = () => {
    setFoodWaste(false);
    setForm(6);
  };

  const handleNextClick = () => {
    // Handle form submission or any other logic here
    setForm(6);
  };

  return (
    <>
      <Form>
      Do you currently measure your food waste?

        <Form.Group>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                name="register"
                id="yes"
                label="Yes"
                onClick={handleYesClick}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                name="register"
                id="no"
                label="No"
                onClick={handleNoClick}
              />
            </Col>
          </Row>
        </Form.Group>

        {showFoodWasteForm && (
          <Form.Group>
            <Form.Label>Enter Food Waste Weight:</Form.Label>
            <Form.Control
            className="signup-input-qty"
            id="waste"
            type="number"
            min="0"
            step="1"
            onChange={(e) => setFoodWasteWeight(e.target.value)}
            value={foodWasteWeight}
          />
            <Dropdown onSelect={(e) => setFoodWasteUnit(e)}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {foodWasteUnit}
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
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Form>
    </>
  );
}
