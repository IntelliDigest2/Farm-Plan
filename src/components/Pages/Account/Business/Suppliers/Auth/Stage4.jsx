import React from "react";
import TermsAndCons from "../../../../../SubComponents/TermsAndConditions";
import { Form, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage4({setForm, setInterest, interest}) {
  return (
    <>
      <Form>
        What is the key interest for using the World Food Tracker?
        <Form.Group>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setInterest(e.target.value)}
        />
      </Form.Group>
      
      <Button 
        type="submit" 
        className="blue-btn shadow-none"
        onClick={() => {
          setForm(5);
        }}
      >
        Next
      </Button>
    </Form>
    </>  
    );
}
