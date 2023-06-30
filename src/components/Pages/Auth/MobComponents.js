import React from "react";

import "../../SubComponents/PageWrap.css";
import logo from "../../../images/WFTLogo.png";
import { Container } from "react-bootstrap";

export const Title = (props) => {

  const containerStyle = {
    backgroundColor: "#A5B828", // Set the desired background color
    borderRadius: "25px",
    padding: "1rem"
  };

  const logoStyle = {
    height: "auto",
    width: "100%",
    maxWidth: "750px", // Adjust the width of the logo as needed
    padding: "70px", // Add padding around the image

  };

  return (
    <Container className="mobile-style" style={containerStyle}>
      <div className="top">
        <img className="logo" src={logo} alt="IntelliDigest" style={logoStyle}/>
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
