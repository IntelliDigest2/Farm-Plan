import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBoxPlan";

import { connect } from "react-redux";
import { getMealPlannerDataRes } from "../../../../../store/actions/marketplaceActions/restaurantData";

function MyPlans(props) {

  const [meals, setMeals] = useState([]);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };


  //this sends data request
  useEffect(() => {
    props.getMealPlannerDataRes();
  }, [props.value, update]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlanner.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
     // var mealType = doc.mealType;
      var url = doc.url;
      var totalNutrients = doc.totalNutrients;
      var totalDaily = doc.totalDaily;
      var recipeYield = doc.recipeYield;
      var mealType = doc.mealType;
      let nn = doc.nn;
      
      // if (doc.nonNativeData) {
      //   nn = doc.nonNativeData;
      // } else {
      //   nn = false;
      // }

      setMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          //mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
          mealType: mealType,
          totalNutrients: totalNutrients,
          totalDaily: totalDaily,
          recipeYield: recipeYield,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMeals();
  }, [props.mealPlanner]);
  
  // useEffect(() => {
  //   //console.log("wahala", meals)
  // }, [props.weekPlans]);

  // function getFilteredMeal() {
  //   return meals.filter(data => {
  //     var mealType = 'breakfast'
  //     //console.log("mealType", data.mealType[0])
    
  //     return mealType == data.mealType[0];
  //   });
  // }

  // console.log("lets check ==>", getFilteredMeal())

  return (
    <>
      {meals.length ? (
        <div>
          <MealsBox
            forceUpdate={forceUpdate}
            meals={meals}
            saved={false}
            value={props.value}
            isMealPlan={true}
          />
        </div>
      ) : (
        <div className="empty basic-title-left">
          <p>Choose a start date to generate your 6 Months meal plan 🙂</p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    mealPlanner: state.restaurant.plans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealPlannerDataRes: (meal) => dispatch(getMealPlannerDataRes(meal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPlans);
