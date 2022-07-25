import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";
import { connect } from "react-redux";
import { getRecipes } from "../../../../../../store/actions/marketplaceActions/savedMealData";

const SavedMeals = (props) => {
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

      setSMeals((sMeals) => [
        ...sMeals,
        {
          meal: mealName,
          mealType: mealType,
          ingredients: ingredients,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    updateSMeals();
    // console.log("Saved Meals", sMeals);
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.mealPlan]);

  return (
    <>
      <div className="basic-title-left mb-3">My Saved Meals</div>
      <div className="saved-meals">
        <MealsBox
          forceUpdate={forceUpdate}
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
