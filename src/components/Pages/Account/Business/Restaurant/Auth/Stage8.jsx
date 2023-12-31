import React from "react";
import TermsAndCons from "../../../../../SubComponents/TermsAndConditions";
import { Form, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage8({ handleSubmit }) {
  return (
    <>
      <h5>
        You're all set! Please accept the terms and conditions to continue.
      </h5>
      <TermsAndCons />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="I accept the terms and conditions."
            id="terms"
            required
          />
          <Button className="blue-btn shadow-none mt-3" type="submit">
            Start
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
