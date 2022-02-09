import React from "react";

import "./PageWrap.css";

import { SubButton } from "./Button";
import Divider from "@mui/material/Divider";
import { Container } from "react-bootstrap";

export const PageWrap = (props) => {
  return (
    <>
      <div>
        <div className="top">
          <div style={{ width: "50%" }}>
            <SubButton styling="green" goTo={props.goTo} text="Back" />
          </div>
          <h5>{props.header}</h5>
        </div>
        <Divider />
      </div>
      <Container className="mobile-style">
        <div className="center">
          <h2 style={{ color: "#0c0847" }}>{props.subtitle}</h2>
        </div>
        <Divider variant="middle" />
        {props.children}
        <Divider variant="middle" />
      </Container>
    </>
  );
};

export const PageWrapMini = (props) => {
  return (
    <div>
      <div className="top">
        <div style={{ width: "50%" }}>
          <SubButton styling="green" goTo={props.goTo} text="Back" />
        </div>
        <h5>{props.header}</h5>
      </div>
      <Divider />
      {props.children}
    </div>
  );
};
