import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";

export function Food() {
  return (
    <>
      <IconButton
        icon="surplus"
        label="Sell Products"
        color="turquoise"
        goTo="/add-products-farm"
      />
      <IconButton
        icon="my-products"
        label="My Products"
        color="turquoise"
        goTo="/view-products"
      />
      <IconButton
        icon="buy"
        label="Marketplace"
        color="turquoise"
        goTo="/browse-products"
      />
    </>
  );
}

export function Environment() {
  return (
    <>
      <IconButton
        icon="waste"
        label="Food Loss"
        color="turquoise"
        goTo="/food-loss"
      />
      <IconButton
        icon="chart"
        label="Loss Chart"
        color="yellow"
        goTo="/chart"
      />
    </>
  );
}

export function Health() {
  return <></>;
}
