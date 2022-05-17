import React from "react";

import "../../../SubComponents/PageWrap.css";
import logo from "../../../../images/intellidigest-logo-small.png";
import { Container } from "react-bootstrap";

export const Title = (props) => {
  return (
    <Container className="mobile-style">
      <div className="top">
        <img className="logo" src={logo} alt="IntelliDigest" />
      </div>
      <div className="titles">
        {/*<Row className="center">
            <h1 style={{ color: "#afba15" }}>Intelli</h1>
            <h1 style={{ color: "#0c0847" }}>Digest</h1>
           </Row> */}
        <h2>{props.subtitle}</h2>
      </div>
      {props.children}
    </Container>
  );
};
