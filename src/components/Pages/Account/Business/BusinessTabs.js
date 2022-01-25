import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";

export function Food() {
  return (
    <>
      <IconButton
        icon="surplus"
        label="Food Surplus"
        color="turquoise"
        goTo="/add-products-business"
      />
      <IconButton
        icon="buy"
        label="Buy Food"
        color="turquoise"
        goTo="/browse-products"
      />
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
    </>
  );
}
