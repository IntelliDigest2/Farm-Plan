import React from "react";
import "./Landing.css";
import { SubButton } from "../../SubComponents/Button";

//import { useEffect, useState } from "react";
import { connect } from "react-redux";

import peppers from "../../../../images/peppers.jpg";

function LandingPage(props) {
  /*const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (props.auth.uid) {
      setLoggedIn(true);
    } else {
    }
  }, [props.auth.uid]);*/

  return (
    <div>
      <img className="landing" src={peppers} alt="" />
      <div className="title">
        <h1>IntelliDigest</h1>
        <h2>Empowering Global</h2>
        <h2>Food Sustainability</h2>
        <p>Welcome to the Food Loss & Waste Tracker App.</p>
      </div>
      <div className="buttons">
        <SubButton styling="blue" goTo="/login" text="Log In" />
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
