import React from "react";
import "./Dropdown.css";
import { DropdownButton as BootstrapDropdownButton } from "react-bootstrap";
import { Dropdown as BootstrapDropdown } from "react-bootstrap";

function Dropdown(props) {
  let comp;
  comp = props.items.map((item) => {
    if (item === "/") {
      return <BootstrapDropdown.Divider />;
    } else {
      return (
        <BootstrapDropdown.Item id={props.id} eventKey={item}>
          {item}
        </BootstrapDropdown.Item>
      );
    }
  });

  return (
    <BootstrapDropdownButton
      title={props.data}
      onSelect={props.function}
      className={["dropdown center", props.styling]}
      variant="default"
    >
      {comp}
    </BootstrapDropdownButton>
  );
}

export { Dropdown };
