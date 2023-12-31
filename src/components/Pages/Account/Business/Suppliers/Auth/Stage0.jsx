import React, { useState } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Stage0({ setForm, delivery, setDelivery }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
        How do you currently deliver your product to end users?
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setDelivery(e.target.value)}
        />
      </Form.Group>

      <Button 
        type="submit" 
        className="blue-btn shadow-none"
        onClick={() => {
          setForm(1);
        }}
      >
        Next
      </Button>
      
    </Form>
  );
}
