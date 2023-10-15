import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from 'react-i18next';

import "./MealsBox.css"

import MealsBoxRecipe from "./MealsBox";
import { connect } from "react-redux";
import { getSavedMeals } from "../../../../../../store/actions/marketplaceActions/savedMealData";
import { getWeeklyPlan } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { AddMealModalRecipe } from "./Icons/AddMealModalRecipe";
const SavedMeals = (props) => {

  const { t } = useTranslation();

  const [sMeals, setSMeals] = useState([]);
  const [weeklyMeals, setWeeklyMeals] = useState([]);
  const [show, setShow] = useState(false);



  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    props.getSavedMeals();
  }, [update]);

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
      if (doc.non_native_data) {
        nn = doc.non_native_data;
      } else {
        nn = false;
      }

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
        },
      ]);
    });
  };


  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlan.forEach((doc) => {
      var meal_name = doc.meal_name;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var meal_type = doc.meal_type;
      var non_native_data = doc.non_native_data;
      var total_daily = doc.total_daily;
      var total_nutrients = doc.total_nutrients;
      var url = doc.url;
      var recipe_yield = doc.recipe_yield;


      if(non_native_data) {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal_name: meal_name,
            meal_type: meal_type,
            ingredients: ingredients,
            id: id,
            non_native_data: non_native_data,
            total_daily: total_daily,
            total_nutrients: total_nutrients,
            url: url,
            recipe_yield: recipe_yield
          },
        ]);
      }
      else {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal_name: meal_name,
            meal_type: meal_type,
            ingredients: ingredients,
            id: id,
          },
        ]);
     }
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
      <div className="row">
        <div className="col-8 basic-title-left mb-3">{t('description.my_saved_meals')}</div>
        <div className="col-4" style={{textAlign: "right"}}><AddMealModalRecipe show={show} setShow={setShow} /></div>
      </div>
      { sMeals.length ? (
        <div className="meal-item">
        <MealsBoxRecipe
          forceUpdate={forceUpdate}
          onChange={props.onChange}
          meals={sMeals}
          weeklyMeals={weeklyMeals}
          saved={true}
          value={props.value}
        />
      </div>
      ):(
        <div className="empty basic-title-left">
          <p> You have not saved any meal yet 🙂 use the add button </p>
        </div>
      )}
      
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mealPlan: state.mealPlan.savedMeals,
    weekPlans: state.mealPlanner.weekPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedMeals: (saved) => dispatch(getSavedMeals(saved)),
    getWeeklyPlan: (plan) => dispatch(getWeeklyPlan(plan)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
