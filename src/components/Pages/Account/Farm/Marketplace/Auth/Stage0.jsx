import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Stage0({ setForm, existing, setExisting }) {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Are you an existing farmer and registered?</Form.Label>
          <Row>
            <Col>
              <Form.Check
                required
                type="radio"
                name="register"
                label="Yes"
                onClick={() => {
                  setForm(1);
                  setExisting(true);
                }}
              />
            </Col>
            <Col>
              <Form.Check
                required
                type="radio"
                name="register"
                label="No"
                onClick={() => {
                  setForm(3);
                  setExisting(false);
                }}
              />
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
}
