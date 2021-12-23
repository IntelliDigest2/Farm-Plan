import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import "../UserAccount.css";

import { Container } from "react-bootstrap";

function BusinessSurplus() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Business Food Surplus"
          onClick={() => setOpen(false)}
        />
        <SubButton
          styling="turquoise"
          goTo="/add-products-business"
          text="Upload Food Surplus"
        />
        <SubButton
          styling="turquoise"
          goTo="/browse-products"
          text="Buy Food"
        />

        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusBusiness"
          text="View Food Surplus Weight Performance Chart"
        />
        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusGHGBusiness"
          text="View Food Surplus GHG Performance Chart"
        />
        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusCostBusiness"
          text="View Food Surplus Cost Performance Chart"
        />
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Business Food Surplus"
        onClick={() => setOpen(true)}
      />
    );
  }
}

function BusinessWaste() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Business Waste"
          onClick={() => setOpen(false)}
        />

        <div style={{ marginTop: "5%", marginBottom: "5%" }}>
          <SubButton
            styling="turquoise"
            goTo="/food-wasteBusiness"
            text="Update Food waste"
          />
          <SubButton
            styling="turquoise"
            goTo="/food-reduction"
            text="Food Waste Reduction Tips"
          />

          <SubButton
            styling="yellow"
            goTo="/chart/weekBusiness"
            text="Food Waste Weight Performance Chart"
          />
          <SubButton
            styling="yellow"
            goTo="/chart/weekGHGBusiness"
            text="Food Waste GHG Performance Chart"
          />
          <SubButton
            styling="yellow"
            goTo="/chart/weekCostBusiness"
            text="Food Waste Cost Performance Chart"
          />
        </div>
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Business Waste"
        onClick={() => setOpen(true)}
      />
    );
  }
}
function BusinessBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Business"
          onClick={() => setOpen(false)}
        />
        <Container fluid className="sub-selection">
          <BusinessSurplus />
          <BusinessWaste />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Business"
          onClick={() => setOpen(true)}
        />
      </>
    );
  }
}

export { BusinessBubble };
