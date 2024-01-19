import React, { useState, useEffect } from "react";
import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";
import { Select } from "../../../../../SubComponents/Dropdown";
import { countryNames, countries } from "../../../../../lib/Countries";

export default function Stage2({setForm, turnover, setTurnover}) {

  return (
    <Form>
      Average turnover per week/month/year
      <Form.Group>
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
