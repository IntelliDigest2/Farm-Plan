import React, { useState } from "react";
import { SubButton, IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import { Container } from "react-bootstrap";

import { Grid } from "@mui/material";

export function Food() {
  return (
    <>
      <IconButton
        icon="surplus"
        label="Upload Food Surplus"
        goTo="/add-products-academic"
      />
      <IconButton icon="buy" label="Buy Food" goTo="/browse-products" />
    </>
  );
}

export function FoodWaste() {
  return (
    <>
      <IconButton
        icon="delete"
        label="Update Food Waste"
        goTo="/food-wasteAcademic"
      />
      <IconButton icon="chart" label="Food Waste Chart" goTo="/chart" />
    </>
  );
}

export function Health() {
  return <></>;
}

export function Environment() {
  return (
    <>
      <IconButton
        icon="info"
        label="Food Waste Reduction Tips"
        goTo="/food-reduction"
      />
    </>
  );
}
