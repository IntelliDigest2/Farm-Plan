import React, { useState, useEffect } from "react";

import { Dropdown } from "../../../../../../../SubComponents/Dropdown";

export default function Requirements({ setRequirements }) {
  const requirements = [
    "Any",
    "Alcohol Free",
    "Crustacean Free",
    "Dairy Free",
    "Gluten Free",
    "Keto Friendly",
    "Kosher",
    "Nut Free",
    "Pescatarian",
    "Vegan",
    "Vegetarian",
  ];
  const [control, setControl] = useState("Any");

  //mediates between the state of the dropdown and the format needed for the API
  const handleDropdown = () => {
    switch (control) {
      default:
      case "Any":
        setRequirements("");
        break;
      case "Alcohol Free":
        setRequirements("alcohol-free");
        break;
      case "Crustacean Free":
        setRequirements("crustacean-free");
        break;
      case "Dairy Free":
        setRequirements("dairy-free");
        break;
      case "Gluten Free":
        setRequirements("gluten-free");
        break;
      case "Keto Friendly":
        setRequirements("keto-friendly");
        break;
      case "Kosher":
        setRequirements("kosher");
        break;
      case "Nut Free":
        setRequirements("nut-free");
        break;
      case "Pescatarian":
        setRequirements("pescatarian");
        break;
      case "Vegan":
        setRequirements("vegan");
        break;
      case "Vegetarian":
        setRequirements("vegetarian");
        break;
    }
  };

  useEffect(() => {
    handleDropdown();
  }, [control]);

  return (
    <Dropdown
      id="requirements"
      styling="green dropdown-input"
      data={control}
      items={requirements}
      function={(e) => setControl(e)}
    />
  );
}
