import React, { useState } from "react";
import "./Pages.css";
import { PageWrap } from "../SubComponents/PageWrap";
import styled from "styled-components";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import emailjs from "emailjs-com";
import { connect } from "react-redux";
import { compose } from "redux";

function Contact(props) {
  const { profile } = props;
  const [email, setEmail] = useState(props.auth.email);
  const [name, setName] = useState(profile.firstName + " " + profile.lastName);

  function SendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE,
        process.env.REACT_APP_EMAIL_TEMPLATE,
        e.target,
        process.env.REACT_APP_EMAIL_ID
      )
      .then(
        (result) => {
          // console.log(result.text);
          alert("Your Message has been sent successfully!");
        },
        (error) => {
          // console.log(error.text);
          alert(
            "There has been an error while sending your message. Please refresh the page and try again."
          );
        }
      );
    e.target.reset();
  }

  function OpenEmail() {
    // console.log("Email card clicked");
    window.open(
      "mailto:m.driscoll@intellidigest.com?subject=Subject&body=Body%20goes%20here"
    );
  }

  function OpenTel() {
    // console.log("Tel card clicked");
    window.open("tel:03332420822");
  }

  return (
    <PageWrap header="Contact Us" goTo="/settings">
      <div className="contact">
        <i className="fa fa-group contact-logo"></i>
        <div className="contact-text-layout">
          <h1>
            If you have any questions regarding your experience of using the
            Global Food Loss & Waste Tracker, please complete the contact form
            below. We aim to respond to you via e-mail as soon as possible.
          </h1>
        </div>
      </div>
      <Form onSubmit={SendEmail}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Control
            placeholder="Subject"
            id="subject"
            name="subject"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Message"
            id="message"
            name="message"
            required
          />
        </Form.Group>

        <Form.Group controlId="formActions">
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>

      <div className="details">
        <h1 className="more-details-header">More Contact Details</h1>
      </div>

      <Row>
        <Col>
          <CardStyle>
            <Card onClick={() => OpenTel()}>
              <Card.Body>
                <Card.Title>Telephone</Card.Title>
                <Card.Text>
                  <i className="fa fa-phone contact-footer-icon"></i>
                  <p>0333 242 0822</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardStyle>
        </Col>
        <Col>
          <CardStyle>
            <Card onClick={() => OpenEmail()}>
              <Card.Body>
                <Card.Title>Email</Card.Title>
                <Card.Text>
                  <i className="fa fa-envelope-o contact-footer-icon"></i>
                  <p>INFO@INTELLIDIGEST.COM</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardStyle>
        </Col>
        <Col>
          <CardStyle>
            <Card>
              <Card.Body>
                <Card.Title>Address</Card.Title>
                <Card.Text>
                  <i className="fa fa-location-arrow contact-footer-icon"></i>
                  <p>
                    Edinburgh Business School, Heriot Watt University, Currie,
                    EH14 4AS
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardStyle>
        </Col>
      </Row>
    </PageWrap>
  );
}

const CardStyle = styled.div`
  .card {
    margin-top: 5px;
    color: rgb(59, 59, 59);
    background-color: rgb(238, 238, 238);
    border: 1px solid rgb(77, 109, 77);

    &:hover {
      background-color: rgb(207, 207, 207);
    }
  }

  .card-body {
  }

  @media (max-width: 1400px) {
    .details p {
      font-size: 11px;
    }
  }
`;

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
    profile: state.firebase.profile,
  };
};

export default compose(connect(mapStateToProps))(Contact);
