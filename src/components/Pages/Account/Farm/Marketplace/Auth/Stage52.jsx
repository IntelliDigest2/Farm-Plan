import React from "react";
import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";

export default function Stage52({ setForm, setEffective }) {
  return (
    <Form onSubmit={() => setForm(6)}>
      <h5>When are you effecting the sustainable farming practice(s)?</h5>
      <Form.Group>
        <Form.Check
          required
          type="radio"
          name="effective"
          label="Now"
          onClick={() => setEffective("Now")}
        />
        <Form.Check
          required
          type="radio"
          name="effective"
          label="3 months time"
          onClick={() => setEffective("3months")}
        />
        <Form.Check
          required
          type="radio"
          name="effective"
          label="6 months time"
          onClick={() => setEffective("6months")}
        />
        <Form.Check
          required
          type="radio"
          name="effective"
          label="12 months time"
          onClick={() => setEffective("12months")}
        />
      </Form.Group>
      <Button type="submit" className="blue-btn shadow-none mt-3">
        Next
      </Button>
    </Form>
  );
}
