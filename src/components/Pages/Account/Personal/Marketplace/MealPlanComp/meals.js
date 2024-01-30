import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";
import "./MealsBox.css"
import { connect } from "react-redux";
import { getMealData, getMealDiary } from "../../../../../../store/actions/marketplaceActions/mealPlanData";
import { getMealPlannerData, getWeeklyPlan } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function MyMeals(props) {
  const [meals, setMeals] = useState([]);
  const [weeklyMeals, setWeeklyMeals] = useState([]);

  

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  function Refresh() {
    return (
      <>
        <Tooltip title="Refresh">
          <IconButton
            aria-label="Refresh"
            sx={{ ml: 2 }}
            onClick={() => {
              forceUpdate();
            }}
          >
            <SyncIcon style={{ fontSize: 35 }} 
            />
          </IconButton>
        </Tooltip>
    </>
    );
   }

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


  // 3 meals per day from meal plan
  const updateWeeklyMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setWeeklyMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.weekPlans.forEach((doc) => {
      var meal_name = doc.meal_name;
      var ingredients = doc.ingredients;
      var id = doc.id;
     // var mealType = doc.mealType;
      var url = doc.url;
      var total_nutrients = doc.total_nutrients;
      var total_daily = doc.total_daily;
      var recipe_yield = doc.recipe_yield;
      let nn = doc.nn
      var eaten = doc.eaten
      // if (doc.nonNativeData) {
      //   nn = doc.nonNativeData;
      // } else {
      //   nn = false;
      // }

      setWeeklyMeals((meals) => [
        ...meals,
        {
          meal_name: meal_name,
          //mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
          total_nutrients: total_nutrients,
          total_daily: total_daily,
          recipe_yield: recipe_yield,
          eaten: eaten
        },
      ]);
    });
  };

  // meals added by user with the add button
  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealDiary.forEach((doc) => {
      var meal_name = doc.meal_name;
      var ingredients = doc.ingredient;
      var id = doc.id;
      var meal_type = doc.meal_type;
      let url;
      let total_nutrients;
      let total_daily;
      let recipe_yield;
      let nn;
      if (doc.non_native_data) {
        nn = doc.non_native_data;
      } else {
        nn = false;
      }
      if (!doc.url) {
        url = null;
      } else {
        url = doc.url;
      }
      if (!doc.total_nutrients) {
        total_nutrients = null;
      } else {
        total_nutrients = doc.total_nutrients;
      }
      if (!doc.total_daily) {
        total_daily = null;
      } else {
        total_daily = doc.total_daily;
      }
      if (!doc.recipe_yield) {
        recipe_yield = null;
      } else {
        recipe_yield = doc.recipe_yield;
      }


      setMeals((meals) => [
        ...meals,
        {
          meal_name: meal_name,
          meal_type: meal_type,
          ingredients: ingredients,
          id: id,
          url: url,
          nn: nn,
          total_nutrients: total_nutrients,
          total_daily: total_daily,
          recipe_yield: recipe_yield,
        },
      ]);
    });
  };

 
  useEffect(() => {
    updateMeals();
  }, [props.mealPlan, props.mealPlanner]);

  useEffect(() => {
    updateWeeklyMeals();
  }, [props.weekPlans]);

  return (
    <>
    <Refresh />
      {weeklyMeals.length ? (
        <div className="meals">
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
