import React, { useState, useEffect } from "react";
import "./SchoolMealBox.css";
import SchoolMealsBox from "./SchooMealsBox";
import PackedLunchForm from "./Plan/CalendarPlanner/PackedLunchForm"; 

import { connect } from "react-redux";
import { getSchoolMealData } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";

function SchoolMeal(props) {
  const [schoolMeals, setSchoolMeals] = useState([]);
  const [update, setUpdate] = useState(0);

  const [lunchType, setLunchType] = useState("school");

  useEffect(() => {
    if (lunchType === "school") {
      const data = {
        school_uid: props.profile.belongToSchool,
      };
      props.getSchoolMealData(data);
    }
  }, [props.value, update, lunchType]);

  useEffect(() => {
    if (lunchType === "school") {
      updateSchoolMeals();
    }
  }, [props.schoolMeals, lunchType]);

  const updateSchoolMeals = () => {
    let mealsArray = [];

    props.schoolMeals.forEach((doc) => {
      mealsArray.push({
        meal_name: doc.meal,
        ingredients: doc.ingredients,
        id: doc.id,
        url: doc.url,
        total_nutrients: doc.totalNutrients,
        total_daily: doc.totalDaily,
        recipe_yield: doc.yield,
        meal_type: doc.mealType,
        nn: doc.non_native_data || false,
      });
    });

    setSchoolMeals(mealsArray);
  };

  const handleLunchTypeChange = (event) => {
    setLunchType(event.target.value);
  };

  return (
    <div className="meal-item">
      <div>
        <label>
          <input
            type="radio"
            value="school"
            checked={lunchType === "school"}
            onChange={handleLunchTypeChange}
          />
          School Lunch
        </label>
        <label>
          <input
            type="radio"
            value="packed"
            checked={lunchType === "packed"}
            onChange={handleLunchTypeChange}
          />
          Packed Lunch
        </label>
      </div>

      {lunchType === "school" ? (
        schoolMeals.length ? (
          <SchoolMealsBox
            forceUpdate={setUpdate}
            meals={schoolMeals}
            saved={false}
            value={props.value}
            isMealPlan={true}
            lunchType={lunchType}
          />
        ) : (
          <div className="empty basic-title-left">
            <p>
              You are not connected to a school or your school has not added a
              meal yet 🙂
            </p>
          </div>
        )
      ) : (
        <PackedLunchForm />
      )}
    </div>
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