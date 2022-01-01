import React from "react";
import "./Form.css";
import { Form } from "react-bootstrap";

function InputForm(props) {
  return (
    <Form className={["input-form", props.styling]}>{props.children}</Form>
  );
}

function FormGroup(props) {
  return <Form.Group className="form-group">{props.children}</Form.Group>;
}
export { InputForm, FormGroup };
