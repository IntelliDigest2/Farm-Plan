import { React } from "react";
import "./Landing.css";

import { SubButton } from "../../SubComponents/Button";
import { Copyright } from "../../SubComponents/Copyright";

import { connect } from "react-redux";

import peppers from "../../../../images/peppers.jpg";

function LandingPage(props) {
  return (
    <div>
      <img
        className="landing"
        src={peppers}
        alt="Four brightly coloured bell peppers arranged in a square."
      />
      <div className="title">
        <h1>IntelliDigest</h1>
        <h2>Empowering Global</h2>
        <h2>Food Sustainability</h2>
        <p>Welcome to the Food Loss & Waste Tracker App.</p>
      </div>
      <div className="buttons">
        <SubButton styling="blue" goTo="/login-mob" text="Log In" />
        <SubButton styling="blue" goTo="/signup" text="Sign Up" />
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
