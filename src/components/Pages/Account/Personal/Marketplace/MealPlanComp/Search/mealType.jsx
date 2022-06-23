import React, { useState, useEffect } from "react";

import { Dropdown } from "../../../../../../SubComponents/Dropdown";

//ownRecipe is sent when a person adds their own meal as opposed to downloading from API
export default function MealType({ setMealType, ownRecipe }) {
  const [control, setControl] = useState("Any");

  //mediates between the state of the dropdown and the format needed for the API
  const handleDropdown = () => {
    if (ownRecipe) {
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
    } else {
      switch (control) {
        default:
        case "Any":
          setMealType("");
          break;
        case "Breakfast":
          setMealType("&mealType=Breakfast");
          break;
        case "Lunch":
          setMealType("&mealType=Lunch");
          break;
        case "Dinner":
          setMealType("&mealType=Dinner");
          break;
        case "Snack":
          setMealType("&mealType=Snack");
          break;
      }
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
