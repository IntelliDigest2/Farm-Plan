import React, { useState, useEffect } from "react";

import { Dropdown } from "../../../../../../../../SubComponents/Dropdown";


export default function MealType({ setMealType }) {
  const [control, setControl] = useState("Any");

  //mediates between the state of the dropdown and the format needed for the API
  const handleDropdown = () => {
    switch (control) {
      default:
      case "Any":
        setMealType("");
        break;
      case "Breakfast":
        setMealType("Breakfast");
        break;
      case "Lunch":
        setMealType("Lunch");
        break;
      case "Dinner":
        setMealType("Dinner");
        break;
      case "Snack":
        setMealType("Snack");
        break;
    }
  };

  useEffect(() => {
    handleDropdown();
  }, [control]);

  const mealTypes = ["Any", "Breakfast", "Lunch", "Dinner", "Snack"];

  return (
    <Dropdown
      id="meal-type"
      styling="green dropdown-input"
      data={control}
      items={mealTypes}
      function={(e) => setControl(e)}
    />
  );
}
