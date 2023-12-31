import React, { useState } from "react";
import { TickList } from "../../../../../SubComponents/TickList";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage5({ setForm, foodWaste, setFoodWaste}) {

  return (
    <>
      <Form>
      Do you currently measure your food waste?
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
                  setFoodWaste(true);
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
                  setFoodWaste(false);
                }}
              />
            </Col>
          </Row>
          <Button 
            type="submit" 
            className="blue-btn shadow-none"
            onClick={() => {
              setForm(6);
            }}
          >
            Next
          </Button>
      </Form.Group>
    </Form>
    </>
  );
}
