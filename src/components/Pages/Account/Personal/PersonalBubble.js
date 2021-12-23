import React, { useState } from "react";
import { DefaultButton, SubButton } from "../../SubComponents/Button";
import { FoodSurplusBubble } from "./FoodSurplusBubble";
import { FoodBubble } from "./FoodBubble";
import { FoodWasteBubble } from "./FoodWasteBubble";
import "../UserAccount.css";

import { Container } from "react-bootstrap";

function PersonalBubble() {
  const [open, setOpen] = useState(false);
  if (open === true) {
    return (
      <>
        <DefaultButton
          styling="blue"
          text="Personal"
          onClick={() => setOpen(false)}
        />
        <Container fluid className="sub-selection">
          <FoodBubble />
          <FoodSurplusBubble />
          <FoodWasteBubble />
        </Container>
      </>
    );
  } else {
    return (
      <DefaultButton
        styling="blue"
        text="Personal"
        onClick={() => setOpen(true)}
      />
    );
  }
}

export { PersonalBubble };
