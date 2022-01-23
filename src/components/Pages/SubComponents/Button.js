import React from "react";
import "./Button.css";
import { Button as BootstrapButton, Col } from "react-bootstrap";
import { Colors } from "../../lib/Colors";

import { IconButton as IButton, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import DeleteIconOutlined from "@mui/icons-material/DeleteOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingBasketOutlined from "@mui/icons-material/ShoppingBasketOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

//The default buttons we are using are the large dropdown buttons we use on the account page and their small sub buttons
//when using component, styling="[colour]" colour choices are turquoise, green, yellow and blue. (styles are in Button.css)

// TODO sort out hover and selected colours (defaults to bootstrap primary)

function DefaultButton(props) {
  if (props.disabled) {
    return (
      <BootstrapButton
        variant="default"
        className={["default-btn", props.styling]}
        disabled
      >
        {props.text}
      </BootstrapButton>
    );
  } else {
    return (
      <BootstrapButton
        variant="default"
        className={["default-btn", props.styling]}
        href={props.goTo}
        onClick={props.onClick}
      >
        {props.text}
      </BootstrapButton>
    );
  }
}

function SubButton(props) {
  return (
    <BootstrapButton
      variant="default"
      className={["sub-btn", props.styling]}
      href={props.goTo}
      onClick={props.onClick}
    >
      {props.text}
    </BootstrapButton>
  );
}

function IconButton(props) {
  switch (props.icon) {
    default:
    case "delete":
      return (
        <BootstrapButton className="icon-btn turquoise" href={props.goTo}>
          <div className="turquoise">
            <DeleteIconOutlined sx={{ fontSize: 90 }} />
            {props.label}
          </div>
        </BootstrapButton>
      );
    case "chart":
      return (
        <BootstrapButton className="icon-btn yellow" href={props.goTo}>
          <div className="yellow">
            <BarChartOutlined sx={{ fontSize: 90 }} />
            {props.label}
          </div>
        </BootstrapButton>
      );
    case "food":
      return (
        <BootstrapButton className="icon-btn turquoise" href={props.goTo}>
          <div className="turquoise">
            <RestaurantOutlined sx={{ fontSize: 90 }} />
            {props.label}
          </div>
        </BootstrapButton>
      );
    case "surplus":
      return (
        <BootstrapButton className="icon-btn turquoise" href={props.goTo}>
          <div className="turquoise">
            <AddCircleOutlineOutlined sx={{ fontSize: 90 }} />
            {props.label}
          </div>
        </BootstrapButton>
      );
    case "buy":
      return (
        <BootstrapButton
          className="icon-btn turquoise"
          href={props.goTo}
          style={{ backgroundColor: props.bgc, borderRadius: "15px" }}
        >
          <div className="turquoise">
            <ShoppingBasketOutlined sx={{ fontSize: 90 }} />
            {props.label}
          </div>
        </BootstrapButton>
      );
    case "info":
      return (
        <BootstrapButton className="icon-btn green" href={props.goTo}>
          <div className="green">
            <InfoOutlined sx={{ fontSize: 72 }} />
            {props.label}
          </div>
        </BootstrapButton>
      );
  }
}

export { DefaultButton, SubButton, IconButton };
