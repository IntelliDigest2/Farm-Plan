import React from "react";
import "./Button.css";
import { Button as BootstrapButton, Col } from "react-bootstrap";
import { Colors } from "../../lib/Colors";

import { IconButton as IButton, Typography } from "@mui/material";
import DeleteIconOutlined from "@mui/icons-material/DeleteOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingBasketOutlined from "@mui/icons-material/ShoppingBasketOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import KitchenOutlined from "@mui/icons-material/KitchenOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

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
  function IconType() {
    switch (props.icon) {
      default:
      case "waste":
        return <DeleteIconOutlined sx={{ fontSize: 90 }} />;
      case "chart":
        return <BarChartOutlined sx={{ fontSize: 90 }} />;
      case "food":
        return <RestaurantOutlined sx={{ fontSize: 90 }} />;
      case "surplus":
        return <AddCircleOutlineOutlined sx={{ fontSize: 90 }} />;
      case "buy":
        return <ShoppingBasketOutlined sx={{ fontSize: 90 }} />;
      case "info":
        return <InfoOutlined sx={{ fontSize: 90 }} />;
      case "world":
        return <PublicOutlined sx={{ fontSize: 90 }} />;
      case "book":
        return <MenuBookOutlined sx={{ fontSize: 90 }} />;
      case "plant":
        return <SpaOutlined sx={{ fontSize: 90 }} />;
      case "kitchen":
        return <KitchenOutlined sx={{ fontSize: 90 }} />;
      case "product":
        return <ShoppingBagOutlined sx={{ fontSize: 90 }} />;
    }
  }

  return (
    <BootstrapButton
      variant="default"
      className={["icon-btn", props.color]}
      href={props.goTo}
      disabled={props.disabled}
    >
      <div>
        <IconType />
        {props.label}
      </div>
    </BootstrapButton>
  );
}

export { DefaultButton, SubButton, IconButton };
