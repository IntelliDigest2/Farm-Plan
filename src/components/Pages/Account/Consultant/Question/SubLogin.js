import React, { useState, useEffect } from "react";

import "../../../Account/UserAccount.css";
import "../../../Auth/Mobile/Mob.css";
import { Title } from "../../../Auth/Mobile/MobComponents";

import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import {Redirect, Link, useHistory } from "react-router-dom";
import { signIn } from "../../../../../store/actions/authActions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    var data = {
      email: email,
      password: password,
    };
    props.signIn(data);
   
  }

  

  const { authError } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory()
  //  const[success, setSuccess] = useState(false)
  //make sure the user isn't already logged in
  
  useEffect(() => {
    if (props.auth.buildingFunction === "Offices") setIsLoggedIn(true);
  }, [props.auth.buildingFunction ]);
  

  if (isLoggedIn) {
     return <Redirect to="/consultants/question2" />;
  }

  function onNext(){
    if(authError){
      history.push("/consultants/question2")
    }
    else if(authError === "Login failed"){
      history.push("")
    }
  }
  
  return (
    <Title subtitle="Log In">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="signup-center subtitles row">
          <Link to="/forgot-password" style={{ color: "#AFBA15" }}>
            Forgot your password?
          </Link>
        </div>
      </Form>
      <div className="auth-error">{authError ? <p> {authError}</p> : null}</div>
      <Button
        style={{ fontWeight: "700" }}
        variant="default"
        className="signup-confirm"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
          onNext();
        }}
      >
        Confirm
      </Button>
    </Title>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
