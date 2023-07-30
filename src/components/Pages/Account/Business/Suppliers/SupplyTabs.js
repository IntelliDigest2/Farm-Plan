import React from "react";
import { IconButton } from "../../../../SubComponents/Button";
import "../../UserAccount.css";

export function Items({ setShow, setChooseModal }) {
  return (
    <>

     <IconButton
        icon="kitchen" 
        label="Items"
        color="turquoise"
        goTo="/supply-plan"
        />

      <IconButton
        icon="chart" 
        label="Revenue"
        color="yellow"
        goTo="/supply-plan"
        disabled
        />
        
{/* 
      <IconButton
        icon="notes"
        label="Shopping List"
        color="turquoise"
        goTo="/restaurant-shopping-list"
      />

      <IconButton
        icon="notes" 
        label="Inventory" 
        color="turquoise"
        goTo="/restaurant-inventory"
        />

      <IconButton
        icon="notes" 
        label="Inventory and Shopping List" 
        color="turquoise"
        goTo="/restaurant-dashboard"
        />
         */}
      
    </>
  );
}

export function Revenue({ setShow, setChooseModal }) {
  return (
    <>
      <IconButton
        title="Record your food waste."
        icon="waste"
        label="Food Waste"
        color="turquoise"
        goTo="/food-wasteBusiness"
      />
      <IconButton
        title="View your food waste data."
        icon="chart"
        label="Waste Chart"
        color="yellow"
        goTo="/chart"
      />
      <IconButton
        title="Useful tips on how to reduce food waste in your home."
        icon="info"
        label="Food Waste Reduction Tips"
        color="green"
        goTo="/food-reduction"
      />
      <IconButton
        title="View the world map of WFT users!"
        icon="world"
        label="Users Map"
        color="blue"
        goTo="/view-map"
      />
      <IconButton
        title="Find out more about the Plan to Save campaign, and what you can do to help."
        icon="kitchen"
        label="Plan to Save"
        color="purple"
        onClick={() => {
          setShow(true);
          setChooseModal(true);
        }}
      />
    </>
  );
}
