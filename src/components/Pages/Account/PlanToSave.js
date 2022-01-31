import React from "react";
import { DefaultButton, SubButton } from "../SubComponents/Button";
import "./UserAccount.css";

import positivePlanet from "../../../images/fr_positive-planet.jpg";
import pTSNotebook from "../../../images/pts_plate_notebook.png";
import pTSBanner from "../../../images/pts-banner.png";
import sTFCFoodNetwork from "../../../images/stfcfoodnetwork.png";

import { Card, Container, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";

function PTSCountdown() {
  return (
    <Card className="countdown-card">
      <Countdown className="countdown" date="2022-01-31T23:59:59"></Countdown>
      <span className="label">days : hrs : mins : secs</span>
    </Card>
  );
}

function PlanToSave() {
  return (
    <>
      <Container fluid className="web-center">
        <img className="large-img" src={pTSBanner} alt="Plan To Save" />
        <DefaultButton
          styling="green"
          goTo="/reserve-items"
          text="Plan To Save"
        />
        <div className="disclaimer">
          <p>
            <b>NOTE:</b>This is part of the 'Fail to Plan, Plan to Fail'
            campaign, running from October 16th 2021 to January 31st 2021. Click
            'Plan to Save' to express interest in reserving food items from
            local sources from June 2022. To go to your regular Account page,
            click the 'My Account' button below.
          </p>
        </div>
        <SubButton styling="blue" goTo="/account" text="My Account" />
        <PTSCountdown />
        <div className="container">
          <img className="large-img" src={pTSNotebook} alt="" />
          <br/>
          <div className="blue">
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
        <div className="support green">
          <h4>Supported By:</h4>
        </div>
        <Row>
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
      </Container>
    </>
  );
}

export default PlanToSave;
