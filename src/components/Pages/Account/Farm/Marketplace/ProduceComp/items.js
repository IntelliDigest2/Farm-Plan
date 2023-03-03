import React, { useState, useEffect } from "react";

// import MealsBox from "./MealsBoxPlan";

import { connect } from "react-redux";
import { getMealPlannerData, getWeeklyPlan } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";

function MyItems(props) {

  const [meals, setMeals] = useState([]);

  //trigger this when editing/deleting items
  // const [update, setUpdate] = useState(0);
  // const forceUpdate = () => {
  //   setUpdate(update + 1);
  // };

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
  // useEffect(() => {
  //   const data = {
  //     //decided to group year and month together, should this be changed?
  //     month: props.value.format("YYYYMM"),
  //     day: props.value.format("DD-MM-yyyy"),
  //   };
  //   props.getMealPlannerData(data);
  // }, [props.value, update]);


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

  // const updateMeals = async () => {
  //   //clears the meals array before each update- IMPORTANT
  //   setMeals([]);

  //   //sets a new meal object in the array for every document with this date attached
  //   props.mealPlanner.forEach((doc) => {
  //     var mealName = doc.meal;
  //     var ingredients = doc.ingredients;
  //     var id = doc.id;
  //    // var mealType = doc.mealType;
  //     var url = doc.url;
  //     var totalNutrients = doc.totalNutrients;
  //     var totalDaily = doc.totalDaily;
  //     var recipeYield = doc.recipeYield;
  //     var mealType = doc.mealType;
  //     let nn = doc.nn;
      
  //     // if (doc.nonNativeData) {
  //     //   nn = doc.nonNativeData;
  //     // } else {
  //     //   nn = false;
  //     // }

  //     setMeals((meals) => [
  //       ...meals,
  //       {
  //         meal: mealName,
  //         //mealType: mealType,
  //         ingredients: ingredients,
  //         id: id,
  //         nn: nn,
  //         url: url,
  //         mealType: mealType,
  //         totalNutrients: totalNutrients,
  //         totalDaily: totalDaily,
  //         recipeYield: recipeYield,
  //       },
  //     ]);
  //   });
  // };

  // useEffect(() => {
  //   updateMeals();
  // }, [props.mealPlanner]);
  
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
          <h2>List of items</h2>
        </div>
      ) : (
        <div className="empty basic-title-left">
          <p>Add an item to your harvest list 🙂</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);
