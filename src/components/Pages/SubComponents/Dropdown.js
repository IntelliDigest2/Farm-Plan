import React from "react";
import "./Dropdown.css";
import {
  DropdownButton as BootstrapDropdownButton,
  Form,
} from "react-bootstrap";
import { Dropdown as BootstrapDropdown } from "react-bootstrap";

function Dropdown(props) {
  let comp;
  comp = props.items.map((item, index) => {
    if (item === "/") {
      return <BootstrapDropdown.Divider key={index} />;
    } else {
      return (
        <BootstrapDropdown.Item id={props.id} eventKey={item} key={index}>
          {item}
        </BootstrapDropdown.Item>
      );
    }
  });

  if (props.disabled) {
    return (
      <BootstrapDropdownButton
        title={props.data}
        onSelect={props.function}
        className={["dropdown center", props.styling]}
        variant="default"
        disabled
        drop="down"
      >
        {comp}
      </BootstrapDropdownButton>
    );
  }

  return (
    <BootstrapDropdownButton
      title={props.data}
      onSelect={props.function}
      className={["dropdown center", props.styling]}
      variant="default"
      drop="down"
    >
      {comp}
    </BootstrapDropdownButton>
  );
}

function Select(props) {
  let comp;
  comp = props.items.map((item, index) => {
    if (item === "/") {
      return <option disabled>──────────</option>;
    } else {
      return (
        <option id={props.id} key={index}>
          {item}
        </option>
      );
    }
  });

  return (
    <Form.Control
      disabled={props.disabled}
      onChange={props.function}
      as="select"
      value={props.value}
    >
      <option
        key="blankChoice"
        hidden
        value
        style={{ color: "rgba(0, 0, 0, 0.5)" }}
      >
        {props.placeholder}
      </option>
      {comp}
    </Form.Control>
  );
}

export { Dropdown, Select };
