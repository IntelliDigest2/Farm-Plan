import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";
import { connect } from "react-redux";
import {
  getSavedMeals,
  deleteSavedMeal,
  editSavedMeal,
} from "../../../../../../store/actions/marketplaceActions";

const SavedMeals = (props) => {
  const [sMeals, setSMeals] = useState([]);

  //this sends data request
  useEffect(() => {
    if (props.tab === 1) props.getSavedMeals();
  }, [props.tab, props.update]);

  const handleDelete = (id) => {
    const iDData = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: id,
    };
    props.deleteSavedMeal(iDData);
    props.forceUpdate();
  };

  const handleEdit = (data) => {
    props.editSavedMeal(data);
  };

  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;

      setSMeals((sMeals) => [
        ...sMeals,
        {
          meal: mealName,
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
      <div className="header" style={{ paddingLeft: "1%" }}>
        My Saved Meals
      </div>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "25rem",
          marginBottom: "2%",
        }}
      >
        <MealsBox
          forceUpdate={props.forceUpdate}
          meals={sMeals}
          saved={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          value={props.value}
        />
      </div>
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
    deleteSavedMeal: (data) => dispatch(deleteSavedMeal(data)),
    editSavedMeal: (data) => dispatch(editSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
