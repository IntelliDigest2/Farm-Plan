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

/* 
  
  Nested 'Ternary Operators' (Conditional Rendering) used for returning different account types, and showing different options in Food & Food Waste sections. Ternary operators are structured as shown below:-

    { (condition) ? <> Return if condition true </> : <> Return if condition false </> }

  Code here split into FARM ACCOUNT, BUSINESS ACCOUNT, UNIVERSITY ACCOUNT and them HOUSEHOLD ACCOUNT with large gaps between these sections to help tell them apart

  Some elements rendered in <BrowserView></BrowserView> & <MobileView></MobileView> tags. This is so these elements are rendered differently on browser than on mobile (e.g. a button may need to be sized smaller to fit properly on a mobile device). This is used 
  frequently across the code.

*/

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

  render() {
    const { auth, profile, users } = this.props;
    // console.log(users);
    // console.log(profile.buildingFunction);

    // var buttonDisplay;

    // if (profile.buildingFunction === "Farm"){
    //   this.setState({isFarm: true})
    // } else {
    //   this.setState({isFarm: false})
    // }

    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        <Container>
          <Row className="ml-0 mr-0 user-acc">
            <Col className="mt-3 pt-3 mt-lg-5 pt-lg-5" xs={12}></Col>
            <Col className="mt-3 pt-3 mt-lg-5 pt-lg-5" xs={12}></Col>

            <Col className="mt-4 pt-4 mt-lg-5 pt-lg-5" xs={12} lg={3}></Col>
            <Col className="" xs={12} lg={6}>
              <h1 className="user-acc-title text-center">My Account</h1>
              <div className="text-center justify-content-center align-items-center d-flex initials-logo">
                <p className="">{profile.initials}</p>
              </div>
              <h1 className="text-center">
                Welcome,{" "}
                <span>
                  {profile.firstName} {profile.lastName}
                </span>
                !
              </h1>
              {/* <h1 className="text-center">Account email: <span >{profile.email}</span></h1>
                  <h1 className="text-center">Postcode: <span >{profile.postcode}</span></h1> */}   

              <div>
                {profile.buildingFunction === "Farm" ? (
                  
                //#region FARM ACCOUNT
                  <>
                    {this.state.skipPTSCLicked ? (
                      <div
                        style={{
                          height: "80vh",
                          padding: "1.5% 1.5% 1.5% 1.5%",
                          marginBottom: "5%",
                        }}
                      >
                        <Button
                          className="custom-btn-3 rounded"
                          style={{
                            height: "120px",
                            width: "100%",
                            marginBottom: "2.5%",
                            fontWeight: 600,
                            fontSize: "200%",
                          }}
                          onClick={() =>
                            this.setState({
                              farmBubbleClicked: !this.state.farmBubbleClicked,
                              householdBubbleClicked: false,
                            })
                          }
                        >
                          Farm
                        </Button>

                        <>
                          {this.state.farmBubbleClicked ? (
                            <>
                              <Button
                                className="custom-btn rounded"
                                style={{
                                  height: "120px",
                                  width: "90%",
                                  marginLeft: "5%",
                                  marginBottom: "1.5%",
                                  fontWeight: 600,
                                  fontSize: "200%",
                                }}
                                onClick={() =>
                                  this.setState({
                                    foodBubbleClicked:
                                      !this.state.foodBubbleClicked,
                                    foodWasteBubbleClicked: false,
                                  })
                                }
                              >
                                Food
                              </Button>

                              <>
                                {this.state.foodBubbleClicked ? (
                                  <>
                                    <BrowserView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/add-products-farm"
                                      >
                                        Upload Food (Farm)
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/browse-products"
                                      >
                                        Buy Food
                                      </Button>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "20%",
                                            width: "60%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Surplus Weight Performance
                                          Chart (Farm)
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusFarm"
                                          >
                                            Weekly
                                          </DropdownItem>{" "}
                                          {/* ...Farm >>>>>>>> */}
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusFarm"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusFarm"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "20%",
                                            width: "60%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Surplus GHG Performance
                                          Chart (Farm)
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusGHGFarm"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusGHGFarm"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusGHGFarm"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "20%",
                                            width: "60%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Surplus Cost Performance
                                          Chart (Farm)
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusCostFarm"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusCostFarm"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusCostFarm"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </BrowserView>

                                    <MobileView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/add-products-farm"
                                      >
                                        Upload Food (Farm)
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                          borderColor: "rgb(94, 120, 235)",
                                        }}
                                        as={Link}
                                        to="/browse-products"
                                      >
                                        Buy Food
                                      </Button>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "5%",
                                            width: "90%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Surplus Weight Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusFarm"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusFarm"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusFarm"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "5%",
                                            width: "90%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Surplus GHG Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusGHGFarm"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusGHGFarm"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusGHGFarm"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "5%",
                                            width: "90%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Surplus Cost Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusCostFarm"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusCostFarm"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusCostFarm"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </MobileView>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>

                              <Button
                                className="custom-btn-2 rounded"
                                style={{
                                  height: "120px",
                                  width: "90%",
                                  marginLeft: "5%",
                                  marginBottom: "1.5%",
                                  fontWeight: 600,
                                  fontSize: "200%",
                                }}
                                onClick={() =>
                                  this.setState({
                                    foodWasteBubbleClicked:
                                      !this.state.foodWasteBubbleClicked,
                                    foodBubbleClicked: false,
                                  })
                                }
                              >
                                Food Loss
                              </Button>

                              <>
                                {this.state.foodWasteBubbleClicked ? (
                                  <>
                                    <BrowserView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(8, 105, 27)",
                                          borderColor: "rgb(8, 105, 27)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-loss"
                                      >
                                        Update Food Loss
                                      </Button>
                                      {/* <Button></Button> */}

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "60%",
                                            marginLeft: "20%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Loss Weight Performance
                                          Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/dayLoss"
                                          >
                                            Daily
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekLoss"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthLoss"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearLoss"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "60%",
                                            marginLeft: "20%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Loss GHG Performance Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/dayLossGHG"
                                          >
                                            Daily
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekLossGHG"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthLossGHG"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearLossGHG"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "60%",
                                            marginLeft: "20%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Loss Cost Performance Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/dayLossCost"
                                          >
                                            Daily
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekLossCost"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthLossCost"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearLossCost"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </BrowserView>

                                    <MobileView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(8, 105, 27)",
                                          borderColor: "rgb(8, 105, 27)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-loss"
                                      >
                                        Update Food Loss
                                      </Button>
                                      {/* <Button></Button> */}

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Loss Weight Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/dayLoss"
                                          >
                                            Daily
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekLoss"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthLoss"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearLoss"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Loss GHG Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/dayLossGHG"
                                          >
                                            Daily
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekLossGHG"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthLossGHG"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearLossGHG"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Loss Cost Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/dayLossCost"
                                          >
                                            Daily
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekLossCost"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthLossCost"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearLossCost"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </MobileView>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            </>
                          ) : (
                            <></>
                          )}
                        </>

                        <Button
                          className="custom-btn-4 rounded"
                          style={{
                            height: "120px",
                            width: "100%",
                            marginBottom: "2.5%",
                            fontWeight: 600,
                            fontSize: "200%",
                          }}
                          onClick={() =>
                            this.setState({
                              householdBubbleClicked:
                                !this.state.householdBubbleClicked,
                              farmBubbleClicked: false,
                            })
                          }
                        >
                          Personal/Household
                        </Button>

                        <>
                          {this.state.householdBubbleClicked ? (
                            <>
                              <Button
                                className="custom-btn rounded"
                                style={{
                                  height: "120px",
                                  width: "90%",
                                  marginLeft: "5%",
                                  marginBottom: "1.5%",
                                  fontWeight: 600,
                                  fontSize: "200%",
                                }}
                                onClick={() =>
                                  this.setState({
                                    foodBubbleClicked:
                                      !this.state.foodBubbleClicked,
                                    foodWasteBubbleClicked: false,
                                  })
                                }
                              >
                                Food
                              </Button>

                              <>
                                {this.state.foodBubbleClicked ? (
                                  <>
                                    <BrowserView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <ListGroup
                                        style={{
                                          width: "105%",
                                          marginLeft: "-2.5%",
                                          marginTop: "2%",
                                          marginBottom: "2%",
                                        }}
                                      >
                                        <ListGroup.Item variant="primary">
                                          <b>DISCLAIMER: </b> The Global Food
                                          Loss & Waste Tracker is designed, in
                                          part, to help users develop healthy
                                          eating habits. The nutritional
                                          information and dietary
                                          recommendations provided are merely
                                          suggestions which may or may not
                                          improve users' eating habits and/or
                                          overall health. This app is a
                                          self-regulatory tool, not intended to
                                          replace professional medical advice.
                                          Please always consult a dietician or
                                          medical professional for professional
                                          medical advice regarding your health.
                                        </ListGroup.Item>
                                      </ListGroup>

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-intake"
                                      >
                                        Update Food Intake
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/chart/nutrientGap"
                                      >
                                        Nutrient Gap Breakdown
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/add-products"
                                      >
                                        Upload Food
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/browse-products"
                                      >
                                        Buy Food
                                      </Button>

                                      {/* <Button></Button>
                            <Button></Button> */}

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "20%",
                                            width: "60%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Surplus Weight Performance
                                          Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplus"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplus"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplus"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "20%",
                                            width: "60%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Surplus GHG Performance
                                          Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusGHG"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusGHG"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusGHG"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "20%",
                                            width: "60%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Surplus Cost Performance
                                          Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusCost"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusCost"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusCost"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </BrowserView>

                                    <MobileView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        variant="secondary"
                                        style={{
                                          width: "45%",
                                          marginLeft: "27.5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        onClick={(e) =>
                                          this.setState({
                                            mobileDisclaimerShown:
                                              !this.state.mobileDisclaimerShown,
                                          })
                                        }
                                      >
                                        DISCLAIMER:{" "}
                                        <BsFillExclamationCircleFill />
                                      </Button>

                                      <Modal
                                        show={this.state.mobileDisclaimerShown}
                                        onHide={() =>
                                          this.setState({
                                            mobileDisclaimerShown: false,
                                          })
                                        }
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title>DISCLAIMER</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          The Global Food Loss & Waste Tracker
                                          is designed, in part, to help users
                                          develop healthy eating habits. The
                                          nutritional information and dietary
                                          recommendations provided are merely
                                          suggestions which may or may not
                                          improve users' eating habits and/or
                                          overall health. This app is a
                                          self-regulatory tool, not intended to
                                          replace professional medical advice.
                                          Please always consult a dietician or
                                          medical professional for professional
                                          medical advice regarding your health.
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button
                                            variant="secondary"
                                            onClick={() =>
                                              this.setState({
                                                mobileDisclaimerShown: false,
                                              })
                                            }
                                          >
                                            Close
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-intake"
                                      >
                                        Update Food Intake
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/chart/nutrientGap"
                                      >
                                        Nutrient Gap Breakdown
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          borderColor: "rgb(94, 120, 235)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/add-products"
                                      >
                                        Upload Food
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(94, 120, 235)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                          borderColor: "rgb(94, 120, 235)",
                                        }}
                                        as={Link}
                                        to="/browse-products"
                                      >
                                        Buy Food
                                      </Button>
                                      {/* <Button>Buy Food</Button> */}

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "5%",
                                            width: "90%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Surplus Weight Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplus"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplus"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplus"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "5%",
                                            width: "90%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Surplus GHG Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusGHG"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusGHG"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusGHG"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(145, 26, 224)",
                                            borderColor: "rgb(145, 26, 224)",
                                            marginLeft: "5%",
                                            width: "90%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Surplus Cost Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekSurplusCost"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthSurplusCost"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearSurplusCost"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </MobileView>
                                  </>
                                ) : (
                                  <></>
                                )}{" "}
                              </>

                              <Button
                                className="custom-btn-2 rounded"
                                style={{
                                  height: "120px",
                                  width: "90%",
                                  marginLeft: "5%",
                                  marginBottom: "1.5%",
                                  fontWeight: 600,
                                  fontSize: "200%",
                                }}
                                onClick={() =>
                                  this.setState({
                                    foodWasteBubbleClicked:
                                      !this.state.foodWasteBubbleClicked,
                                    foodBubbleClicked: false,
                                  })
                                }
                              >
                                Food Waste
                              </Button>

                              <>
                                {this.state.foodWasteBubbleClicked ? (
                                  <>
                                    <BrowserView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(8, 105, 27)",
                                          borderColor: "rgb(8, 105, 27)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-waste"
                                      >
                                        Update Food Waste
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(8, 105, 27)",
                                          borderColor: "rgb(8, 105, 27)",
                                          width: "60%",
                                          marginLeft: "20%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-reduction"
                                      >
                                        Food Waste Reduction Tips
                                      </Button>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "60%",
                                            marginLeft: "20%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Waste Weight Performance
                                          Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/week"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/month"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/year"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "60%",
                                            marginLeft: "20%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Waste GHG Performance Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekGHG"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthGHG"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearGHG"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "60%",
                                            marginLeft: "20%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                          }}
                                        >
                                          View Food Waste Cost Performance Chart
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekCost"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthCost"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearCost"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </BrowserView>

                                    <MobileView>
                                      <Divider style={{ marginTop: "10px" }} />

                                      <Button
                                        style={{
                                          backgroundColor: "rgb(8, 105, 27)",
                                          borderColor: "rgb(8, 105, 27)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-waste"
                                      >
                                        Update Food Waste
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "rgb(8, 105, 27)",
                                          borderColor: "rgb(8, 105, 27)",
                                          width: "90%",
                                          marginLeft: "5%",
                                          marginTop: "1%",
                                          marginBottom: "1%",
                                        }}
                                        as={Link}
                                        to="/food-reduction"
                                      >
                                        Food Waste Reduction Tips
                                      </Button>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Waste Weight Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/week"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/month"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/year"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Waste GHG Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekGHG"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthGHG"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearGHG"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Dropdown>
                                        <DropdownToggle
                                          style={{
                                            backgroundColor:
                                              "rgb(76, 226, 106)",
                                            borderColor: "rgb(76, 226, 106)",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginTop: "1%",
                                            marginBottom: "1%",
                                            fontSize: "85%",
                                          }}
                                        >
                                          Food Waste Cost Performance Charts
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/weekCost"
                                          >
                                            Weekly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/monthCost"
                                          >
                                            Monthly
                                          </DropdownItem>
                                          <DropdownItem
                                            as={Link}
                                            to="/chart/yearCost"
                                          >
                                            Yearly
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>

                                      <Divider
                                        style={{ marginBottom: "10px" }}
                                      />
                                    </MobileView>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            </>
                          ) : (
                            <></>
                          )}
                        </>

                        <BrowserView>
                          <Button
                            className="custom-btn rounded"
                            style={{
                              padding: "1.5%",
                              height: "60px",
                              width: "65%",
                              marginLeft: "17.5%",
                              marginBottom: "10%",
                              fontWeight: 550,
                              fontSize: "150%",
                            }}
                            as={Link}
                            to="/change-password"
                          >
                            Change Your Password
                          </Button>
                        </BrowserView>
                        <MobileView>
                          <Button
                            className="custom-btn rounded"
                            style={{
                              padding: "5%",
                              height: "60px",
                              width: "65%",
                              marginLeft: "17.5%",
                              marginBottom: "25%",
                              fontWeight: 550,
                              fontSize: "100%",
                            }}
                            as={Link}
                            to="/change-password"
                          >
                            Change Password
                          </Button>
                        </MobileView>
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "80vh",
                          padding: "1.5% 1.5% 1.5% 1.5%",
                          marginBottom: "5%",
                        }}
                      >
                        <BrowserView>
                                <Button
                                  className="custom-btn-2 rounded"
                                  style={{
                                    height: "120px",
                                    width: "100%",
                                    marginBottom: "2.5%",
                                    fontWeight: 600,
                                    fontSize: "200%",
                                    padding: "5% 0 5% 0",
                                  }}
                                  as={Link}
                                  to="/reserve-items"
                                >
                                  Plan to Save
                                </Button>

                                <ListGroup
                                  style={{
                                    width: "100%",
                                    marginTop: "2%",
                                    marginBottom: "0.5%",
                                  }}
                                >
                                  <ListGroup.Item
                                    style={{ backgroundColor: "#FF6A63" }}
                                  >
                                    <b>NOTE: </b> This is part of the 'Fail to
                                    Plan, Plan to Fail' campaign, running from
                                    October 16th 2021 to January 31st 2021.
                                    Click 'Plan to Save' to express interest in
                                    reserving food items from local sources from
                                    June 2022. To go to your regular Account
                                    page, click the 'My Account' button below.
                                  </ListGroup.Item>
                                </ListGroup>

                                <div
                                  className="text-center"
                                  style={{ marginBottom: "-2px" }}
                                >
                                  <span>Campaign Ends: </span>
                                </div>

                                <div className="text-center">
                                  <DateStyle>
                                    <Countdown
                                      className="date"
                                      date="2022-01-31T23:59:59"
                                      style={{
                                        fontSize: "200%",
                                        fontWeight: "200",
                                      }}
                                    />
                                  </DateStyle>
                                </div>

                                <div className="text-center">
                                  <DateStyle>
                                    <span
                                      className="label"
                                      style={{ backgroundColor: "#CC2E26" }}
                                    >
                                      days : hrs : mins : secs
                                    </span>
                                  </DateStyle>
                                </div>

                                <Button
                                  variant="secondary"
                                  style={{
                                    width: "45%",
                                    marginLeft: "27.5%",
                                    marginTop: "5%",
                                    marginBottom: "1%",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      skipPTSCLicked:
                                        !this.state.skipPTSCLicked,
                                    })
                                  }
                                >
                                  My Account
                                </Button>

                                <Button
                                  className="custom-btn-3 rounded"
                                  style={{
                                    height: "50px",
                                    width: "70%",
                                    marginLeft: "15%",
                                    marginTop: "5%",
                                    marginBottom: "5%",
                                    fontSize: "150%",
                                    backgroundColor: "#AFBA15",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      PTSInfoClicked:
                                        !this.state.PTSInfoClicked,
                                    })
                                  }
                                >
                                  {" "}
                                  What is the Plan to Save?
                                </Button>

                                <>
                                  {this.state.PTSInfoClicked ? (
                                    <>
                                      <Card
                                        style={{
                                          width: "100%",
                                          height: "1650px",
                                        }}
                                      >
                                        <Card.Img
                                          variant="top"
                                          src={pTSBanner}
                                        />
                                        <div
                                          className="text-center"
                                          style={{
                                            width: "100%",
                                            backgroundColor: "#05042E",
                                          }}
                                        >
                                          <h1
                                            style={{
                                              fontWeight: "700",
                                              color: "white",
                                              marginTop: "2%",
                                            }}
                                          >
                                            How Does It Work?
                                          </h1>
                                          <p
                                            style={{
                                              color: "white",
                                              width: "90%",
                                              marginLeft: "5%",
                                            }}
                                          >
                                            If you can reserve your fresh food,
                                            local farmers can plan better in
                                            their food production to meet your
                                            need in the most sustainable way. By
                                            signing up to the Plan to Save
                                            campaign and reserving your weekly,
                                            fortnightly and monthly fresh food
                                            requirements, we will take the
                                            responsibility to identify local
                                            farmers around you or encourage the
                                            set up of local farmers to supply
                                            your reservation, ensuring the
                                            supply of nutritious food all year
                                            round for all.
                                          </p>
                                        </div>

                                        <Card.Header
                                          style={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            color: "#0C0847",
                                          }}
                                        >
                                          The key questions the campaign will be
                                          seeking to address will be centred
                                          around:
                                        </Card.Header>
                                        <ListGroup
                                          variant="flush"
                                          style={{ fontSize: "15px" }}
                                        >
                                          <ListGroup.Item>
                                            1. Have you witnessed empty shelves
                                            in your grocery store during the
                                            pandemic?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            2. Have you wondered why we waste
                                            over 1.3 billion tonnes of food
                                            every year when over 800 million
                                            people are hungry?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            3. Do you know that our current
                                            AgriFood production system
                                            contribute over 30% of Greenhouse
                                            gas emission?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            4. Are you are aware that 1 in 5
                                            death is linked to malnutrition?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            5. Does the lack of HGV Drivers to
                                            support the food system create a
                                            concern for you?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            6. Are you worried about the future
                                            of food?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            7. Do you know that you can help
                                            address most of these problems if
                                            you can change your attitude to
                                            food?
                                          </ListGroup.Item>
                                        </ListGroup>
                                        <div
                                          className="text-center"
                                          style={{
                                            width: "100%",
                                            backgroundColor: "#AFBA15 ",
                                            color: "white",
                                          }}
                                        >
                                          <p
                                            style={{
                                              width: "90%",
                                              marginLeft: "5%",
                                            }}
                                          >
                                            The recent UNFAO, UNEP, IPCC and
                                            IntelliDigest report has highlighted
                                            the impact of the broken food system
                                            on climate change and the need for
                                            everyone to act now to address the
                                            challenge.
                                          </p>
                                          <p
                                            style={{
                                              width: "90%",
                                              marginLeft: "5%",
                                            }}
                                          >
                                            Evolving a food system that is
                                            resilient and secure has never been
                                            more important than during the
                                            COVID-19 pandemic and as we face the
                                            challenges of empty food shelves
                                            plus labour shortages.
                                          </p>
                                        </div>
                                        <div
                                          className="text-center"
                                          style={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            color: "#020113",
                                          }}
                                        >
                                          <h2
                                            style={{
                                              fontSize: "20px",
                                              fontWeight: "700",
                                              marginTop: "2%",
                                              marginBottom: "2%",
                                            }}
                                          >
                                            Supported By:
                                          </h2>
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  backgroundColor: "white",
                                                }}
                                              >
                                                <img
                                                  src={sTFCFoodNetwork}
                                                  alt="STFC Food Network"
                                                  className="img-fluid rounded fix-image"
                                                  style={{ marginBottom: "5%" }}
                                                />
                                              </Col>
                                              <Col
                                                style={{
                                                  backgroundColor: "white",
                                                }}
                                              >
                                                <img
                                                  src={positivePlanet}
                                                  alt="Positive Planet"
                                                  className="img-fluid rounded fix-image"
                                                  style={{ marginBottom: "2%" }}
                                                />
                                              </Col>
                                            </Row>
                                          </Container>
                                        </div>
                                        <Divider
                                          style={{ marginBottom: "10px" }}
                                        />
                                        <Card.Img
                                          variant="bottom"
                                          src={pTSNotebook}
                                        />
                                      </Card>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              </BrowserView>

                        <MobileView>
                        <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        height: "120px",
                                        width: "100%",
                                        marginBottom: "2.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                        padding: "5% 0 5% 0",
                                      }}
                                      as={Link}
                                      to="/reserve-items"
                                    >
                                      Plan to Save
                                    </Button>

                                    <ListGroup
                                      style={{
                                        width: "100%",
                                        marginTop: "2%",
                                        marginBottom: "0.5%",
                                      }}
                                    >
                                      <ListGroup.Item
                                        style={{ backgroundColor: "#FF6A63" }}
                                      >
                                        <b>NOTE: </b> This is part of the 'Fail
                                        to Plan, Plan to Fail' campaign, running
                                        from October 16th 2021 to January 31st
                                        2021. Click 'Plan to Save' to express
                                        interest in reserving food items from
                                        local sources from June 2022. To go to
                                        your regular Account page, click the 'My
                                        Account' button below.
                                      </ListGroup.Item>
                                    </ListGroup>

                                    <div
                                      className="text-center"
                                      style={{ marginBottom: "-2px" }}
                                    >
                                      <span>Campaign Ends: </span>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <Countdown
                                          className="date"
                                          date="2022-01-31T23:59:59"
                                          style={{
                                            fontSize: "200%",
                                            fontWeight: "200",
                                          }}
                                        />
                                      </DateStyle>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <span
                                          className="label"
                                          style={{ backgroundColor: "#CC2E26" }}
                                        >
                                          days : hrs : mins : secs
                                        </span>
                                      </DateStyle>
                                    </div>

                                    <Button
                                      variant="secondary"
                                      style={{
                                        width: "45%",
                                        marginLeft: "27.5%",
                                        marginTop: "5%",
                                        marginBottom: "1%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          skipPTSCLicked:
                                            !this.state.skipPTSCLicked,
                                        })
                                      }
                                    >
                                      My Account
                                    </Button>

                                    <Button
                                      className="custom-btn-3 rounded"
                                      style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        marginTop: "5%",
                                        marginBottom: "5%",
                                        backgroundColor: "#AFBA15",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          PTSInfoClicked:
                                            !this.state.PTSInfoClicked,
                                        })
                                      }
                                    >
                                      {" "}
                                      What is the Plan to Save?
                                    </Button>

                                    <>
                                      {this.state.PTSInfoClicked ? (
                                        <>
                                          <Card
                                            style={{
                                              width: "100%",
                                              height: "1650px",
                                            }}
                                          >
                                            <Card.Img
                                              variant="top"
                                              src={pTSBanner}
                                            />
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#05042E",
                                              }}
                                            >
                                              <h1
                                                style={{
                                                  fontWeight: "700",
                                                  color: "white",
                                                  marginTop: "2%",
                                                }}
                                              >
                                                How Does It Work?
                                              </h1>
                                              <p
                                                style={{
                                                  color: "white",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                If you can reserve your fresh
                                                food, local farmers can plan
                                                better in their food production
                                                to meet your need in the most
                                                sustainable way. By signing up
                                                to the Plan to Save campaign and
                                                reserving your weekly,
                                                fortnightly and monthly fresh
                                                food requirements, we will take
                                                the responsibility to identify
                                                local farmers around you or
                                                encourage the set up of local
                                                farmers to supply your
                                                reservation, ensuring the supply
                                                of nutritious food all year
                                                round for all.
                                              </p>
                                            </div>

                                            <Card.Header
                                              style={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#0C0847",
                                              }}
                                            >
                                              The key questions the campaign
                                              will be seeking to address will be
                                              centred around:
                                            </Card.Header>
                                            <ListGroup
                                              variant="flush"
                                              style={{ fontSize: "15px" }}
                                            >
                                              <ListGroup.Item>
                                                1. Have you witnessed empty
                                                shelves in your grocery store
                                                during the pandemic?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                2. Have you wondered why we
                                                waste over 1.3 billion tonnes of
                                                food every year when over 800
                                                million people are hungry?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                3. Do you know that our current
                                                AgriFood production system
                                                contribute over 30% of
                                                Greenhouse gas emission?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                4. Are you are aware that 1 in 5
                                                death is linked to malnutrition?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                5. Does the lack of HGV Drivers
                                                to support the food system
                                                create a concern for you?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                6. Are you worried about the
                                                future of food?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                7. Do you know that you can help
                                                address most of these problems
                                                if you can change your attitude
                                                to food?
                                              </ListGroup.Item>
                                            </ListGroup>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#AFBA15 ",
                                                color: "white",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                The recent UNFAO, UNEP, IPCC and
                                                IntelliDigest report has
                                                highlighted the impact of the
                                                broken food system on climate
                                                change and the need for everyone
                                                to act now to address the
                                                challenge.
                                              </p>
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                Evolving a food system that is
                                                resilient and secure has never
                                                been more important than during
                                                the COVID-19 pandemic and as we
                                                face the challenges of empty
                                                food shelves plus labour
                                                shortages.
                                              </p>
                                            </div>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "white",
                                                color: "#020113",
                                              }}
                                            >
                                              <h2
                                                style={{
                                                  fontSize: "20px",
                                                  fontWeight: "700",
                                                  marginTop: "2%",
                                                  marginBottom: "2%",
                                                }}
                                              >
                                                Supported By:
                                              </h2>
                                              <Container>
                                                <Row>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={sTFCFoodNetwork}
                                                      alt="STFC Food Network"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "5%",
                                                      }}
                                                    />
                                                  </Col>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={positivePlanet}
                                                      alt="Positive Planet"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "2%",
                                                      }}
                                                    />
                                                  </Col>
                                                </Row>
                                              </Container>
                                            </div>
                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                            <Card.Img
                                              variant="bottom"
                                              src={pTSNotebook}
                                            />
                                          </Card>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                        </MobileView>
                      </div>
                    )}
                  </>
                ) 
                //#endregion
                 : (
                  //#region BUISNESS ACCOUNT
                  <>
                    <div>
                      {profile.buildingFunction !== "Households" &&
                      profile.uniRole !== "Student" ? (
                        <>
                          {this.state.skipPTSCLicked ? (
                            <div
                              style={{
                                height: "80vh",
                                padding: "1.5% 1.5% 1.5% 1.5%",
                                marginBottom: "5%",
                              }}
                            >
                              <Button
                                className="custom-btn-3 rounded"
                                style={{
                                  height: "120px",
                                  width: "100%",
                                  marginBottom: "2.5%",
                                  fontWeight: 600,
                                  fontSize: "200%",
                                }}
                                onClick={() =>
                                  this.setState({
                                    businessBubbleClicked:
                                      !this.state.businessBubbleClicked,
                                    householdBubbleClicked: false,
                                  })
                                }
                              >
                                Business
                              </Button>

                              <>
                                {this.state.businessBubbleClicked ? (
                                  <>
                                    <Button
                                      className="custom-btn rounded"
                                      style={{
                                        height: "120px",
                                        width: "90%",
                                        marginLeft: "5%",
                                        marginBottom: "1.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          foodBubbleClicked:
                                            !this.state.foodBubbleClicked,
                                          foodWasteBubbleClicked: false,
                                        })
                                      }
                                    >
                                      Food
                                    </Button>

                                    <>
                                      {this.state.foodBubbleClicked ? (
                                        <>
                                          <BrowserView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/add-products-business"
                                            >
                                              Upload Food (Business)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/browse-products"
                                            >
                                              Buy Food
                                            </Button>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "20%",
                                                  width: "60%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Surplus Weight
                                                Performance Chart (Business)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "20%",
                                                  width: "60%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Surplus GHG
                                                Performance Chart (Business)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusGHGBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusGHGBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusGHGBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "20%",
                                                  width: "60%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Surplus Cost
                                                Performance Chart (Business)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusCostBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusCostBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusCostBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </BrowserView>

                                          <MobileView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/add-products-business"
                                            >
                                              Upload Food (Business)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                              }}
                                              as={Link}
                                              to="/browse-products"
                                            >
                                              Buy Food
                                            </Button>
                                            {/* <Button>Buy Food</Button> */}

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "5%",
                                                  width: "90%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Surplus Weight Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "5%",
                                                  width: "90%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Surplus GHG Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusGHGBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusGHGBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusGHGBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "5%",
                                                  width: "90%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Surplus Cost Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusCostBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusCostBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusCostBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </MobileView>
                                        </>
                                      ) : (
                                        <></>
                                      )}{" "}
                                    </>

                                    <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        height: "120px",
                                        width: "90%",
                                        marginLeft: "5%",
                                        marginBottom: "1.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          foodWasteBubbleClicked:
                                            !this.state.foodWasteBubbleClicked,
                                          foodBubbleClicked: false,
                                        })
                                      }
                                    >
                                      Food Waste
                                    </Button>

                                    <>
                                      {this.state.foodWasteBubbleClicked ? (
                                        <>
                                          <BrowserView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-wasteBusiness"
                                            >
                                              Update Food Waste (Business)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-reduction"
                                            >
                                              Food Waste Reduction Tips
                                            </Button>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Waste Weight
                                                Performance Chart (Business)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Waste GHG Performance
                                                Chart (Business)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekGHGBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthGHGBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearGHGBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Waste Cost Performance
                                                Chart (Business)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekCostBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthCostBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearCostBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </BrowserView>

                                          <MobileView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-wasteBusiness"
                                            >
                                              Update Food Waste (Business)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-reduction"
                                            >
                                              Food Waste Reduction Tips
                                            </Button>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Waste Weight Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Waste GHG Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekGHGBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthGHGBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearGHGBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Waste Cost Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekCostBusiness"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthCostBusiness"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearCostBusiness"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </MobileView>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>

                              <Button
                                className="custom-btn-4 rounded"
                                style={{
                                  height: "120px",
                                  width: "100%",
                                  marginBottom: "2.5%",
                                  fontWeight: 600,
                                  fontSize: "200%",
                                }}
                                onClick={() =>
                                  this.setState({
                                    householdBubbleClicked:
                                      !this.state.householdBubbleClicked,
                                    businessBubbleClicked: false,
                                  })
                                }
                              >
                                Household/Personal
                              </Button>

                              <>
                                {this.state.householdBubbleClicked ? (
                                  <>
                                    <Button
                                      className="custom-btn rounded"
                                      style={{
                                        height: "120px",
                                        width: "90%",
                                        marginLeft: "5%",
                                        marginBottom: "1.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          foodBubbleClicked:
                                            !this.state.foodBubbleClicked,
                                          foodWasteBubbleClicked: false,
                                        })
                                      }
                                    >
                                      Food
                                    </Button>

                                    <>
                                      {this.state.foodBubbleClicked ? (
                                        <>
                                          <BrowserView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <ListGroup
                                              style={{
                                                width: "105%",
                                                marginLeft: "-2.5%",
                                                marginTop: "2%",
                                                marginBottom: "2%",
                                              }}
                                            >
                                              <ListGroup.Item variant="primary">
                                                <b>DISCLAIMER: </b> The Global
                                                Food Loss & Waste Tracker is
                                                designed, in part, to help users
                                                develop healthy eating habits.
                                                The nutritional information and
                                                dietary recommendations provided
                                                are merely suggestions which may
                                                or may not improve users' eating
                                                habits and/or overall health.
                                                This app is a self-regulatory
                                                tool, not intended to replace
                                                professional medical advice.
                                                Please always consult a
                                                dietician or medical
                                                professional for professional
                                                medical advice regarding your
                                                health.
                                              </ListGroup.Item>
                                            </ListGroup>

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-intake"
                                            >
                                              Update Food Intake
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/chart/nutrientGap"
                                            >
                                              Nutrient Gap Breakdown
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/add-products"
                                            >
                                              Upload Food (Household)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/browse-products"
                                            >
                                              Buy Food
                                            </Button>

                                            {/* <Button></Button> */}
                                            {/* <Button></Button> */}

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "20%",
                                                  width: "60%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Surplus Weight
                                                Performance Chart (Household)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplus"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplus"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplus"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "20%",
                                                  width: "60%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Surplus GHG
                                                Performance Chart (Household)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusGHG"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusGHG"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusGHG"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "20%",
                                                  width: "60%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Surplus Cost
                                                Performance Chart (Household)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusCost"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusCost"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusCost"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </BrowserView>

                                          <MobileView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              variant="secondary"
                                              style={{
                                                width: "45%",
                                                marginLeft: "27.5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              onClick={(e) =>
                                                this.setState({
                                                  mobileDisclaimerShown:
                                                    !this.state
                                                      .mobileDisclaimerShown,
                                                })
                                              }
                                            >
                                              DISCLAIMER:{" "}
                                              <BsFillExclamationCircleFill />
                                            </Button>

                                            <Modal
                                              show={
                                                this.state.mobileDisclaimerShown
                                              }
                                              onHide={() =>
                                                this.setState({
                                                  mobileDisclaimerShown: false,
                                                })
                                              }
                                            >
                                              <Modal.Header closeButton>
                                                <Modal.Title>
                                                  DISCLAIMER
                                                </Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                The Global Food Loss & Waste
                                                Tracker is designed, in part, to
                                                help users develop healthy
                                                eating habits. The nutritional
                                                information and dietary
                                                recommendations provided are
                                                merely suggestions which may or
                                                may not improve users' eating
                                                habits and/or overall health.
                                                This app is a self-regulatory
                                                tool, not intended to replace
                                                professional medical advice.
                                                Please always consult a
                                                dietician or medical
                                                professional for professional
                                                medical advice regarding your
                                                health.
                                              </Modal.Body>
                                              <Modal.Footer>
                                                <Button
                                                  variant="secondary"
                                                  onClick={() =>
                                                    this.setState({
                                                      mobileDisclaimerShown: false,
                                                    })
                                                  }
                                                >
                                                  Close
                                                </Button>
                                              </Modal.Footer>
                                            </Modal>

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-intake"
                                            >
                                              Update Food Intake
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/chart/nutrientGap"
                                            >
                                              Nutrient Gap Breakdown
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/add-products"
                                            >
                                              Upload Food (Household)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(94, 120, 235)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                                borderColor:
                                                  "rgb(94, 120, 235)",
                                              }}
                                              as={Link}
                                              to="/browse-products"
                                            >
                                              Buy Food
                                            </Button>
                                            {/* <Button>Buy Food</Button> */}

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "5%",
                                                  width: "90%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Surplus Weight Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplus"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplus"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplus"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "5%",
                                                  width: "90%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Surplus GHG Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusGHG"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusGHG"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusGHG"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(145, 26, 224)",
                                                  borderColor:
                                                    "rgb(145, 26, 224)",
                                                  marginLeft: "5%",
                                                  width: "90%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Surplus Cost Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekSurplusCost"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthSurplusCost"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearSurplusCost"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </MobileView>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>

                                    <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        height: "120px",
                                        width: "90%",
                                        marginLeft: "5%",
                                        marginBottom: "1.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          foodWasteBubbleClicked:
                                            !this.state.foodWasteBubbleClicked,
                                          foodBubbleClicked: false,
                                        })
                                      }
                                    >
                                      Food Waste
                                    </Button>

                                    <>
                                      {this.state.foodWasteBubbleClicked ? (
                                        <>
                                          <BrowserView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-waste"
                                            >
                                              Update Food Waste (Household)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "60%",
                                                marginLeft: "20%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-reduction"
                                            >
                                              Food Waste Reduction Tips
                                            </Button>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Waste Weight
                                                Performance Chart (Household)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/week"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/month"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/year"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Waste GHG Performance
                                                Chart (Household)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekGHG"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthGHG"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearGHG"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                }}
                                              >
                                                View Food Waste Cost Performance
                                                Chart (Household)
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekCost"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthCost"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearCost"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </BrowserView>

                                          <MobileView>
                                            <Divider
                                              style={{ marginTop: "10px" }}
                                            />

                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-waste"
                                            >
                                              Update Food Waste (Household)
                                            </Button>
                                            <Button
                                              style={{
                                                backgroundColor:
                                                  "rgb(8, 105, 27)",
                                                borderColor: "rgb(8, 105, 27)",
                                                width: "90%",
                                                marginLeft: "5%",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                              as={Link}
                                              to="/food-reduction"
                                            >
                                              Food Waste Reduction Tips
                                            </Button>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Waste Weight Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/week"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/month"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/year"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Waste GHG Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekGHG"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthGHG"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearGHG"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Dropdown>
                                              <DropdownToggle
                                                style={{
                                                  backgroundColor:
                                                    "rgb(76, 226, 106)",
                                                  borderColor:
                                                    "rgb(76, 226, 106)",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                  marginTop: "1%",
                                                  marginBottom: "1%",
                                                  fontSize: "85%",
                                                }}
                                              >
                                                Food Waste Cost Performance
                                                Charts
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/weekCost"
                                                >
                                                  Weekly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/monthCost"
                                                >
                                                  Monthly
                                                </DropdownItem>
                                                <DropdownItem
                                                  as={Link}
                                                  to="/chart/yearCost"
                                                >
                                                  Yearly
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>

                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                          </MobileView>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>

                              <BrowserView>
                                <Button
                                  className="custom-btn rounded"
                                  style={{
                                    padding: "1.5%",
                                    height: "60px",
                                    width: "65%",
                                    marginLeft: "17.5%",
                                    marginBottom: "10%",
                                    fontWeight: 550,
                                    fontSize: "150%",
                                  }}
                                  as={Link}
                                  to="/change-password"
                                >
                                  Change Your Password
                                </Button>
                              </BrowserView>
                              <MobileView>
                                <Button
                                  className="custom-btn rounded"
                                  style={{
                                    padding: "5%",
                                    height: "60px",
                                    width: "65%",
                                    marginLeft: "17.5%",
                                    marginBottom: "25%",
                                    fontWeight: 550,
                                    fontSize: "100%",
                                  }}
                                  as={Link}
                                  to="/change-password"
                                >
                                  Change Password
                                </Button>
                              </MobileView>
                            </div>
                          ) : (
                            <div
                              style={{
                                height: "80vh",
                                padding: "1.5% 1.5% 1.5% 1.5%",
                                marginBottom: "5%",
                              }}
                            >
                              <BrowserView>
                                <Button
                                  className="custom-btn-2 rounded"
                                  style={{
                                    height: "120px",
                                    width: "100%",
                                    marginBottom: "2.5%",
                                    fontWeight: 600,
                                    fontSize: "200%",
                                    padding: "5% 0 5% 0",
                                  }}
                                  as={Link}
                                  to="/reserve-items"
                                >
                                  Plan to Save
                                </Button>

                                <ListGroup
                                  style={{
                                    width: "100%",
                                    marginTop: "2%",
                                    marginBottom: "0.5%",
                                  }}
                                >
                                  <ListGroup.Item
                                    style={{ backgroundColor: "#FF6A63" }}
                                  >
                                    <b>NOTE: </b> This is part of the 'Fail to
                                    Plan, Plan to Fail' campaign, running from
                                    October 16th 2021 to January 31st 2021.
                                    Click 'Plan to Save' to express interest in
                                    reserving food items from local sources from
                                    June 2022. To go to your regular Account
                                    page, click the 'My Account' button below.
                                  </ListGroup.Item>
                                </ListGroup>

                                <div
                                  className="text-center"
                                  style={{ marginBottom: "-2px" }}
                                >
                                  <span>Campaign Ends: </span>
                                </div>

                                <div className="text-center">
                                  <DateStyle>
                                    <Countdown
                                      className="date"
                                      date="2022-01-31T23:59:59"
                                      style={{
                                        fontSize: "200%",
                                        fontWeight: "200",
                                      }}
                                    />
                                  </DateStyle>
                                </div>

                                <div className="text-center">
                                  <DateStyle>
                                    <span
                                      className="label"
                                      style={{ backgroundColor: "#CC2E26" }}
                                    >
                                      days : hrs : mins : secs
                                    </span>
                                  </DateStyle>
                                </div>

                                <Button
                                  variant="secondary"
                                  style={{
                                    width: "45%",
                                    marginLeft: "27.5%",
                                    marginTop: "5%",
                                    marginBottom: "1%",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      skipPTSCLicked:
                                        !this.state.skipPTSCLicked,
                                    })
                                  }
                                >
                                  My Account
                                </Button>

                                <Button
                                  className="custom-btn-3 rounded"
                                  style={{
                                    width: "70%",
                                    marginLeft: "15%",
                                    marginTop: "5%",
                                    marginBottom: "5%",
                                    backgroundColor: "#AFBA15",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      PTSInfoClicked:
                                        !this.state.PTSInfoClicked,
                                    })
                                  }
                                >
                                  {" "}
                                  What is the Plan to Save?
                                </Button>

                                <>
                                  {this.state.PTSInfoClicked ? (
                                    <>
                                      <Card
                                        style={{
                                          width: "100%",
                                          height: "1650px",
                                        }}
                                      >
                                        <Card.Img
                                          variant="top"
                                          src={pTSBanner}
                                        />
                                        <div
                                          className="text-center"
                                          style={{
                                            width: "100%",
                                            backgroundColor: "#05042E",
                                          }}
                                        >
                                          <h1
                                            style={{
                                              fontWeight: "700",
                                              color: "white",
                                              marginTop: "2%",
                                            }}
                                          >
                                            How Does It Work?
                                          </h1>
                                          <p
                                            style={{
                                              color: "white",
                                              width: "90%",
                                              marginLeft: "5%",
                                            }}
                                          >
                                            If you can reserve your fresh food,
                                            local farmers can plan better in
                                            their food production to meet your
                                            need in the most sustainable way. By
                                            signing up to the Plan to Save
                                            campaign and reserving your weekly,
                                            fortnightly and monthly fresh food
                                            requirements, we will take the
                                            responsibility to identify local
                                            farmers around you or encourage the
                                            set up of local farmers to supply
                                            your reservation, ensuring the
                                            supply of nutritious food all year
                                            round for all.
                                          </p>
                                        </div>

                                        <Card.Header
                                          style={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            color: "#0C0847",
                                          }}
                                        >
                                          The key questions the campaign will be
                                          seeking to address will be centred
                                          around:
                                        </Card.Header>
                                        <ListGroup
                                          variant="flush"
                                          style={{ fontSize: "15px" }}
                                        >
                                          <ListGroup.Item>
                                            1. Have you witnessed empty shelves
                                            in your grocery store during the
                                            pandemic?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            2. Have you wondered why we waste
                                            over 1.3 billion tonnes of food
                                            every year when over 800 million
                                            people are hungry?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            3. Do you know that our current
                                            AgriFood production system
                                            contribute over 30% of Greenhouse
                                            gas emission?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            4. Are you are aware that 1 in 5
                                            death is linked to malnutrition?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            5. Does the lack of HGV Drivers to
                                            support the food system create a
                                            concern for you?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            6. Are you worried about the future
                                            of food?
                                          </ListGroup.Item>
                                          <ListGroup.Item>
                                            7. Do you know that you can help
                                            address most of these problems if
                                            you can change your attitude to
                                            food?
                                          </ListGroup.Item>
                                        </ListGroup>
                                        <div
                                          className="text-center"
                                          style={{
                                            width: "100%",
                                            backgroundColor: "#AFBA15 ",
                                            color: "white",
                                          }}
                                        >
                                          <p
                                            style={{
                                              width: "90%",
                                              marginLeft: "5%",
                                            }}
                                          >
                                            The recent UNFAO, UNEP, IPCC and
                                            IntelliDigest report has highlighted
                                            the impact of the broken food system
                                            on climate change and the need for
                                            everyone to act now to address the
                                            challenge.
                                          </p>
                                          <p
                                            style={{
                                              width: "90%",
                                              marginLeft: "5%",
                                            }}
                                          >
                                            Evolving a food system that is
                                            resilient and secure has never been
                                            more important than during the
                                            COVID-19 pandemic and as we face the
                                            challenges of empty food shelves
                                            plus labour shortages.
                                          </p>
                                        </div>
                                        <div
                                          className="text-center"
                                          style={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            color: "#020113",
                                          }}
                                        >
                                          <h2
                                            style={{
                                              fontSize: "20px",
                                              fontWeight: "700",
                                              marginTop: "2%",
                                              marginBottom: "2%",
                                            }}
                                          >
                                            Supported By:
                                          </h2>
                                          <Container>
                                            <Row>
                                              <Col
                                                style={{
                                                  backgroundColor: "white",
                                                }}
                                              >
                                                <img
                                                  src={sTFCFoodNetwork}
                                                  alt="STFC Food Network"
                                                  className="img-fluid rounded fix-image"
                                                  style={{ marginBottom: "5%" }}
                                                />
                                              </Col>
                                              <Col
                                                style={{
                                                  backgroundColor: "white",
                                                }}
                                              >
                                                <img
                                                  src={positivePlanet}
                                                  alt="Positive Planet"
                                                  className="img-fluid rounded fix-image"
                                                  style={{ marginBottom: "2%" }}
                                                />
                                              </Col>
                                            </Row>
                                          </Container>
                                        </div>
                                        <Divider
                                          style={{ marginBottom: "10px" }}
                                        />
                                        <Card.Img
                                          variant="bottom"
                                          src={pTSNotebook}
                                        />
                                      </Card>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              </BrowserView>

                              <MobileView>
                              <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        height: "120px",
                                        width: "100%",
                                        marginBottom: "2.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                        padding: "5% 0 5% 0",
                                      }}
                                      as={Link}
                                      to="/reserve-items"
                                    >
                                      Plan to Save
                                    </Button>

                                    <ListGroup
                                      style={{
                                        width: "100%",
                                        marginTop: "2%",
                                        marginBottom: "0.5%",
                                      }}
                                    >
                                      <ListGroup.Item
                                        style={{ backgroundColor: "#FF6A63" }}
                                      >
                                        <b>NOTE: </b> This is part of the 'Fail
                                        to Plan, Plan to Fail' campaign, running
                                        from October 16th 2021 to January 31st
                                        2021. Click 'Plan to Save' to express
                                        interest in reserving food items from
                                        local sources from June 2022. To go to
                                        your regular Account page, click the 'My
                                        Account' button below.
                                      </ListGroup.Item>
                                    </ListGroup>

                                    <div
                                      className="text-center"
                                      style={{ marginBottom: "-2px" }}
                                    >
                                      <span>Campaign Ends: </span>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <Countdown
                                          className="date"
                                          date="2022-01-31T23:59:59"
                                          style={{
                                            fontSize: "200%",
                                            fontWeight: "200",
                                          }}
                                        />
                                      </DateStyle>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <span
                                          className="label"
                                          style={{ backgroundColor: "#CC2E26" }}
                                        >
                                          days : hrs : mins : secs
                                        </span>
                                      </DateStyle>
                                    </div>

                                    <Button
                                      variant="secondary"
                                      style={{
                                        width: "45%",
                                        marginLeft: "27.5%",
                                        marginTop: "5%",
                                        marginBottom: "1%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          skipPTSCLicked:
                                            !this.state.skipPTSCLicked,
                                        })
                                      }
                                    >
                                      My Account
                                    </Button>

                                    <Button
                                      className="custom-btn-3 rounded"
                                      style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        marginTop: "5%",
                                        marginBottom: "5%",
                                        backgroundColor: "#AFBA15",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          PTSInfoClicked:
                                            !this.state.PTSInfoClicked,
                                        })
                                      }
                                    >
                                      {" "}
                                      What is the Plan to Save?
                                    </Button>

                                    <>
                                      {this.state.PTSInfoClicked ? (
                                        <>
                                          <Card
                                            style={{
                                              width: "100%",
                                              height: "1650px",
                                            }}
                                          >
                                            <Card.Img
                                              variant="top"
                                              src={pTSBanner}
                                            />
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#05042E",
                                              }}
                                            >
                                              <h1
                                                style={{
                                                  fontWeight: "700",
                                                  color: "white",
                                                  marginTop: "2%",
                                                }}
                                              >
                                                How Does It Work?
                                              </h1>
                                              <p
                                                style={{
                                                  color: "white",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                If you can reserve your fresh
                                                food, local farmers can plan
                                                better in their food production
                                                to meet your need in the most
                                                sustainable way. By signing up
                                                to the Plan to Save campaign and
                                                reserving your weekly,
                                                fortnightly and monthly fresh
                                                food requirements, we will take
                                                the responsibility to identify
                                                local farmers around you or
                                                encourage the set up of local
                                                farmers to supply your
                                                reservation, ensuring the supply
                                                of nutritious food all year
                                                round for all.
                                              </p>
                                            </div>

                                            <Card.Header
                                              style={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#0C0847",
                                              }}
                                            >
                                              The key questions the campaign
                                              will be seeking to address will be
                                              centred around:
                                            </Card.Header>
                                            <ListGroup
                                              variant="flush"
                                              style={{ fontSize: "15px" }}
                                            >
                                              <ListGroup.Item>
                                                1. Have you witnessed empty
                                                shelves in your grocery store
                                                during the pandemic?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                2. Have you wondered why we
                                                waste over 1.3 billion tonnes of
                                                food every year when over 800
                                                million people are hungry?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                3. Do you know that our current
                                                AgriFood production system
                                                contribute over 30% of
                                                Greenhouse gas emission?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                4. Are you are aware that 1 in 5
                                                death is linked to malnutrition?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                5. Does the lack of HGV Drivers
                                                to support the food system
                                                create a concern for you?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                6. Are you worried about the
                                                future of food?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                7. Do you know that you can help
                                                address most of these problems
                                                if you can change your attitude
                                                to food?
                                              </ListGroup.Item>
                                            </ListGroup>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#AFBA15 ",
                                                color: "white",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                The recent UNFAO, UNEP, IPCC and
                                                IntelliDigest report has
                                                highlighted the impact of the
                                                broken food system on climate
                                                change and the need for everyone
                                                to act now to address the
                                                challenge.
                                              </p>
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                Evolving a food system that is
                                                resilient and secure has never
                                                been more important than during
                                                the COVID-19 pandemic and as we
                                                face the challenges of empty
                                                food shelves plus labour
                                                shortages.
                                              </p>
                                            </div>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "white",
                                                color: "#020113",
                                              }}
                                            >
                                              <h2
                                                style={{
                                                  fontSize: "20px",
                                                  fontWeight: "700",
                                                  marginTop: "2%",
                                                  marginBottom: "2%",
                                                }}
                                              >
                                                Supported By:
                                              </h2>
                                              <Container>
                                                <Row>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={sTFCFoodNetwork}
                                                      alt="STFC Food Network"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "5%",
                                                      }}
                                                    />
                                                  </Col>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={positivePlanet}
                                                      alt="Positive Planet"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "2%",
                                                      }}
                                                    />
                                                  </Col>
                                                </Row>
                                              </Container>
                                            </div>
                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                            <Card.Img
                                              variant="bottom"
                                              src={pTSNotebook}
                                            />
                                          </Card>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                              </MobileView>
                            </div>
                          )}
                        </>
                        // #endregion
                      ) : (
                        // #region UNIVERSITY ACCOUNT
                        <div>
                          {profile.buildingFunction === "Schools" &&
                          profile.uniRole === "Student" ? (
                            <>
                              {this.state.skipPTSCLicked ? (
                                <div
                                  style={{
                                    height: "120vh",
                                    padding: "1.5% 1.5% 1.5% 1.5%",
                                    marginBottom: "10%",
                                  }}
                                >
                                  <Button
                                    className="custom-btn-3 rounded"
                                    style={{
                                      height: "120px",
                                      width: "100%",
                                      marginBottom: "2.5%",
                                      fontWeight: 600,
                                      fontSize: "200%",
                                    }}
                                    onClick={() =>
                                      this.setState({
                                        universityBubbleClicked:
                                          !this.state.universityBubbleClicked,
                                        householdBubbleClicked: false,
                                      })
                                    }
                                  >
                                    University
                                  </Button>

                                  <>
                                    {this.state.universityBubbleClicked ? (
                                      <>
                                        <Button
                                          className="custom-btn rounded"
                                          style={{
                                            height: "120px",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginBottom: "2.5%",
                                            fontWeight: 600,
                                            fontSize: "200%",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              foodBubbleClicked:
                                                !this.state.foodBubbleClicked,
                                              foodWasteBubbleClicked: false,
                                            })
                                          }
                                        >
                                          Food
                                        </Button>

                                        <>
                                          {this.state.foodBubbleClicked ? (
                                            <>
                                              <BrowserView>
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/food-intakeAcademic"
                                                >
                                                  Update Food (Research)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/chart/nutrientGap"
                                                >
                                                  Nutrient Gap Breakdown
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/add-products-academic"
                                                >
                                                  Upload Food (Research)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/browse-products"
                                                >
                                                  Buy Food
                                                </Button>

                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button> */}
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button> */}

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus Weight
                                                    Performance Chart (Research)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus GHG
                                                    Performance Chart (Research)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusGHGUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusGHGUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusGHGUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus Cost
                                                    Performance Chart (Research)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusCostUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusCostUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusCostUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </BrowserView>

                                              <MobileView>
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/food-intakeAcademic"
                                                >
                                                  Update Food (Research)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/chart/nutrientGap"
                                                >
                                                  Nutrient Gap Breakdown
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/add-products-academic"
                                                >
                                                  Upload Food (Research)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/browse-products"
                                                >
                                                  Buy Food
                                                </Button>
                                                {/* <Button>Buy Food</Button> */}

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      fontSize: "85%",
                                                      marginLeft: "5%",
                                                      width: "90%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    Food Surplus Weight
                                                    Performance Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      fontSize: "85%",
                                                      marginLeft: "5%",
                                                      width: "90%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    Food Surplus GHG Performance
                                                    Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusGHGUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusGHGUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusGHGUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      fontSize: "85%",
                                                      marginLeft: "5%",
                                                      width: "90%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    Food Surplus Cost
                                                    Performance Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusCostUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusCostUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusCostUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </MobileView>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>

                                        <Button
                                          className="custom-btn-2 rounded"
                                          style={{
                                            height: "120px",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginBottom: "2.5%",
                                            fontWeight: 600,
                                            fontSize: "200%",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              foodWasteBubbleClicked:
                                                !this.state
                                                  .foodWasteBubbleClicked,
                                              foodBubbleClicked: false,
                                            })
                                          }
                                        >
                                          Food Waste
                                        </Button>

                                        <>
                                          {this.state.foodWasteBubbleClicked ? (
                                            <>
                                              <BrowserView>
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-wasteAcademic"
                                                >
                                                  Update Food Waste (Research)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-reduction"
                                                >
                                                  Food Waste Reduction Tips
                                                </Button>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "60%",
                                                      marginLeft: "20%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    View Food Waste Weight
                                                    Performance Chart (Research)
                                                  </DropdownToggle>

                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusUni">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusUni">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusUni">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "60%",
                                                      marginLeft: "20%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    View Food Waste GHG
                                                    Performance Chart (Research)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekGHGUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthGHGUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearGHGUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusGHGUni">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusGHGUni">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusGHGUni">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "60%",
                                                      marginLeft: "20%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    View Food Waste Cost
                                                    Performance Chart (Research)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekCostUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthCostUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearCostUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusCostUni">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusCostUni">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusCostUni">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </BrowserView>

                                              <MobileView>
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-wasteAcademic"
                                                >
                                                  Update Food Waste (Research)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-reduction"
                                                >
                                                  Food Waste Reduction Tips
                                                </Button>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                      fontSize: "85%",
                                                    }}
                                                  >
                                                    Food Waste Weight
                                                    Performance Charts
                                                  </DropdownToggle>

                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusUni">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusUni">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusUni">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                      fontSize: "85%",
                                                    }}
                                                  >
                                                    Food Waste GHG Performance
                                                    Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekGHGUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthGHGUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearGHGUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    <Dropdown.Divider />

                                                    {/* <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusGHGUni">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusGHGUni">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusGHGUni">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                      fontSize: "85%",
                                                    }}
                                                  >
                                                    Food Waste Cost Performance
                                                    Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekCostUni"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthCostUni"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearCostUni"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusCostUni">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusCostUni">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusCostUni">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </MobileView>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>

                                  <Button
                                    className="custom-btn-4 rounded"
                                    style={{
                                      height: "120px",
                                      width: "100%",
                                      marginBottom: "2.5%",
                                      fontWeight: 600,
                                      fontSize: "200%",
                                    }}
                                    onClick={() =>
                                      this.setState({
                                        householdBubbleClicked:
                                          !this.state.householdBubbleClicked,
                                        universityBubbleClicked: false,
                                      })
                                    }
                                  >
                                    Household/Personal
                                  </Button>

                                  <>
                                    {this.state.householdBubbleClicked ? (
                                      <>
                                        <Button
                                          className="custom-btn rounded"
                                          style={{
                                            height: "120px",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginBottom: "2.5%",
                                            fontWeight: 600,
                                            fontSize: "200%",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              foodBubbleClicked:
                                                !this.state.foodBubbleClicked,
                                              foodWasteBubbleClicked: false,
                                            })
                                          }
                                        >
                                          Food
                                        </Button>

                                        <>
                                          {this.state.foodBubbleClicked ? (
                                            <>
                                              <BrowserView>
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <ListGroup
                                                  style={{
                                                    width: "105%",
                                                    marginLeft: "-2.5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                  }}
                                                >
                                                  <ListGroup.Item variant="primary">
                                                    <b>DISCLAIMER: </b> The
                                                    Global Food Loss & Waste
                                                    Tracker is designed, in
                                                    part, to help users develop
                                                    healthy eating habits. The
                                                    nutritional information and
                                                    dietary recommendations
                                                    provided are merely
                                                    suggestions which may or may
                                                    not improve users' eating
                                                    habits and/or overall
                                                    health. This app is a
                                                    self-regulatory tool, not
                                                    intended to replace
                                                    professional medical advice.
                                                    Please always consult a
                                                    dietician or medical
                                                    professional for
                                                    professional medical advice
                                                    regarding your health.
                                                  </ListGroup.Item>
                                                </ListGroup>

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/food-intake"
                                                >
                                                  Update Food Intake (Household)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/chart/nutrientGap"
                                                >
                                                  Nutrient Gap Breakdown
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/add-products"
                                                >
                                                  Upload Food (Household)
                                                </Button>
                                                {/* <Button>Buy Food</Button> */}
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/browse-products"
                                                >
                                                  Buy Food
                                                </Button>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus Weight
                                                    Performance Chart
                                                    (Household)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplus"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplus"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplus"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus GHG
                                                    Performance Chart
                                                    (Household)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusGHG"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusGHG"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusGHG"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus Cost
                                                    Performance Chart
                                                    (Household)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusCost"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusCost"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusCost"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </BrowserView>

                                              <MobileView>
                                                <div
                                                  style={{ marginTop: "-1.5%" }}
                                                >
                                                  <Divider
                                                    style={{
                                                      marginTop: "10px",
                                                    }}
                                                  />

                                                  {/* <div style={{marginLeft: "30%", marginBottom: "2%", marginTop: "1%", backgroundColor: "gray", padding: "1px 1px 1px 1px", width: "45%"}}>
                                  <b onClick={(e) => this.setState({mobileDisclaimerShown: !this.state.mobileDisclaimerShown})}>DISCLAIMER: {" "}<BsFillExclamationCircleFill style={{marginTop: "-2.5px"}}/></b>
                                </div> */}

                                                  <Button
                                                    variant="secondary"
                                                    style={{
                                                      width: "45%",
                                                      marginLeft: "27.5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                    }}
                                                    onClick={(e) =>
                                                      this.setState({
                                                        mobileDisclaimerShown:
                                                          !this.state
                                                            .mobileDisclaimerShown,
                                                      })
                                                    }
                                                  >
                                                    DISCLAIMER:{" "}
                                                    <BsFillExclamationCircleFill />
                                                  </Button>

                                                  <Modal
                                                    show={
                                                      this.state
                                                        .mobileDisclaimerShown
                                                    }
                                                    onHide={() =>
                                                      this.setState({
                                                        mobileDisclaimerShown: false,
                                                      })
                                                    }
                                                  >
                                                    <Modal.Header closeButton>
                                                      <Modal.Title>
                                                        DISCLAIMER
                                                      </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                      The Global Food Loss &
                                                      Waste Tracker is designed,
                                                      in part, to help users
                                                      develop healthy eating
                                                      habits. The nutritional
                                                      information and dietary
                                                      recommendations provided
                                                      are merely suggestions
                                                      which may or may not
                                                      improve users' eating
                                                      habits and/or overall
                                                      health. This app is a
                                                      self-regulatory tool, not
                                                      intended to replace
                                                      professional medical
                                                      advice. Please always
                                                      consult a dietician or
                                                      medical professional for
                                                      professional medical
                                                      advice regarding your
                                                      health.
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                      <Button
                                                        variant="secondary"
                                                        onClick={() =>
                                                          this.setState({
                                                            mobileDisclaimerShown: false,
                                                          })
                                                        }
                                                      >
                                                        Close
                                                      </Button>
                                                    </Modal.Footer>
                                                  </Modal>

                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(94, 120, 235)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(94, 120, 235)",
                                                    }}
                                                    as={Link}
                                                    to="/food-intake"
                                                  >
                                                    Update Food Intake
                                                    (Household)
                                                  </Button>
                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(94, 120, 235)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(94, 120, 235)",
                                                    }}
                                                    as={Link}
                                                    to="/chart/nutrientGap"
                                                  >
                                                    Nutrient Gap Breakdown
                                                  </Button>
                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(94, 120, 235)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(94, 120, 235)",
                                                    }}
                                                    as={Link}
                                                    to="/add-products"
                                                  >
                                                    Upload Food (Household)
                                                  </Button>
                                                  {/* <Button>Buy Food</Button> */}
                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(94, 120, 235)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(94, 120, 235)",
                                                    }}
                                                    as={Link}
                                                    to="/browse-products"
                                                  >
                                                    Buy Food
                                                  </Button>

                                                  <Dropdown>
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "rgb(145, 26, 224)",
                                                        fontSize: "85%",
                                                        marginLeft: "5%",
                                                        width: "90%",
                                                        marginTop: "1%",
                                                        marginBottom: "1%",
                                                        borderColor:
                                                          "rgb(145, 26, 224)",
                                                      }}
                                                    >
                                                      Food Surplus Weight
                                                      Performance Charts
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/weekSurplus"
                                                      >
                                                        Weekly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/monthSurplus"
                                                      >
                                                        Monthly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/yearSurplus"
                                                      >
                                                        Yearly
                                                      </DropdownItem>
                                                    </DropdownMenu>
                                                  </Dropdown>

                                                  <Dropdown>
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "rgb(145, 26, 224)",
                                                        fontSize: "85%",
                                                        marginLeft: "5%",
                                                        width: "90%",
                                                        marginTop: "1%",
                                                        marginBottom: "1%",
                                                        borderColor:
                                                          "rgb(145, 26, 224)",
                                                      }}
                                                    >
                                                      Food Surplus GHG
                                                      Performance Charts
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/weekSurplusGHG"
                                                      >
                                                        Weekly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/monthSurplusGHG"
                                                      >
                                                        Monthly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/yearSurplusGHG"
                                                      >
                                                        Yearly
                                                      </DropdownItem>
                                                    </DropdownMenu>
                                                  </Dropdown>

                                                  <Dropdown>
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "rgb(145, 26, 224)",
                                                        fontSize: "85%",
                                                        marginLeft: "5%",
                                                        width: "90%",
                                                        marginTop: "1%",
                                                        marginBottom: "1%",
                                                        borderColor:
                                                          "rgb(145, 26, 224)",
                                                      }}
                                                    >
                                                      Food Surplus Cost
                                                      Performance Charts
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/weekSurplusCost"
                                                      >
                                                        Weekly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/monthSurplusCost"
                                                      >
                                                        Monthly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/yearSurplusCost"
                                                      >
                                                        Yearly
                                                      </DropdownItem>
                                                    </DropdownMenu>
                                                  </Dropdown>

                                                  <Divider
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  />
                                                </div>
                                              </MobileView>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>

                                        <Button
                                          className="custom-btn-2 rounded"
                                          style={{
                                            height: "120px",
                                            width: "90%",
                                            marginLeft: "5%",
                                            marginBottom: "2.5%",
                                            fontWeight: 600,
                                            fontSize: "200%",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              foodWasteBubbleClicked:
                                                !this.state
                                                  .foodWasteBubbleClicked,
                                              foodBubbleClicked: false,
                                            })
                                          }
                                        >
                                          Food Waste
                                        </Button>

                                        <>
                                          {this.state.foodWasteBubbleClicked ? (
                                            <>
                                              <BrowserView>
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-waste"
                                                >
                                                  Update Food Waste (Household)
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-reduction"
                                                >
                                                  Food Waste Reduction Tips
                                                </Button>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "60%",
                                                      marginLeft: "20%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    View Food Waste Weight
                                                    Performance Chart
                                                    (Household)
                                                  </DropdownToggle>

                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/week"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/month"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/year"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "60%",
                                                      marginLeft: "20%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    View Food Waste GHG
                                                    Performance Chart
                                                    (Household)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekGHG"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthGHG"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearGHG"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      width: "60%",
                                                      marginLeft: "20%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    View Food Waste Cost
                                                    Performance Chart
                                                    (Household)
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekCost"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthCost"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearCost"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </BrowserView>

                                              <MobileView>
                                                <div
                                                  style={{ marginTop: "-1.5%" }}
                                                >
                                                  <Divider
                                                    style={{
                                                      marginTop: "10px",
                                                    }}
                                                  />

                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(8, 105, 27)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(8, 105, 27)",
                                                    }}
                                                    as={Link}
                                                    to="/food-waste"
                                                  >
                                                    Update Food Waste
                                                    (Household)
                                                  </Button>
                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(8, 105, 27)",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "1%",
                                                      marginBottom: "1%",
                                                      borderColor:
                                                        "rgb(8, 105, 27)",
                                                    }}
                                                    as={Link}
                                                    to="/food-reduction"
                                                  >
                                                    Food Waste Reduction Tips
                                                  </Button>

                                                  <Dropdown>
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "rgb(76, 226, 106)",
                                                        width: "90%",
                                                        marginLeft: "5%",
                                                        marginTop: "1%",
                                                        marginBottom: "1%",
                                                        borderColor:
                                                          "rgb(76, 226, 106)",
                                                        fontSize: "85%",
                                                      }}
                                                    >
                                                      Food Waste Weight
                                                      Performance Charts
                                                    </DropdownToggle>

                                                    <DropdownMenu>
                                                      {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                      {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/week"
                                                      >
                                                        Weekly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/month"
                                                      >
                                                        Monthly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/year"
                                                      >
                                                        Yearly
                                                      </DropdownItem>

                                                      {/* <Dropdown.Divider />

                                      <Dropdown.Header>Food Surplus</Dropdown.Header>
                                      <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                                      <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                                      <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem> */}
                                                    </DropdownMenu>
                                                  </Dropdown>

                                                  <Dropdown>
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "rgb(76, 226, 106)",
                                                        width: "90%",
                                                        marginLeft: "5%",
                                                        marginTop: "1%",
                                                        marginBottom: "1%",
                                                        borderColor:
                                                          "rgb(76, 226, 106)",
                                                        fontSize: "85%",
                                                      }}
                                                    >
                                                      Food Waste GHG Performance
                                                      Charts
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                      {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                      {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/weekGHG"
                                                      >
                                                        Weekly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/monthGHG"
                                                      >
                                                        Monthly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/yearGHG"
                                                      >
                                                        Yearly
                                                      </DropdownItem>

                                                      {/* <Dropdown.Divider />

                                      <Dropdown.Header>Food Surplus</Dropdown.Header>
                                      <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                                      <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                                      <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem> */}
                                                    </DropdownMenu>
                                                  </Dropdown>

                                                  <Dropdown>
                                                    <DropdownToggle
                                                      style={{
                                                        backgroundColor:
                                                          "rgb(76, 226, 106)",
                                                        width: "90%",
                                                        marginLeft: "5%",
                                                        marginTop: "1%",
                                                        marginBottom: "1%",
                                                        borderColor:
                                                          "rgb(76, 226, 106)",
                                                        fontSize: "85%",
                                                      }}
                                                    >
                                                      Food Waste Cost
                                                      Performance Charts
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                      {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                      {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/weekCost"
                                                      >
                                                        Weekly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/monthCost"
                                                      >
                                                        Monthly
                                                      </DropdownItem>
                                                      <DropdownItem
                                                        as={Link}
                                                        to="/chart/yearCost"
                                                      >
                                                        Yearly
                                                      </DropdownItem>

                                                      {/* <Dropdown.Divider />

                                      <Dropdown.Header>Food Surplus</Dropdown.Header>
                                      <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                                      <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                                      <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem> */}
                                                    </DropdownMenu>
                                                  </Dropdown>

                                                  <Divider
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  />
                                                </div>
                                              </MobileView>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>

                                  <BrowserView>
                                    <Button
                                      className="custom-btn rounded"
                                      style={{
                                        padding: "1.5%",
                                        height: "60px",
                                        width: "65%",
                                        marginLeft: "17.5%",
                                        marginBottom: "10%",
                                        fontWeight: 550,
                                        fontSize: "150%",
                                      }}
                                      as={Link}
                                      to="/change-password"
                                    >
                                      Change Your Password
                                    </Button>
                                  </BrowserView>
                                  <MobileView>
                                    <Button
                                      className="custom-btn rounded"
                                      style={{
                                        padding: "5%",
                                        height: "60px",
                                        width: "65%",
                                        marginLeft: "17.5%",
                                        marginBottom: "25%",
                                        fontWeight: 550,
                                        fontSize: "100%",
                                      }}
                                      as={Link}
                                      to="/change-password"
                                    >
                                      Change Password
                                    </Button>
                                  </MobileView>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    height: "80vh",
                                    padding: "1.5% 1.5% 1.5% 1.5%",
                                    marginBottom: "5%",
                                  }}
                                >
                                  <BrowserView>
                                    <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        height: "120px",
                                        width: "100%",
                                        marginBottom: "2.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                        padding: "5% 0 5% 0",
                                      }}
                                      as={Link}
                                      to="/reserve-items"
                                    >
                                      Plan to Save
                                    </Button>

                                    <ListGroup
                                      style={{
                                        width: "100%",
                                        marginTop: "2%",
                                        marginBottom: "0.5%",
                                      }}
                                    >
                                      <ListGroup.Item
                                        style={{ backgroundColor: "#FF6A63" }}
                                      >
                                        <b>NOTE: </b> This is part of the 'Fail
                                        to Plan, Plan to Fail' campaign, running
                                        from October 16th 2021 to January 31st
                                        2021. Click 'Plan to Save' to express
                                        interest in reserving food items from
                                        local sources from June 2022. To go to
                                        your regular Account page, click the 'My
                                        Account' button below.
                                      </ListGroup.Item>
                                    </ListGroup>

                                    <div
                                      className="text-center"
                                      style={{ marginBottom: "-2px" }}
                                    >
                                      <span>Campaign Ends: </span>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <Countdown
                                          className="date"
                                          date="2022-01-31T23:59:59"
                                          style={{
                                            fontSize: "200%",
                                            fontWeight: "200",
                                          }}
                                        />
                                      </DateStyle>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <span
                                          className="label"
                                          style={{ backgroundColor: "#CC2E26" }}
                                        >
                                          days : hrs : mins : secs
                                        </span>
                                      </DateStyle>
                                    </div>

                                    <Button
                                      variant="secondary"
                                      style={{
                                        width: "45%",
                                        marginLeft: "27.5%",
                                        marginTop: "5%",
                                        marginBottom: "1%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          skipPTSCLicked:
                                            !this.state.skipPTSCLicked,
                                        })
                                      }
                                    >
                                      My Account
                                    </Button>

                                    <Button
                                      className="custom-btn- rounded"
                                      style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        marginTop: "5%",
                                        marginBottom: "5%",
                                        backgroundColor: "#AFBA15",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          PTSInfoClicked:
                                            !this.state.PTSInfoClicked,
                                        })
                                      }
                                    >
                                      {" "}
                                      What is the Plan to Save?
                                    </Button>

                                    <>
                                      {this.state.PTSInfoClicked ? (
                                        <>
                                          <Card
                                            style={{
                                              width: "100%",
                                              height: "1650px",
                                            }}
                                          >
                                            <Card.Img
                                              variant="top"
                                              src={pTSBanner}
                                            />
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#05042E",
                                              }}
                                            >
                                              <h1
                                                style={{
                                                  fontWeight: "700",
                                                  color: "white",
                                                  marginTop: "2%",
                                                }}
                                              >
                                                How Does It Work?
                                              </h1>
                                              <p
                                                style={{
                                                  color: "white",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                If you can reserve your fresh
                                                food, local farmers can plan
                                                better in their food production
                                                to meet your need in the most
                                                sustainable way. By signing up
                                                to the Plan to Save campaign and
                                                reserving your weekly,
                                                fortnightly and monthly fresh
                                                food requirements, we will take
                                                the responsibility to identify
                                                local farmers around you or
                                                encourage the set up of local
                                                farmers to supply your
                                                reservation, ensuring the supply
                                                of nutritious food all year
                                                round for all.
                                              </p>
                                            </div>

                                            <Card.Header
                                              style={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#0C0847",
                                              }}
                                            >
                                              The key questions the campaign
                                              will be seeking to address will be
                                              centred around:
                                            </Card.Header>
                                            <ListGroup
                                              variant="flush"
                                              style={{ fontSize: "15px" }}
                                            >
                                              <ListGroup.Item>
                                                1. Have you witnessed empty
                                                shelves in your grocery store
                                                during the pandemic?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                2. Have you wondered why we
                                                waste over 1.3 billion tonnes of
                                                food every year when over 800
                                                million people are hungry?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                3. Do you know that our current
                                                AgriFood production system
                                                contribute over 30% of
                                                Greenhouse gas emission?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                4. Are you are aware that 1 in 5
                                                death is linked to malnutrition?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                5. Does the lack of HGV Drivers
                                                to support the food system
                                                create a concern for you?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                6. Are you worried about the
                                                future of food?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                7. Do you know that you can help
                                                address most of these problems
                                                if you can change your attitude
                                                to food?
                                              </ListGroup.Item>
                                            </ListGroup>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#AFBA15 ",
                                                color: "white",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                The recent UNFAO, UNEP, IPCC and
                                                IntelliDigest report has
                                                highlighted the impact of the
                                                broken food system on climate
                                                change and the need for everyone
                                                to act now to address the
                                                challenge.
                                              </p>
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                Evolving a food system that is
                                                resilient and secure has never
                                                been more important than during
                                                the COVID-19 pandemic and as we
                                                face the challenges of empty
                                                food shelves plus labour
                                                shortages.
                                              </p>
                                            </div>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "white",
                                                color: "#020113",
                                              }}
                                            >
                                              <h2
                                                style={{
                                                  fontSize: "20px",
                                                  fontWeight: "700",
                                                  marginTop: "2%",
                                                  marginBottom: "2%",
                                                }}
                                              >
                                                Supported By:
                                              </h2>
                                              <Container>
                                                <Row>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={sTFCFoodNetwork}
                                                      alt="STFC Food Network"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "5%",
                                                      }}
                                                    />
                                                  </Col>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={positivePlanet}
                                                      alt="Positive Planet"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "2%",
                                                      }}
                                                    />
                                                  </Col>
                                                </Row>
                                              </Container>
                                            </div>
                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                            <Card.Img
                                              variant="bottom"
                                              src={pTSNotebook}
                                            />
                                          </Card>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  </BrowserView>

                                  <MobileView>
                                  <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        height: "120px",
                                        width: "100%",
                                        marginBottom: "2.5%",
                                        fontWeight: 600,
                                        fontSize: "200%",
                                        padding: "5% 0 5% 0",
                                      }}
                                      as={Link}
                                      to="/reserve-items"
                                    >
                                      Plan to Save
                                    </Button>

                                    <ListGroup
                                      style={{
                                        width: "100%",
                                        marginTop: "2%",
                                        marginBottom: "0.5%",
                                      }}
                                    >
                                      <ListGroup.Item
                                        style={{ backgroundColor: "#FF6A63" }}
                                      >
                                        <b>NOTE: </b> This is part of the 'Fail
                                        to Plan, Plan to Fail' campaign, running
                                        from October 16th 2021 to January 31st
                                        2021. Click 'Plan to Save' to express
                                        interest in reserving food items from
                                        local sources from June 2022. To go to
                                        your regular Account page, click the 'My
                                        Account' button below.
                                      </ListGroup.Item>
                                    </ListGroup>

                                    <div
                                      className="text-center"
                                      style={{ marginBottom: "-2px" }}
                                    >
                                      <span>Campaign Ends: </span>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <Countdown
                                          className="date"
                                          date="2022-01-31T23:59:59"
                                          style={{
                                            fontSize: "200%",
                                            fontWeight: "200",
                                          }}
                                        />
                                      </DateStyle>
                                    </div>

                                    <div className="text-center">
                                      <DateStyle>
                                        <span
                                          className="label"
                                          style={{ backgroundColor: "#CC2E26" }}
                                        >
                                          days : hrs : mins : secs
                                        </span>
                                      </DateStyle>
                                    </div>

                                    <Button
                                      variant="secondary"
                                      style={{
                                        width: "45%",
                                        marginLeft: "27.5%",
                                        marginTop: "5%",
                                        marginBottom: "1%",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          skipPTSCLicked:
                                            !this.state.skipPTSCLicked,
                                        })
                                      }
                                    >
                                      My Account
                                    </Button>

                                    <Button
                                      className="custom-btn-2 rounded"
                                      style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        marginTop: "5%",
                                        marginBottom: "5%",
                                        backgroundColor: "#AFBA15",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          PTSInfoClicked:
                                            !this.state.PTSInfoClicked,
                                        })
                                      }
                                    >
                                      {" "}
                                      What is the Plan to Save?
                                    </Button>

                                    <>
                                      {this.state.PTSInfoClicked ? (
                                        <>
                                          <Card
                                            style={{
                                              width: "100%",
                                              height: "1650px",
                                            }}
                                          >
                                            <Card.Img
                                              variant="top"
                                              src={pTSBanner}
                                            />
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#05042E",
                                              }}
                                            >
                                              <h1
                                                style={{
                                                  fontWeight: "700",
                                                  color: "white",
                                                  marginTop: "2%",
                                                }}
                                              >
                                                How Does It Work?
                                              </h1>
                                              <p
                                                style={{
                                                  color: "white",
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                If you can reserve your fresh
                                                food, local farmers can plan
                                                better in their food production
                                                to meet your need in the most
                                                sustainable way. By signing up
                                                to the Plan to Save campaign and
                                                reserving your weekly,
                                                fortnightly and monthly fresh
                                                food requirements, we will take
                                                the responsibility to identify
                                                local farmers around you or
                                                encourage the set up of local
                                                farmers to supply your
                                                reservation, ensuring the supply
                                                of nutritious food all year
                                                round for all.
                                              </p>
                                            </div>

                                            <Card.Header
                                              style={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#0C0847",
                                              }}
                                            >
                                              The key questions the campaign
                                              will be seeking to address will be
                                              centred around:
                                            </Card.Header>
                                            <ListGroup
                                              variant="flush"
                                              style={{ fontSize: "15px" }}
                                            >
                                              <ListGroup.Item>
                                                1. Have you witnessed empty
                                                shelves in your grocery store
                                                during the pandemic?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                2. Have you wondered why we
                                                waste over 1.3 billion tonnes of
                                                food every year when over 800
                                                million people are hungry?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                3. Do you know that our current
                                                AgriFood production system
                                                contribute over 30% of
                                                Greenhouse gas emission?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                4. Are you are aware that 1 in 5
                                                death is linked to malnutrition?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                5. Does the lack of HGV Drivers
                                                to support the food system
                                                create a concern for you?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                6. Are you worried about the
                                                future of food?
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                7. Do you know that you can help
                                                address most of these problems
                                                if you can change your attitude
                                                to food?
                                              </ListGroup.Item>
                                            </ListGroup>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#AFBA15 ",
                                                color: "white",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                The recent UNFAO, UNEP, IPCC and
                                                IntelliDigest report has
                                                highlighted the impact of the
                                                broken food system on climate
                                                change and the need for everyone
                                                to act now to address the
                                                challenge.
                                              </p>
                                              <p
                                                style={{
                                                  width: "90%",
                                                  marginLeft: "5%",
                                                }}
                                              >
                                                Evolving a food system that is
                                                resilient and secure has never
                                                been more important than during
                                                the COVID-19 pandemic and as we
                                                face the challenges of empty
                                                food shelves plus labour
                                                shortages.
                                              </p>
                                            </div>
                                            <div
                                              className="text-center"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "white",
                                                color: "#020113",
                                              }}
                                            >
                                              <h2
                                                style={{
                                                  fontSize: "20px",
                                                  fontWeight: "700",
                                                  marginTop: "2%",
                                                  marginBottom: "2%",
                                                }}
                                              >
                                                Supported By:
                                              </h2>
                                              <Container>
                                                <Row>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={sTFCFoodNetwork}
                                                      alt="STFC Food Network"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "5%",
                                                      }}
                                                    />
                                                  </Col>
                                                  <Col
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <img
                                                      src={positivePlanet}
                                                      alt="Positive Planet"
                                                      className="img-fluid rounded fix-image"
                                                      style={{
                                                        marginBottom: "2%",
                                                      }}
                                                    />
                                                  </Col>
                                                </Row>
                                              </Container>
                                            </div>
                                            <Divider
                                              style={{ marginBottom: "10px" }}
                                            />
                                            <Card.Img
                                              variant="bottom"
                                              src={pTSNotebook}
                                            />
                                          </Card>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  </MobileView>
                                </div>
                              )}
                            </>
                            // #endregion
                          ) : (
                            // #region HOUSEHOLD ACCOUNT
                            <div>
                              {profile.buildingFunction === "Households" ? (
                                <>
                                  {this.state.skipPTSCLicked ? (
                                    <div
                                      style={{
                                        height: "80vh",
                                        padding: "1.5% 1.5% 1.5% 1.5%",
                                        marginBottom: "5%",
                                      }}
                                    >
                                      <Button
                                        className="custom-btn rounded"
                                        style={{
                                          height: "120px",
                                          width: "100%",
                                          marginBottom: "2.5%",
                                          fontWeight: 600,
                                          fontSize: "200%",
                                        }}
                                        onClick={() =>
                                          this.setState({
                                            foodBubbleClicked:
                                              !this.state.foodBubbleClicked,
                                            foodWasteBubbleClicked: false,
                                          })
                                        }
                                      >
                                        Food
                                      </Button>

                                      <>
                                        {this.state.foodBubbleClicked ? (
                                          <>
                                            <MobileView>
                                              <div
                                                style={{ marginTop: "-1.5%" }}
                                              >
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <Button
                                                  variant="secondary"
                                                  style={{
                                                    width: "45%",
                                                    marginLeft: "27.5%",
                                                    marginTop: "1%",
                                                    marginBottom: "1%",
                                                  }}
                                                  onClick={(e) =>
                                                    this.setState({
                                                      mobileDisclaimerShown:
                                                        !this.state
                                                          .mobileDisclaimerShown,
                                                    })
                                                  }
                                                >
                                                  DISCLAIMER:{" "}
                                                  <BsFillExclamationCircleFill />
                                                </Button>

                                                <Modal
                                                  show={
                                                    this.state
                                                      .mobileDisclaimerShown
                                                  }
                                                  onHide={() =>
                                                    this.setState({
                                                      mobileDisclaimerShown: false,
                                                    })
                                                  }
                                                >
                                                  <Modal.Header closeButton>
                                                    <Modal.Title>
                                                      DISCLAIMER
                                                    </Modal.Title>
                                                  </Modal.Header>
                                                  <Modal.Body>
                                                    The Global Food Loss & Waste
                                                    Tracker is designed, in
                                                    part, to help users develop
                                                    healthy eating habits. The
                                                    nutritional information and
                                                    dietary recommendations
                                                    provided are merely
                                                    suggestions which may or may
                                                    not improve users' eating
                                                    habits and/or overall
                                                    health. This app is a
                                                    self-regulatory tool, not
                                                    intended to replace
                                                    professional medical advice.
                                                    Please always consult a
                                                    dietician or medical
                                                    professional for
                                                    professional medical advice
                                                    regarding your health.
                                                  </Modal.Body>
                                                  <Modal.Footer>
                                                    <Button
                                                      variant="secondary"
                                                      onClick={() =>
                                                        this.setState({
                                                          mobileDisclaimerShown: false,
                                                        })
                                                      }
                                                    >
                                                      Close
                                                    </Button>
                                                  </Modal.Footer>
                                                </Modal>

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/food-intake"
                                                >
                                                  Update Food Intake
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/chart/nutrientGap"
                                                >
                                                  Nutrient Gap Breakdown
                                                </Button>
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button> */}
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/add-products"
                                                >
                                                  Upload Food
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/browse-products"
                                                >
                                                  Buy Food
                                                </Button>

                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button> */}
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button> */}
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/product-listing">Product Listing</Button> */}
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)", borderColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%"}} as={Link} to="/add-products">Add Products</Button> */}

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      fontSize: "85%",
                                                      marginLeft: "5%",
                                                      width: "90%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    Food Surplus Weight
                                                    Performance Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplus"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplus"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplus"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      fontSize: "85%",
                                                      marginLeft: "5%",
                                                      width: "90%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    Food Surplus GHG Performance
                                                    Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusGHG"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusGHG"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusGHG"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      fontSize: "85%",
                                                      marginLeft: "5%",
                                                      width: "90%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    Food Surplus Cost
                                                    Performance Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusCost"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusCost"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusCost"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </div>
                                            </MobileView>

                                            <BrowserView>
                                              <div
                                                style={{ marginTop: "-1.5%" }}
                                              >
                                                <Divider
                                                  style={{ marginTop: "10px" }}
                                                />

                                                <ListGroup
                                                  style={{
                                                    width: "105%",
                                                    marginLeft: "-2.5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                  }}
                                                >
                                                  <ListGroup.Item variant="primary">
                                                    <b>DISCLAIMER: </b> The
                                                    Global Food Loss & Waste
                                                    Tracker is designed, in
                                                    part, to help users develop
                                                    healthy eating habits. The
                                                    nutritional information and
                                                    dietary recommendations
                                                    provided are merely
                                                    suggestions which may or may
                                                    not improve users' eating
                                                    habits and/or overall
                                                    health. This app is a
                                                    self-regulatory tool, not
                                                    intended to replace
                                                    professional medical advice.
                                                    Please always consult a
                                                    dietician or medical
                                                    professional for
                                                    professional medical advice
                                                    regarding your health.
                                                  </ListGroup.Item>
                                                </ListGroup>

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/food-intake"
                                                >
                                                  Update Food Intake
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/chart/nutrientGap"
                                                >
                                                  Nutrient Gap Breakdown
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/add-products"
                                                >
                                                  Upload Food
                                                </Button>
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(94, 120, 235)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(94, 120, 235)",
                                                  }}
                                                  as={Link}
                                                  to="/browse-products"
                                                >
                                                  Buy Food
                                                </Button>

                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button> */}
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button> */}
                                                {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/product-listing">Product Listing</Button> */}

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus Weight
                                                    Performance Chart
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplus"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplus"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplus"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus GHG
                                                    Performance Chart
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusGHG"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusGHG"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusGHG"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(145, 26, 224)",
                                                      marginLeft: "20%",
                                                      width: "60%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(145, 26, 224)",
                                                    }}
                                                  >
                                                    View Food Surplus Cost
                                                    Performance Chart
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekSurplusCost"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthSurplusCost"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearSurplusCost"
                                                    >
                                                      Yearly
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </div>
                                            </BrowserView>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </>

                                      <Button
                                        className="custom-btn-2 rounded"
                                        style={{
                                          height: "120px",
                                          width: "100%",
                                          marginBottom: "2.5%",
                                          fontWeight: 600,
                                          fontSize: "200%",
                                          borderColor: "#aab41e",
                                        }}
                                        onClick={() =>
                                          this.setState({
                                            foodWasteBubbleClicked:
                                              !this.state
                                                .foodWasteBubbleClicked,
                                            foodBubbleClicked: false,
                                          })
                                        }
                                      >
                                        Food Waste
                                      </Button>

                                      <>
                                        {this.state.foodWasteBubbleClicked ? (
                                          <>
                                            <MobileView>
                                              <div>
                                                <Divider />

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-waste"
                                                >
                                                  Update Food Waste
                                                </Button>

                                                {/* <Button style={{backgroundColor: "rgb(8, 105, 27)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/view-map">View Food Waste Map</Button> */}

                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(8, 105, 27)",
                                                    width: "90%",
                                                    marginLeft: "5%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(8, 105, 27)",
                                                  }}
                                                  as={Link}
                                                  to="/food-reduction"
                                                >
                                                  Food Waste Reduction Tips
                                                </Button>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      fontSize: "85%",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    Food Waste Weight
                                                    Performance Charts
                                                  </DropdownToggle>

                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/week"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/month"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/year"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      fontSize: "85%",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    Food Waste GHG Performance
                                                    Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekGHG"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthGHG"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearGHG"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Dropdown>
                                                  <DropdownToggle
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(76, 226, 106)",
                                                      fontSize: "85%",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                      borderColor:
                                                        "rgb(76, 226, 106)",
                                                    }}
                                                  >
                                                    Food Waste Cost Performance
                                                    Charts
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/weekCost"
                                                    >
                                                      Weekly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/monthCost"
                                                    >
                                                      Monthly
                                                    </DropdownItem>
                                                    <DropdownItem
                                                      as={Link}
                                                      to="/chart/yearCost"
                                                    >
                                                      Yearly
                                                    </DropdownItem>

                                                    {/* <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>

                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                              </div>
                                            </MobileView>

                                            <BrowserView>
                                              <Divider
                                                style={{ marginTop: "10px" }}
                                              />

                                              <Button
                                                style={{
                                                  backgroundColor:
                                                    "rgb(8, 105, 27)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "2%",
                                                  marginBottom: "2%",
                                                  borderColor:
                                                    "rgb(8, 105, 27)",
                                                }}
                                                as={Link}
                                                to="/food-waste"
                                              >
                                                Update Food Waste
                                              </Button>
                                              {/* <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/view-map">View Food Waste Map</Button> */}
                                              <Button
                                                style={{
                                                  backgroundColor:
                                                    "rgb(8, 105, 27)",
                                                  width: "60%",
                                                  marginLeft: "20%",
                                                  marginTop: "2%",
                                                  marginBottom: "2%",
                                                  borderColor:
                                                    "rgb(8, 105, 27)",
                                                }}
                                                as={Link}
                                                to="/food-reduction"
                                              >
                                                Food Waste Reduction Tips
                                              </Button>

                                              <Dropdown>
                                                <DropdownToggle
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(76, 226, 106)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(76, 226, 106)",
                                                  }}
                                                >
                                                  View Food Waste Weight
                                                  Performance Chart
                                                </DropdownToggle>

                                                <DropdownMenu>
                                                  {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/week"
                                                  >
                                                    Weekly
                                                  </DropdownItem>
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/month"
                                                  >
                                                    Monthly
                                                  </DropdownItem>
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/year"
                                                  >
                                                    Yearly
                                                  </DropdownItem>

                                                  {/* <Dropdown.Divider />

                                <Dropdown.Header>Food Surplus</Dropdown.Header>
                                <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                                <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                                <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem> */}
                                                </DropdownMenu>
                                              </Dropdown>

                                              <Dropdown>
                                                <DropdownToggle
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(76, 226, 106)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(76, 226, 106)",
                                                  }}
                                                >
                                                  View Food Waste GHG
                                                  Performance Chart
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                  {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/weekGHG"
                                                  >
                                                    Weekly
                                                  </DropdownItem>
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/monthGHG"
                                                  >
                                                    Monthly
                                                  </DropdownItem>
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/yearGHG"
                                                  >
                                                    Yearly
                                                  </DropdownItem>

                                                  {/* <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem> */}
                                                </DropdownMenu>
                                              </Dropdown>

                                              <Dropdown>
                                                <DropdownToggle
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(76, 226, 106)",
                                                    width: "60%",
                                                    marginLeft: "20%",
                                                    marginTop: "2%",
                                                    marginBottom: "2%",
                                                    borderColor:
                                                      "rgb(76, 226, 106)",
                                                  }}
                                                >
                                                  View Food Waste Cost
                                                  Performance Chart
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                  {/* <Dropdown.Header>Food Waste</Dropdown.Header> */}
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/weekCost"
                                                  >
                                                    Weekly
                                                  </DropdownItem>
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/monthCost"
                                                  >
                                                    Monthly
                                                  </DropdownItem>
                                                  <DropdownItem
                                                    as={Link}
                                                    to="/chart/yearCost"
                                                  >
                                                    Yearly
                                                  </DropdownItem>

                                                  {/* <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem> */}
                                                </DropdownMenu>
                                              </Dropdown>

                                              <Divider
                                                style={{ marginBottom: "10px" }}
                                              />
                                            </BrowserView>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </>

                                      <BrowserView>
                                        <Button
                                          className="custom-btn rounded"
                                          style={{
                                            padding: "1.5%",
                                            height: "60px",
                                            width: "65%",
                                            marginLeft: "17.5%",
                                            marginBottom: "10%",
                                            fontWeight: 550,
                                            fontSize: "150%",
                                          }}
                                          as={Link}
                                          to="/change-password"
                                        >
                                          Change Your Password
                                        </Button>
                                      </BrowserView>
                                      <MobileView>
                                        <Button
                                          className="custom-btn rounded"
                                          style={{
                                            padding: "5%",
                                            height: "60px",
                                            width: "65%",
                                            marginLeft: "17.5%",
                                            marginBottom: "25%",
                                            fontWeight: 550,
                                            fontSize: "100%",
                                          }}
                                          as={Link}
                                          to="/change-password"
                                        >
                                          Change Password
                                        </Button>
                                      </MobileView>
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        height: "80vh",
                                        padding: "1.5% 1.5% 1.5% 1.5%",
                                        marginBottom: "5%",
                                      }}
                                    >
                                      <BrowserView>
                                        <Button
                                          className="custom-btn-2 rounded"
                                          style={{
                                            height: "120px",
                                            width: "100%",
                                            marginBottom: "2.5%",
                                            fontWeight: 600,
                                            fontSize: "200%",
                                            padding: "5% 0 5% 0",
                                          }}
                                          as={Link}
                                          to="/reserve-items"
                                        >
                                          Plan to Save
                                        </Button>

                                        <ListGroup
                                          style={{
                                            width: "100%",
                                            marginTop: "2%",
                                            marginBottom: "0.5%",
                                          }}
                                        >
                                          <ListGroup.Item
                                            style={{
                                              backgroundColor: "#FF6A63",
                                            }}
                                          >
                                            <b>NOTE: </b> This is part of the
                                            'Fail to Plan, Plan to Fail'
                                            campaign, running from October 16th
                                            2021 to January 31st 2021. Click
                                            'Plan to Save' to express interest
                                            in reserving food items from local
                                            sources from June 2022. To go to
                                            your regular Account page, click the
                                            'My Account' button below.
                                          </ListGroup.Item>
                                        </ListGroup>

                                        <div
                                          className="text-center"
                                          style={{ marginBottom: "-2px" }}
                                        >
                                          <span>Campaign Ends: </span>
                                        </div>

                                        <div className="text-center">
                                          <DateStyle>
                                            <Countdown
                                              className="date"
                                              date="2022-01-31T23:59:59"
                                              style={{
                                                fontSize: "200%",
                                                fontWeight: "200",
                                              }}
                                            />
                                          </DateStyle>
                                        </div>

                                        <div className="text-center">
                                          <DateStyle>
                                            <span
                                              className="label"
                                              style={{
                                                backgroundColor: "#CC2E26",
                                              }}
                                            >
                                              days : hrs : mins : secs
                                            </span>
                                          </DateStyle>
                                        </div>

                                        <Button
                                          variant="secondary"
                                          style={{
                                            width: "45%",
                                            marginLeft: "27.5%",
                                            marginTop: "5%",
                                            marginBottom: "1%",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              skipPTSCLicked:
                                                !this.state.skipPTSCLicked,
                                            })
                                          }
                                        >
                                          My Account
                                        </Button>

                                        <Button
                                          className="custom-btn-3 rounded"
                                          style={{
                                            width: "70%",
                                            marginLeft: "15%",
                                            marginTop: "5%",
                                            marginBottom: "5%",
                                            backgroundColor: "#AFBA15",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              PTSInfoClicked:
                                                !this.state.PTSInfoClicked,
                                            })
                                          }
                                        >
                                          {" "}
                                          What is the Plan to Save?
                                        </Button>

                                        <>
                                          {this.state.PTSInfoClicked ? (
                                            <>
                                              <Card
                                                style={{
                                                  width: "100%",
                                                  height: "1650px",
                                                }}
                                              >
                                                <Card.Img
                                                  variant="top"
                                                  src={pTSBanner}
                                                />
                                                <div
                                                  className="text-center"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "#05042E",
                                                  }}
                                                >
                                                  <h1
                                                    style={{
                                                      fontWeight: "700",
                                                      color: "white",
                                                      marginTop: "2%",
                                                    }}
                                                  >
                                                    How Does It Work?
                                                  </h1>
                                                  <p
                                                    style={{
                                                      color: "white",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                    }}
                                                  >
                                                    If you can reserve your
                                                    fresh food, local farmers
                                                    can plan better in their
                                                    food production to meet your
                                                    need in the most sustainable
                                                    way. By signing up to the
                                                    Plan to Save campaign and
                                                    reserving your weekly,
                                                    fortnightly and monthly
                                                    fresh food requirements, we
                                                    will take the responsibility
                                                    to identify local farmers
                                                    around you or encourage the
                                                    set up of local farmers to
                                                    supply your reservation,
                                                    ensuring the supply of
                                                    nutritious food all year
                                                    round for all.
                                                  </p>
                                                </div>

                                                <Card.Header
                                                  style={{
                                                    fontSize: "18px",
                                                    fontWeight: "700",
                                                    color: "#0C0847",
                                                  }}
                                                >
                                                  The key questions the campaign
                                                  will be seeking to address
                                                  will be centred around:
                                                </Card.Header>
                                                <ListGroup
                                                  variant="flush"
                                                  style={{ fontSize: "15px" }}
                                                >
                                                  <ListGroup.Item>
                                                    1. Have you witnessed empty
                                                    shelves in your grocery
                                                    store during the pandemic?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    2. Have you wondered why we
                                                    waste over 1.3 billion
                                                    tonnes of food every year
                                                    when over 800 million people
                                                    are hungry?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    3. Do you know that our
                                                    current AgriFood production
                                                    system contribute over 30%
                                                    of Greenhouse gas emission?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    4. Are you are aware that 1
                                                    in 5 death is linked to
                                                    malnutrition?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    5. Does the lack of HGV
                                                    Drivers to support the food
                                                    system create a concern for
                                                    you?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    6. Are you worried about the
                                                    future of food?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    7. Do you know that you can
                                                    help address most of these
                                                    problems if you can change
                                                    your attitude to food?
                                                  </ListGroup.Item>
                                                </ListGroup>
                                                <div
                                                  className="text-center"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "#AFBA15 ",
                                                    color: "white",
                                                  }}
                                                >
                                                  <p
                                                    style={{
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                    }}
                                                  >
                                                    The recent UNFAO, UNEP, IPCC
                                                    and IntelliDigest report has
                                                    highlighted the impact of
                                                    the broken food system on
                                                    climate change and the need
                                                    for everyone to act now to
                                                    address the challenge.
                                                  </p>
                                                  <p
                                                    style={{
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                    }}
                                                  >
                                                    Evolving a food system that
                                                    is resilient and secure has
                                                    never been more important
                                                    than during the COVID-19
                                                    pandemic and as we face the
                                                    challenges of empty food
                                                    shelves plus labour
                                                    shortages.
                                                  </p>
                                                </div>
                                                <div
                                                  className="text-center"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "white",
                                                    color: "#020113",
                                                  }}
                                                >
                                                  <h2
                                                    style={{
                                                      fontSize: "20px",
                                                      fontWeight: "700",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                    }}
                                                  >
                                                    Supported By:
                                                  </h2>
                                                  <Container>
                                                    <Row>
                                                      <Col
                                                        style={{
                                                          backgroundColor:
                                                            "white",
                                                        }}
                                                      >
                                                        <img
                                                          src={sTFCFoodNetwork}
                                                          alt="STFC Food Network"
                                                          className="img-fluid rounded fix-image"
                                                          style={{
                                                            marginBottom: "5%",
                                                          }}
                                                        />
                                                      </Col>
                                                      <Col
                                                        style={{
                                                          backgroundColor:
                                                            "white",
                                                        }}
                                                      >
                                                        <img
                                                          src={positivePlanet}
                                                          alt="Positive Planet"
                                                          className="img-fluid rounded fix-image"
                                                          style={{
                                                            marginBottom: "2%",
                                                          }}
                                                        />
                                                      </Col>
                                                    </Row>
                                                  </Container>
                                                </div>
                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                                <Card.Img
                                                  variant="bottom"
                                                  src={pTSNotebook}
                                                />
                                              </Card>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      </BrowserView>

                                      <MobileView>
                                      <Button
                                          className="custom-btn-2 rounded"
                                          style={{
                                            height: "120px",
                                            width: "100%",
                                            marginBottom: "2.5%",
                                            fontWeight: 600,
                                            fontSize: "200%",
                                            padding: "5% 0 5% 0",
                                          }}
                                          as={Link}
                                          to="/reserve-items"
                                        >
                                          Plan to Save
                                        </Button>

                                        <ListGroup
                                          style={{
                                            width: "100%",
                                            marginTop: "2%",
                                            marginBottom: "0.5%",
                                          }}
                                        >
                                          <ListGroup.Item
                                            style={{
                                              backgroundColor: "#FF6A63",
                                            }}
                                          >
                                            <b>NOTE: </b> This is part of the
                                            'Fail to Plan, Plan to Fail'
                                            campaign, running from October 16th
                                            2021 to January 31st 2021. Click
                                            'Plan to Save' to express interest
                                            in reserving food items from local
                                            sources from June 2022. To go to
                                            your regular Account page, click the
                                            'My Account' button below.
                                          </ListGroup.Item>
                                        </ListGroup>

                                        <div
                                          className="text-center"
                                          style={{ marginBottom: "-2px" }}
                                        >
                                          <span>Campaign Ends: </span>
                                        </div>

                                        <div className="text-center">
                                          <DateStyle>
                                            <Countdown
                                              className="date"
                                              date="2022-01-31T23:59:59"
                                              style={{
                                                fontSize: "200%",
                                                fontWeight: "200",
                                              }}
                                            />
                                          </DateStyle>
                                        </div>

                                        <div className="text-center">
                                          <DateStyle>
                                            <span
                                              className="label"
                                              style={{
                                                backgroundColor: "#CC2E26",
                                              }}
                                            >
                                              days : hrs : mins : secs
                                            </span>
                                          </DateStyle>
                                        </div>

                                        <Button
                                          variant="secondary"
                                          style={{
                                            width: "45%",
                                            marginLeft: "27.5%",
                                            marginTop: "5%",
                                            marginBottom: "1%",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              skipPTSCLicked:
                                                !this.state.skipPTSCLicked,
                                            })
                                          }
                                        >
                                          My Account
                                        </Button>

                                        <Button
                                          className="custom-btn-3 rounded"
                                          style={{
                                            width: "70%",
                                            marginLeft: "15%",
                                            marginTop: "5%",
                                            marginBottom: "5%",
                                            backgroundColor: "#AFBA15",
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              PTSInfoClicked:
                                                !this.state.PTSInfoClicked,
                                            })
                                          }
                                        >
                                          {" "}
                                          What is the Plan to Save?
                                        </Button>

                                        <>
                                          {this.state.PTSInfoClicked ? (
                                            <>
                                              <Card
                                                style={{
                                                  width: "100%",
                                                  height: "1650px",
                                                }}
                                              >
                                                <Card.Img
                                                  variant="top"
                                                  src={pTSBanner}
                                                />
                                                <div
                                                  className="text-center"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "#05042E",
                                                  }}
                                                >
                                                  <h1
                                                    style={{
                                                      fontWeight: "700",
                                                      color: "white",
                                                      marginTop: "2%",
                                                    }}
                                                  >
                                                    How Does It Work?
                                                  </h1>
                                                  <p
                                                    style={{
                                                      color: "white",
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                    }}
                                                  >
                                                    If you can reserve your
                                                    fresh food, local farmers
                                                    can plan better in their
                                                    food production to meet your
                                                    need in the most sustainable
                                                    way. By signing up to the
                                                    Plan to Save campaign and
                                                    reserving your weekly,
                                                    fortnightly and monthly
                                                    fresh food requirements, we
                                                    will take the responsibility
                                                    to identify local farmers
                                                    around you or encourage the
                                                    set up of local farmers to
                                                    supply your reservation,
                                                    ensuring the supply of
                                                    nutritious food all year
                                                    round for all.
                                                  </p>
                                                </div>

                                                <Card.Header
                                                  style={{
                                                    fontSize: "18px",
                                                    fontWeight: "700",
                                                    color: "#0C0847",
                                                  }}
                                                >
                                                  The key questions the campaign
                                                  will be seeking to address
                                                  will be centred around:
                                                </Card.Header>
                                                <ListGroup
                                                  variant="flush"
                                                  style={{ fontSize: "15px" }}
                                                >
                                                  <ListGroup.Item>
                                                    1. Have you witnessed empty
                                                    shelves in your grocery
                                                    store during the pandemic?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    2. Have you wondered why we
                                                    waste over 1.3 billion
                                                    tonnes of food every year
                                                    when over 800 million people
                                                    are hungry?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    3. Do you know that our
                                                    current AgriFood production
                                                    system contribute over 30%
                                                    of Greenhouse gas emission?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    4. Are you are aware that 1
                                                    in 5 death is linked to
                                                    malnutrition?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    5. Does the lack of HGV
                                                    Drivers to support the food
                                                    system create a concern for
                                                    you?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    6. Are you worried about the
                                                    future of food?
                                                  </ListGroup.Item>
                                                  <ListGroup.Item>
                                                    7. Do you know that you can
                                                    help address most of these
                                                    problems if you can change
                                                    your attitude to food?
                                                  </ListGroup.Item>
                                                </ListGroup>
                                                <div
                                                  className="text-center"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "#AFBA15 ",
                                                    color: "white",
                                                  }}
                                                >
                                                  <p
                                                    style={{
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                    }}
                                                  >
                                                    The recent UNFAO, UNEP, IPCC
                                                    and IntelliDigest report has
                                                    highlighted the impact of
                                                    the broken food system on
                                                    climate change and the need
                                                    for everyone to act now to
                                                    address the challenge.
                                                  </p>
                                                  <p
                                                    style={{
                                                      width: "90%",
                                                      marginLeft: "5%",
                                                    }}
                                                  >
                                                    Evolving a food system that
                                                    is resilient and secure has
                                                    never been more important
                                                    than during the COVID-19
                                                    pandemic and as we face the
                                                    challenges of empty food
                                                    shelves plus labour
                                                    shortages.
                                                  </p>
                                                </div>
                                                <div
                                                  className="text-center"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "white",
                                                    color: "#020113",
                                                  }}
                                                >
                                                  <h2
                                                    style={{
                                                      fontSize: "20px",
                                                      fontWeight: "700",
                                                      marginTop: "2%",
                                                      marginBottom: "2%",
                                                    }}
                                                  >
                                                    Supported By:
                                                  </h2>
                                                  <Container>
                                                    <Row>
                                                      <Col
                                                        style={{
                                                          backgroundColor:
                                                            "white",
                                                        }}
                                                      >
                                                        <img
                                                          src={sTFCFoodNetwork}
                                                          alt="STFC Food Network"
                                                          className="img-fluid rounded fix-image"
                                                          style={{
                                                            marginBottom: "5%",
                                                          }}
                                                        />
                                                      </Col>
                                                      <Col
                                                        style={{
                                                          backgroundColor:
                                                            "white",
                                                        }}
                                                      >
                                                        <img
                                                          src={positivePlanet}
                                                          alt="Positive Planet"
                                                          className="img-fluid rounded fix-image"
                                                          style={{
                                                            marginBottom: "2%",
                                                          }}
                                                        />
                                                      </Col>
                                                    </Row>
                                                  </Container>
                                                </div>
                                                <Divider
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                                <Card.Img
                                                  variant="bottom"
                                                  src={pTSNotebook}
                                                />
                                              </Card>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      </MobileView>
                                    </div>
                                  )}
                                </>
                                // #endregion
                              ) : (
                                <></>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* <BStyle><Button className="custom-btn" as={Link} to="/food-loss">Update Food Loss</Button></BStyle> */}
                    {/* <BStyle><Button className="custom-btn" as={Link} to="/browse-products">Browse Products</Button></BStyle> */}
                  </>
                )}
              </div>
            </Col>

            <Col xs={12} lg={3}></Col>

            <Col className="mt-lg-5 pt-lg-5" xs={12}></Col>
            <Col className="mt-lg-5 pt-lg-5" xs={12}></Col>
          </Row>
        </Container>
      </React.Fragment>
    );
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
