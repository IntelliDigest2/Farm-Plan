import React from "react";
import { Container } from "react-bootstrap";
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
    <Container className="tab-box">
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
      <IconButton
        icon="surplus"
        label="Upload Food Surplus"
        goTo="/add-products"
      />
      <IconButton icon="buy" label="Buy Food" goTo="/browse-products" />
    </Container>
  );
}

export function FoodWaste() {
  return (
    <Container className="tab-box">
      <IconButton icon="delete" label="Update Food Waste" goTo="/food-waste" />
      <IconButton icon="chart" label="Food Waste Chart" goTo="/chart" />
    </Container>
  );
}

export function Health() {
  return (
    <Container className="tab-box">
      <IconButton icon="food" label="Update Food Intake" goTo="/food-intake" />
    </Container>
  );
}

export function Environment() {
  return (
    <Container className="tab-box">
      <IconButton
        icon="info"
        label="Food Waste Reduction Tips"
        goTo="/food-reduction"
      />
    </Container>
  );
}
