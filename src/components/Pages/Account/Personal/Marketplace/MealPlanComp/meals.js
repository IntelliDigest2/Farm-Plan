import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";

import { connect } from "react-redux";
import { getMealData } from "../../../../../../store/actions/marketplaceActions/mealPlanData";
import { getMealPlannerData } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";


function MyMeals(props) {
  const [meals, setMeals] = useState([]);
  

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
    };
    props.getMealData(data);
    props.getMealPlannerData(data)
  }, [props.value, update]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlan.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var url = doc.url;
      var totalNutrients = doc.totalNutrients;
      var totalDaily = doc.totalDaily;
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
        },
      ]);
    });

    // props.mealPlanner.forEach((doc) => {
    //   var mealName = doc.meal;
    //   var ingredients = doc.ingredients;
    //   var id = doc.id;
    //   var mealType = doc.mealType;
    //   var url = doc.url;
    //   var totalNutrients = doc.totalNutrients;
    //   var totalDaily = doc.totalDaily;
    //   let nn;
    //   if (doc.nonNativeData) {
    //     nn = doc.nonNativeData;
    //   } else {
    //     nn = false;
    //   }

    //   setMeals((meals) => [
    //     ...meals,
    //     {q
    //       meal: mealName,
    //       mealType: mealType,
    //       ingredients: ingredients,
    //       id: id,
    //       nn: nn,
    //       url: url,
    //       totalNutrients: totalNutrients,
    //       totalDaily: totalDaily,
    //     },
    //   ]);
    // });
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
    // updateMealPlans();
  }, [props.mealPlan, props.mealPlanner]);

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
          <p> No meal yet 🙂 use the add button </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    mealPlan: state.mealPlan.meals,
    mealPlanner: state.mealPlanner.plans,
  }; 
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealData: (meals) => dispatch(getMealData(meals)),
    getMealPlannerData: (meals) => dispatch(getMealPlannerData(meals)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);
