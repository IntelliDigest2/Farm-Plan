import React from "react";

import "./Mob.css";
import logo from "../../../../images/intellidigest-logo-small.png";
import { SubButton } from "../../SubComponents/Button";
import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";

export const Title = (props) => {
  return (
    <Container className="signup-mobile">
      <img className="logo" src={logo} alt="IntelliDigest" />
      <div className="titles">
        {/*<Row className="center">
            <h1 style={{ color: "#afba15" }}>Intelli</h1>
            <h1 style={{ color: "#0c0847" }}>Digest</h1>
           </Row> */}
        <h2>{props.subtitle}</h2>
      </div>
      <div className="mobile-style">{props.children}</div>
    </Container>
  );
};

export const MobileWrap = (props) => {
  return (
    <>
      <div className="col">
        <div className="top">
          <div style={{ width: "50%" }}>
            <SubButton styling="green" goTo="/account" text="Back" />
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
