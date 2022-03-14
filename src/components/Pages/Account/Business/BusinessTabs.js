import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";

export function Food() {
  return (
    <>
      <IconButton
        icon="notes"
        label="Meal Plan"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="my-products"
        label="Meal Sold"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="my-products"
        label="Meal Returned"
        color="turquoise"
        goTo="/"
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

export function FSSP() {
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
