import React from "react";

import "./PageWrap.css";

import { SubButton } from "./Button";
import Divider from "@mui/material/Divider";
import { Container } from "react-bootstrap";

import NotificationIconSupply from "../Pages/Account/Business/Suppliers/Icons/NotificationIconSupply";

export const PageWrapSupply = (props) => {
  return (
    <>
      <div>
        <div className="top">
          <div style={{ width: "50%", paddingLeft: "1rem" }}>
            <SubButton styling="green" goTo={props.goTo} text="Back" />
          </div>
          <div className="basic-title basic-lg">{props.header}</div>
          <NotificationIconSupply />
        </div>
        <Divider />
      </div>
      <Container className="mobile-style">
        {/* <div className="center">
          <h2 style={{ color: "#0c0847" }}>{props.subtitle}</h2>
        </div>
        <Divider variant="middle" /> */}
        {props.children}
        {/* <Divider variant="middle" /> */}
      </Container>
    </>
  );
};

export const PageWrapTop = (props) => {
  return (
    <div>
      <div className="top">
        <div style={{ width: "50%", paddingLeft: "1rem" }}>
          <SubButton styling="green" goTo={props.goTo} text="Back" />
        </div>
        <div className="basic-title basic-lg">{props.header}</div>
      </div>
      <Divider />
      {props.children}
    </div>
  );
};

export const PageWrapMini = (props) => {
  return <Container className="account-style">{props.children}</Container>;
};
