import React, { useState, useEffect } from "react";

import "../../../Account/UserAccount.css";
import "./SignUpMob.css";

import { Row, Container, Button } from "react-bootstrap";
import styled from "styled-components";

import { connect } from "react-redux";
import {
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { signUp } from "../../../../../store/actions/authActions";

function SignUpMob(props) {
  return (
    <Container className="signup-mobile">
      <div className="titles">
        <Row className="center">
          <h1 style={{ color: "#afba15" }}>Intelli</h1>
          <h1 style={{ color: "#0c0847" }}>Digest</h1>
        </Row>
        <h2>Sign Up</h2>
      </div>
      {props.children}
    </Container>
  );
}

/*function Stages() {

  } else if (stage === 2) {
    return (
      <>
        <Stage2 />
        <div className="center">
          <Row>
            <Button
              variant="default"
              className="signup-btn"
              onClick={setStage(1)}
            >
              Back
            </Button>
            <Button
              variant="default"
              className="signup-btn"
              onClick={setStage(3)}
            >
              Next
            </Button>
          </Row>
        </div>
      </>
    );
  } else if (stage === 3) {
    return (
      <>
        <Stage3 />
        <div className="center">
          <Row>
            <Button
              variant="default"
              className="signup-btn"
              onClick={setStage(2)}
            >
              Back
            </Button>
            <Button
              variant="default"
              className="signup-btn"
              onClick={setStage(4)}
            >
              Next
            </Button>
          </Row>
        </div>
      </>
    );
  } else if (stage === 4) {
    return (
      <>
        <Stage4 />
        <div className="center">
          <Button
            variant="default"
            className="signup-btn"
            onClick={setStage(3)}
          >
            Back
          </Button>
        </div>
      </>
    );
  }
} */

//different stages of the signup form

function Stage2() {
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div>
      <h1>Hwllo</h1>
      {/* <div className="web-center">
      <FormStyle>
      <Form>
      <Form.Group className="mb-3">
      <Form.Label>Town</Form.Label>
      <Form.Control
      type="address"
      placeholder="Town"
      id={town}
      onChange={(e) => setTown(e.target.value)}
      />
      </Form.Group>
      
      <Form.Group className="mb-3">
      <Form.Label>Country</Form.Label>
      <Form.Control
      type="address"
      placeholder="Country"
      id={country}
      onChange={(e) => setCountry(e.target.value)}
      />
      </Form.Group>
      
      <Form.Group className="mb-3">
      <Form.Label>Region</Form.Label>
      <Form.Control
      type="address"
      placeholder="Region"
      id={region}
      onChange={(e) => setRegion(e.target.value)}
      />
      </Form.Group>
      </Form>
      </FormStyle>
    </div> */}
    </div>
  );
}

function Stage3() {
  return (
    <div>
      <p>We would like to know a little more about you</p>
    </div>
  );
}

function Stage4() {
  return (
    <div>
      <p>confirm your data</p>
    </div>
  );
}

const FormStyle = styled.div`
  form {
    width: 80%;
    margin: auto;
    padding: 10px;
  }

  input {
    border: 1px solid #62680a;
  }

  .btn-dark {
    background-color: #071850;
    color: whitesmoke;
    border: 1px solid #03091d;
    float: right;

    &:hover {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }

    &:active {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }
  }
`;

export default SignUpMob;
