import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import "../UserAccount.css";

import { Container } from "react-bootstrap";

//foodloss.js is almsot exactly the same as foodwaste.js except for a name input, these can easily be the same file -_-
function FoodLossBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Food Loss"
          onClick={() => setOpen(false)}
        />
        <div style={{ marginTop: "5%", marginBottom: "5%" }}>
          <SubButton
            styling="turquoise"
            goTo="/food-loss"
            text="Update Food loss"
          />
        </div>
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Food Loss"
        onClick={() => setOpen(true)}
      />
    );
  }
}

function FarmSurplusBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Farm Surplus"
          onClick={() => setOpen(false)}
        />
        <SubButton
          styling="turquoise"
          goTo="/add-products-farm"
          text="Upload Food Surplus"
        />
        <SubButton
          styling="turquoise"
          goTo="/browse-products"
          text="Buy Food"
        />

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
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Farm Surplus"
        onClick={() => setOpen(true)}
      />
    );
  }
}

function FarmBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Farm"
          onClick={() => setOpen(false)}
        />
        <Container fluid className="sub-selection">
          <FarmSurplusBubble />
          <FoodLossBubble />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Farm"
          onClick={() => setOpen(true)}
        />
      </>
    );
  }
}

export { FarmBubble };
