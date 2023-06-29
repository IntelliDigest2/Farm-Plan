import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from 'react-i18next';

import "./MealsBox.css"

import MealsBoxRecipe from "./MealsBox";
import { connect } from "react-redux";
import { getRecipes } from "../../../../../../store/actions/marketplaceActions/savedMealData";
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
    props.getRecipes();
  }, [update]);

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


  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlan.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var nonNativeData = doc.nonNativeData;
      var totalDaily = doc.totalDaily;
      var totalNutrients = doc.totalNutrients;
      var url = doc.url;
      var recipeYield = doc.yield;


      if(nonNativeData) {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal: mealName,
            mealType: mealType,
            ingredients: ingredients,
            id: id,
            nonNativeData: nonNativeData,
            totalDaily: totalDaily,
            totalNutrients: totalNutrients,
            url: url,
            recipeYield: recipeYield
          },
        ]);
      }
      else {
        setSMeals((sMeals) => [
          ...sMeals,
          {
            meal: mealName,
            mealType: mealType,
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
    getRecipes: (saved) => dispatch(getRecipes(saved)),
    getWeeklyPlan: (plan) => dispatch(getWeeklyPlan(plan)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
