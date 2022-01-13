import React, { useState, useEffect } from "react";

import "../../Account/UserAccount.css";
import "./SignUpMob.css";
import { SubButton } from "../../SubComponents/Button";

import { Form, Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";

import { connect } from "react-redux";
import {
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { signUp } from "../../../../store/actions/authActions";

//DOM ROUTING ISNT WORKING THE WAY I WANT, USE ACCORDION?

function SignUpMob(props) {
  /*The `url` lets us build relative links. This is so we do not interfere with app.js routing.*/
  let { path, url } = useRouteMatch();

  //make sure the user isn't already logged in
  useEffect(() => {
    if (props.uid) return <Redirect to="/account" />;
  }, [props.uid]);

  return (
    <Container className="signup-mobile">
      <div className="titles">
        <Row className="center">
          <h1 style={{ color: "#afba15" }}>Intelli</h1>
          <h1 style={{ color: "#0c0847" }}>Digest</h1>
        </Row>
        <h2>Sign Up</h2>
      </div>
      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
      <Switch>
        <Route exact path={path}>
          <div className="center">
            <Button
              variant="default"
              className="signup-btn"
              href={`${url}/stage1`}
            >
              Get Started
            </Button>
          </div>
        </Route>
        <Route path={`${path}/stage1`}>
          <Stage1 />
          <div className="center">
            <Button
              variant="default"
              className="signup-btn"
              href={`${url}/stage2`}
            >
              Next
            </Button>
          </div>
        </Route>
        <Route path={`${path}/stage2`}>
          <Stage2 />
          <div className="center">
            <Row>
              <Button
                variant="default"
                className="signup-btn"
                href={`${url}/stage1`}
              >
                Back
              </Button>
              <Button
                variant="default"
                className="signup-btn"
                href={`${url}/stage3`}
              >
                Next
              </Button>
            </Row>
          </div>
        </Route>
        <Route path={`${path}/stage3`}>
          <Stage3 />
          <div className="center">
            <Row>
              <Button
                variant="default"
                className="signup-btn"
                href={`${url}/stage2`}
              >
                Back
              </Button>
              <Button
                variant="default"
                className="signup-btn"
                href={`${url}/stage4`}
              >
                Next
              </Button>
            </Row>
          </div>
        </Route>
        <Route path={`${path}/stage4`}>
          <Stage4 />
          <div className="center">
            <Button
              variant="default"
              className="signup-btn"
              href={`${url}/stage3`}
            >
              Next
            </Button>
          </div>
        </Route>
      </Switch>
    </Container>
  );
}

//different stages of the signup form
function Stage1() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="web-center">
      <FormStyle>
        <Form>
          <Form.Row>
            <Form.Group className="mb-3" as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                required
                id={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col}>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="surname"
                placeholder="Enter surname"
                required
                id={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              id={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              id={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {/*Confirm Password*/}
        </Form>
      </FormStyle>
    </div>
  );
}

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
/*const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
}; */

export default /*connect(mapStateToProps, mapDispatchToProps)*/ SignUpMob;
