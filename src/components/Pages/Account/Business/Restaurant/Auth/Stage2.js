import React, { useState, useEffect } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Button, Dropdown, InputGroup } from "react-bootstrap";

import { storage } from "../../../../../../config/fbConfig";

export default function Stage2({ turnover, setTurnover, setTurnoverPeriod, turnoverPeriod, setForm }) {

  
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Average turnover per week/month/year
        </Form.Label>
        <InputGroup>
          <Form.Control
            className="signup-input-qty"
            id="cost"
            type="number"
            min="0"
            step="1"
            onChange={(e) => setTurnover(e.target.value)}
            value={turnover}
          />
            <Dropdown onSelect={(e) => setTurnoverPeriod(e)}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {turnoverPeriod}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
              <Dropdown.Item eventKey="Monthly">Monthly</Dropdown.Item>
              <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
        </Form.Group>

      <Button 
        type="submit" 
        className="blue-btn shadow-none"
        onClick={() => {
          setForm(3);
        }}
      >
        Next
      </Button>
      
    </Form>
  );
}
