import React from "react";
import { IconButton } from "../../../SubComponents/Button";
import "../UserAccount.css";
// import { Colors } from "../../../lib/Colors";

export function Food({ setShow, setChooseModal }) {
  return (
    <>
      <IconButton
        icon="notes"
        label="Meal Plan"
        color="turquoise"
        goTo="/meal-plan"
      />
      <IconButton
        icon="my-products"
        label="Meal Sold"
        color="turquoise"
        goTo="/view-products"
      />
      <IconButton
        icon="my-products"
        label="Meal Returned"
        color="turquoise"
        goTo="/view-products"
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
        onClick={() => {
          setShow(true);
          setChooseModal(true);
        }}
      />
    </>
  );
}

export function Research({ setShow, setChooseModal }) {
  return (
    <>
      <IconButton
        icon="notes"
        label="Research Plan"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="my-products"
        label="Food Items Used"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="my-products"
        label="Food Items Not Used"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton icon="chart" label="Chart" color="yellow" goTo="/" disabled />
      <IconButton
        icon="notes"
        label="Research Cost"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="kitchen"
        label="Plan to Save"
        color="turquoise"
        onClick={() => {
          setShow(true);
          setChooseModal(true);
        }}
      />
    </>
  );
}

export function Environment({ setShow, setChooseModal }) {
  return (
    <>
      <IconButton
        icon="waste"
        label="Food Waste"
        color="turquoise"
        goTo="/food-wasteAcademic"
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
        onClick={() => {
          setShow(true);
          setChooseModal(true);
        }}
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
    </>
  );
}

export default { Food, Research, Environment, FSSP };

