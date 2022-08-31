//should be similar to saved meals, only differences
//- no ingredients
//- yes description
//- different formatting
//- group things by menusection

import React, { useState, useEffect } from "react";

import MenuItem from "../../Personal/Marketplace/MealPlanComp/MenuItem";
// import MealsBox from "../../Personal/Marketplace/MealPlanComp/MealsBox";
import { connect } from "react-redux";
import { getRecipes } from "../../../../../store/actions/marketplaceActions/savedMealData";
import sortBy from "lodash.sortby";


const MenuPreview = (props) => {
  const [sMeals, setSMeals] = useState([]);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    props.getRecipes();
  }, [update]);

  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlan.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var menuSection = doc.menuSection;
      var nonNativeData = doc.nonNativeData;
      var totalDaily = doc.totalDaily;
      var totalNutrients = doc.totalNutrients;
      var url = doc.url;
      var recipeYield = doc.yield;


      if(nonNativeData) {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal: mealName,
            mealType: mealType,
            menuSection: menuSection,
            ingredients: ingredients,
            id: id,
            nonNativeData: nonNativeData,
            totalDaily: totalDaily,
            totalNutrients: totalNutrients,
            url: url,
            recipeYield: recipeYield
          },
        ]);
      }
      else {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal: mealName,
            mealType: mealType,
            menuSection: menuSection,
            ingredients: ingredients,
            id: id,
          },
        ]);
     }
    });
  };

  useEffect(() => {
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    updateSMeals();
    // console.log("Saved Meals", sMeals);
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.mealPlan]);

  console.log(sMeals)

  return (
    <>
      <div className="basic-title-left mb-3">Menu Preview</div>
      <div className="saved-meals">
        <div className="sort">
        
        
        <MenuItem
          forceUpdate={forceUpdate}
          onChange={props.onChange}
          meals={sortBy(sMeals, ['menuSection'])}
          saved={true}
          value={props.value}
        />
       
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mealPlan: state.mealPlan.savedMeals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: (saved) => dispatch(getRecipes(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPreview);


