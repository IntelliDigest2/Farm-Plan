import React from "react";
import "../Account/UserAccount.css";
import blueberries from ".../images/Blueberries.png";
import { Card } from "react-bootstrap";

function Profile(props) {
  return (
    <Card className="web-center account-header">
      <Card.Img src={blueberries} alt="" />
      <Card.ImgOverlay>
        <Card.Title>Welcome, {props.name}!</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}

export { Profile };
