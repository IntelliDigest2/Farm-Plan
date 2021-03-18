import React,  { useRef, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    try{
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value )
      history.push("/account")
      console.log("login worked")
    }
    catch{
      setError("Failed to login (e.g. an account with this email does not exist or username or password is wrong). Please try again.")
    }
    setLoading(false)
  }

  return (
    <React.Fragment>
        <Row className="mr-0 ml-0 justify-content-center align-items-center login">
            <Col className="d-block mt-5 pt-5 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5}>
              <FormStyle>
              <h1 className="text-center">Login to your account</h1>
              {<h1 className="warning">{error}</h1>}
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" ref={emailRef}  required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
              </Form.Group>
              <Form.Group controlId="formActions">
              <Button variant="dark" type="submit" disabled={loading}>
                Login
              </Button>
              <Link to="/forgot-password" className="forgot-password">Forgot your password?</Link>
              </Form.Group>
              </Form>
              <p className="text-center">Not got an account? <Link to="/signup" className="register">Click here</Link> to sign up today!</p>
              </FormStyle>
            </Col>
            <Col className="bg-image login-graphic d-none d-sm-none d-md-none d-lg-block" sm={12} md={12} lg={7}></Col>
        </Row>
    </React.Fragment>
  );
}

const FormStyle = styled.div`
    form{
      width:55%;
      margin:auto;
      padding:10px;
    }

    input{
      border: 1px solid #62680a;
    }

    .btn-dark{
      background-color:#071850;
      color:whitesmoke;
      border: 1px solid #03091d;

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

export default Login;
