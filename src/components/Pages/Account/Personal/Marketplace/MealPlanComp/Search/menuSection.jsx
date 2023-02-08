//equivalent of menuSection.jsx but for the restaurants to input which section of the menu the dish is to go in

import React, { useState, useEffect } from "react";

import { Dropdown } from "../../../../../../SubComponents/Dropdown";

//ownRecipe is sent when a person adds their own meal as opposed to downloading from API
export default function MenuSection({ setMenuSection, ownRecipe }) {
  const [control, setControl] = useState("Any");

  //mediates between the state of the dropdown and the format needed for the API
  const handleDropdown = () => {
    if (ownRecipe) {
      switch (control) {
        default:
        case "Any":
          setMenuSection("");
          break;
        case "Breakfast":
          setMenuSection("Breakfast");
          break;
        case "Lunch":
          setMenuSection("Lunch");
          break;
        case "Dinner":
          setMenuSection("Dinner");
          break;
        case "Snack":
          setMenuSection("Snack");
          break;
        case "Brunch":
          setMenuSection("Brunch");
          break;
        case "Large Plates":
            setMenuSection("Large Plates");
            break;
        case "Small Plates":
            setMenuSection("Small Plates");
            break;
        case "Sides":
            setMenuSection("Sides");
            break;
        case "Dessert":
            setMenuSection("Dessert");
            break;
        
          
      }
    } else {
      switch (control) {
        default:
        case "Any":
          setMenuSection("");
          break;
        case "Breakfast":
          setMenuSection("&menuSection=Breakfast");
          break;
        case "Lunch":
          setMenuSection("&menuSection=Lunch");
          break;
        case "Dinner":
          setMenuSection("&menuSection=Dinner");
          break;
        case "Snack":
          setMenuSection("&menuSection=Snack");
          break;
        case "Brunch":
          setMenuSection("&menuSection=Brunch");
          break;
        case "Large Plates":
            setMenuSection("&menuSection=Large Plates");
            break;
        case "Small PLates":
          setMenuSection("&menuSection=Small Plates");
          break;
        case "Sides":
            setMenuSection("&menuSection=Sides");
            break;
        case "Dessert":
            setMenuSection("&menuSection=Dessert");
            break;
      }
    }
  };

  useEffect(() => {
    handleDropdown();
  }, [control]);

  const menuSections = ["Any", "Breakfast", "Lunch", "Dinner", "Snack", "Brunch", "Large Plates", "Small Plates", "Sides", "Dessert"];

  return (
    <Dropdown
      id="menu-section"
      styling="green dropdown-input"
      data={control}
      items={menuSections}
      function={(e) => setControl(e)}
    />
  );
}
