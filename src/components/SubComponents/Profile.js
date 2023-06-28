import React from "react";
import "../Pages/Account/UserAccount.css";

import { Container, Row, Col } from "react-bootstrap";

import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import { Heading } from "./Heading";
import Avatar from './Avatar'; // Assuming you have a custom Avatar component


export function Profile(props) {
  if (props.profile.buildingFunction!='Restaurants'){
  return (
    <Container fluid className="profile web-center">
      <div className="web-center">
        <div className="avatar-name-container">
          <Avatar initials={props.profile.initials} />
          <div className="name-container">
            <h4>{props.profile.firstName + ' ' + props.profile.lastName}</h4>
            <p>{props.profile.email}</p>
          </div>
        </div>
        <div className="building-function-container">
          <p>{props.profile.buildingFunction} Account</p>
        </div>        
        <Tooltip title="Settings">
          <IconButton href="/settings" component="a" style={{ float: 'right' }}>
            <SettingsApplicationsIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Container>
  )} else {
    console.log(props);
    return (
    <Container fluid className="profile">

      <Heading
        priority="4"
        text={props.profile.firstName + " " + props.profile.lastName + ', '+ props.profile.restaurantName} 
      />
      <Heading priority="5" text={props.profile.email} />
      <p>{props.profile.buildingFunction} Account</p>
      <Tooltip title="Settings">
        <IconButton href="/settings" component="a" style={{ float: "right" }}>
          <SettingsApplicationsIcon />
        </IconButton>
      </Tooltip>
      {/* </Col> */}
      {/* </Row> */}
    </Container>
  )
  }
}
