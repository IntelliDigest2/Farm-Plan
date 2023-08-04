import React from "react";
import "./Pages.css"
import styled from "styled-components";
import { Row, Col, Card } from "react-bootstrap";

function InProgress() {
  return (
    <React.Fragment>
      <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex not-found">
        <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
        <Col className="mt-5 pt-5" xs={12}></Col>
        <Col className="" xs={12} lg={4}></Col>
        <Col className="justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0" xs={12} lg={4}>
          <CardStyle>
            <Card>
              <Card.Body>
                <Card.Text className="text-center">
                  <h1 className="page-not-found">Feature in Progress.. 😊</h1>
                  <h1 className="not-found-message">We're hard at work building an amazing new feature to enhance your experience. Our development team is putting the finishing touches on it, and we can't wait to unveil it to you.</h1>
                  <h1 className="not-found-message">Keep an eye out on this page and feel free to use the rest of the application!</h1>
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

const CardStyle = styled.div`
  .card {
    color: rgb(59, 59, 59);
    background-color: rgb(238, 238, 238);
    border: none;
    border-radius: 5px;
    padding: 30px 15px; /* Adjust padding for better spacing */
    width: 100%; /* Set the width to 80% of the screen */
    max-width: 500px; /* You can set a maximum width if desired */
    margin: 0 auto; /* Center the card horizontally */
  }
`;

export default InProgress;
