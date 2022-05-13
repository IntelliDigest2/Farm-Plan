import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";

import { connect } from "react-redux";
import { getMealData } from "../../../../../../store/actions/marketplaceActions/mealPlanData";

function MyMeals(props) {
  const [meals, setMeals] = useState([]);

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
      var mealType = doc.mealType;
      var url = doc.url;
      let nn;
      if (doc.nonNativeData) {
        nn = doc.nonNativeData;
      } else {
        nn = false;
      }

      setMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMeals();
    // console.log(meals);
  }, [props.data]);

  return (
    <>
      {meals.length ? (
        <MealsBox
          forceUpdate={props.forceUpdate}
          meals={meals}
          saved={false}
          value={props.value}
        />
      ) : (
        <div className="empty basic-title-left">
          <p>There is no plan for today :( Try adding something. </p>
        </div>
      )}
    </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);
