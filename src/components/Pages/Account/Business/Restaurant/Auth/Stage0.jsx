import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Stage0({ setForm, OMS, setOMS }) {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Do you currently use an online management system?</Form.Label>
          <Row>
            <Col>
              <Form.Check
                // required
                type="radio"
                name="register"
                id="register"
                label="Yes"
                onClick={() => {
                  setOMS(true);
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
                  setOMS(false);
                }}
              />
            </Col>
          </Row>

          <Button 
            type="submit" 
            className="blue-btn shadow-none"
            onClick={() => {
              setForm(1);
            }}
          >
            Next
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
