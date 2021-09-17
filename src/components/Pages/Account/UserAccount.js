import React, { Component } from "react";
import "../../../App.css";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Dropdown, Button, ListGroup, Modal } from "react-bootstrap";
// import ButtonModal from './ButtonModalChart'
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { BrowserView, MobileView } from 'react-device-detect'
import { Divider } from '@material-ui/core';
import {BsFillExclamationCircleFill} from "react-icons/bs"

// import addNotification from "react-push-notification"

class Account extends Component {

  state = {
    foodBubbleClicked: false,
    foodWasteBubbleClicked: false,
    universityBubbleClicked: false,
    householdBubbleClicked: false,
    mobileDisclaimerShown: false
  }

  // notificationTest = () => {
  //   addNotification({
  //     title: 'Warning',
  //     subtitle: 'This is a subtitle',
  //     message: 'This is a very long message',
  //     // theme: 'darkblue',
  //     // native: false,
  //     backgroundTop: '#aab41e', //optional, background color of top container.
  //     backgroundBottom: '#aab41e', //optional, background color of bottom container.
  //     closeButton: 'Close',
  //     duration: 10000
  //   });
  // }

  render(){
  const { auth, profile, users } = this.props;
  console.log(users);
  // console.log(profile.buildingFunction);

  // var buttonDisplay;

  // if (profile.buildingFunction === "Farm"){
  //   this.setState({isFarm: true})
  // } else {
  //   this.setState({isFarm: false})
  // }

  if (!auth.uid) return <Redirect to= '/login'/>

    return (
      <React.Fragment>
        <Row className="ml-0 mr-0 user-acc">
          <Col className="mt-3 pt-3 mt-lg-5 pt-lg-5" xs={12}></Col>
          <Col className="mt-3 pt-3 mt-lg-5 pt-lg-5" xs={12}></Col>

          <Col className="mt-4 pt-4 mt-lg-5 pt-lg-5" xs={12} lg={3}></Col>
          <Col className="" xs={12} lg={6}>
          <h1 className="user-acc-title text-center">My Account</h1>
          <div className="text-center justify-content-center align-items-center d-flex initials-logo">
            <p className="">{profile.initials}</p>
          </div>
          <h1 className="text-center">Welcome, <span>{profile.firstName}  {profile.lastName}</span>!</h1>
          {/* <h1 className="text-center">Account email: <span >{profile.email}</span></h1>
          <h1 className="text-center">Postcode: <span >{profile.postcode}</span></h1> */}

          <div>{profile.buildingFunction === "Farm" ?
            <div style={{height: "80vh", padding: "1.5% 1.5% 1.5% 1.5%", marginBottom: "5%"}}>

              <Button className="custom-btn rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodBubbleClicked: !this.state.foodBubbleClicked, foodWasteBubbleClicked: false})}>Food</Button>

              <>
                {this.state.foodBubbleClicked ? 
                <>
                  <MobileView><div style={{marginTop: "-1.5%"}}>

                    {/* <Divider style={{marginTop: "10px"}}/>

                      <BGroup>
                        <BStyle><Button className="custom-btn-2" as={Link} to="/browse-products">Browse Products: Surplus</Button></BStyle>
                        <BStyle><Button className="custom-btn-2" as={Link} to="/browse-products-local">Browse Products: Local Produce</Button></BStyle>
                      </BGroup>

                      <BGroup>
                        <BStyle><Button className="custom-btn-2" as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button></BStyle>
                      </BGroup>

                      <Divider style={{marginBottom: "10px"}}/> */}

                      <Divider style={{marginTop: "10px"}}/>

                      <Button variant="secondary" style={{width: "40%", marginLeft: "30%", marginTop: "1%", marginBottom: "1%"}} onClick={(e) => this.setState({mobileDisclaimerShown: !this.state.mobileDisclaimerShown})}>DISCLAIMER: {" "}<BsFillExclamationCircleFill /></Button>

                      <Modal show={this.state.mobileDisclaimerShown} onHide={() => this.setState({mobileDisclaimerShown: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>DISCLAIMER</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          The Global Food Loss & Waste Tracker is designed, in part, to help users develop healthy eating habits.
                          The nutritional information and dietary recommendations provided are merely suggestions which may or may not improve users' eating habits and/or overall health.
                          This app is a self-regulatory tool, not intended to replace professional medical advice. Please always consult a dietician or medical professional for professional
                          medical advice regarding your health.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({mobileDisclaimerShown: false})}>Close</Button>
                        </Modal.Footer>
                      </Modal>

                      <Button style={{backgroundColor: "rgb(94, 120, 235)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                      {/* <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Weight Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus GHG Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Cost Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}

                      <Divider style={{marginBottom: "10px"}}/>

                    </div></MobileView>

                    <BrowserView><div style={{marginTop: "-1.5%"}}>
                      <Divider style={{marginTop: "10px"}}/>

                      <ListGroup style={{width: "105%", marginLeft: "-2.5%", marginTop: "2%", marginBottom: "2%"}}>
                        <ListGroup.Item variant="primary"><b>DISCLAIMER: </b> The Global Food Loss & Waste Tracker is designed, in part, to help users develop healthy eating habits.
                        The nutritional information and dietary recommendations provided are merely suggestions which may or may not improve users' eating habits and/or overall health.
                        This app is a self-regulatory tool, not intended to replace professional medical advice. Please always consult a dietician or medical professional for professional
                        medical advice regarding your health.</ListGroup.Item>
                      </ListGroup>    

                      <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                      <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                      {/* <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Weight Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus GHG Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Cost Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}

                      <Divider style={{marginBottom: "10px"}}/>

                    </div></BrowserView>

                </> : <></>}
              </>

              <Button className="custom-btn-2 rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%", borderColor: "#aab41e"}} onClick={() => this.setState({foodWasteBubbleClicked: !this.state.foodWasteBubbleClicked, foodBubbleClicked: false})}>Food Loss</Button>

              <>
                  {this.state.foodWasteBubbleClicked ? 
                  <>
                    <MobileView><div>

                    <Divider />
                    
                    {/* <BGroup>
                      <BStyle><Button className="custom-btn" as={Link} to="/food-waste">Update Food Waste & Surplus</Button></BStyle>
                    </BGroup> */}

                    <Button style={{backgroundColor: "rgb(8, 105, 27)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-loss">Update Food Loss</Button>

                    <Button style={{backgroundColor: "rgb(8, 105, 27)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                    <Dropdown>

                      <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>

                      <DropdownMenu>

                        <Dropdown.Header>Food Loss</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayLoss">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekLoss">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthLoss">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearLoss">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>

                      </DropdownMenu>

                    </Dropdown>

                    <Dropdown>

                      <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>

                      <DropdownMenu>

                        <Dropdown.Header>Food Loss</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayLossGHG">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekLossGHG">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthLossGHG">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearLossGHG">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>

                      </DropdownMenu>

                    </Dropdown>

                    <Dropdown>

                      <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>

                      <DropdownMenu>

                        <Dropdown.Header>Food Loss</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayLossCost">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekLossCost">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthLossCost">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearLossCost">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>

                      </DropdownMenu>

                    </Dropdown>

                    {/* <BGroup>
                      <BStyle><Button className="custom-btn" as={Link} to="/view-map">View Food Waste Map</Button></BStyle>
                      <BStyle><Button className="custom-btn" as={Link} to="/food-reduction">Food Waste Reduction Tips</Button></BStyle>
                    </BGroup> */}

                    <Divider style={{marginBottom: "10px"}}/>

                  </div></MobileView>
                  
                  <BrowserView>
                    <Divider style={{marginTop: "10px"}}/>

                    <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-loss">Update Food Loss</Button>
                    <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                    <Dropdown>

                      <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>

                      <DropdownMenu>

                        <Dropdown.Header>Food Loss</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayLoss">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekLoss">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthLoss">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearLoss">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>

                      </DropdownMenu>

                    </Dropdown>

                    <Dropdown>

                      <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>

                      <DropdownMenu>

                        <Dropdown.Header>Food Loss</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayLossGHG">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekLossGHG">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthLossGHG">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearLossGHG">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>

                      </DropdownMenu>

                    </Dropdown>

                    <Dropdown>

                      <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>

                      <DropdownMenu>

                        <Dropdown.Header>Food Loss</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayLossCost">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekLossCost">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthLossCost">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearLossCost">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>

                      </DropdownMenu>

                    </Dropdown>

                    <Divider style={{marginBottom: "10px"}}/>
                  </BrowserView>

                  </> : <></>
                  }
              </>

              <BrowserView><Button className="custom-btn rounded" style={{padding: "1.5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "10%", fontWeight: 550, fontSize: "150%"}} as={Link} to="/change-password">Change Your Password</Button></BrowserView>
              <MobileView><Button className="custom-btn rounded" style={{padding: "5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "25%", fontWeight: 550, fontSize: "100%"}} as={Link} to="/change-password">Change Password</Button></MobileView>

              </div>
               
               : 
              
              <div>
                <div>{profile.buildingFunction !== "Households" && profile.uniRole !== "Student" ?

                <div style={{height: "80vh", padding: "1.5% 1.5% 1.5% 1.5%", marginBottom: "5%"}}>

                <Button className="custom-btn rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodBubbleClicked: !this.state.foodBubbleClicked, foodWasteBubbleClicked: false})}>Food</Button>

                <>
                  {this.state.foodBubbleClicked ? 
                  <>
                    <MobileView><div style={{marginTop: "-1.5%"}}>

                      {/* <Divider style={{marginTop: "10px"}}/>

                        <BGroup>
                          <BStyle><Button className="custom-btn-2" as={Link} to="/browse-products">Browse Products: Surplus</Button></BStyle>
                          <BStyle><Button className="custom-btn-2" as={Link} to="/browse-products-local">Browse Products: Local Produce</Button></BStyle>
                        </BGroup>

                        <BGroup>
                          <BStyle><Button className="custom-btn-2" as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button></BStyle>
                        </BGroup>

                        <Divider style={{marginBottom: "10px"}}/> */}

                        <Divider style={{marginTop: "10px"}}/>

                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake</Button>
                        {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button> */}
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                        {/* <Dropdown>
                          <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Weight Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                          <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus GHG Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                          <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Cost Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown> */}

                        <Divider style={{marginBottom: "10px"}}/>

                      </div></MobileView>

                      <BrowserView><div style={{marginTop: "-1.5%"}}>
                        <Divider style={{marginTop: "10px"}}/>

                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                        {/* <Dropdown>
                          <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Weight Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                          <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus GHG Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                          <DropdownToggle style={{backgroundColor: "rgb(148, 25, 230)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(148, 25, 230)"}}>View Food Surplus Cost Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown> */}

                        <Divider style={{marginBottom: "10px"}}/>

                      </div></BrowserView>

                  </> : <></>}
                </>

                <Button className="custom-btn-2 rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%", borderColor: "#aab41e"}} onClick={() => this.setState({foodWasteBubbleClicked: !this.state.foodWasteBubbleClicked, foodBubbleClicked: false})}>Food Waste</Button>

                <>
                    {this.state.foodWasteBubbleClicked ? 
                    <>
                      <MobileView><div>

                      <Divider />
                      
                      {/* <BGroup>
                        <BStyle><Button className="custom-btn" as={Link} to="/food-waste">Update Food Waste & Surplus</Button></BStyle>
                      </BGroup> */}

                      <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-wasteBusiness">Update Food Waste</Button>

                      <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                      <Dropdown>

                        <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>

                        <DropdownMenu>
                          <Dropdown.Header>Food Waste</Dropdown.Header>
                          {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                          <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>

                          <Dropdown.Divider />

                          <Dropdown.Header>Food Surplus</Dropdown.Header>
                          {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                          <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>

                        </DropdownMenu>

                      </Dropdown>

                      <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <Dropdown.Header>Food Waste</Dropdown.Header>
                          {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                          <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                          <Dropdown.Divider />

                          <Dropdown.Header>Food Surplus</Dropdown.Header>
                          {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                          <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown>
                        <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <Dropdown.Header>Food Waste</Dropdown.Header>
                          {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                          <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                          <Dropdown.Divider />

                          <Dropdown.Header>Food Surplus</Dropdown.Header>
                          {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                          <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      {/* <BGroup>
                        <BStyle><Button className="custom-btn" as={Link} to="/view-map">View Food Waste Map</Button></BStyle>
                        <BStyle><Button className="custom-btn" as={Link} to="/food-reduction">Food Waste Reduction Tips</Button></BStyle>
                      </BGroup> */}

                      <Divider style={{marginBottom: "10px"}}/>

                    </div></MobileView>
                    
                    <BrowserView>
                      <Divider style={{marginTop: "10px"}}/>

                      <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-wasteBusiness">Update Food Waste</Button>
                      <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                      <Dropdown>

                        <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>

                          <DropdownMenu>

                            <Dropdown.Header>Food Waste</Dropdown.Header>
                            {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                            <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>

                            <Dropdown.Divider />

                            <Dropdown.Header>Food Surplus</Dropdown.Header>
                            {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                            <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>

                          </DropdownMenu>

                        </Dropdown>

                        <Dropdown>
                            <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>
                            <DropdownMenu>
                              <Dropdown.Header>Food Waste</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                              <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>

                          <Dropdown>
                            <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>
                            <DropdownMenu>
                              <Dropdown.Header>Food Waste</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                              <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>

                      <Divider style={{marginBottom: "10px"}}/>
                    </BrowserView>

                    </> : <></>
                    }
                </>

                <BrowserView><Button className="custom-btn rounded" style={{padding: "1.5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "10%", fontWeight: 550, fontSize: "150%"}} as={Link} to="/change-password">Change Your Password</Button></BrowserView>
                <MobileView><Button className="custom-btn rounded" style={{padding: "5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "25%", fontWeight: 550, fontSize: "100%"}} as={Link} to="/change-password">Change Password</Button></MobileView>

                </div>



                :

                <div>{profile.buildingFunction === "Schools" && profile.uniRole === "Student" ?

                <div style={{height: "120vh", padding: "1.5% 1.5% 1.5% 1.5%", marginBottom: "10%"}}>

                <Button className="custom-btn-3 rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({universityBubbleClicked: !this.state.universityBubbleClicked, householdBubbleClicked: false})}>University</Button>

                <>
                  {this.state.universityBubbleClicked ?
                    // <BrowserView>
                    <>

                      <Button className="custom-btn rounded" style={{height: "120px", width: "90%", marginLeft:"5%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodBubbleClicked: !this.state.foodBubbleClicked, foodWasteBubbleClicked: false})}>Food</Button>

                      <>
                        {this.state.foodBubbleClicked ?
                        <>
                          <BrowserView>
                            <Divider style={{marginTop: "10px"}}/>

                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intakeAcademic">Update Food Intake (Academic)</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplusAcademic">Upload Food (Academic)</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                            <Divider style={{marginBottom: "10px"}}/>
                          </BrowserView>

                          <MobileView>
                            <Divider style={{marginTop: "10px"}}/>

                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intakeAcademic">Update Food Intake (Academic)</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplusAcademic">Upload Food (Academic)</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                            <Divider style={{marginBottom: "10px"}}/>
                          </MobileView>
                        </>
                        : <></>}
                      </>

                      <Button className="custom-btn-2 rounded" style={{height: "120px", width: "90%", marginLeft: "5%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodWasteBubbleClicked: !this.state.foodWasteBubbleClicked, foodBubbleClicked: false})}>Food Waste</Button>

                      <>
                        {this.state.foodWasteBubbleClicked ?
                        <>
                          <BrowserView>
                            <Divider style={{marginTop: "10px"}}/>

                            <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-wasteAcademic">Update Food Waste (Academic)</Button>
                            <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                            <Dropdown>

                              <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart (Academic)</DropdownToggle>

                                <DropdownMenu>

                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearUni">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusUni">Yearly</DropdownItem>

                                </DropdownMenu>

                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart (Academic)</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekGHGUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthGHGUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearGHGUni">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusGHGUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusGHGUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusGHGUni">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart (Academic)</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekCostUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthCostUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearCostUni">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusCostUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusCostUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusCostUni">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                            <Divider style={{marginBottom: "10px"}}/>
                          </BrowserView>

                          <MobileView>
                            <Divider style={{marginTop: "10px"}}/>

                            <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-wasteAcademic">Update Food Waste (Academic)</Button>
                            <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                            <Dropdown>

                              <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)", fontSize: "87.5%"}}>View Food Weight Performance Chart</DropdownToggle>

                                <DropdownMenu>

                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearUni">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusUni">Yearly</DropdownItem>

                                </DropdownMenu>

                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)", fontSize: "87.5%"}}>View Food GHG Performance Chart</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekGHGUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthGHGUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearGHGUni">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusGHGUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusGHGUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusGHGUni">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)", fontSize: "87.5%"}}>View Food Cost Performance Chart</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekCostUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthCostUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearCostUni">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusCostUni">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusCostUni">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusCostUni">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                            <Divider style={{marginBottom: "10px"}}/>
                          </MobileView>
                        </>
                        : <></>}
                      </>

                    {/* </BrowserView> */}
                    </>

                  : <></> } 
                </>

                <Button className="custom-btn-4 rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({householdBubbleClicked: !this.state.householdBubbleClicked, universityBubbleClicked: false})}>Household/Personal</Button>

                <>
                  {this.state.householdBubbleClicked ?
                    // <BrowserView>
                    <>

                      <Button className="custom-btn rounded" style={{height: "120px", width: "90%", marginLeft: "5%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodBubbleClicked: !this.state.foodBubbleClicked, foodWasteBubbleClicked: false})}>Food</Button>

                      <>
                        {this.state.foodBubbleClicked ?
                        <>
                          <BrowserView>
                            <Divider style={{marginTop: "10px"}}/>

                            <ListGroup style={{width: "105%", marginLeft: "-2.5%", marginTop: "2%", marginBottom: "2%"}}>
                              <ListGroup.Item variant="primary"><b>DISCLAIMER: </b> The Global Food Loss & Waste Tracker is designed, in part, to help users develop healthy eating habits.
                              The nutritional information and dietary recommendations provided are merely suggestions which may or may not improve users' eating habits and/or overall health.
                              This app is a self-regulatory tool, not intended to replace professional medical advice. Please always consult a dietician or medical professional for professional
                              medical advice regarding your health.</ListGroup.Item>
                            </ListGroup>

                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake (Household)</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food (Household)</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                            <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                            <Divider style={{marginBottom: "10px"}}/>
                          </BrowserView>

                          <MobileView>
                            <div style={{marginTop: "-1.5%"}}>
                              <Divider style={{marginTop: "10px"}}/>

                              {/* <div style={{marginLeft: "30%", marginBottom: "2%", marginTop: "1%", backgroundColor: "gray", padding: "1px 1px 1px 1px", width: "40%"}}>
                                <b onClick={(e) => this.setState({mobileDisclaimerShown: !this.state.mobileDisclaimerShown})}>DISCLAIMER: {" "}<BsFillExclamationCircleFill style={{marginTop: "-2.5px"}}/></b>
                              </div> */}

                              <Button variant="secondary" style={{width: "40%", marginLeft: "30%", marginTop: "1%", marginBottom: "1%"}} onClick={(e) => this.setState({mobileDisclaimerShown: !this.state.mobileDisclaimerShown})}>DISCLAIMER: {" "}<BsFillExclamationCircleFill /></Button>

                              <Modal show={this.state.mobileDisclaimerShown} onHide={() => this.setState({mobileDisclaimerShown: false})}>
                                <Modal.Header closeButton>
                                    <Modal.Title>DISCLAIMER</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  The Global Food Loss & Waste Tracker is designed, in part, to help users develop healthy eating habits.
                                  The nutritional information and dietary recommendations provided are merely suggestions which may or may not improve users' eating habits and/or overall health.
                                  This app is a self-regulatory tool, not intended to replace professional medical advice. Please always consult a dietician or medical professional for professional
                                  medical advice regarding your health.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.setState({mobileDisclaimerShown: false})}>Close</Button>
                                </Modal.Footer>
                              </Modal>

                              <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake (Household)</Button>
                              <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                              <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food (Household)</Button>
                              <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                              <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>

                              <Divider style={{marginBottom: "10px"}}/>
                            </div>
                          </MobileView>
                        </>
                        : <></>}
                      </>

                      <Button className="custom-btn-2 rounded" style={{height: "120px", width: "90%", marginLeft: "5%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodWasteBubbleClicked: !this.state.foodWasteBubbleClicked, foodBubbleClicked: false})}>Food Waste</Button>

                      <>
                        {this.state.foodWasteBubbleClicked ?
                        <>
                          <BrowserView>
                            <Divider style={{marginTop: "10px"}}/>

                            <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-waste">Update Food Waste (Household)</Button>
                            <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                            <Dropdown>

                              <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>

                                <DropdownMenu>

                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>

                                </DropdownMenu>

                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                                  <Dropdown.Divider />

                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                            <Divider style={{marginBottom: "10px"}}/>
                          </BrowserView>

                          <MobileView>
                            <div style={{marginTop: "-1.5%"}}>
                              <Divider style={{marginTop: "10px"}}/>

                              <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-waste">Update Food Waste (Household)</Button>
                              <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                              <Dropdown>

                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)", fontSize: "87.5%"}}>View Food Weight Performance Chart</DropdownToggle>

                                  <DropdownMenu>

                                    <Dropdown.Header>Food Waste</Dropdown.Header>
                                    {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                    <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>

                                    <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                                    <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>

                                  </DropdownMenu>

                                </Dropdown>

                                <Dropdown>
                                  <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)", fontSize: "87.5%"}}>View Food GHG Performance Chart</DropdownToggle>
                                  <DropdownMenu>
                                    <Dropdown.Header>Food Waste</Dropdown.Header>
                                    {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                    <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                                    <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                                    <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>

                                <Dropdown>
                                  <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "90%", marginLeft: "5%", marginTop: "1%", marginBottom: "1%", borderColor: "rgb(76, 226, 106)", fontSize: "87.5%"}}>View Food Cost Performance Chart</DropdownToggle>
                                  <DropdownMenu>
                                    <Dropdown.Header>Food Waste</Dropdown.Header>
                                    {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                    <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                                    <Dropdown.Divider />

                                    <Dropdown.Header>Food Surplus</Dropdown.Header>
                                    {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                                    <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                                    <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>

                              <Divider style={{marginBottom: "10px"}}/>
                            </div>
                          </MobileView>
                        </>
                        : <></>}
                      </>

                    {/* </BrowserView> */}
                    </>
                  : <></>}
                </>

                <BrowserView><Button className="custom-btn rounded" style={{padding: "1.5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "10%", fontWeight: 550, fontSize: "150%"}} as={Link} to="/change-password">Change Your Password</Button></BrowserView>
                <MobileView><Button className="custom-btn rounded" style={{padding: "5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "25%", fontWeight: 550, fontSize: "100%"}} as={Link} to="/change-password">Change Password</Button></MobileView>

                </div>

                :

                <div>{profile.buildingFunction === "Households" ?

                <div style={{height: "80vh", padding: "1.5% 1.5% 1.5% 1.5%", marginBottom: "5%"}}>

                    <Button className="custom-btn rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%"}} onClick={() => this.setState({foodBubbleClicked: !this.state.foodBubbleClicked, foodWasteBubbleClicked: false})}>Food</Button>

                    <>
                      {this.state.foodBubbleClicked ? 
                      <>
                      <MobileView><div style={{marginTop: "-1.5%"}}>

                        <Divider style={{marginTop: "10px"}}/>

                        <Button variant="secondary" style={{width: "40%", marginLeft: "30%", marginTop: "1%", marginBottom: "1%"}} onClick={(e) => this.setState({mobileDisclaimerShown: !this.state.mobileDisclaimerShown})}>DISCLAIMER: {" "}<BsFillExclamationCircleFill /></Button>

                        <Modal show={this.state.mobileDisclaimerShown} onHide={() => this.setState({mobileDisclaimerShown: false})}>
                          <Modal.Header closeButton>
                              <Modal.Title>DISCLAIMER</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            The Global Food Loss & Waste Tracker is designed, in part, to help users develop healthy eating habits.
                            The nutritional information and dietary recommendations provided are merely suggestions which may or may not improve users' eating habits and/or overall health.
                            This app is a self-regulatory tool, not intended to replace professional medical advice. Please always consult a dietician or medical professional for professional
                            medical advice regarding your health.
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant="secondary" onClick={() => this.setState({mobileDisclaimerShown: false})}>Close</Button>
                          </Modal.Footer>
                        </Modal>

                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>
                        {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/product-listing">Product Listing</Button> */}

                        <Divider style={{marginBottom: "10px"}}/>

                      </div></MobileView>

                      <BrowserView><div style={{marginTop: "-1.5%"}}>
                        <Divider style={{marginTop: "10px"}}/>

                        <ListGroup style={{width: "105%", marginLeft: "-2.5%", marginTop: "2%", marginBottom: "2%"}}>
                          <ListGroup.Item variant="primary"><b>DISCLAIMER: </b> The Global Food Loss & Waste Tracker is designed, in part, to help users develop healthy eating habits.
                          The nutritional information and dietary recommendations provided are merely suggestions which may or may not improve users' eating habits and/or overall health.
                          This app is a self-regulatory tool, not intended to replace professional medical advice. Please always consult a dietician or medical professional for professional
                          medical advice regarding your health.</ListGroup.Item>
                        </ListGroup>

                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-intake">Update Food Intake</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/chart/nutrientGap">Nutrient Gap Breakdown</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/food-surplus">Upload Food</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products">Browse Products: Surplus</Button>
                        <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/browse-products-local">Browse Products: Local Produce</Button>
                        {/* <Button style={{backgroundColor: "rgb(94, 120, 235)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(94, 120, 235)"}} as={Link} to="/product-listing">Product Listing</Button> */}

                        <Divider style={{marginBottom: "10px"}}/>

                      </div></BrowserView>

                      </> : <></>}
                    </>

                    <Button className="custom-btn-2 rounded" style={{height: "120px", width: "100%", marginBottom: "2.5%", fontWeight: 600, fontSize: "200%", borderColor: "#aab41e"}} onClick={() => this.setState({foodWasteBubbleClicked: !this.state.foodWasteBubbleClicked, foodBubbleClicked: false})}>Food Waste</Button>

                    <>
                        {this.state.foodWasteBubbleClicked ? 
                        <>
                          <MobileView><div>

                          <Divider />

                          <Button style={{backgroundColor: "rgb(8, 105, 27)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-waste">Update Food Waste</Button>

                          {/* <Button style={{backgroundColor: "rgb(8, 105, 27)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/view-map">View Food Waste Map</Button> */}

                          <Button style={{backgroundColor: "rgb(8, 105, 27)",  width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>
  
                          <Dropdown>
  
                            <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>
            
                            <DropdownMenu>
                              <Dropdown.Header>Food Waste</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>
            
                              <Dropdown.Divider />
            
                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
            
                            </DropdownMenu>
              
                          </Dropdown>
  
                          <Dropdown>
                            <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>
                            <DropdownMenu>
                              <Dropdown.Header>Food Waste</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                              <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
  
                          <Dropdown>
                            <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)", fontSize: "87.5%", width: "90%", marginLeft: "5%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>
                            <DropdownMenu>
                              <Dropdown.Header>Food Waste</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                              <Dropdown.Divider />

                              <Dropdown.Header>Food Surplus</Dropdown.Header>
                              {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                              <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                              <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>

                          <Divider style={{marginBottom: "10px"}}/>

                        </div></MobileView>
                        
                        <BrowserView>
                          <Divider style={{marginTop: "10px"}}/>

                          <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-waste">Update Food Waste</Button>
                          {/* <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/view-map">View Food Waste Map</Button> */}
                          <Button style={{backgroundColor: "rgb(8, 105, 27)", width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(8, 105, 27)"}} as={Link} to="/food-reduction">Food Waste Reduction Tips</Button>

                          <Dropdown>
  
                            <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Weight Performance Chart</DropdownToggle>
            
                              <DropdownMenu>

                                <Dropdown.Header>Food Waste</Dropdown.Header>
                                {/* <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem> */}
                                <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                                <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                                <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>
              
                                <Dropdown.Divider />
              
                                <Dropdown.Header>Food Surplus</Dropdown.Header>
                                {/* <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem> */}
                                <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                                <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                                <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
              
                              </DropdownMenu>
              
                            </Dropdown>

                            <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food GHG Performance Chart</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>
  
                                  <Dropdown.Divider />
  
                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                              <Dropdown>
                                <DropdownToggle style={{backgroundColor: "rgb(76, 226, 106)",  width: "60%", marginLeft: "20%", marginTop: "2%", marginBottom: "2%", borderColor: "rgb(76, 226, 106)"}}>View Food Cost Performance Chart</DropdownToggle>
                                <DropdownMenu>
                                  <Dropdown.Header>Food Waste</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>
  
                                  <Dropdown.Divider />
  
                                  <Dropdown.Header>Food Surplus</Dropdown.Header>
                                  {/* <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem> */}
                                  <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                                  <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>

                          <Divider style={{marginBottom: "10px"}}/>
                        </BrowserView>

                        </> : <></>
                        }
                    </>

                    <BrowserView><Button className="custom-btn rounded" style={{padding: "1.5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "10%", fontWeight: 550, fontSize: "150%"}} as={Link} to="/change-password">Change Your Password</Button></BrowserView>
                    <MobileView><Button className="custom-btn rounded" style={{padding: "5%", height: "60px", width: "65%", marginLeft: "17.5%", marginBottom: "25%", fontWeight: 550, fontSize: "100%"}} as={Link} to="/change-password">Change Password</Button></MobileView>

              </div> : <></>

                }</div>
                
                }

                </div>


                }

                </div>

                {/* <BStyle><Button className="custom-btn" as={Link} to="/food-loss">Update Food Loss</Button></BStyle> */}
                {/* <BStyle><Button className="custom-btn" as={Link} to="/browse-products">Browse Products</Button></BStyle> */}
              
            </div>
            

              }

          </div>

          </Col>

          <Col xs={12} lg={3}></Col>

          <Col className="mt-lg-5 pt-lg-5" xs={12}></Col>
          <Col className="mt-lg-5 pt-lg-5" xs={12}></Col>

          </Row>
      </React.Fragment>
    );
  }

}

const BGroup = styled.div`
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
`;

const mapStateToProps = (state) => { 
  // console.log(state);
  return{
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      users: state.firestore.ordered.users

  }
}

export default compose(connect(mapStateToProps),firestoreConnect([{ collection: "users" }]))(Account);