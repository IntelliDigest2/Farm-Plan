import React from "react";
import "./Card.css";
import { Card as BootstrapCard } from "react-bootstrap";

function Card(props) {
  return (
    <BootstrapCard className={["form-card", props.styling]}>
      {props.children}
    </BootstrapCard>
  );
}

export { Card };
