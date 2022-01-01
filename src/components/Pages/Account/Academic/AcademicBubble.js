import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import "../UserAccount.css";

import { Container } from "react-bootstrap";

function AcademicSurplus() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Academic Food Surplus"
          onClick={() => setOpen(false)}
        />
        <SubButton
          styling="turquoise"
          goTo="/add-products-academic"
          text="Upload Food Surplus"
        />
        <SubButton
          styling="turquoise"
          goTo="/browse-products"
          text="Buy Food"
        />

        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusUni"
          text="View Food Surplus Weight Performance Chart"
        />
        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusGHGUni"
          text="View Food Surplus GHG Performance Chart"
        />
        <SubButton
          styling="yellow"
          goTo="/chart/weekSurplusCostUni"
          text="View Food Surplus Cost Performance Chart"
        />
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Academic Food Surplus"
        onClick={() => setOpen(true)}
      />
    );
  }
}

function AcademicWaste() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Academic Waste"
          onClick={() => setOpen(false)}
        />

        <div style={{ marginTop: "5%", marginBottom: "5%" }}>
          <SubButton
            styling="turquoise"
            goTo="/food-wasteAcademic"
            text="Update Food waste"
          />
          <SubButton
            styling="turquoise"
            goTo="/food-reduction"
            text="Food Waste Reduction Tips"
          />

          <SubButton
            styling="yellow"
            goTo="/chart/weekUni"
            text="Food Waste Weight Performance Chart"
          />
          <SubButton
            styling="yellow"
            goTo="/chart/weekGHGUni"
            text="Food Waste GHG Performance Chart"
          />
          <SubButton
            styling="yellow"
            goTo="/chart/weekCostUni"
            text="Food Waste Cost Performance Chart"
          />
        </div>
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Academic Waste"
        onClick={() => setOpen(true)}
      />
    );
  }
}
function AcademicBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Academic"
          onClick={() => setOpen(false)}
        />
        <Container fluid className="sub-selection">
          <AcademicSurplus />
          <AcademicWaste />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Academic"
          onClick={() => setOpen(true)}
        />
      </>
    );
  }
}

export { AcademicBubble };
