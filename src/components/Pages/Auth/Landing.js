import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Container } from "react-bootstrap";
import { SubButton } from "../../SubComponents/Button";
import { connect } from "react-redux";
import logo from "../../../images/WFTLogo.png";
import GoogleLoginButton from "./GoogleLogin";
import { Redirect, Link } from "react-router-dom";
import FacebookLogin from "./FacebookLogin";

function LandingPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleGoogleLoginSuccess = (profile) => {
    // Handle successful login
    // console.log("returned profile from google", profile);
    setProfile(profile); // Update the profile state
    setIsLoggedIn(true);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle login failure
    console.error("returned error", error);
  };

  const handleFacebookLoginSuccess = (profile) => {
    // Handle successful login
    setProfile(profile);
    // console.log("returned profile from facebook", profile);
    setIsLoggedIn(true);
  };

  const handleFacebookLoginFailure = (error) => {
    // Handle login failure
    console.error("returned error", error);
  };

  useEffect(() => {
    // Check if the profile is available and not logged in
    if (profile && isLoggedIn) {
      // Perform actions based on the profile
      // console.log("check isLoggedIn", profile);
    }
  }, [profile, isLoggedIn]);

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

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
          <div className="horizontal-buttons">
            <GoogleLoginButton
              onLoginSuccess={handleGoogleLoginSuccess}
              onLoginFailure={handleGoogleLoginFailure}
            />
            <FacebookLogin
              onLoginSuccess={handleFacebookLoginSuccess}
              onLoginFailure={handleFacebookLoginFailure}
            />
          </div>

          <SubButton styling="blue" goTo="/login" text="Log In" />
          <SubButton styling="blue" goTo="/signup" text="Sign Up" />
          <SubButton
            styling="green"
            goTo="/about-us"
            text="About The World Food Tracker"
          />
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
