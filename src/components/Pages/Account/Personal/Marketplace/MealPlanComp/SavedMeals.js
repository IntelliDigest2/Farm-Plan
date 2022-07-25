import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";
import { connect } from "react-redux";
import { getRecipes } from "../../../../../../store/actions/marketplaceActions/savedMealData";

const SavedMeals = (props) => {
  const [sMeals, setSMeals] = useState([]);

  //this sends data request
  useEffect(() => {
    if (props.tab === 1) {
      props.getRecipes();
    }
  }, [props.tab, props.update]);

  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlan.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
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
            ingredients: ingredients,
            id: id,
          },
        ]);
     }
    });
  };

  useEffect(() => {
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    if (props.tab === 1) {
      updateSMeals();
      // console.log("Saved Meals", sMeals);
    }
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.mealPlan]);

  return (
    <>
      <div className="basic-title-left mb-3">My Saved Meals</div>
      <div className="saved-meals">
        <MealsBox
          forceUpdate={props.forceUpdate}
          onChange={props.onChange}
          meals={sMeals}
          saved={true}
          value={props.value}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
