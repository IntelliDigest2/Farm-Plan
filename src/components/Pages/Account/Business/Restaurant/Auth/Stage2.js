import React, { useState, useEffect } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";

import { storage } from "../../../../../../config/fbConfig";

export default function Stage2({ turnover, setTurnover, setForm }) {

  
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Average turnover per week/month/year
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setTurnover(e.target.value)}
        />
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
