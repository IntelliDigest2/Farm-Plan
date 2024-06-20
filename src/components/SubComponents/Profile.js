import React from "react";
import "../Pages/Account/UserAccount.css";
import { Container, Row, Col } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Heading } from "./Heading";
import Avatar from "./Avatar";
import NotificationIcon from "./../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/NotificationIcon";

export function Profile(props) {
  // Check if profile is loaded
  // Check if firstName and lastName are undefined
  if (!props.profile.firstName || !props.profile.lastName) {
    return (
      <div className="web-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Profile content when loaded
  return (
    <div className="web-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Avatar initials={props.profile.initials} />
          <span>{props.profile.firstName + " " + props.profile.lastName}</span>
        </div>
        <div>
          <p>{props.profile.email}</p>
        </div>
        <div>
          <p style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            {props.profile.buildingFunction} Account
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <NotificationIcon />
        </div>
        <div>
          <Tooltip title="Settings">
            <IconButton href="/settings" component="a">
              <SettingsApplicationsIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
