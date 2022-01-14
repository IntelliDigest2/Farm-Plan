import React, { useState, useEffect } from "react";

import "../../../Account/UserAccount.css";
import "./SignUpMob.css";
import SignUpMob from "./SignUpMob";

import { Form, Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../../../store/actions/authActions";

const NewSignUp = (props) => {
  //State variables here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [stage, setStage] = useState(1);

  useEffect(() => {}, [stage]);

  //Effect
  switch (stage) {
    default:
    case 1:
      return (
        <Stage1
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
          setStage={setStage}
        />
      );
    case 2:
      return (
        <Container className="web-center">
          <h1>{firstName + lastName}</h1>
        </Container>
      );
  }
};

export const Stage1 = (props) => {
  //Inner State variables here

  //Inner Effects

  return (
    <SignUpMob>
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
                  onChange={(e) => props.setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="surname"
                  placeholder="Enter surname"
                  required
                  onChange={(e) => props.setLastName(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => props.setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </Form.Group>
            {/*Confirm Password*/}
          </Form>
        </FormStyle>
        <div className="center">
          <Button
            variant="default"
            className="signup-btn"
            href="/signup-2"
            onClick={(e) => {
              e.preventDefault();
              //Next Stage
              props.setStage(2);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </SignUpMob>
  );
};

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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSignUp);
