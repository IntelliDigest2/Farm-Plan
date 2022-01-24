import React, { useState } from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";

export function Food() {
  return (
    <>
      <IconButton
        icon="surplus"
        label="Food Surplus"
        color="turquoise"
        goTo="/add-products-academic"
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

export function Environment() {
  return (
    <>
      <IconButton
        icon="waste"
        label="Food Waste"
        color="turquoise"
        goTo="/food-wasteAcademic"
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

export function Health() {
  return <></>;
}
