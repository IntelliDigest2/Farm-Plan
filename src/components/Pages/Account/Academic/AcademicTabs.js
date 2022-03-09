import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Food() {
  return (
    <>
      <IconButton
        icon="notes"
        label="Meal Plan"
        color="turquoise"
        goTo="/farm-plan"
      />
      <IconButton
        icon="my-products"
        label="Meal Sold"
        color="turquoise"
        goTo="/view-products"
      />
      <IconButton
        icon="my-products"
        label="Meal Returned"
        color="turquoise"
        goTo="/view-products"
        disabled
      />
      <IconButton
        icon="chart"
        label="Meal Chart"
        color="yellow"
        goTo="/"
        disabled
      />
      <IconButton
        icon="notes"
        label="Turnover"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="notes"
        label="Profit"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="kitchen"
        label="Plan to Save"
        color="turquoise"
        goTo="/pts"
      />
    </>
  );
}

export function Research() {
  return (
    <>
      <IconButton
        icon="notes"
        label="Research Plan"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="my-products"
        label="Food Items Used"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="my-products"
        label="Food Items Not Used"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton icon="chart" label="Chart" color="yellow" goTo="/" disabled />
      <IconButton
        icon="notes"
        label="Research Cost"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="kitchen"
        label="Plan to Save"
        color="turquoise"
        goTo="/pts"
      />
    </>
  );
}

export function Environment() {
  return (
    <>
      <IconButton
        icon="waste"
        label="Food Waste"
        color="turquoise"
        goTo="/food-wasteBusiness"
      />
      <IconButton
        icon="chart"
        label="Waste Chart"
        color="yellow"
        goTo="/chart"
      />
      <IconButton
        icon="info"
        label="Food Waste Reduction Tips"
        color="green"
        goTo="/food-reduction"
      />
      <IconButton
        icon="world"
        label="Users Map"
        color="yellow"
        goTo="/view-map"
      />
      <IconButton
        icon="kitchen"
        label="Plan to Save"
        color="turquoise"
        goTo="/pts"
      />
    </>
  );
}

export function FISP() {
  return (
    <>
      <IconButton
        icon="plant"
        label="Agrifood Technpreneur"
        color="turquoise"
        disabled="true"
        goTo="/"
      />
      <IconButton
        icon="book"
        label="Masterclasses"
        color="turquoise"
        disabled="true"
        goTo="/"
      />
      <IconButton
        icon="info"
        label="FISI"
        color="green"
        disabled="true"
        goTo="/"
      />
      <IconButton
        icon="kitchen"
        label="Plan to Save"
        color="turquoise"
        goTo="/pts"
      />
    </>
  );
}
