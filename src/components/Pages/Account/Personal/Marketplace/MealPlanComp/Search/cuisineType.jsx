import React, { useState, useEffect } from "react";

import { Dropdown } from "../../../../../../SubComponents/Dropdown";

//ownRecipe is sent when a person adds their own meal as opposed to downloading from API
export default function CuisineType({ setCuisineType }) {
  const [control, setControl] = useState("Any");

  //mediates between the state of the dropdown and the format needed for the API
  const handleDropdown = () => {
    if (control === "Any") {
      setCuisineType("");
    } else {
      setCuisineType(`${control}`);
    }
  };

  useEffect(() => {
    handleDropdown();
  }, [control]);

  const mealTypes = [
    "Any",
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ];

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
