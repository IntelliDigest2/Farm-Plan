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

class Account extends Component {

  render(){
  const { auth, profile } = this.props;
  console.log(profile);

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
          <h1 className="text-center">Account email: <span >{profile.email}</span></h1>
          <h1 className="text-center">Postcode: <span >{profile.postcode}</span></h1>

          <div>

            <BGroup>
              <BStyle><Button variant="info" as={Link} to="/change-password">Change Your Password</Button></BStyle>
              <BStyle><Button variant="info" as={Link} to="/view-map">View Food Waste Map</Button></BStyle>
              <BStyle><Button variant="info" as={Link} to="/food-waste">Update Food Waste</Button></BStyle>
            </BGroup>
          
            <BGroup> 
              <BStyle><Button variant="info" as={Link} to="/food-loss">Update Food Loss</Button></BStyle>
            
              {/* <p>
                <ButtonModal/>
              </p> */}

              <BStyle><Button variant="info" as={Link} to="/food-reduction">Food Waste Reduction Tips</Button></BStyle>
            </BGroup>

            <BGroup>
              <DDStyle><Dropdown>

                {/* 'variant' value changes colour, not css(?) */}
                <DropdownToggle variant="info">View Food Waste Performance Chart</DropdownToggle>

                <DropdownMenu>
                  <DropdownItem as={Link} to="/chart/day">Daily</DropdownItem>
                  <DropdownItem as={Link} to="/chart/week">Weekly</DropdownItem>
                  <DropdownItem as={Link} to="/chart/month">Monthly</DropdownItem>
                  <DropdownItem as={Link} to="/chart/year">Yearly</DropdownItem>
                </DropdownMenu>

              </Dropdown></DDStyle>
            </BGroup>
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
`;

const DDStyle = styled.div`
  padding: 10px;
  margin-bottom: 35px;
`;

const mapStateToProps = (state) => { 
  console.log(state);
  return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, null)(Account);