import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Food({ isConsumer }) {
  return (
    <>
      {isConsumer ? (
        <IconButton
          icon="notes"
          label="My Food Diary"
          color="turquoise"
          goTo="/meal-plan"
        />
      ) : (
        <IconButton
          icon="notes"
          label="My Food Diary"
          color="turquoise"
          goTo="/cons-auth"
        />
      )}

      {/* <IconButton
        icon="kitchen"
        label="Food Diary"
        color="turquoise"
        goTo="/food-intake"
      /> */}

      <IconButton icon="food" label="Plan to Save" color="yellow" goTo="/pts" />
    </>
  );
}

export function Health() {
  return (
    <>
      <IconButton
        icon="plant"
        label="Nutrient Gap"
        color="yellow"
        goTo="/"
        disabled="true"
      />
      {/* <IconButton
        icon="book"
        label="Recipes"
        color="yellow"
        goTo="/"
        disabled="true"
      /> */}
      <IconButton
        icon="food"
        label="Plan to Save"
        color="turquoise"
        goTo="/pts"
      />
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
        goTo="/food-waste"
      />
      <IconButton
        icon="chart"
        label="Waste Chart"
        color="yellow"
        goTo="/chart"
      />
      <IconButton
        icon="world"
        label="Users Map"
        color="yellow"
        goTo="/view-map"
      />
      <IconButton
        icon="info"
        label="Waste Tips"
        color="green"
        goTo="/food-reduction"
      />
    </>
  );
}

export function Sustainability() {
  return (
    <>
      <IconButton
        icon="plant"
        label="Agrifood Technpreneur"
        color="turquoise"
        goTo="https://intellidigest.com/services/food-system-sustainability/agrifood-techpreneur-club/"
      />
      <IconButton
        icon="book"
        label="Masterclasses"
        color="turquoise"
        goTo="https://intellidigest.com/masterclasses-overview/"
      />
      <IconButton
        icon="info"
        label="FISI"
        color="green"
        goTo="https://intellidigest.com/services/food-system-sustainability/food-industry-sustainability-index/"
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
