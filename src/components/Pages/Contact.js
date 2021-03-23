import React from "react";
import "./Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

function Contact() {
  return (
    <React.Fragment>

      <Row className="mt-1 mr-0 ml-0 justify-content-center align-items-center contact">
        <Col xs={12} className="mt-5 pt-5 header">
        <div className="contact-header">

          <div className="text-center">

      <i className="fa fa-group contact-logo"></i>
      <h1 className="contact-title">Contact Us</h1>
          </div>

      </div>
      <div className="contact-text-layout">
        <h1>If you are interested in this scheme and would like to request a SMART bin or have any enquiries, please complete the contact form below. We aim to respond to you via e-mail as soon as possible.</h1>
      </div> 
        </Col>
        <Col xs={12} className="mt-4">
          <FormStyle>

        <Form onSubmit="#">
    <Form.Row>
      <Form.Group as={Col} controlId="contactFormName">
        <Form.Control type="text" placeholder="Name" required/>
      </Form.Group>
  
      <Form.Group as={Col} controlId="contactFormEmail">
        <Form.Control type="email" placeholder="Email" required />
      </Form.Group>
    </Form.Row>
  
    <Form.Group controlId="contactFormSubject">
      <Form.Control placeholder="Subject" required/>
    </Form.Group>
  
    <Form.Group controlId="contactFormMessage">
    <Form.Control as="textarea" rows={12} placeholder="Message" required />
  </Form.Group>

  <Form.Group controlId="formActions">

    <Button variant="dark" type="submit">
      Submit
    </Button>
  </Form.Group>
  </Form>
          </FormStyle>
        </Col>
      </Row>
      <Row className="mr-0 ml-0 pt-5 details text-center"> 
        <Col>
          <h1 className="more-details-header">More Contact Details</h1>
        </Col>
      </Row>
      <Row className="mr-0 ml-0 pt-1 mb-5 pb-5 justify-content-top align-items-top text-center details">
        <Col xs={12} lg={3}></Col>

        <Col xs={12} lg={2}>
          <CardStyle>

        <Card >
          <Card.Body>
            <Card.Title>Telephone</Card.Title>
             <Card.Text >
              <i className="fa fa-phone contact-footer-icon"></i>
              <p>07795523201</p>
             </Card.Text>
            </Card.Body>
        </Card>
          </CardStyle>
        </Col>
        <Col xs={12} lg={2}>
          <CardStyle>
        <Card>
          <Card.Body>
            <Card.Title>Email</Card.Title>
             <Card.Text >
                <i className="fa fa-envelope-o contact-footer-icon"></i>
                <p>INFO@INTELLIDIGEST.COM</p>
             </Card.Text>
            </Card.Body>
        </Card>
            </CardStyle>    
        </Col>
        <Col xs={12} lg={2}>
        <CardStyle>

        <Card>
          <Card.Body>
            <Card.Title>Address</Card.Title>
             <Card.Text>
             <i className="fa fa-location-arrow contact-footer-icon"></i>
        <p>Edinburgh Business School, Heriot Watt University, Currie, EH14 4AS</p>
             </Card.Text>
            </Card.Body>
        </Card>
        </CardStyle>
        </Col>
        <Col xs={12} lg={3}></Col>
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

    input, textarea{
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
const CardStyle = styled.div`
.card{
  margin-top: 5px;
  color: rgb(59, 59, 59);
  background-color: rgb(238, 238, 238);
  border: 1px solid rgb(77, 109, 77);

  &:hover{
    background-color:rgb(207, 207, 207);
  }
}

.card-body{
  height:210px;
}

@media (max-width: 1400px) {
  .details p{
    font-size:11px;
  }
}

`


export default Contact;
