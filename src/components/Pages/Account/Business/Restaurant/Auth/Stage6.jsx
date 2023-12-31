import React from "react";
import TermsAndCons from "../../../../../SubComponents/TermsAndConditions";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage6({setForm, setCarbonPrint, carbonPrint}) {
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
                onClick={() => {
                  setCarbonPrint(true);
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
                  setCarbonPrint(false);
                }}
              />
            </Col>
          </Row>

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
