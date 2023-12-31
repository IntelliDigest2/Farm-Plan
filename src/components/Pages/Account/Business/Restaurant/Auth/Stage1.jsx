import React, { useState } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Stage1({ setForm, cost, setCost }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          What is your average weekly/monthly/yearly cost for food items?
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setCost(e.target.value)}
        />
      </Form.Group>

      <Button 
        type="submit" 
        className="blue-btn shadow-none"
        onClick={() => {
          setForm(2);
        }}
      >
        Next
      </Button>
      
    </Form>
  );
}
