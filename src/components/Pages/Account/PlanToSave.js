import React from "react";
// import { DefaultButton } from "../SubComponents/Button";
import { PageWrap } from "../SubComponents/PageWrap";
import "./UserAccount.css";

import positivePlanet from "../../../images/fr_positive-planet.jpg";
import pTSNotebook from "../../../images/pts_plate_notebook.png";
import pTSBanner from "../../../images/pts-banner.png";
import sTFCFoodNetwork from "../../../images/stfcfoodnetwork.png";

import { Card, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";

function PTSCountdown() {
  return (
    <Card className="countdown-card">
      <Countdown className="countdown" date="2022-06-30T23:59:59"></Countdown>
      <span className="label">days : hrs : mins : secs</span>
    </Card>
  );
}

function PlanToSave() {
  return (
    <>
      <PageWrap header="The Plan to Save Campaign" goTo="/account">
        {/* <DefaultButton
          styling="green"
          goTo="/reserve-items"
          text="Plan your items here!"
        /> */}
        <PTSCountdown />
        <div className="disclaimer">
          <p>
            <b>NOTE:</b>This is part of the 'Fail to Plan, Plan to Fail'
            campaign, running from October 16th 2021 to January 31st 2021. Click
            'Plan to Save' to express interest in reserving food items from
            local sources, we have extended to campaign to June 2022 with sales
            commencing in January 2023.
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
        <img
          className="large-img"
          src={pTSBanner}
          alt="Plan to Save promotional banner"
        />
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

export default PlanToSave;
