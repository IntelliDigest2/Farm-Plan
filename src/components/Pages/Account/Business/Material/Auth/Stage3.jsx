import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Dropdown } from "../../../../../SubComponents/Dropdown";

export default function Stage3({ setForm, sales, setSales }) {
  return (
    <>
      <Form>
        Average cost of sales per week/month/year
        <Form.Group>
        <Form.Control
          type="text"
          placeholder=""
          id="farm-name"
          onChange={(e) => setSales(e.target.value)}
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
    </>
  );
}
