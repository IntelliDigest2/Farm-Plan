import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";
import { connect } from "react-redux";
import { getSavedMeals } from "../../../../../../store/actions/marketplaceActions";

const SavedMeals = (props) => {
  const [sMeals, setSMeals] = useState([]);

  //this sends data request
  useEffect(() => {
    if (props.tab === 1) props.getSavedMeals();
  }, [props.tab, props.update]);

  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
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
    // .then(setSMeals(sorted));
    // console.log(sMeals);
  }, [props.data]);

  return (
    <>
      <MealsBox
        forceUpdate={props.forceUpdate}
        onChange={props.onChange}
        meals={sMeals}
        saved={true}
        value={props.value}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedMeals: (saved) => dispatch(getSavedMeals(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
