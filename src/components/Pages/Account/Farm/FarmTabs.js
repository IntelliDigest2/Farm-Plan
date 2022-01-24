import React from "react";
import { IconButton } from "../../SubComponents/Button";
import "../UserAccount.css";
//import { Colors } from "../../../lib/Colors";

import { Container } from "react-bootstrap";

export function Food() {
  return (
    <>
      <IconButton
        icon="surplus"
        label="Upload Food Surplus"
        goTo="/add-products-farm"
      />
      <IconButton icon="buy" label="Buy Food" goTo="/browse-products" />
    </>
  );
}

export function FoodWaste() {
  return (
    <>
      <IconButton icon="delete" label="Update Food Loss" goTo="/food-loss" />
      <IconButton icon="chart" label="Food Loss Chart" goTo="/chart" />
    </>
  );
}

/*export function FoodWaste() {
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
}*/

export function Health() {
  return <></>;
}

export function Environment() {
  return <></>;
}
