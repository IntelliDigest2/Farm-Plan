import React from "react";
import "../Account/UserAccount.css";
import blueberries from "../../../images/Blueberries.png";

import { Card } from "react-bootstrap";
import { Divider } from "@material-ui/core";

function Profile(props) {
  return (
    <>
      <Card className="web-center profile">
        <Card.Img src={blueberries} alt="" />
        <Card.ImgOverlay>
          <Card.Title>My Account</Card.Title>
          <Card.Body>Welcome, {props.name}!</Card.Body>
        </Card.ImgOverlay>
      </Card>
      <Divider />
    </>
  );
}

export { Profile };
