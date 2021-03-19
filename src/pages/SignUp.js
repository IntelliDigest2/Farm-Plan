import React, { useRef, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button } from "react-bootstrap";



function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const {signup} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== repeatPasswordRef.current.value){
      console.log("checking passwords")
      return setError("Passwords do not match! Please retype your password.");
    }

    try{
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value )
      history.push("/account")
      console.log("sign up worked")
    }
    catch{
      setError("Failed to create an account, for example an account with this email already exists. Please also make sure that" +
      " your password is alphanumeric.")
    }

    setLoading(false)
  }

  return (
    <React.Fragment>
    <Row className="mr-0 ml-0 justify-content-center align-items-center signup">
            <Col className="d-block mt-5 pt-5 pb-5 mb-5 pb-lg-0 mb-lg-0 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5}>
              <FormStyle>
                <div className="text-center">

              <i className="fa fa-user-circle-o signup-logo"></i>
                </div>
              <h1 className="text-center header">Sign Up to iTracker</h1>

              {<h1 className="warning">{error}</h1>}
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" ref={emailRef} required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
              </Form.Group>

              <Form.Group controlId="formBasicRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" ref={repeatPasswordRef} required/>
              </Form.Group>
              <p className="text-center terms">By creating an account you agree to our <Link to="/terms-and-privacy" className="termcond">Terms and Conditions</Link>, and <Link to="/terms-and-privacy" className="termcond">Privacy Policy</Link>.</p>

              <Form.Group controlId="formActions">
              <Button variant="dark" type="submit" disabled={loading}>
                Sign Up
              </Button>
              </Form.Group>
              </Form>
              <p className="text-center terms">Already a member? <Link to="/login" className="register">Login</Link> to your account.</p>
              </FormStyle>
            </Col>
            <Col className="bg-image signup-graphic d-none d-sm-none d-md-none d-lg-block" sm={12} md={12} lg={7}></Col>
        </Row>
</React.Fragment>
  );
}

const FormStyle = styled.div`
    form{
      width:80%;
      margin:auto;
      padding:10px;
    }

    input{
      border: 1px solid #62680a;
    }
    
    .btn-dark{
      background-color:  #071850;
      color:whitesmoke;
      border: 1px solid #03091d;
      float:right;

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


export default SignUp;