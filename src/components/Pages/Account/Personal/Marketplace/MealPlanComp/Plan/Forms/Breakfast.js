import React, { useState, useEffect } from "react";
import { Dropdown } from "../../../../../../../SubComponents/Dropdown";
import MealType from "../../Search/mealType";
import { Form, InputGroup, Button } from "react-bootstrap";
import FoodItemSearch from "../../Icons/InputRecipe/FoodItemSearch";
import "../../../../../../../SubComponents/Button.css";
import RecipeSearch from "./Search/RecipeSearch";

import { connect } from "react-redux";
//import { createRecipe } from "../../../../../../../../store/actions/marketplaceActions/savedMealData";
import { createMealPlannerData } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
//import { addToShoppingList } from "../../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { foodIdAPI, nutritionAPI } from "../../Icons/InputRecipe/NutritionApi";

function Breakfast(props) {
  
  return (
    <div>
        <h5>Choose atleast 7 meals each for Breakfast, Lunch and Dinner</h5>
      <RecipeSearch value={props.value} />
    <div>
        <button className="btn blue-btn shadow-none" style={{marginTop: "25px"}}
          onClick={() => {
          props.setPage(props.page + 1);
          }}>
          Next
       </button>
    </div>
    
   </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlannerData: (mealPlanner) => dispatch(createMealPlannerData(mealPlanner)),
    //createRecipe: (data) => dispatch(createRecipe(data)),
    //addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(null, mapDispatchToProps)(Breakfast);

