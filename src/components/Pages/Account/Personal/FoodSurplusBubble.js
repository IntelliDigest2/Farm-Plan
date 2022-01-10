//not currently in use
import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import "../UserAccount.css";

function FoodSurplusBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Food Surplus"
          onClick={() => setOpen(false)}
        />
        <SubButton
          styling="turquoise"
          goTo="/add-products"
          text="Upload Food Surplus"
        />
        <SubButton
          styling="turquoise"
          goTo="/browse-products"
          text="Buy Food"
        />

        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplus"
          text="View Food Surplus Weight Performance Chart"
        />
        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusGHG"
          text="View Food Surplus GHG Performance Chart"
        />
        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusCost"
          text="View Food Surplus Cost Performance Chart"
        />
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Food Surplus"
        onClick={() => setOpen(true)}
      />
    );
  }
}

export { FoodSurplusBubble };
