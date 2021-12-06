import React, { Component } from "react";
import "../../../App.css";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "../Pages.css";
import styled from "styled-components";
import {
  Row,
  Col,
  Dropdown,
  Button,
  ListGroup,
  Modal,
  Card,
  Container,
} from "react-bootstrap";
// import ButtonModal from './ButtonModalChart'
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { BrowserView, MobileView } from "react-device-detect";
import { Divider } from "@material-ui/core";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import Countdown from "react-countdown";
//import arrows from "../../../images/Arrows.png";
//import buttonDesign from "../../../images/Button design.png";
import positivePlanet from "../../../images/fr_positive-planet.jpg";
//import pTSField from "../../../images/pts_field_standing.png";
import pTSNotebook from "../../../images/pts_plate_notebook.png";
//import pTSFoodWaste from "../../../images/pts_food_waste.jpg";
import pTSBanner from "../../../images/pts-banner.png";
import sTFCFoodNetwork from "../../../images/stfcfoodnetwork.png";
//import { Layout } from "../../Layout/Layout";

function AccountHeader(profile) {
  /*section containing profile details
  (icon, name etc...) */
  return (
    <div className= "text-center user-acc">
      <h1 className= "user-acc-title">My Account</h1>
      <div className= "justify-content-center align-items-center initials-logo">
        <p>{profile.initials}</p>
      </div>
      <h1>Welcome, {profile.firstName} {profile.lastName}!</h1>
    </div>
  )
}

function PlanToSave() {
  return (
    <Container>
      <Row className="justify-content-md-center user-acc">
        <Col>
        <Row>
          <Button className= "custom-btn-2" as={Link} to="/reserve-items">
            Plan To Save
          </Button>
        </Row>
        </Col>
      </Row>
    </Container>
  )
}

class Account extends Component {

  state = {
    foodBubbleClicked: false,
    foodWasteBubbleClicked: false,
    universityBubbleClicked: false,
    householdBubbleClicked: false,
    farmBubbleClicked: false,
    businessBubbleClicked: false,
    mobileDisclaimerShown: false,
    skipPTSCLicked: false,
    PTSInfoClicked: false,
  };

  render () {
    const { auth, profile, users } = this.props;

    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        <Container>
          <Row className="justify-content-md-center user-acc">
            <AccountHeader initials={profile.initials} firstName={profile.firstName} lastName={profile.lastName} />
          </Row>
        </Container>
      </React.Fragment>
     )
  }
}


/*const BGroup = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const BStyle = styled.div`
  padding: 10px;
  width: 145px;
  color: #aab41e
`;

const DDStyle = styled.div`
  padding: 10px;
`;

const PWBStyle = styled.div`
  padding: 10px;
  width: 145px;
  margin-bottom: 35px;
`; */

const DateStyle = styled.div`
  .date {
    color: #6d100b;
    font-size: 200%;
    padding: 5px;
  }

  .label {
    background-color: rgb(18, 108, 164);
    color: white;
    font-weight: 600;
    padding-left: 15.5px;
    padding-right: 15.5px;
  }
`;

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(Account);