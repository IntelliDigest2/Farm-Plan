import React from "react";

import "../Mob.css";
import logo from "../../../../../images/intellidigest-logo-small.png";
import { Container } from "react-bootstrap";

const Title = (props) => {
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

export { Title };
