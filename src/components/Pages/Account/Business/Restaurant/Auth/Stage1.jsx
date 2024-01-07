import React, { useState } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Row, Col, Button, InputGroup, Dropdown } from "react-bootstrap";

export default function Stage1({ setForm, cost, period, setCost, setPeriod }) {
  return (
    <Form>
    <Form.Group className="mb-3">
      <Form.Label>
        What is your average cost
      </Form.Label>
      <InputGroup>
          <Form.Control
            className="signup-input-qty"
            id="cost"
            type="number"
            min="0"
            step="1"
            onChange={(e) => setCost(e.target.value)}
            value={cost}
          />
            <Dropdown onSelect={(e) => setPeriod(e)}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {period}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
              <Dropdown.Item eventKey="Monthly">Monthly</Dropdown.Item>
              <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
      {/* <div className="d-flex">
        <select
          onChange={(e) => setCost(e.target.value)}
          className="form-select me-2"
        >
          <option value="" disabled selected>Select period</option>
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
          <option value="yearly">yearly</option>
        </select>
        <Form.Control
          type="text"
          placeholder="food cost"
          id="farm-name"
        />
      </div> */}
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
