import React from "react";
import "./Card.css";
import { Card as BootstrapCard } from "react-bootstrap";
import EXAMPLE from "../../images/peppers-square.jpg";

export function Card(props) {
  return (
    <BootstrapCard className={["form-card", props.styling]} key={props.key}>
      {props.children}
    </BootstrapCard>
  );
}

export function ProductCard(props) {
  return (
    <BootstrapCard className="product" key={props.key}>
      <img src={EXAMPLE} alt="product" className="product-image" />
      <div className="product-information">{props.children}</div>
    </BootstrapCard>
  );
}
