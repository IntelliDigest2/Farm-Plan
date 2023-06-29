import React from "react";
import "./Landing.css";
import { Container } from "react-bootstrap";
import { SubButton } from "../../SubComponents/Button";
import { connect } from "react-redux";
import logo from "../../../images/WFTLogo.png";

function LandingPage(props) {
  return (
    <Container>
      <div className="white-background">
        <div className="landing"></div>
        <div className="title">
          <img
            src={logo}
            alt="World Food Tracker, empowering global food sustainability"
          />
        </div>
        <div className="buttons">
          <SubButton styling="blue" goTo="/login" text="Log In" />
          <SubButton styling="blue" goTo="/signup" text="Sign Up" />
          <SubButton styling="green" goTo="/about-us" text="About Us" />
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(LandingPage);
