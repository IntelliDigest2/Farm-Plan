import React from "react";
import "../../App.css";
import "./Pages.css"
import { Row, Col, Form, Button } from "react-bootstrap";
import styled from "styled-components";

function Home() {
    return (
        <React.Fragment>

<Row className="mr-0 ml-0 mt-0 pt-0 justify-content-center align-items-center d-flex home">
  <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-3 pt-lg-3" xs={12}></Col>
  <Col className="" xs={12}></Col>
    <Col className="" xs={12} lg={4}></Col>
          <Col className="mt-2 pt-2" xs={12}></Col>
                <Col className="justify-content-center align-items-center d-flex mt-5 pt-5" xs={12}>
            <p className="home-welcome text-center">iTracker - Food Waste Tracking Platform</p>
                </Col>
                <Col className="mt-0 pt-0 d-block justify-content-center align-items-center" xs={12}>

                <p className="text-center update-text"> For updates, please sign up to the newsletter below.</p>

                <FormStyle>

                <Form>
                <Form.Row>

                <Form.Group as={Col} controlId="homeFormEmail">
        <Form.Control type="email" placeholder="Email" required/>

      </Form.Group>
      <Form.Group>
          
        <Button variant="dark" type="submit">
                Sign Up
              </Button>
      </Form.Group>
                </Form.Row>
              </Form>
                </FormStyle>
                </Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
            </Row>
        </React.Fragment>
    );
}

const FormStyle = styled.div`
form{
    width:30%;
    padding:10px;
    margin: auto;
  }

  form .col{
    background:none;
  }

  input, textarea{
    border: 1px solid #62680a;
  }
  
  .btn-dark{
    background-color:  #071850;
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

  
  @media (max-width: 576px) {

    form{
      width:100%;
      display:block;
    }
  }

  @media (max-width: 768px) { 
    form{
      width: 100%;
    }

  }
`

export default Home;
