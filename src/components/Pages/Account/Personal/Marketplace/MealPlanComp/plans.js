import React, { useState, useEffect } from "react";

import "./MealsBox.css"
import MealsBox from "./MealsBoxPlan";

import { connect } from "react-redux";
import { getMealPlannerData, getWeeklyPlan } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";

function MyPlans(props) {

  const [meals, setMeals] = useState([]);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  // //this sends data request
  // useEffect(() => {
  //   const data = {
  //     //decided to group year and month together, should this be changed?
  //     month: props.value.format("YYYYMM"),
  //     day: props.value.format("DD"),
  //   };
  //   props.getMealPlannerData(data);
  // }, [props.value, update]);

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD-MM-yyyy"),
    };
    props.getMealPlannerData(data);
  }, [props.value, update]);


  // const updateMeals = async () => {
  //   //clears the meals array before each update- IMPORTANT
  //   setMeals([]);

  //   //sets a new meal object in the array for every document with this date attached
  //   props.mealPlanner.forEach((doc) => {
  //     var mealName = doc.meal;
  //     var ingredients = doc.ingredients;
  //     var id = doc.id;
  //     var mealType = doc.mealType;
  //     var url = doc.url;
  //     var totalNutrients = doc.totalNutrients;
  //     var totalDaily = doc.totalDaily;
  //     let nn;
  //     if (doc.nonNativeData) {
  //       nn = doc.nonNativeData;
  //     } else {
  //       nn = false;
  //     }

  //     setMeals((meals) => [
  //       ...meals,
  //       {
  //         meal: mealName,
  //         mealType: mealType,
  //         ingredients: ingredients,
  //         id: id,
  //         nn: nn,
  //         url: url,
  //         totalNutrients: totalNutrients,
  //         totalDaily: totalDaily,
  //       },
  //     ]);
  //   });
  // };

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlanner.forEach((doc) => {
      var meal_name = doc.meal_name;
      var ingredients = doc.ingredients;
      var id = doc.id;
     // var mealType = doc.mealType;
      var url = doc.url;
      var total_nutrients = doc.total_nutrients;
      var total_daily = doc.total_daily;
      var recipe_yield = doc.recipe_yield;
      var meal_type = doc.meal_type;
      let nn = doc.nn;
      
      if (doc.non_native_data) {
        nn = doc.non_native_data;
      } else {
        nn = false;
      }

      setMeals((meals) => [
        ...meals,
        {
          meal_name: meal_name,
          //mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
          meal_type: meal_type,
          total_nutrients: total_nutrients,
          total_daily: total_daily,
          recipe_yield: recipe_yield,
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

  function getFilteredMeal() {
    return meals.filter(data => {
      var meal_type = 'breakfast'
      //console.log("mealType", data.mealType[0])
    
      return meal_type == data.meal_type[0];
    });
  }

  console.log("lets check ==>", getFilteredMeal())

  return (
    <>
      {meals.length ? (
        <div className="meal-item">
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
    mealPlanner: state.mealPlanner.plans,
    weekPlans: state.mealPlanner.weekPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealPlannerData: (meal) => dispatch(getMealPlannerData(meal)),
    getWeeklyPlan: (plan) => dispatch(getWeeklyPlan(plan)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPlans);
