import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";

import { connect } from "react-redux";
import {
  getMealData,
  deleteMealData,
} from "../../../../../../store/actions/marketplaceActions";

function MyMeals(props) {
  const [meals, setMeals] = useState([]);

  const handleDelete = (id) => {
    const iDData = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: id,
    };
    props.deleteMealData(iDData);
    props.forceUpdate();
  };

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
    };

    if (props.tab === 0) props.getMealData(data);
    // console.log(props.data);
  }, [props.value, props.update, props.tab]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;

      setMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          ingredients: ingredients,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMeals();
  }, [props.data]);

  return (
    <MealsBox
      forceUpdate={props.forceUpdate}
      meals={meals}
      handleDelete={handleDelete}
      value={props.value}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealData: (product) => dispatch(getMealData(product)),
    deleteMealData: (data) => dispatch(deleteMealData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);
