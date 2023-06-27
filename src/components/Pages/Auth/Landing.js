import { React } from "react";
import "./Landing.css";

import { SubButton } from "../../SubComponents/Button";

import { connect } from "react-redux";

import peppers from "../../../images/peppers.jpg";
import logo from "../../../images/WFTLogo.png";

function LandingPage(props) {
  return (
    <div className="white-background">
      <img
        className="landing"
        src={peppers}
        alt="Four brightly coloured bell peppers arranged in a square."
      />
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
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(LandingPage);
