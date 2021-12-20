import React from "react";
import "./Button.css";
import { Button } from "react-bootstrap";

//The default buttons we are using are the large dropdown buttons we use on the account page and their small sub buttons
//when using component, styling="[colour]" colour choices are turquoise, green, yellow and blue. (Button.css)

// TODO sort out hover and selected colours (defaults to bootstrap primary)

function DefaultButton(props) {
  return (
    <Button
      className={["default-btn", props.styling]}
      href={props.goTo}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}

function SubButton(props) {
  return (
    <Button className={["sub-btn", props.styling]} href={props.goTo}>
      {props.text}
    </Button>
  );
}

export { DefaultButton, SubButton };
