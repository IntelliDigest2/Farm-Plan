import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Dropdown } from "../../../../../SubComponents/Dropdown";

export default function Stage4({ setForm, nutritionalInfo, setNutritionalInfo }) {
  return (
    <>
      <Form>
        Do you provide information on nutritional content of food to your customer?
      <Form.Group>
      <Row>
            <Col>
              <Form.Check
                // required
                type="radio"
                name="register"
                id="register"
                label="Yes"
                onClick={() => {
                  setNutritionalInfo(true);
                }}
              />
            </Col>
            <Col>
              <Form.Check
                // required
                type="radio"
                name="register"
                id="register"
                label="No"
                onClick={() => {
                  setNutritionalInfo(false);
                }}
              />
            </Col>
          </Row>
          <Button 
            type="submit" 
            className="blue-btn shadow-none"
            onClick={() => {
              setForm(5);
            }}
          >
            Next
          </Button>
      </Form.Group>
    </Form>
    </>
  );
}
