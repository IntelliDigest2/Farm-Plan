import React, { Component } from "react";
import "../../../App.css";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import "../Pages.css"
// import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import ButtonModal from './ButtonModalChart'

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
        <div className="acc-options text-center">
          <p><Link className="user-acc-opt" to="/change-password">Change Password</Link></p>
          <p><Link className="user-acc-opt" to="/view-map">View Food Waste Map</Link></p>
          <p><Link className="user-acc-opt" to="/add-data">Update your food waste & food surplus</Link></p>
          
          <p>
            <ButtonModal/>
          </p>
          <p><Link className="user-acc-opt" to="/food-reduction">Food Waste Reduction Tips</Link></p>
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

// const View = styled.div`
//   .view{
//     flex: 1;
//   }
// `;

const mapStateToProps = (state) => { 
  console.log(state);
  return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, null)(Account);