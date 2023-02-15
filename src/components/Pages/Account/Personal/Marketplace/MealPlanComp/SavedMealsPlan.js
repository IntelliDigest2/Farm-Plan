import React, { useState, useEffect } from "react";

import MealsBoxSaved from "./MealsBoxSaved";
import { connect } from "react-redux";
import { getRecipes } from "../../../../../../store/actions/marketplaceActions/savedMealData";

const SavedMealsPlan = (props) => {
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
    props.savedMeal.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var nonNativeData = doc.nonNativeData;
      var totalDaily = doc.totalDaily;
      var totalNutrients = doc.totalNutrients;
      var recipeYield = doc.yield;


      if(nonNativeData) {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal: mealName,
            mealType: mealType,
            ingredients: ingredients,
            id: id,
            nonNativeData: nonNativeData,
            totalDaily: totalDaily,
            totalNutrients: totalNutrients,
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
            ingredients: ingredients,
            id: id,meal: mealName,
            mealType: mealType,
            ingredients: ingredients,
            id: id,
            nonNativeData: nonNativeData,
            totalDaily: totalDaily,
            totalNutrients: totalNutrients,
            recipeYield: recipeYield
          },
        ]);
     }
    });
  };

  useEffect(() => {
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    updateSMeals();
    console.log("===> Saved Meals", sMeals);
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.savedMeal]);

  console.log("===> Saved Meals", sMeals);

  return (
    <>
      <div className="row">
        <div className="col-8 basic-title-left mb-3">My Saved Meals</div>
      </div>
      <div className="saved-meals">
        <MealsBoxSaved
          forceUpdate={forceUpdate}
          meals={sMeals}
          saved={true}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    savedMeal: state.mealPlan.savedMeals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: (saved) => dispatch(getRecipes(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMealsPlan);
