import React, { useState } from "react";
import { DefaultButton, SubButton } from "../SubComponents/Button";
import "./UserAccount.css";

//import arrows from "../../../images/Arrows.png";
import positivePlanet from "../../../images/fr_positive-planet.jpg";
//import pTSField from "../../../images/pts_field_standing.png";
import pTSNotebook from "../../../images/pts_plate_notebook.png";
//import pTSFoodWaste from "../../../images/pts_food_waste.jpg";
import pTSBanner from "../../../images/pts-banner.png";
import sTFCFoodNetwork from "../../../images/stfcfoodnetwork.png";

import { Card, Container, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown";

function PTSCountdown() {
  return (
    <Card style={{ width: "50%", margin: "auto" }}>
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
      </Container>
    </>
  );
}

export default PlanToSave;
