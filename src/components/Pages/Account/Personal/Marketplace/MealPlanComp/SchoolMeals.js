import React, { useState, useEffect } from "react";

import "./SchoolMealBox.css"
import SchoolMealsBox from "./SchooMealsBox";

import { connect } from "react-redux";
import { getSchoolMealData } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";

function SchoolMeal(props) {

  const [schoolMeals, setSchoolMeals] = useState([]);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      school_uid: props.profile.belongToSchool,
    };
    props.getSchoolMealData(data);
  }, [props.value, update]);


  const updateSchoolMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSchoolMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.schoolMeals.forEach((doc) => {
      var meal_name = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
     // var mealType = doc.mealType;
      var url = doc.url;
      var total_nutrients = doc.totalNutrients;
      var total_daily = doc.totalDaily;
      var recipe_yield = doc.yield;
      var meal_type = doc.mealType;
      let nn = doc.nn;
      
      if (doc.non_native_data) {
        nn = doc.non_native_data;
      } else {
        nn = false;
      }

      setSchoolMeals((meals) => [
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
    updateSchoolMeals();
  }, [props.schoolMeals]);
  
  useEffect(() => {
    console.log("wahala", schoolMeals)
  }, [props.schoolMeals]);

  // function getFilteredMeal() {
  //   return meals.filter(data => {
  //     var meal_type = 'breakfast'
  //     //console.log("mealType", data.mealType[0])
    
  //     return meal_type == data.meal_type[0];
  //   });
  // }

  // console.log("lets check ==>", getFilteredMeal())

  return (
    <>
      {schoolMeals.length ? (
        <div className="meal-item">
        <SchoolMealsBox
            forceUpdate={forceUpdate}
            meals={schoolMeals}
            saved={false}
            value={props.value}
            isMealPlan={true}
          />
        </div>
      ) : (
        <div className="empty basic-title-left">
          <p>Your are not connected to a school or your school has not added a meal yet 🙂</p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    schoolMeals: state.mealPlanner.schoolMeals,
		profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchoolMealData: (data) => dispatch(getSchoolMealData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolMeal);
