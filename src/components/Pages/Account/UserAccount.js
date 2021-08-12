import React, { Component } from "react";
import "../../../App.css";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
// import ButtonModal from './ButtonModalChart'
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { BrowserView, MobileView } from 'react-device-detect'

// import addNotification from "react-push-notification"

class Account extends Component {

  // state = {
  //   foodBubbleClicked: false,
  //   foodWasteBubbleClicked: false
  // }

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
                 <div>
                
                 <BGroup>
                 <BStyle><Button className="custom-btn" as={Link} to="/food-waste">Update Food Waste & Surplus</Button></BStyle>
                 <BStyle><Button className="custom-btn" as={Link} to="/food-loss">Update Food Loss</Button></BStyle>
                 </BGroup>
 
                 <BGroup>
                 <DDStyle><Dropdown>
 
                   <DropdownToggle style={{width: "117%", marginLeft: "-7.5%"}} className="custom-btn">View Food Weight Performance Chart</DropdownToggle>
 
                   <DropdownMenu>
                     <Dropdown.Header>Food Waste</Dropdown.Header>
                     <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>
 
                     <Dropdown.Divider />
       
                     <Dropdown.Header>Food Surplus</Dropdown.Header>
                     <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
 
                   </DropdownMenu>
 
                 </Dropdown></DDStyle>
               </BGroup>
 
               <BGroup>
               <DDStyle>
                 <Dropdown>
                   <DropdownToggle style={{width: "124.5%", marginLeft: "-11%"}} className="custom-btn">View Food GHG Performance Chart</DropdownToggle>
                   <DropdownMenu>
                     <Dropdown.Header>Food Waste</Dropdown.Header>
                     <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>
 
                     <Dropdown.Divider />
 
                     <Dropdown.Header>Food Surplus</Dropdown.Header>
                     <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
 
                   </DropdownMenu>
                 </Dropdown>
               </DDStyle>
             </BGroup>
 
             <BGroup>
               <DDStyle>
                 <Dropdown>
                   <DropdownToggle style={{width: "124.5%", marginLeft: "-11%"}} className="custom-btn">View Food Cost Performance Chart</DropdownToggle>
                   <DropdownMenu>
                     <Dropdown.Header>Food Waste</Dropdown.Header>
                     <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>
 
                     <Dropdown.Divider />
 
                     <Dropdown.Header>Food Surplus</Dropdown.Header>
                     <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
 
                   </DropdownMenu>
                 </Dropdown>
               </DDStyle>
             </BGroup>
 
             <BGroup>
               <DDStyle>
                 <Dropdown>
                   <DropdownToggle style={{width: "105%", marginLeft: "-1.5%"}} className="custom-btn">View Food Loss Weight Performance Chart</DropdownToggle>
                   <DropdownMenu>
                     <DropdownItem as={Link} to="/chart/dayLoss">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekLoss">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthLoss">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearLoss">Yearly</DropdownItem>
                   </DropdownMenu>
                 </Dropdown>
               </DDStyle>
             </BGroup>
 
             <BGroup>
               <DDStyle>
                 <Dropdown>
                   <DropdownToggle style={{width: "110%", marginLeft: "-3.5%"}} className="custom-btn">View Food Loss GHG Performance Chart</DropdownToggle>
                   <DropdownMenu>
                     <DropdownItem as={Link} to="/chart/dayLossGHG">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekLossGHG">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthLossGHG">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearLossGHG">Yearly</DropdownItem>
                   </DropdownMenu>
                 </Dropdown>
               </DDStyle>
             </BGroup>
 
             <BGroup>
               <DDStyle>
                 <Dropdown>
                   <DropdownToggle style={{width: "110%", marginLeft: "-3.5%"}} className="custom-btn">View Food Loss Cost Performance Chart</DropdownToggle>
                   <DropdownMenu>
                     <DropdownItem as={Link} to="/chart/dayLossCost">Daily</DropdownItem>
                     <DropdownItem as={Link} to="/chart/weekLossCost">Weekly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/monthLossCost">Monthly</DropdownItem>
                     <DropdownItem as={Link} to="/chart/yearLossCost">Yearly</DropdownItem>
                   </DropdownMenu>
                 </Dropdown>
               </DDStyle>
             </BGroup>
             
               <BGroup> 
               
