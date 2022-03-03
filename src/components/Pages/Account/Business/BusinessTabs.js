import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";

export function Food() {
  return (
    <>
      <IconButton
        icon="notes"
        label="My Farm Plan"
        color="turquoise"
        goTo="/farm-plan"
      />
      <IconButton
        icon="my-products"
        label="Food Sold"
        color="turquoise"
        goTo="/view-products"
      />
      <IconButton
        icon="my-products"
        label="Food Returned"
        color="turquoise"
        goTo="/view-products"
        disabled
      />
      <IconButton
        icon="chart"
        label="Produce Chart"
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
        color="turqoise"
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
