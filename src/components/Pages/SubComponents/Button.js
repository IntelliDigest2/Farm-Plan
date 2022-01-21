import React from "react";
import "./Button.css";
import { Button as BootstrapButton } from "react-bootstrap";
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
        <IButton
          className="icon-btn center"
          href={props.goTo}
          style={{
            backgroundColor: props.bgc,
            borderRadius: "15px",
          }}
        >
          <Stack className="center">
            <DeleteIconOutlined
              style={{
                fontSize: 100,
                color: "white",
              }}
            />
            <Typography color={"white"} gutterBottom variant="subtitle1">
              {props.label}
            </Typography>
          </Stack>
        </IButton>
      );
    case "chart":
      return (
        <IButton
          className="icon-btn center"
          href={props.goTo}
          style={{ backgroundColor: props.bgc, borderRadius: "15px" }}
        >
          <Stack className="center">
            <BarChartOutlined
              style={{
                fontSize: 100,
                color: "white",
              }}
            />
            <Typography color={"white"} gutterBottom variant="subtitle1">
              {props.label}
            </Typography>
          </Stack>
        </IButton>
      );
    case "food":
      return (
        <IButton
          className="icon-btn center"
          href={props.goTo}
          style={{ backgroundColor: props.bgc, borderRadius: "15px" }}
        >
          <Stack className="center">
            <RestaurantOutlined
              style={{
                fontSize: 100,
                color: "white",
              }}
            />
            <Typography color={"white"} gutterBottom variant="subtitle1">
              {props.label}
            </Typography>
          </Stack>
        </IButton>
      );
    case "surplus":
      return (
        <IButton
          className="icon-btn center"
          href={props.goTo}
          style={{ backgroundColor: props.bgc, borderRadius: "15px" }}
        >
          <Stack className="center">
            <AddCircleOutlineOutlined
              style={{
                fontSize: 100,
                color: "white",
              }}
            />
            <Typography color={"white"} gutterBottom variant="subtitle1">
              {props.label}
            </Typography>
          </Stack>
        </IButton>
      );
    case "buy":
      return (
        <IButton
          className="icon-btn center"
          href={props.goTo}
          style={{ backgroundColor: props.bgc, borderRadius: "15px" }}
        >
          <Stack className="center">
            <ShoppingBasketOutlined
              style={{
                fontSize: 100,
                color: "white",
              }}
            />
            <Typography color={"white"} gutterBottom variant="subtitle1">
              {props.label}
            </Typography>
          </Stack>
        </IButton>
      );
    case "info":
      return (
        <IButton
          className="icon-btn center"
          href={props.goTo}
          style={{ backgroundColor: props.bgc, borderRadius: "15px" }}
        >
          <Stack className="center">
            <InfoOutlined
              style={{
                fontSize: 100,
                color: "white",
              }}
            />
            <Typography color={"white"} gutterBottom variant="subtitle1">
              {props.label}
            </Typography>
          </Stack>
        </IButton>
      );
  }
}

export { DefaultButton, SubButton, IconButton };
