import React, { useState, useEffect } from "react";
import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";
import { Select } from "../../../../../SubComponents/Dropdown";
import { countryNames, countries } from "../../../../../lib/Countries";

export default function Stage3({setForm, purchase, setPurchase}) {

  return (
    <Form>
      Where do you currently purchase your food item?
      <Form.Group>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setPurchase(e.target.value)}
        />
      </Form.Group>
      
      <Button 
        type="submit" 
        className="blue-btn shadow-none"
        onClick={() => {
          setForm(4);
        }}
      >
        Next
      </Button>
    </Form>
  );
}
