import React, { useState, useEffect } from "react";

import "../../../Account/UserAccount.css";
import "./SignUpMob.css";
import SignUpMob from "./SignUpMob";

import { Form, Row, Col, Container, Button } from "react-bootstrap";
import styled from "styled-components";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../../../store/actions/authActions";

function Stage1(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //make sure the user isn't already logged in
  useEffect(() => {
    if (props.auth.uid) return <Redirect to="/account" />;
  }, [props.auth.uid]);

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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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
        <div className="center">
          <Button
            variant="default"
            className="signup-btn"
            href="/signup-2"
            onClick={(e) => {
              e.preventDefault();
              props.signUp({ firstName, lastName, email, password });
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </SignUpMob>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stage1);