                 {/* <p>
                   <ButtonModal/>
                 </p> */}
 
                 <BStyle><Button className="custom-btn" as={Link} to="/view-map">View Food Waste Map</Button></BStyle>
                 <BStyle><Button className="custom-btn" as={Link} to="/food-reduction">Food Waste Reduction Tips</Button></BStyle>
               </BGroup>
 
               <BGroup>
                 <PWBStyle><Button className="custom-btn" as={Link} to="/change-password">Change Your Password</Button></PWBStyle>
               </BGroup></div> : 
              
              <div>
                <div>{profile.buildingFunction !== "Households" ?

                  <div>

                    <BGroup>
                      <BStyle><Button className="custom-btn" as={Link} to="/food-wasteBusiness">Update Food Waste & Surplus</Button></BStyle>
                    </BGroup>

                    <BGroup>
                    <DDStyle><Dropdown>
      
                      {/* 'variant' value changes colour, not css(?) */}
                      <DropdownToggle className="custom-btn">View Food Weight Performance Chart</DropdownToggle>
      
                      <DropdownMenu>
                        <Dropdown.Header>Food Waste</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayBusiness">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>
      
                        <Dropdown.Divider />
      
                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayBusiness">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
      
                          {/* <Dropdown.Divider />
      
                          <Dropdown.Header>GHG</Dropdown.Header>
                            <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem>
                            <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>
      
                          <Dropdown.Divider />
      
                          <Dropdown.Header>Cost</Dropdown.Header>
                            <DropdownItem as={Link} to="">Daily</DropdownItem>
                            <DropdownItem as={Link} to="">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="">Yearly</DropdownItem> */}
                      </DropdownMenu>
      
                    </Dropdown></DDStyle>
                  </BGroup>

                    <BGroup>
                      <DDStyle>
                        <Dropdown>
                          <DropdownToggle style={{width: "105.5%", marginLeft: "-2.5%"}} className="custom-btn">View Food GHG Performance Chart</DropdownToggle>
                          <DropdownMenu>
                            <Dropdown.Header>Food Waste</Dropdown.Header>
                            <DropdownItem as={Link} to="/chart/dayBusinessGHG">Daily</DropdownItem>
                            <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                            <Dropdown.Divider />

                            <Dropdown.Header>Food Surplus</Dropdown.Header>
                            <DropdownItem as={Link} to="/chart/dayBusinessGHG">Daily</DropdownItem>
                            <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                            <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </DDStyle>
                    </BGroup>

                    <BGroup>
                    <DDStyle>
                      <Dropdown>
                        <DropdownToggle style={{width: "105.5%", marginLeft: "-2.5%"}} className="custom-btn">View Food Cost Performance Chart</DropdownToggle>
                        <DropdownMenu>
                          <Dropdown.Header>Food Waste</Dropdown.Header>
                          <DropdownItem as={Link} to="/chart/dayBusinessCost">Daily</DropdownItem>
                          <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                          <Dropdown.Divider />

                          <Dropdown.Header>Food Surplus</Dropdown.Header>
                          <DropdownItem as={Link} to="/chart/dayBusinessCost">Daily</DropdownItem>
                          <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </DDStyle>
                  </BGroup>

                  <BGroup> 
            
                    {/* <p>
                      <ButtonModal/>
                    </p> */}

                    <BStyle><Button className="custom-btn" as={Link} to="/view-map">View Food Waste Map</Button></BStyle>
                    <BStyle><Button className="custom-btn" as={Link} to="/food-reduction">Food Waste Reduction Tips</Button></BStyle>
                  </BGroup>

                  <BGroup>
                    <PWBStyle><Button className="custom-btn" as={Link} to="/change-password">Change Your Password</Button></PWBStyle>
                  </BGroup>

                  </div>



                :

                <div>

                <BGroup><BStyle><Button className="custom-btn" as={Link} to="/food-waste">Update Food Waste & Surplus</Button></BStyle>
                <BStyle><Button className="custom-btn" as={Link} to="/chart/nutrientGap">View Nutrient Gap Chart</Button></BStyle></BGroup>
                {/* <BStyle><Button className="custom-btn" type="button" onClick={() => this.notificationTest()}>View Badge Progress</Button></BStyle></BGroup> */}
                  {/* <BStyle><Button className="custom-btn" as={Link} to="/food-wasteBusiness">Update Food Waste (Business)</Button></BStyle> */}
                  {/* <BStyle><Button className="custom-btn" as={Link} to="/food-loss">Update Food Loss</Button></BStyle></BGroup> */}

                  <BGroup>
                  <DDStyle><Dropdown>
    
                    {/* 'variant' value changes colour, not css(?) */}
                    <DropdownToggle className="custom-btn">View Food Weight Performance Chart</DropdownToggle>
    
                    <DropdownMenu>
                      <Dropdown.Header>Food Waste</Dropdown.Header>
                      <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem>
                      <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                      <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                      <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>
    
                      <Dropdown.Divider />
    
                      <Dropdown.Header>Food Surplus</Dropdown.Header>
                      <DropdownItem as={Link} to="/chart/daySurplus">Daily</DropdownItem>
                      <DropdownItem as={Link} to="/chart/weekSurplus">Weekly</DropdownItem>
                      <DropdownItem as={Link} to="/chart/monthSurplus">Monthly</DropdownItem>
                      <DropdownItem as={Link} to="/chart/yearSurplus">Yearly</DropdownItem>
    
                        {/* <Dropdown.Divider />
    
                        <Dropdown.Header>GHG</Dropdown.Header>
                          <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem>
                          <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>
    
                        <Dropdown.Divider />
    
                        <Dropdown.Header>Cost</Dropdown.Header>
                          <DropdownItem as={Link} to="">Daily</DropdownItem>
                          <DropdownItem as={Link} to="">Weekly</DropdownItem>
                          <DropdownItem as={Link} to="">Monthly</DropdownItem>
                          <DropdownItem as={Link} to="">Yearly</DropdownItem> */}
                    </DropdownMenu>
    
                  </Dropdown></DDStyle>
                </BGroup>

                <BGroup>
                  <DDStyle>
                    <Dropdown>
                      <DropdownToggle style={{width: "105.5%", marginLeft: "-2.5%"}} className="custom-btn">View Food GHG Performance Chart</DropdownToggle>
                      <DropdownMenu>
                        <Dropdown.Header>Food Waste</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayGHG">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekGHG">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthGHG">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearGHG">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/daySurplusGHG">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekSurplusGHG">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplusGHG">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplusGHG">Yearly</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </DDStyle>
                </BGroup>

                <BGroup>
                  <DDStyle>
                    <Dropdown>
                      <DropdownToggle style={{width: "105.5%", marginLeft: "-2.5%"}} className="custom-btn">View Food Cost Performance Chart</DropdownToggle>
                      <DropdownMenu>
                        <Dropdown.Header>Food Waste</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/dayCost">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekCost">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthCost">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearCost">Yearly</DropdownItem>

                        <Dropdown.Divider />

                        <Dropdown.Header>Food Surplus</Dropdown.Header>
                        <DropdownItem as={Link} to="/chart/daySurplusCost">Daily</DropdownItem>
                        <DropdownItem as={Link} to="/chart/weekSurplusCost">Weekly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/monthSurplusCost">Monthly</DropdownItem>
                        <DropdownItem as={Link} to="/chart/yearSurplusCost">Yearly</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </DDStyle>
                </BGroup>

                <BGroup> 
          
                  {/* <p>
                    <ButtonModal/>
                  </p> */}

                  <BStyle><Button className="custom-btn" as={Link} to="/view-map">View Food Waste Map</Button></BStyle>
                  <BStyle><Button className="custom-btn" as={Link} to="/food-reduction">Food Waste Reduction Tips</Button></BStyle>
                </BGroup>

                <BGroup>
                  {/* <PWBStyle><Button className="custom-btn" as={Link} to="/change-password">Change Your Password</Button></PWBStyle> */}
                  <BStyle><Button className="custom-btn" as={Link} to="/browse-products">Browse Products: Surplus</Button></BStyle>
                  <BStyle><Button className="custom-btn" as={Link} to="/browse-products-local">Browse Products: Local Produce</Button></BStyle>
                </BGroup>

                <BGroup>
                  <PWBStyle><Button className="custom-btn" as={Link} to="/change-password">Change Your Password</Button></PWBStyle>
                  {/* <BStyle><Button className="custom-btn" onClick={() => this.notificationTest()}>Test Notification</Button></BStyle> */}
                </BGroup>

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