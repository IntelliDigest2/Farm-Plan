import React from "react";
import "./Dropdown.css";
import { DropdownButton as BootstrapDropdownButton } from "react-bootstrap";
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

export { Dropdown };
