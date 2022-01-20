import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { SubButton, IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";

export function Food() {
  return (
    <>
      <Accordion
        style={{
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
          margin: "auto",
          backgroundColor: Colors.brandGreen,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Disclaimer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>DISCLAIMER: </b>The Global Food Loss & Waste Tracker is designed,
            in part, to help users develop healthy eating habits. The
            nutritional information and dietary recommendations provided are
            merely suggestions which may or may not improve users' eating habits
            and/or overall health. This app is a self-regulatory tool, not
            intended to replace professional medical advice. Please always
            consult a dietician or medical professional for professional medical
            advice regarding your health.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Grid
        container
        className="center"
        spacing={2}
        style={{ marginTop: "1rem" }}
      >
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandTurqoise}
            icon="food"
            label="Update Food Intake"
            goTo="/food-intake"
          />
        </Grid>
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandTurqoise}
            icon="surplus"
            label="Upload Food Surplus"
            goTo="/add-products"
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
            goTo="/food-waste"
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
        <Grid item sx="auto">
          <IconButton
            bgc={Colors.brandGreen}
            icon="info"
            label="Food Waste Reduction Tips"
            goTo="/food-reduction"
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
