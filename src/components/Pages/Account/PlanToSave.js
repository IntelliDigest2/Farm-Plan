import React, { useState, useEffect } from "react";
import { SubButton } from "../SubComponents/Button";
import { PageWrap } from "../SubComponents/PageWrap";
import "./UserAccount.css";

import positivePlanet from "../../../images/fr_positive-planet.jpg";
import pTSNotebook from "../../../images/pts_plate_notebook.png";
import pTSBanner from "../../../images/pts-banner.png";
import sTFCFoodNetwork from "../../../images/stfcfoodnetwork.png";

import { Card, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";
import { connect } from "react-redux";

function PTSCountdown() {
  return (
    <Card className="countdown-card">
      <Countdown className="countdown" date="2022-06-30T23:59:59"></Countdown>
      <span className="label">days : hrs : mins : secs</span>
    </Card>
  );
}

function PlanToSave(props) {
  const [button, setButton] = useState(false);
  const [link, setLink] = useState("/meal-plan");
  const handleButton = () => {
    if (props.profile.buildingFunction === "Households" || "Personal") {
      setButton(true);
    } else {
      setButton(false);
    }
    if (props.profile.isConsumer) {
      setLink("/meal-plan");
    } else {
      setLink("cons-auth");
    }
  };

  useEffect(() => {
    handleButton();
  });

  return (
    <>
      <PageWrap header="The Plan to Save Campaign" goTo="/account">
        <PTSCountdown />
        <div className="disclaimer">
          <p>
            <b>NOTE:</b>This is part of the 'Fail to Plan, Plan to Fail'
            campaign. Click 'Plan to Save' to express interest in reserving food
            items from local sources, this countdown is representative of our
            target timeline for deploying the plan to save and coordinating food
            consumption between consumers and their local farmers.
          </p>
        </div>
        <div className="container">
          <img className="large-img" src={pTSNotebook} alt="" />
          <div className="img-overlay blue">
            <h2>How Does It Work?</h2>
          </div>
        </div>
        <div className="pts-p-div">
          <p className="pts-p">
            If you can reserve your fresh food, local farmers can plan better in
            their food production to meet your need in the most sustainable way.
            By signing up to the Plan to Save campaign and reserving your
            weekly, fortnightly and monthly fresh food requirements, we will
            take the responsibility to identify local farmers around you or
            encourage the set up of local farmers to supply your reservation,
            ensuring the supply of nutritious food all year round for all.
          </p>
        </div>
        {props.profile.buildingFunction === "Households" || "Personal" ? (
          <div className="center">
            <SubButton
              text="Start your plan now!"
              goTo="/meal-plan"
              styling="green"
            />
          </div>
        ) : null}
        <a href="https://intellidigest.com/services/food-system-sustainability/food-waste-tracker/plan-to-save/">
          <img
            className="large-img"
            src={pTSBanner}
            alt="Plan to Save promotional banner"
          />
        </a>
      </PageWrap>
      <div className="support">
        <h4>Supported By:</h4>
      </div>
      <Row style={{ backgroundColor: "white" }}>
        <Col>
          <img
            className="small-img"
            src={sTFCFoodNetwork}
            alt="STFC Food Network"
          />
        </Col>
        <Col>
          <img
            className="small-img"
            src={positivePlanet}
            alt="Positive Planet"
          />
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(PlanToSave);
