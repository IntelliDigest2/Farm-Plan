import React from "react";
import { IconButton } from "../../../SubComponents/Button";
import "../UserAccount.css";

export function Food() {
  return (
    <>
      <IconButton
        title="Add and categorize meals"
        icon="food"
        label={"Meal Management"}
        color="cyan"
        goTo="/meal-management"
      />

      <IconButton
        title="Add and manage food suppliers"
        icon="delivery"
        label="Supplier Management"
        color="purple"
        goTo="/supplier-management"
      />
    </>
  );
}

export function Health() {
  return (
    <>
      <IconButton
        icon="report"
        title="View reports on meal consumption patterns"
        label="Consumption Report"
        color="yellow"
        goTo="/consumption-report"
        // disabled="true"
      />

      <IconButton
        title="Offer coupons "
        icon="intervention"
        label="Intervention Management"
        color="green"
        goTo="/intervention"
        // disabled="true"
      />
    </>
  );
}

export function Environment() {
  return (
    <>
      <IconButton
        title="Track food waste"
        icon="waste"
        label="Waste Monitoring"
        color="turquoise"
        goTo="/track-food-waste"
      />
      <IconButton
        title="Monitor the carbon footprint of food supplies"
        icon="report"
        label="Carbon Footprint Reporting"
        color="yellow"
        goTo="/monitor-carbon-footprint"
      />
    </>
  );
}
