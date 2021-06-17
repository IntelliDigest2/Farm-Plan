import React, { Component } from "react";
import "./Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import emailjs from 'emailjs-com';
import { connect } from "react-redux";
import { compose } from "redux";

class Contact extends Component {
  state = {
    email: !this.props.auth.uid ? "" : this.props.auth.email,
    name: !this.props.profile.lastName ? "" : this.props.profile.firstName + " " + this.props.profile.lastName,
  }

  handleChange = (e) => {
    // console.log(e);
    this.setState({
        [e.target.id]: e.target.value
    })
}

  sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE, process.env.REACT_APP_EMAIL_TEMPLATE, e.target, process.env.REACT_APP_EMAIL_ID)
      .then((result) => {
          // console.log(result.text);
          alert("Your Message has been sent successfully!");
      }, (error) => {
          // console.log(error.text);
          alert("There has been an error while sending your message. Please refresh the page and try again.");
      });
      e.target.reset();
  }

  openEmail() {
    // console.log("Email card clicked");
    window.open('mailto:info@intellidigest.com?subject=Subject&body=Body%20goes%20here');
  }

  openTel() {
    // console.log("Tel card clicked");
    window.open('tel:03332420822');
  }

  render(){

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

        <Form onSubmit={this.sendEmail}>
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Control type="text" placeholder="Name" id="name" name="name" onChange={this.handleChange} value={this.state.name} required />
      </Form.Group>
  
      <Form.Group as={Col}>
        <Form.Control type="email" placeholder="Email" id="email" name="email" onChange={this.handleChange} value={this.state.email} required />
      </Form.Group>
    </Form.Row>
  
    <Form.Group>
      <Form.Control placeholder="Subject" id="subject" name="subject" required />
    </Form.Group>
  
    <Form.Group>
    <Form.Control as="textarea" rows={12} placeholder="Message" id="message" name="message" required />
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

        <Card onClick={(e) => this.openTel()}>
          <Card.Body>
            <Card.Title>Telephone</Card.Title>
             <Card.Text >
              <i className="fa fa-phone contact-footer-icon"></i>
              <p>0333 242 0822</p>
             </Card.Text>
            </Card.Body>
        </Card>
          </CardStyle>
        </Col>
        <Col xs={12} lg={2}>
          <CardStyle>
        <Card onClick={(e) => this.openEmail()}>
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

const mapStateToProps = (state) => {
  // console.log(state);
  return{
      auth: state.firebase.auth,
      user: state.firebase.profile,
      profile: state.firebase.profile,
  }
}

export default compose(connect(mapStateToProps))(Contact);
