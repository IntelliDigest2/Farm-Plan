import React, { useState, useEffect } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";

import { storage } from "../../../../../../config/fbConfig";

export default function Stage1({ market, setMarket, setForm }) {

  
  return (
    <Form>
      <Form.Group>
        <Form.Label>
        Where do you currently sell your products?
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setMarket(e.target.value)}
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
