import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

function ForgotPassword() {

  return (
          <React.Fragment>
  <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex frg-pass">
  <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
  <Col className="mt-5 pt-5" xs={12}></Col>
    <Col className="" xs={12} lg={4}></Col>
            <Col className=" justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0" xs={12} lg={4}>
              <CardStyle>

            <Card>
          <Card.Body>
             <Card.Text>
            
             <FormStyle>
              <h1 className="text-center">Reset Password</h1>
              <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email"   required/>
              </Form.Group>
              <Form.Group controlId="formActions">
              <Button variant="dark" type="submit" >
                Reset Password
              </Button>
              </Form.Group>
              </Form>
              <p className="text-center rmb-pass"> 

              <Link to="/login" className="remember-password">I remember my password.</Link>
              </p>
              <p className="text-center no-acc">Not got an account? <Link to="/signup" className="register">Click here</Link> to sign up today!</p>
              </FormStyle>
             </Card.Text>
            </Card.Body>
        </Card>
              </CardStyle>

            </Col>
            <Col className="mt-5 pt-5" xs={12} lg={4}></Col>
            <Col className="mt-5 pt-5" xs={12}></Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
        </Row>
    </React.Fragment>


  );
}


const FormStyle = styled.div`
    form{
      margin:auto;
        padding:10px;
      width:100%;

    }

    input{
      border: 1px solid #62680a;
    }

    .btn-dark{
      background-color:#071850;
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

const CardStyle = styled.div`
.card{
  color: rgb(59, 59, 59);
  background-color: rgb(238, 238, 238);
  border: none;
  border-radius:5px;
  padding:10px 0 10px 0;
}

`

export default ForgotPassword;
