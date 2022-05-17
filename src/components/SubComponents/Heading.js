import React from "react";
import "./Heading.css";

function Heading(props) {
  const CustomTag = `h${props.priority}`;
  return (
    <CustomTag className={["heading", props.styling]}>{props.text}</CustomTag>
  );
}

export { Heading };
