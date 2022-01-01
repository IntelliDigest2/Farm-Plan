import React from "react";
import "./Button.css";
import { Button as BootstrapButton } from "react-bootstrap";

//The default buttons we are using are the large dropdown buttons we use on the account page and their small sub buttons
//when using component, styling="[colour]" colour choices are turquoise, green, yellow and blue. (styles are in Button.css)

// TODO sort out hover and selected colours (defaults to bootstrap primary)

function DefaultButton(props) {
  if (props.disabled) {
    return (
      <BootstrapButton
        variant="default"
        className={["default-btn", props.styling]}
        disabled
      >
        {props.text}
      </BootstrapButton>
    );
  } else {
    return (
      <BootstrapButton
        variant="default"
        className={["default-btn", props.styling]}
        href={props.goTo}
        onClick={props.onClick}
      >
        {props.text}
      </BootstrapButton>
    );
  }
}

function SubButton(props) {
  return (
    <BootstrapButton
      variant="default"
      className={["sub-btn", props.styling]}
      href={props.goTo}
    >
      {props.text}
    </BootstrapButton>
  );
}

export { DefaultButton, SubButton };
