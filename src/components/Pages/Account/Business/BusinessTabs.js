import React, { useState } from "react";
import { SubButton, IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import { Grid } from "@mui/material";

export function Food() {
  return (
    <>
      <Grid
        container
        className="center"
        spacing={2}
        style={{ marginTop: "1rem" }}
      >
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandTurqoise}
            icon="surplus"
            label="Upload Food Surplus"
            goTo="/add-products-business"
          />
        </Grid>
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandTurqoise}
            icon="buy"
            label="Buy Food"
            goTo="/browse-products"
          />
        </Grid>
      </Grid>
    </>
  );
}

export function FoodWaste() {
  return (
    <>
      <Grid
        container
        className="center"
        spacing={2}
        style={{ marginTop: "1rem" }}
      >
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandTurqoise}
            icon="delete"
            label="Update Food Waste"
            goTo="/food-wasteBusiness"
          />
        </Grid>
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandGreen}
            icon="info"
            label="Food Waste Reduction Tips"
            goTo="/food-reduction"
          />
        </Grid>
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandYellow}
            icon="chart"
            label="Food Waste Chart"
            goTo="/chart"
          />
        </Grid>
      </Grid>
    </>
  );
}

export function Health() {
  return <></>;
}

export function Environment() {
  return <></>;
}
