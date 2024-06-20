import React, { useState, useEffect } from "react";
import "./Login.css";
import "../Account/UserAccount.css";
import "./Mob.css";
import { Title } from "./MobComponents";
import { Form, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signIn } from "../../../store/actions/authActions";

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

  //make sure the user isn't already logged in
  useEffect(() => {
    if (props.auth.uid) setIsLoggedIn(true);
  }, [props.auth.uid]);

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <Title subtitle="Log In" className="login-background">
          <Form>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input placeholder-input"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input placeholder-input"
              />
            </Form.Group>
            <div className="signup-center subtitles row">
              <p>Don't have an account? </p>
              <Link style={{ color: "#1C1569" }} to="/signup">
                {"  "}
                SIGN UP
              </Link>
            </div>
            <div className="signup-center subtitles row">
              <Link to="/forgot-password" style={{ color: "whitesmoke" }}>
                reset password
              </Link>
            </div>
          </Form>
          <div className="auth-error">
            {authError ? <p> {authError}</p> : null}
          </div>
          <div className="signup-center">
            <Button
              style={{ fontWeight: "700" }}
              variant="default"
              className="signup-confirm"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Confirm
            </Button>
          </div>
        </Title>
      </div>
    </div>
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
