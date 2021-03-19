import React, { useState } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";


function Account() {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
  
    return (
      <React.Fragment>
        <Row className="ml-0 mr-0 user-acc">
          <Col className="mt-3 pt-3 mt-lg-5 pt-lg-5" xs={12}></Col>
          <Col className="mt-3 pt-3 mt-lg-5 pt-lg-5" xs={12}></Col>

          <Col className="mt-4 pt-4 mt-lg-5 pt-lg-5" xs={12} lg={3}></Col>
          <Col className="" xs={12} lg={6}>
          <h1 className="user-acc-title text-center">My Account</h1>
        {<h1 className="warning">{error}</h1>}
          <h1 className="text-center">Account email: <span >{currentUser.email}</span></h1>
        <div className="acc-options text-center">
          <p><Link className="user-acc-opt" to="/change-password">Change Password</Link></p>
          <p><Link className="user-acc-opt" to="/view-map">View Map</Link></p>
          <p><Link className="user-acc-opt" to="#">SMART Bin Details</Link></p>
          <p><Link className="user-acc-opt" to="#">View Food Waste</Link></p>
          <ButtonStyle>

          <Button variant="dark" type="submit" onClick={handleLogout}> Logout </Button>
          </ButtonStyle>
        </div>

          </Col>
          <Col xs={12} lg={3}></Col>

          <Col className="mt-lg-5 pt-lg-5" xs={12}></Col>
          <Col className="mt-lg-5 pt-lg-5" xs={12}></Col>
        </Row>

      </React.Fragment>
  );
}


const ButtonStyle = styled.div`
    .btn-dark{
      background-color:  #071850;
      color:whitesmoke;
      border: 1px solid #03091d;
      margin-top:20px;

      &:hover{
        background-color: #030d2b;
        border: 1px solid #03091d;
      }

      &:active{
        background-color: #030d2b;
        border: 1px solid #03091d;
      }
    }

`

export default Account;
