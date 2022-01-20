import React from "react";
import "../Account/UserAccount.css";
import blueberries from "../../../images/Blueberries.png";
import { Colors } from "../../lib/Colors";

import { Container, Row, Col } from "react-bootstrap";

import { Avatar, CardHeader, Divider } from "@mui/material";

// --- Material Ui Imports --- //
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import makeStyles from "@mui/material/styles/makeStyles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Heading } from "./Heading";
import { Dropdown } from "./Dropdown";

// function Profile(props) {
//   return (
//     <>
//       <BootstrapCard className="web-center profile">
//         <Card.Img src={blueberries} alt="" />
//         <Card.ImgOverlay>
//           <Card.Title>My Account</Card.Title>
//           <Card.Body>Welcome, {props.name}</Card.Body>
//         </Card.ImgOverlay>
//       </BootstrapCard>
//       <Divider />
//     </>
//   );
// }

export function Profile(props) {
  let isDisabled = false;
  let types = ["Households", props.profile.buildingFunction];
  if (props.profile.buildingFunction === "Households") {
    types = ["Households"];
    isDisabled = true;
  }

  return (
    <Container fluid className="profile">
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs="auto">
          <Avatar
            className="center"
            alt={props.profile.initials}
            src=""
            sx={{ width: 75, height: 75, bgcolor: Colors.brandGreen }}
          >
            <Heading priority="2" text={props.profile.initials} />
          </Avatar>
        </Col>
        <Col xs="auto">
          <Heading
            priority="4"
            text={props.profile.firstName + " " + props.profile.lastName}
          />
          <Heading priority="5" text={props.profile.email} />
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Col xs={4}>
          <Dropdown
            id="Account Switch"
            styling="grey"
            data={props.type}
            items={types}
            disabled={isDisabled}
            function={props.function}
          />
        </Col>
      </Row>
    </Container>
  );
}

// export { Profile };
