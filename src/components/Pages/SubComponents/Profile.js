import React from "react";
import "../Account/UserAccount.css";
// import blueberries from "../../../images/Blueberries.png";
import { Colors } from "../../lib/Colors";

import { Container, Row, Col } from "react-bootstrap";

import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import { Heading } from "./Heading";

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
          <Tooltip title="Settings">
            <IconButton
              href="/settings"
              component="a"
              style={{ float: "right" }}
            >
              <SettingsApplicationsIcon />
            </IconButton>
          </Tooltip>
        </Col>
      </Row>
    </Container>
  );
}
