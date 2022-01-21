import React, { useState } from "react";
import { SubButton, IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import { Container } from "react-bootstrap";
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
            label="Update Food Surplus"
            goTo="/add-products-farm"
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

export function FoodWaste() {
  return (
    <>
      <SubButton
        styling="turquoise"
        goTo="/add-products-farm"
        text="Upload Food Surplus"
      />
      <SubButton styling="turquoise" goTo="/browse-products" text="Buy Food" />

      <SubButton
        styling="yellow"
        goTo="/chart/weekSurplusFarm"
        text="View Food Surplus Weight Performance Chart"
      />
      <SubButton
        styling="yellow"
        goTo="/chart/weekSurplusGHGFarm"
        text="View Food Surplus GHG Performance Chart"
      />
      <SubButton
        styling="yellow"
        goTo="/chart/weekSurplusCostFarm"
        text="View Food Surplus Cost Performance Chart"
      />
    </>
  );
}

export function Health() {
  return <></>;
}

export function Environment() {
  return <></>;
}
