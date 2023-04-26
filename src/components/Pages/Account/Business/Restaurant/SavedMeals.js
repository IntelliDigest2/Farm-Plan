import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from 'react-i18next';


import MealsBoxRecipe from "./MealsBoxRecipe";
import { connect } from "react-redux";
import { getMenus } from "../../../../../store/actions/marketplaceActions/restaurantData";
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
    props.getMenus();
  }, [update]);

  

  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.Menus.forEach((doc) => {
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
  }, [props.Menus]);

  return (
    <>
      <div className="row">
        <div className="col-8 basic-title-left mb-3">{t('description.my_saved_meals')}</div>
      </div>
      <div className="saved-meals">
        <MealsBoxRecipe
          forceUpdate={forceUpdate}
          onChange={props.onChange}
          meals={sMeals}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Menus: state.restaurant.savedMenus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenus: (saved) => dispatch(getMenus(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
