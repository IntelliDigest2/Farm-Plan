import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import "../UserAccount.css";

function FoodWasteBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Food Waste"
          onClick={() => setOpen(false)}
        />

        <div style={{ marginTop: "5%", marginBottom: "5%" }}>
          <SubButton
            styling="turquoise"
            goTo="/food-waste"
            text="Update Food waste"
          />
          <SubButton
            styling="turquoise"
            goTo="/food-reduction"
            text="Food Waste Reduction Tips"
          />

          <SubButton
            styling="yellow"
            goTo="/chart/week"
            text="Food Waste Performance Chart"
          />
        </div>
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Food Waste"
        onClick={() => setOpen(true)}
      />
    );
  }
}

export { FoodWasteBubble };
