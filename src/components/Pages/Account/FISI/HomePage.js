import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./topLevel.css";
import "./css/HomePage.css";

//FISI was created as a separate app, there are several problems with it including that they used a different version of react router dom
//for this reason we have commented out out all interferences and nned to sort out the issues before routing into the app

function HomePage() {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("signinpage");
  //   }, 5000);
  // }, [navigate]);
  return (
    <div className="onboarding">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/onboarding.jpg`}
        alt=""
        className="onboarding-image"
      />
      <div className="overlay"></div>
      <h1 className="onboarding-text">Food Industry Sustainability Index</h1>
    </div>
  );
}

export default HomePage;
