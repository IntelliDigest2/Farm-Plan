import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";

import { connect } from "react-redux";
import { getMealData, getMealDiary } from "../../../../../../store/actions/marketplaceActions/mealPlanData";
import { getMealPlannerData, getWeeklyPlan } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";


function MyMeals(props) {
  const [meals, setMeals] = useState([]);
  const [weeklyMeals, setWeeklyMeals] = useState([]);

  

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  useEffect(() => {
    const weekData = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD-MM-yyyy"),
    };
    props.getWeeklyPlan(weekData);
  }, [props.value, update]);

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
    };
    props.getMealDiary(data);
    props.getMealPlannerData(data)
  }, [props.value, update]);



  const updateWeeklyMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setWeeklyMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.weekPlans.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
     // var mealType = doc.mealType;
      var url = doc.url;
      var totalNutrients = doc.totalNutrients;
      var totalDaily = doc.totalDaily;
      var recipeYield = doc.recipeYield;
      let nn = doc.nn
      // if (doc.nonNativeData) {
      //   nn = doc.nonNativeData;
      // } else {
      //   nn = false;
      // }

      setWeeklyMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          //mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
          totalNutrients: totalNutrients,
          totalDaily: totalDaily,
          recipeYield: recipeYield,
        },
      ]);
    });
  };


  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealDiary.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var url = doc.url;
      var totalNutrients = doc.totalNutrients;
      var totalDaily = doc.totalDaily;
      var recipeYield = doc.recipeYield;
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
          totalNutrients: totalNutrients,
          totalDaily: totalDaily,
          recipeYield: recipeYield,
        },
      ]);
    });
  };

  // const updateMealPlans = async () => {
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
 
  useEffect(() => {
    updateMeals();
    console.log("xxxxxxxxxx==> ", weeklyMeals)
  }, [props.mealPlan, props.mealPlanner]);

  useEffect(() => {
    updateWeeklyMeals();
    console.log("===========> ", meals)
  }, [props.weekPlans]);


  return (
    <>
      {weeklyMeals.length ? (
        <div>
          <MealsBox
            forceUpdate={forceUpdate}
            meals={meals}
            weeklyMeals={weeklyMeals}
            saved={false}
            value={props.value}
            isMealPlan={true}
          />
        </div>
      ) : (
        <div className="empty basic-title-left">
          <p> No meal yet 🙂 use the add button </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    mealDiary: state.mealPlan.mealDiary,
    mealPlanner: state.mealPlanner.plans,
    weekPlans: state.mealPlanner.weekPlans,
  }; 
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealDiary: (meals) => dispatch(getMealDiary(meals)),
    getMealPlannerData: (meals) => dispatch(getMealPlannerData(meals)),
    getWeeklyPlan: (plan) => dispatch(getWeeklyPlan(plan)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);
