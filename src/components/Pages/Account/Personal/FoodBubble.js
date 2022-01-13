import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import "../UserAccount.css";

function FoodBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="green"
          text="Food"
          onClick={() => setOpen(false)}
        />

        <div style={{ marginTop: "5%", marginBottom: "5%" }}>
          <div className="disclaimer">
            <p>
              <b>DISCLAIMER:</b>The Global Food Loss & Waste Tracker is
              designed, in part, to help users develop healthy eating habits.
              The nutritional information and dietary recommendations provided
              are merely suggestions which may or may not improve users' eating
              habits and/or overall health. This app is a self-regulatory tool,
              not intended to replace professional medical advice. Please always
              consult a dietician or medical professional for professional
              medical advice regarding your health.
            </p>
          </div>

          <SubButton
            styling="turquoise"
            goTo="/food-intake"
            text="Update Food Intake"
          />
          <SubButton
            styling="turquoise"
            goTo="/chart/nutrientGap"
            text="Nutrient Gap Breakdown"
          />

          {/* food surplus */}

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
        </div>
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="green"
        text="Food"
        onClick={() => setOpen(true)}
      />
    );
  }
}

export { FoodBubble };
